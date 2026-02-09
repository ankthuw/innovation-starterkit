"use client";

import { useState, useEffect } from "react";
import { I3Header } from "@/components/i3-prototype/i3-header";
import { InnovationStarterkitFAB } from "@/components/i3-prototype/innovation-starterkit-fab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Save, X } from "lucide-react";
import type { InnovationSession } from "@/types/innovation";

export default function IdeaPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problem: "",
    solution: "",
    impact: "",
    category: "",
  });

  const [showAutofillIndicator, setShowAutofillIndicator] = useState(false);

  useEffect(() => {
    // Listen for autofill event from Innovation Starterkit
    const handleAutofill = (event: CustomEvent<Partial<InnovationSession>>) => {
      const data = event.detail;
      autofillForm(data);
    };

    window.addEventListener(
      "innovation-starterkit-complete",
      handleAutofill as EventListener
    );

    return () => {
      window.removeEventListener(
        "innovation-starterkit-complete",
        handleAutofill as EventListener
      );
    };
  }, []);

  const autofillForm = (data: Partial<InnovationSession>) => {
    // Extract relevant information and autofill the form
    const updates: Partial<typeof formData> = {};

    if (data.challenge?.problem) {
      updates.problem = data.challenge.problem;
    }

    if (data.ideas && data.selectedIdeaId) {
      const selectedIdea = data.ideas.find((i) => i.id === data.selectedIdeaId);
      if (selectedIdea) {
        updates.title = selectedIdea.name;
        updates.description = selectedIdea.tagline || selectedIdea.description;
        updates.solution = selectedIdea.description;
      }
    }

    if (data.marketAnalysis) {
      const marketInfo = [
        data.marketAnalysis.tam && `TAM: ${data.marketAnalysis.tam}`,
        data.marketAnalysis.sam && `SAM: ${data.marketAnalysis.sam}`,
        data.marketAnalysis.som && `SOM: ${data.marketAnalysis.som}`,
      ]
        .filter(Boolean)
        .join(". ");
      updates.impact = marketInfo || "";
    }

    setFormData((prev) => ({ ...prev, ...updates }));

    // Show indicator animation
    setShowAutofillIndicator(true);
    setTimeout(() => setShowAutofillIndicator(false), 3000);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In real app, save to backend
    alert("Idea saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <I3Header />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Idea</h1>
          <p className="text-gray-600">
            Share your innovative idea and make a difference
          </p>
        </div>
      </section>

      {/* Autofill Indicator */}
      {showAutofillIndicator && (
        <div className="fixed top-20 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5">
          <Sparkles className="w-5 h-5" />
          <div>
            <div className="font-medium">Form Auto-Filled!</div>
            <div className="text-sm">
              Your innovation details have been added
            </div>
          </div>
          <button
            onClick={() => setShowAutofillIndicator(false)}
            className="ml-2 text-green-600 hover:text-green-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Idea Form */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Idea Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill in the details below or use the Innovation Starterkit for
                  AI-guided idea development
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  // Trigger the FAB click programmatically
                  const fab = document.querySelector(
                    'button[title="Launch Innovation Starterkit"]'
                  ) as HTMLButtonElement;
                  fab?.click();
                }}
              >
                <Sparkles className="w-4 h-4" />
                Launch Innovation Starterkit
              </Button>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-medium">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Give your idea a catchy title"
                  className="mt-2"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Summary *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Briefly describe your idea in one paragraph"
                  className="mt-2 min-h-[100px]"
                  required
                />
              </div>

              {/* Problem */}
              <div>
                <Label htmlFor="problem" className="text-base font-medium">
                  Problem Statement *
                </Label>
                <Textarea
                  id="problem"
                  value={formData.problem}
                  onChange={(e) => handleChange("problem", e.target.value)}
                  placeholder="What problem does your idea solve? What is the current pain point?"
                  className="mt-2 min-h-[120px]"
                  required
                />
              </div>

              {/* Solution */}
              <div>
                <Label htmlFor="solution" className="text-base font-medium">
                  Proposed Solution *
                </Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => handleChange("solution", e.target.value)}
                  placeholder="Describe your solution and how it addresses the problem"
                  className="mt-2 min-h-[120px]"
                  required
                />
              </div>

              {/* Impact */}
              <div>
                <Label htmlFor="impact" className="text-base font-medium">
                  Expected Impact *
                </Label>
                <Textarea
                  id="impact"
                  value={formData.impact}
                  onChange={(e) => handleChange("impact", e.target.value)}
                  placeholder="What impact will your idea have? Include quantifiable benefits if possible"
                  className="mt-2 min-h-[100px]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Category *
                </Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="mt-2 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Digital Solutions">Digital Solutions</option>
                  <option value="Products & Services">
                    Products & Services
                  </option>
                  <option value="Processes">Processes</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Customer Experience">
                    Customer Experience
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t">
                <Button variant="outline" type="button">
                  Save as Draft
                </Button>
                <Button type="button" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Submit Idea
                </Button>
              </div>
            </form>
          </Card>

          {/* Help Card */}
          <Card className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Need help developing your idea?
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Click the floating button in the bottom-right corner to launch
                  the Innovation Starterkit. Our AI-powered wizard will guide you
                  through:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Defining your challenge and target audience</li>
                  <li>• Analyzing market size and competition</li>
                  <li>• Generating and evaluating ideas</li>
                  <li>• Financial analysis and ROI calculation</li>
                  <li>• Creating a professional pitch deck</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Floating Action Button */}
      <InnovationStarterkitFAB />
    </div>
  );
}
