"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InnovationStarterkitModal } from "./innovation-starterkit-modal";

export function InnovationStarterkitFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          title="Launch Innovation Starterkit"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>

      {/* Modal */}
      <InnovationStarterkitModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
