"use client"

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconCopy, IconRefresh, IconLoader } from "@tabler/icons-react";

export interface Platform {
  key: string;
  label: string;
}

interface ContentTabsProps {
  content: { [platform: string]: string } | null;
  activeTab: string;
  regenLoading: { [platform: string]: boolean };
  onTabChange: (value: string) => void;
  onCopy: (text: string) => void;
  onRegenerate: (platform: string) => void;
}

const PLATFORMS: Platform[] = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "twitter", label: "Twitter" },
  { key: "linkedin", label: "LinkedIn" },
];

export function ContentTabs({ 
  content, 
  activeTab, 
  regenLoading, 
  onTabChange, 
  onCopy, 
  onRegenerate 
}: ContentTabsProps) {
  if (!content) {
    return (
      <div className="md:w-1/2 w-full flex flex-col">
        <div className="flex flex-1 items-center justify-center text-muted-foreground text-center px-4">
          <span className="text-base">Fill out the form and generate content for your listings!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="md:w-1/2 w-full flex flex-col">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-4">
          {PLATFORMS.map((platform) => (
            <TabsTrigger key={platform.key} value={platform.key} className="capitalize">
              {platform.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {PLATFORMS.map((platform) => (
          <TabsContent key={platform.key} value={platform.key} className="space-y-4">
            <div className="bg-muted rounded-lg p-4 min-h-[120px] flex flex-col gap-4">
              <div className="whitespace-pre-line text-base font-medium text-foreground">
                {content[platform.key]}
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onCopy(content[platform.key])}
                  className="flex items-center gap-1"
                >
                  <IconCopy className="size-4" /> Copy
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRegenerate(platform.key)}
                  disabled={regenLoading[platform.key]}
                  className="flex items-center gap-1"
                >
                  {regenLoading[platform.key] ? (
                    <IconLoader className="animate-spin size-4" />
                  ) : (
                    <IconRefresh className="size-4" />
                  )}
                  Regenerate
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 