"use client";

import * as React from "react";
import { X, Target, Calendar, Users, Zap, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CampaignContext {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  focusAreas?: string[];
  participants?: number;
}

type CampaignMode = "campaign" | "normal" | null;

interface CampaignContextPromptProps {
  campaign: CampaignContext;
  onModeSelect: (mode: "campaign" | "normal") => void;
  className?: string;
}

export function CampaignContextPrompt({
  campaign,
  onModeSelect,
  className,
}: CampaignContextPromptProps) {
  const daysLeft = campaign.deadline
    ? Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl shadow-2xl", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Campaign Detected
            </h2>
            <p className="text-sm text-muted-foreground">
              You're submitting to <span className="font-medium text-primary">{campaign.title}</span>
            </p>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="flex items-center gap-3 mb-5 text-sm text-muted-foreground">
          {daysLeft !== null && daysLeft > 0 && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {daysLeft} days left
            </span>
          )}
          {campaign.participants && (
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {campaign.participants} participants
            </span>
          )}
        </div>

        {/* Focus Areas */}
        {campaign.focusAreas && campaign.focusAreas.length > 0 && (
          <div className="mb-5">
            <span className="text-xs font-medium text-muted-foreground">Campaign Focus Areas:</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {campaign.focusAreas.map((area, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Mode Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            How would you like the AI to assist you?
          </p>

          <div className="grid gap-3">
            {/* Campaign-aware mode */}
            <button
              onClick={() => onModeSelect("campaign")}
              className="group flex items-start gap-4 p-4 rounded-xl border-2 border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all text-left"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    Campaign-Tailored AI Assistance
                  </span>
                  <Badge variant="default" className="text-[10px]">Recommended</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  AI suggestions will be tailored to the campaign's focus areas and goals.
                  Get ideas that align with <span className="text-primary font-medium">{campaign.title}</span>.
                </p>
              </div>
            </button>

            {/* Normal mode */}
            <button
              onClick={() => onModeSelect("normal")}
              className="group flex items-start gap-4 p-4 rounded-xl border border-border hover:border-muted-foreground/30 hover:bg-muted/50 transition-all text-left"
            >
              <div className="p-2 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors">
                <Lightbulb className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-foreground">
                  Standard AI Assistance
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Use AI without campaign context. Get general innovation guidance
                  without campaign-specific suggestions.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact banner shown after mode is selected
interface CampaignContextBannerProps {
  campaign: CampaignContext;
  mode: "campaign" | "normal";
  onDismiss?: () => void;
  onChangeMode?: () => void;
  className?: string;
}

export function CampaignContextBanner({
  campaign,
  mode,
  onDismiss,
  onChangeMode,
  className,
}: CampaignContextBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const daysLeft = campaign.deadline
    ? Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b",
        mode === "campaign"
          ? "bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20"
          : "bg-muted/50 border-border",
        className
      )}
    >
      <div className="relative px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={cn(
            "flex-shrink-0 p-1.5 rounded-lg",
            mode === "campaign" ? "bg-primary/10" : "bg-muted"
          )}>
            {mode === "campaign" ? (
              <Zap className="h-4 w-4 text-primary" />
            ) : (
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">
              {campaign.title}
            </span>
            <Badge
              variant={mode === "campaign" ? "default" : "secondary"}
              className="text-[10px]"
            >
              {mode === "campaign" ? "Campaign Mode" : "Standard Mode"}
            </Badge>
            {mode === "campaign" && campaign.focusAreas && campaign.focusAreas.length > 0 && (
              <span className="text-xs text-muted-foreground hidden sm:inline">
                AI tailored to: {campaign.focusAreas.slice(0, 2).join(", ")}
                {campaign.focusAreas.length > 2 && "..."}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {onChangeMode && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={onChangeMode}
              >
                Change
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to get campaign context from URL params
export function useCampaignContext(): CampaignContext | null {
  const [campaign, setCampaign] = React.useState<CampaignContext | null>(null);

  React.useEffect(() => {
    // Check URL params for campaign ID
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get("campaign");

    if (campaignId) {
      // In real app, fetch from API. For prototype, use mock data
      const mockCampaigns: Record<string, CampaignContext> = {
        "1": {
          id: "1",
          title: "THINK. PITCH. WIN.",
          description: "Innovation competition with exciting rewards",
          deadline: "2026-03-31",
          focusAreas: ["Digital Innovation", "Process Improvement", "Customer Experience", "Sustainability"],
          participants: 245,
        },
        "2": {
          id: "2",
          title: "Sustainable Solutions 2026",
          description: "Environmental innovation for a greener future",
          deadline: "2026-04-15",
          focusAreas: ["Sustainability", "Carbon Reduction", "Green Energy"],
          participants: 189,
        },
      };

      setCampaign(mockCampaigns[campaignId] || null);
    }
  }, []);

  return campaign;
}

// Hook to manage campaign mode selection
export function useCampaignMode(campaign: CampaignContext | null) {
  const [mode, setMode] = React.useState<CampaignMode>(null);
  const [showPrompt, setShowPrompt] = React.useState(false);

  React.useEffect(() => {
    if (campaign) {
      setShowPrompt(true);
      setMode(null);
    }
  }, [campaign]);

  const selectMode = (selectedMode: "campaign" | "normal") => {
    setMode(selectedMode);
    setShowPrompt(false);
  };

  const changeMode = () => {
    setShowPrompt(true);
  };

  return {
    mode,
    showPrompt,
    selectMode,
    changeMode,
    isCampaignMode: mode === "campaign",
    isNormalMode: mode === "normal",
  };
}
