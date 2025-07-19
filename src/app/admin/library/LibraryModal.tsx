import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { LibraryItem } from "./LibraryCard";

interface LibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: LibraryItem | null;
  onEdit: (item: LibraryItem) => void;
  onDelete: () => void;
}

export default function LibraryModal({ open, onOpenChange, item, onEdit, onDelete }: LibraryModalProps) {
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.header}</DialogTitle>
          <DialogDescription>{item.type} &middot; {item.status}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <div><b>Reviewer:</b> {item.reviewer}</div>
          <div><b>Target:</b> {item.target}</div>
          <div><b>Limit:</b> {item.limit}</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onEdit(item)}>Edit</Button>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 