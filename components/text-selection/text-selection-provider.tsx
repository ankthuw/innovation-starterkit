"use client"

import { ReactNode, useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { SelectionToolbar } from "./selection-toolbar";
import { EnhancedAnalysisPanel } from "./enhanced-analysis-panel";
import { FloatingCrackButton } from "./floating-crack-button";
import { TextSelectionProvider as BaseTextSelectionProvider, TextSelectionProviderProps, useTextSelection } from "@/hooks/use-text-selection";
import { getSession } from "@/lib/session";

// Check if Crack-It should be shown (not on i3-prototype pages)
function shouldShowCrackIt(pathname: string | null): boolean {
  if (!pathname) return true; // Default to showing if pathname is not available
  return !pathname.startsWith("/i3-prototype");
}

export function TextSelectionProvider({ children }: Omit<TextSelectionProviderProps, "onSelection">) {
  const pathname = usePathname();
  const showCrackIt = shouldShowCrackIt(pathname);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  // Derive current phase directly from pathname - no need for useEffect or state
  const currentPhase = useMemo(() => {
    if (pathname.includes("/evaluation")) return "evaluation";
    if (pathname.includes("/challenge")) return "challenge";
    if (pathname.includes("/market")) return "market";
    if (pathname.includes("/ideation")) return "ideation";
    if (pathname.includes("/investment-appraisal")) return "investment-appraisal";
    if (pathname.includes("/pitch")) return "pitch";
    return "unknown";
  }, [pathname]);

  const handleAnalyze = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
      setIsPanelOpen(true);
    }
  }, []);

  const handleDirectChat = useCallback(() => {
    // Check if there's any selected text first
    const selection = window.getSelection();
    const hasSelection = selection && selection.toString().trim();

    if (hasSelection) {
      // Use selected text if available (same as popup behavior)
      setSelectedText(selection.toString().trim());
    } else {
      // Empty selection for direct chat mode
      setSelectedText("");
    }
    setIsPanelOpen(true);
  }, []);

  // Get phase context - recalculate when phase or panel state changes
  const phaseContext = useMemo(() => {
    const sessionData = getSession();

    // Find selected idea from ideas array
    const selectedIdea = sessionData?.selectedIdeaId && sessionData?.ideas
      ? sessionData.ideas.find(i => i.id === sessionData.selectedIdeaId)
      : undefined;

    return {
      phase: currentPhase,
      challenge: sessionData?.challenge,
      market: sessionData?.marketAnalysis,
      idea: selectedIdea,
      appraisal: sessionData?.investmentAppraisal
    };
  }, [currentPhase, isPanelOpen]); // Recalculate when phase changes or panel opens

  return (
    <BaseTextSelectionProvider>
      <TextSelectionContextWrapper
        onAnalyze={handleAnalyze}
        onDirectChat={handleDirectChat}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        selectedText={selectedText}
        phaseContext={phaseContext}
        showCrackIt={showCrackIt}
      >
        {children}
      </TextSelectionContextWrapper>
    </BaseTextSelectionProvider>
  );
}

interface TextSelectionContextWrapperProps {
  children: ReactNode;
  onAnalyze: () => void;
  onDirectChat: () => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  selectedText: string;
  phaseContext: {
    phase: string;
    challenge?: any;
    market?: any;
    idea?: any;
    appraisal?: any;
  };
  showCrackIt: boolean;
}

function TextSelectionContextWrapper({
  children,
  onAnalyze,
  onDirectChat,
  isPanelOpen,
  setIsPanelOpen,
  selectedText,
  phaseContext,
  showCrackIt
}: TextSelectionContextWrapperProps) {
  const { state } = useTextSelection();

  // Don't show CrackIt features on evaluation page
  const isEvaluationPage = phaseContext.phase === "evaluation";

  return (
    <>
      {children}
      {showCrackIt && !isEvaluationPage && (
        <>
          <SelectionToolbar
            position={state.triggerPosition}
            isVisible={state.isVisible}
            onAnalyze={onAnalyze}
          />
          <FloatingCrackButton onClick={onDirectChat} />
        </>
      )}
      {!isEvaluationPage && (
        <EnhancedAnalysisPanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          selectedText={selectedText}
          phaseContext={phaseContext}
        />
      )}
    </>
  );
}
