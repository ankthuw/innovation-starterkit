"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, DollarSign, FileText, HelpingHand } from "lucide-react";
import type { InnovationSession, WizardStep } from "@/types/innovation";
import { Sparkles } from "lucide-react";

interface InnovationStarterkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const phases: Array<{
  id: WizardStep;
  title: string;
  description: string;
  icon: any;
  path: string;
}> = [
  {
    id: "challenge",
    title: "Challenge",
    description: "Define your problem and audience",
    icon: Lightbulb,
    path: "/challenge",
  },
  {
    id: "market",
    title: "Market",
    description: "Analyze market size and competition",
    icon: TrendingUp,
    path: "/market",
  },
  {
    id: "ideation",
    title: "Ideation",
    description: "Generate and evaluate ideas",
    icon: HelpingHand,
    path: "/ideation",
  },
  {
    id: "investment-appraisal",
    title: "Investment",
    description: "Financial analysis and ROI",
    icon: DollarSign,
    path: "/investment-appraisal",
  },
  {
    id: "pitch",
    title: "Pitch",
    description: "Create your pitch deck",
    icon: FileText,
    path: "/pitch",
  },
];

export function InnovationStarterkitModal({
  isOpen,
  onClose,
}: InnovationStarterkitModalProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [sessionData, setSessionData] = useState<Partial<InnovationSession>>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleComplete = (data: InnovationSession) => {
    setSessionData(data);
    setShowSummary(true);
  };

  const handlePhaseSelect = (index: number) => {
    setCurrentPhase(index);
  };

  if (showSummary) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              🎉 Innovation Journey Complete!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
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
                  // Download functionality would go here
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
                  // Copy to clipboard functionality
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
                  // Autofill i3 form
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
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">
              🚀 Innovation Starterkit
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          <p className="text-gray-600 mt-1">
            Let AI guide you through the innovation process
          </p>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(95vh-180px)]">
          {/* Phase Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                const isCurrent = index === currentPhase;
                const isPast = index < currentPhase;

                return (
                  <button
                    key={phase.id}
                    onClick={() => handlePhaseSelect(index)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? "bg-blue-600 text-white"
                          : isPast
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isCurrent
                          ? "text-blue-600"
                          : isPast
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {phase.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase Content - iframe to existing wizard */}
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Innovation Starterkit Wizard
              </h3>
              <p className="text-blue-700 mb-6">
                The wizard interface will be embedded here. For the prototype,
                this will show the complete 5-phase innovation process.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => {
                    // Simulate completion for prototype
                    handleComplete({
                      currentStep: "pitch",
                      challenge: {
                        problem: "Reducing carbon emissions in manufacturing",
                        targetAudience: "Industrial manufacturers",
                        currentSolutions: "Traditional energy systems",
                        context:
                          "Environmental regulations are becoming stricter and customers demand sustainable solutions",
                      },
                      ideas: [
                        {
                          id: "idea-1",
                          name: "AI-Powered Energy Optimization System",
                          tagline: "Smart energy for smart factories",
                          description:
                            "An intelligent system that uses machine learning to optimize energy consumption in real-time",
                          problemSolved:
                            "High energy costs and carbon footprint in manufacturing",
                        },
                      ],
                      selectedIdeaId: "idea-1",
                      conversationHistory: [],
                      ideationPhases: [],
                      startedAt: Date.now(),
                      updatedAt: Date.now(),
                    });
                  }}
                >
                  Simulate Complete Flow
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("/challenge", "_blank")}
                >
                  Open Full Wizard (New Tab)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function autofillI3Form(data: Partial<InnovationSession>) {
  // In the prototype, this will simulate autofill
  // In real implementation, this would interact with i3's form fields
  if (typeof window !== "undefined") {
    // Dispatch custom event that the idea form can listen to
    window.dispatchEvent(
      new CustomEvent("innovation-starterkit-complete", { detail: data })
    );
  }
}
