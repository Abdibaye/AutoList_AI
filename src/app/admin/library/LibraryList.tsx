import React from "react";
import LibraryCard from "./LibraryCard";
import type { LibraryItem } from "./LibraryCard";

interface LibraryListProps {
  data: LibraryItem[];
  onView: (item: LibraryItem) => void;
}

export default function LibraryList({ data, onView }: LibraryListProps) {
  if (!data.length) return <div className="text-center text-muted-foreground py-12">No results found.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <LibraryCard key={item.id} item={item} onView={onView} />
      ))}
    </div>
  );
} 