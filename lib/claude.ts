import OpenAI from 'openai';
import type { ChatCompletionChunk } from 'openai/resources/chat/completions';
import { config } from './config';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';

// Initialize OpenAI client with proxy support for corporate networks
const createProxyFetch = () => {
  const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (proxyUrl) {
    console.log(`[OpenAI] Using proxy: ${proxyUrl}`);
    const agent = new HttpsProxyAgent(proxyUrl);
    return async (input: RequestInfo | URL, init?: RequestInit) => {
      // Ensure api-version query parameter is present for Azure OpenAI
      let url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

      // Add api-version if not present - append to the END of the URL
      if (url && !url.includes('api-version=')) {
        url = `${url}?api-version=2025-01-01-preview`;
      }

      const updatedInput = typeof input === 'string' ? url : input instanceof URL ? new URL(url) : { ...input, url };

      // Filter out null values from init to avoid type errors
      const cleanInit: RequestInit = Object.fromEntries(
        Object.entries(init || {}).filter(([_, v]) => v !== null && v !== undefined)
      ) as RequestInit;

      return fetch(updatedInput as any, {
        ...cleanInit,
        agent: agent as any,
      } as any);
    };
  }
  return undefined;
};

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  baseURL: config.openai.baseURL,
  fetch: createProxyFetch() as any,
});

// Export the OpenAI client for legacy code that imported 'anthropic'
export const anthropic = openai;

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Extended message interface for Z.AI thinking mode
 */
export interface ClaudeMessageWithThinking extends ClaudeMessage {
  reasoning_content?: string;
}

/**
 * Repairs malformed JSON that AI models sometimes produce
 * Handles missing quotes, trailing commas, unescaped quotes, etc.
 */
function repairMalformedJson(jsonString: string): string {
  let repaired = jsonString;

  // Fix unquoted property values that extend until the next quoted key (multiline)
  // Pattern: "key": unquoted value\n"nextKey": -> "key": "unquoted value",\n"nextKey":
  // This handles values that contain commas, periods, parentheses, etc.
  repaired = repaired.replace(
    /("[\w-]+")\s*:\s*([a-zA-Z][^\n]*?)\s*(?=\n\s*"[a-zA-Z])/g,
    (match, key, value) => {
      // Trim trailing whitespace from value
      const trimmed = value.trim();
      return `${key}: "${trimmed}",`;
    }
  );

  // Fix trailing commas before closing brackets/braces
  repaired = repaired.replace(/,\s*([}\]])/g, '$1');

  // Fix truncated JSON - close any open arrays or objects
  // Count opening vs closing brackets and braces
  const openBraces = (repaired.match(/\{/g) || []).length;
  const closeBraces = (repaired.match(/\}/g) || []).length;
  const openBrackets = (repaired.match(/\[/g) || []).length;
  const closeBrackets = (repaired.match(/\]/g) || []).length;

  // Add missing closing braces
  for (let i = 0; i < openBraces - closeBraces; i++) {
    repaired += '}';
  }
  // Add missing closing brackets
  for (let i = 0; i < openBrackets - closeBrackets; i++) {
    repaired += ']';
  }

  return repaired;
}

/**
 * Attempt multiple repair strategies for malformed JSON
 */
function tryRepairJson(jsonString: string, attempt: number): string {
  let repaired = jsonString;

  switch (attempt) {
    case 1:
      // Main repair strategy - fix unquoted values extending to next key
      repaired = repairMalformedJson(jsonString);
      break;

    case 2:
      // More aggressive - handle unquoted values that end with newline
      repaired = jsonString.replace(
        /("[\w-]+")\s*:\s*([a-zA-Z][^\n]*?)\s*\n/g,
        (match, key, value) => {
          const trimmed = value.trim();
          return `${key}: "${trimmed}"\n`;
        }
      );
      repaired = repaired.replace(/,\s*([}\]])/g, '$1');
      break;

    case 3:
      // Fallback - try to fix values that might end at closing bracket/brace
      // This is for cases where the value is followed by comma or closing bracket
      repaired = jsonString.replace(
        /("[\w-]+")\s*:\s*([a-zA-Z][^,\]}]*?)([,\]}])/g,
        '$1: "$2"$3'
      );
      repaired = repaired.replace(/,\s*([}\]])/g, '$1');
      break;

    default:
      return jsonString;
  }

  return repaired;
}

/**
 * Send a message (non-streaming) - compatibility wrapper
 */
export async function sendClaudeMessage<T = unknown>(
  messages: ClaudeMessage[],
  systemPrompt: string,
  maxTokens: number = 4096
): Promise<ClaudeResponse<T>> {
  try {
    if (!config.openai.apiKey) {
      return {
        success: false,
        error: "OPENAI_API_KEY is not configured",
      };
    }

    const openaiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ];

    const response = await openai.chat.completions.create({
      model: config.openai.defaultModel,
      max_completion_tokens: maxTokens,
      messages: openaiMessages,
      // Azure OpenAI doesn't support the 'thinking' parameter
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      return {
        success: false,
        error: "No content in response",
      };
    }

    // Strip markdown code blocks if present
    let textToParse = content.trim();

    // Try to extract JSON from code blocks
    const codeBlockMatch = textToParse.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      textToParse = codeBlockMatch[1].trim();
    } else {
      // Try to find a JSON object/array in the text
      const jsonMatch = textToParse.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        textToParse = jsonMatch[0].trim();
      }
    }

    // Try to parse as JSON
    try {
      const jsonData = JSON.parse(textToParse);
      return { success: true, data: jsonData as T };
    } catch (parseError) {
      console.error("Failed to parse JSON from response:", parseError);
      console.error("Response text:", content.slice(0, 500));
      console.error("Extracted text:", textToParse.slice(0, 500));

      // Try to repair malformed JSON with multiple strategies
      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`[JSON Repair] Attempt ${attempt}: Trying to repair malformed JSON...`);
        try {
          const repaired = tryRepairJson(textToParse, attempt);
          console.log(`[JSON Repair] Attempt ${attempt} repaired JSON:`, repaired.slice(0, 500));
          const jsonData = JSON.parse(repaired);
          console.log(`[JSON Repair] Attempt ${attempt} successfully parsed repaired JSON`);
          return { success: true, data: jsonData as T };
        } catch (repairError) {
          console.error(`[JSON Repair] Attempt ${attempt} failed:`, repairError);
          if (attempt === 3) {
            console.error("[JSON Repair] All repair attempts failed");
            return {
              success: false,
              error: "Failed to parse response as JSON. The AI returned text instead of valid JSON.",
            };
          }
        }
      }

      return {
        success: false,
        error: "Failed to parse response as JSON. The AI returned text instead of valid JSON.",
      };
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Stream a message - compatibility wrapper
 */
export async function* streamClaudeMessage(
  messages: ClaudeMessage[],
  systemPrompt: string,
  maxTokens: number = 8192
): AsyncGenerator<string, void, unknown> {
  if (!config.openai.apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const openaiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
    ...messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }))
  ];

  const stream = await openai.chat.completions.create({
    model: config.openai.defaultModel,
    max_tokens: maxTokens,
    messages: openaiMessages,
    stream: true,
    thinking: { type: "disabled" } as any,  // Disable thinking for faster responses
  });

  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta;

    // Check for reasoning_content (Z.AI thinking mode) - skip if present
    if ((delta as any)?.reasoning_content) {
      continue;
    }

    if (delta?.content) {
      yield delta.content;
    }
  }
}

/**
 * Stream a message with thinking mode enabled - compatibility wrapper
 * Returns both thinking process and final content
 */
export async function* streamClaudeWithThinking(
  messages: ClaudeMessage[],
  systemPrompt: string,
  options?: { thinking?: boolean; webSearch?: boolean }
): AsyncGenerator<
  { type: "thinking"; text: string } | { type: "content"; text: string } | { type: "sources"; data: unknown[] },
  void,
  unknown
> {
  if (!config.openai.apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  console.log("[streamClaudeWithThinking] Starting stream with thinking:", options?.thinking !== false, "webSearch:", options?.webSearch);

  const stream = await openai.chat.completions.create({
    model: config.openai.defaultModel,
    max_completion_tokens: 4096,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ],
    stream: true,
    // Azure OpenAI doesn't support the 'thinking' parameter
  }) as AsyncIterable<ChatCompletionChunk>;

  let eventCount = 0;
  let hasThinkingContent = false;

  for await (const chunk of stream) {
    eventCount++;
    const delta = chunk.choices?.[0]?.delta;

    // Log first few events to understand the structure
    if (eventCount <= 3) {
      console.log(`[stream event ${eventCount}] delta:`, delta);
    }

    // Check for reasoning_content (thinking process from Z.AI)
    if ((delta as any)?.reasoning_content) {
      const thinkingText = (delta as any).reasoning_content;
      if (thinkingText) {
        hasThinkingContent = true;
        console.log("[stream] Yielding thinking:", thinkingText.slice(0, 50) + "...");
        yield { type: "thinking", text: thinkingText };
      }
    }

    // Regular content
    if (delta?.content) {
      console.log("[stream] Yielding content:", delta.content.slice(0, 50) + "...");
      yield { type: "content", text: delta.content };
    }
  }

  console.log("[stream] Complete. Total events:", eventCount, "Had thinking:", hasThinkingContent);
}
