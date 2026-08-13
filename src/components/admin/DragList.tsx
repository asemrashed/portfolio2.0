"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DragListProps<T extends { id: string }> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export default function DragList<T extends { id: string }>({
  items,
  onChange,
  renderItem,
  className,
}: DragListProps<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
      return;
    }
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => {
            // Don't start drag from interactive controls
            const target = e.target as HTMLElement;
            if (target.closest("input, button, a, label, select, textarea")) {
              e.preventDefault();
              return;
            }
            setDragIndex(index);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setOverIndex(index);
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (dragIndex !== null) move(dragIndex, index);
            setDragIndex(null);
            setOverIndex(null);
          }}
          onDragEnd={() => {
            setDragIndex(null);
            setOverIndex(null);
          }}
          className={cn(
            "flex items-start gap-3 rounded-lg border bg-card/40 p-3 cursor-grab active:cursor-grabbing",
            overIndex === index && dragIndex !== index && "border-primary",
            dragIndex === index && "opacity-60"
          )}
        >
          <GripVertical className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
}
