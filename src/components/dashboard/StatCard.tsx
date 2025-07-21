import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, sublabel, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2 p-4", className)}>
      <CardContent className="flex items-center gap-4 p-0">
        <span className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="size-6" />
        </span>
        <div className="flex-1">
          <div className="text-lg font-bold leading-tight">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
          {sublabel && <div className="text-xs text-muted-foreground mt-1">{sublabel}</div>}
        </div>
      </CardContent>
    </Card>
  );
} 