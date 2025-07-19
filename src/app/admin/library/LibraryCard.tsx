import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Edit, Trash, Copy } from "lucide-react";

export interface LibraryItem {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

interface LibraryCardProps {
  item: LibraryItem;
  onView: (item: LibraryItem) => void;
}

export default function LibraryCard({ item, onView }: LibraryCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(item, null, 2));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{item.header}</CardTitle>
        <CardDescription>{item.type} &middot; {item.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground line-clamp-3 mb-2">Reviewer: {item.reviewer}</div>
        <div className="flex gap-2 text-xs">
          <span className="bg-accent px-2 py-0.5 rounded">Target: {item.target}</span>
          <span className="bg-accent px-2 py-0.5 rounded">Limit: {item.limit}</span>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={() => onView(item)}><Eye className="size-4" />View</Button>
        <Button size="sm" variant="ghost" onClick={handleCopy}><Copy className="size-4" />Copy</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost"><MoreVertical className="size-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(item)}><Eye className="size-4 mr-2" />View Full</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Edit coming soon") }><Edit className="size-4 mr-2" />Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Delete coming soon") } className="text-destructive"><Trash className="size-4 mr-2" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
} 