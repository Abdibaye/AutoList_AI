import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ActivityItemProps {
  type: string;
  platform: string;
  date: string;
  className?: string;
}

export function ActivityItem({ type, platform, date, className }: ActivityItemProps) {
  return (
    <div className={"flex flex-col gap-1 p-2 " + (className || "") }>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{type}</Badge>
        <span className="text-xs text-muted-foreground">{platform}</span>
        <span className="ml-auto text-xs text-muted-foreground">{date}</span>
      </div>
      <Separator className="my-1" />
    </div>
  );
} 