"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DragList from "@/components/admin/DragList";
import type { AboutSocialLink } from "@/lib/types";
import {
  SOCIAL_PLATFORMS,
  SocialPlatformIcon,
  getSocialPlatform,
  type AboutSocialPlatform,
} from "@/lib/socialPlatforms";
import { cn } from "@/lib/utils";

interface SocialLinksEditorProps {
  links: AboutSocialLink[];
  onChange: (links: AboutSocialLink[]) => void;
}

type DragItem = AboutSocialLink & { id: string };

export default function SocialLinksEditor({
  links,
  onChange,
}: SocialLinksEditorProps) {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [platform, setPlatform] = useState<AboutSocialPlatform | "">("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const usedPlatforms = new Set(links.map((l) => l.platform));

  const dragItems: DragItem[] = useMemo(
    () =>
      links.map((link, index) => ({
        ...link,
        id: `${link.platform}-${index}`,
      })),
    [links]
  );

  const openAdd = () => {
    setEditIndex(null);
    setPlatform("");
    setUrl("");
    setError("");
    setOpen(true);
  };

  const openEdit = (index: number) => {
    const item = links[index];
    setEditIndex(index);
    setPlatform(item.platform as AboutSocialPlatform);
    setUrl(item.url);
    setError("");
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setEditIndex(null);
    setPlatform("");
    setUrl("");
    setError("");
  };

  const saveLink = () => {
    if (!platform) {
      setError("Select a platform");
      return;
    }
    const trimmed = url.trim();
    if (!trimmed) {
      setError("URL is required");
      return;
    }
    if (editIndex === null && links.some((l) => l.platform === platform)) {
      setError("That platform is already added");
      return;
    }
    if (
      editIndex !== null &&
      links.some((l, i) => i !== editIndex && l.platform === platform)
    ) {
      setError("That platform is already added");
      return;
    }

    const next = [...links];
    const entry = { platform, url: trimmed };
    if (editIndex === null) next.push(entry);
    else next[editIndex] = entry;
    onChange(next);
    close();
  };

  const remove = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const selectedMeta = platform ? getSocialPlatform(platform) : undefined;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Social & freelance links</h2>
          <p className="text-sm text-muted-foreground">
            Drag to reorder. Shown in a column under the About photo.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={openAdd}>
          Add link
        </Button>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground border rounded-lg p-4">
          No links yet. Click &quot;Add link&quot; to choose a platform.
        </p>
      ) : (
        <DragList
          items={dragItems}
          onChange={(ordered) =>
            onChange(ordered.map(({ platform: p, url: u }) => ({ platform: p, url: u })))
          }
          renderItem={(item) => {
            const index = links.findIndex(
              (l, i) => `${l.platform}-${i}` === item.id
            );
            const meta = getSocialPlatform(item.platform);
            return (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {meta && (
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border"
                      style={{ color: meta.color, borderColor: meta.color }}
                    >
                      <SocialPlatformIcon
                        platform={item.platform as AboutSocialPlatform}
                      />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium">{meta?.label || item.platform}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.url}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(index >= 0 ? index : 0)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => remove(index >= 0 ? index : 0)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          }}
        />
      )}

      <Dialog open={open} onOpenChange={(v) => (!v ? close() : setOpen(true))}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editIndex === null ? "Add link" : "Edit link"}
            </DialogTitle>
            <DialogDescription>
              Choose a platform icon, then paste the profile URL.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-medium mb-2">Platform</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SOCIAL_PLATFORMS.map((p) => {
                  const taken =
                    usedPlatforms.has(p.id) &&
                    !(editIndex !== null && links[editIndex]?.platform === p.id);
                  const active = platform === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      disabled={taken}
                      onClick={() => {
                        setPlatform(p.id);
                        setError("");
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-xs font-medium transition-colors",
                        taken && "opacity-40 cursor-not-allowed",
                        active
                          ? "border-current bg-muted"
                          : "border-border hover:border-muted-foreground/40"
                      )}
                      style={
                        active ? { color: p.color, borderColor: p.color } : undefined
                      }
                    >
                      <SocialPlatformIcon platform={p.id} className="h-5 w-5" />
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">URL</label>
              <Input
                className="mt-1"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder={selectedMeta?.placeholder || "https://…"}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button type="button" onClick={saveLink}>
              {editIndex === null ? "Add link" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
