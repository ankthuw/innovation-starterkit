# Azure OpenAI Configuration Guide

This guide explains how to configure the Innovation StarterKit to work with Azure OpenAI.

## Prerequisites

- Azure OpenAI resource deployed
- API key from Azure Portal
- Deployment name created in Azure OpenAI resource

## Environment Variables (.env)

Create a `.env` file in the project root with the following configuration:

```bash
# Azure OpenAI Configuration
OPENAI_API_KEY=your-azure-api-key-here
OPENAI_BASE_URL=https://your-resource-name.cognitiveservices.azure.com/openai/deployments/your-deployment-name
OPENAI_MODEL=your-model-name

# Example:
# OPENAI_API_KEY=your-api-key-here
# OPENAI_BASE_URL=https://your-resource.cognitiveservices.azure.com/openai/deployments/your-deployment-name
# OPENAI_MODEL=your-model-name

# Tavily API Key (for web search)
TAVILY_API_KEY=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

# Database
DATABASE_URL="file:./dev.db"

# Authentication
EVALUATION_USER_EMAIL=evaluator@innovationkit.local
EVALUATION_USER_PASSWORD=Eval2025!
BETTER_AUTH_SECRET=innovationkit-secret-change-in-production
BETTER_AUTH_URL=http://localhost:3000
```

## Getting Azure OpenAI Credentials

### 1. Find your API Key

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure OpenAI resource
3. Click **"Keys and Endpoint"** in the left menu
4. Copy the **API Key** (you can use either KEY 1 or KEY 2)

### 2. Find your Deployment Name

1. In your Azure OpenAI resource, click **"Deployments"** in the left menu
2. Find the deployment you want to use (e.g., `gpt-5-nano`)
3. Note the **Deployment name** (not the model name)

### 3. Construct the Base URL

The base URL format is:

```
https://{resource-name}.cognitiveservices.azure.com/openai/deployments/{deployment-name}
```

For example, if your resource is `innovation-starterkit` and deployment is `gpt-5-nano`:

```
https://innovation-starterkit.cognitiveservices.azure.com/openai/deployments/gpt-5-nano
```

**Important:** Do NOT add the `api-version` query parameter - the application will handle this automatically.

## Corporate Proxy Configuration

If you're behind a corporate proxy, the application will automatically use the `HTTPS_PROXY` environment variable if set.

```bash
# Set proxy environment variable (if needed)
export HTTPS_PROXY=http://127.0.0.1:3128
export https_proxy=http://127.0.0.1:3128
```

The application will automatically detect and use the proxy for Azure OpenAI requests.

## Model Compatibility Notes

### GPT-5-Nano and Newer Models

For newer models like `gpt-5-nano`:
- Use `max_completion_tokens` instead of `max_tokens`
- The `thinking` parameter is not supported
- The model may use reasoning tokens which consume part of your token limit

### Token Allocation

When setting token limits, be aware that:
- Reasoning tokens are counted separately from content tokens
- If your `max_completion_tokens` is too small, you may get empty responses
- Recommended minimum: 4096 tokens for complex responses

## Testing Your Configuration

Test your Azure OpenAI connection using curl:

```bash
curl -X POST 'https://your-resource.cognitiveservices.azure.com/openai/deployments/your-deployment/chat/completions?api-version=2025-01-01-preview' \
  -H 'Content-Type: application/json' \
  -H 'api-key: YOUR_API_KEY' \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_completion_tokens": 100
  }'
```

Expected response:
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    }
  ],
  "usage": {
    "total_tokens": 20
  }
}
```

## Troubleshooting

### 404 Resource Not Found

- **Cause:** Incorrect deployment name or base URL
- **Solution:** Verify the deployment name in Azure Portal matches your `.env`

### Empty Responses

- **Cause:** Token limit too small for models with reasoning
- **Solution:** Increase `max_completion_tokens` to at least 4096

### Unknown Parameter 'thinking'

- **Cause:** Using unsupported parameters for Azure OpenAI
- **Solution:** The application code has been updated to avoid this parameter

### Proxy/Connection Errors

- **Cause:** Corporate firewall or proxy not detected
- **Solution:** Ensure `HTTPS_PROXY` environment variable is set

## Demo Mode

For testing without Azure OpenAI, you can enable demo mode:

```bash
NEXT_PUBLIC_DEMO_MODE=true
```

This will simulate AI responses without making actual API calls.

## Security Notes

- **NEVER** commit `.env` file to version control
- **NEVER** share your API keys
- **DO** use different keys for development and production
- **DO** rotate keys regularly
- `.env` is listed in `.gitignore` to prevent accidental commits
