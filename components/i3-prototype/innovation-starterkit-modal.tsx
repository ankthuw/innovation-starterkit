"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { InnovationSession } from "@/types/innovation";
import { FileText, Sparkles } from "lucide-react";

interface InnovationStarterkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InnovationStarterkitModal({
  isOpen,
  onClose,
}: InnovationStarterkitModalProps) {
  const [sessionData, setSessionData] = useState<Partial<InnovationSession>>({});
  const [showSummary, setShowSummary] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from same origin
      if (event.origin !== window.location.origin) return;

      // Handle different message types
      if (event.data.type === "INNOVATION_COMPLETE") {
        setSessionData(event.data.session);
        setShowSummary(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Reset iframe when modal opens
  useEffect(() => {
    if (isOpen) {
      setIframeKey((prev) => prev + 1);
      setShowSummary(false);
    }
  }, [isOpen]);

  if (showSummary) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Innovation Journey Complete</DialogTitle>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              🎉 Innovation Journey Complete!
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">
                Your Innovation Summary
              </h3>
              <div className="space-y-4">
                {sessionData.challenge && (
                  <div>
                    <div className="text-sm font-medium text-blue-700 mb-1">
                      Challenge
                    </div>
                    <div className="text-sm text-blue-600">
                      {sessionData.challenge.problem}
                    </div>
                  </div>
                )}
                {sessionData.ideas && sessionData.selectedIdeaId && (
                  <div>
                    <div className="text-sm font-medium text-blue-700 mb-1">
                      Selected Idea
                    </div>
                    <div className="text-sm text-blue-600">
                      {
                        sessionData.ideas.find(
                          (i) => i.id === sessionData.selectedIdeaId
                        )?.name
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => {
                  alert("Download pitch deck (to be implemented)");
                }}
              >
                <FileText className="w-5 h-5" />
                <span>Download Pitch Deck</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(
                      JSON.stringify(sessionData, null, 2)
                    );
                    alert("Summary copied to clipboard!");
                  }
                }}
              >
                <FileText className="w-5 h-5" />
                <span>Copy to Clipboard</span>
              </Button>

              <Button
                className="h-auto py-4 flex flex-col gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => {
                  autofillI3Form(sessionData);
                  onClose();
                }}
              >
                <Sparkles className="w-5 h-5" />
                <span>Auto-Fill Idea Form</span>
              </Button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                💡 <strong>Tip:</strong> Click "Auto-Fill Idea Form" to
                automatically populate the i3 idea form with your innovation
                details using AI assistance.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowSummary(false)}>
                Back to Wizard
              </Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Innovation Starterkit Wizard</DialogTitle>
        {/* Close button overlay - higher z-index to appear above iframe */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[100] h-10 w-10 rounded-full bg-white shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          title="Close"
          type="button"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* iframe to actual wizard - full height */}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src="/challenge"
          className="w-full h-[95vh] border-0"
          title="Innovation Starterkit Wizard"
        />
      </DialogContent>
    </Dialog>
  );
}

function autofillI3Form(data: Partial<InnovationSession>) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("innovation-starterkit-complete", { detail: data })
    );
  }
}
