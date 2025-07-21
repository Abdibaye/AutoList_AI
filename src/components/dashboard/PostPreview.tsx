import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Copy, Eye } from "lucide-react";

interface PostPreviewProps {
  title: string;
  content: string;
  onCopy: () => void;
  onView: () => void;
  className?: string;
}

export function PostPreview({ title, content, onCopy, onView, className }: PostPreviewProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="font-semibold text-base truncate">{title}</div>
        <div className="text-sm text-muted-foreground line-clamp-2">{content}</div>
        <div className="flex gap-2 mt-2">
          <Tooltip>
            <Button size="sm" variant="ghost" onClick={onCopy}><Copy className="size-4 mr-1" />Copy</Button>
          </Tooltip>
          <Tooltip>
            <Button size="sm" variant="outline" onClick={onView}><Eye className="size-4 mr-1" />View Full</Button>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
} 