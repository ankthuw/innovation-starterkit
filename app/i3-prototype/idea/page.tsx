"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { I3Header } from "@/components/i3-prototype/i3-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Save, X, ChevronRight, FileText } from "lucide-react";
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
    setShowAutofillIndicator(true);
    setTimeout(() => setShowAutofillIndicator(false), 3000);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert("Idea saved successfully!");
  };

  return (
    <div className="min-h-screen bg-white">
      <I3Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/i3-prototype" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">New Idea</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-gray-200 px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">New Draft Idea</h1>
        </div>
      </div>

      {/* Autofill Indicator */}
      {showAutofillIndicator && (
        <div className="fixed top-24 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5">
          <Sparkles className="w-5 h-5" />
          <div>
            <div className="font-medium">Form Auto-Filled!</div>
            <div className="text-sm">Your innovation details have been added</div>
          </div>
          <button
            onClick={() => setShowAutofillIndicator(false)}
            className="ml-2 text-green-600 hover:text-green-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Form */}
      <div className="px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Helper banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  Need help developing your idea?
                </h3>
                <p className="text-sm text-blue-700 mb-2">
                  Click the Innovation Starterkit button for AI-guided idea development
                </p>
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // Open Innovation Starterkit in new tab
                  window.open("/challenge", "_blank");
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Innovation Starterkit
              </Button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Title */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Give your idea a catchy title"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Summary <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Briefly describe your idea in one paragraph"
                  className="min-h-[100px] w-full"
                  required
                />
              </div>
            </div>

            {/* Problem */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Label htmlFor="problem" className="text-sm font-medium text-gray-700">
                  Problem Statement <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Textarea
                  id="problem"
                  value={formData.problem}
                  onChange={(e) => handleChange("problem", e.target.value)}
                  placeholder="What problem does your idea solve? What is the current pain point?"
                  className="min-h-[120px] w-full"
                  required
                />
              </div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Label htmlFor="solution" className="text-sm font-medium text-gray-700">
                  Proposed Solution <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => handleChange("solution", e.target.value)}
                  placeholder="Describe your solution and how it addresses the problem"
                  className="min-h-[120px] w-full"
                  required
                />
              </div>
            </div>

            {/* Impact */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Label htmlFor="impact" className="text-sm font-medium text-gray-700">
                  Expected Impact <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9">
                <Textarea
                  id="impact"
                  value={formData.impact}
                  onChange={(e) => handleChange("impact", e.target.value)}
                  placeholder="What impact will your idea have? Include quantifiable benefits if possible"
                  className="min-h-[100px] w-full"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9">
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Digital Solutions">Digital Solutions</option>
                  <option value="Products & Services">Products & Services</option>
                  <option value="Processes">Processes</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Customer Experience">Customer Experience</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Save as Draft
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Submit Idea
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
