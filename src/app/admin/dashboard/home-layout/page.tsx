"use client";

import { SaveBar, useContentSection } from "@/components/admin/AdminFormUtils";
import DragList from "@/components/admin/DragList";
import type { HomeLayoutContent, HomeSectionItem } from "@/lib/types";
import { DEFAULT_HOME_SECTIONS } from "@/lib/types";

type DragSection = HomeSectionItem & { id: string };

export default function HomeLayoutAdminPage() {
  const { data, setData, loading, saving, message, save } =
    useContentSection<HomeLayoutContent>("homeLayout", {
      sections: DEFAULT_HOME_SECTIONS,
    });

  if (loading) return <p>Loading...</p>;

  const items: DragSection[] = (
    data.sections?.length ? data.sections : DEFAULT_HOME_SECTIONS
  ).map((section) => ({
    ...section,
    id: section.key,
  }));

  const updateSections = (next: DragSection[]) => {
    setData({
      sections: next.map(({ id: _id, ...section }) => section),
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-saira font-bold text-primary">Home layout</h1>
        <p className="text-muted-foreground mt-1">
          Drag sections to change homepage order. Toggle visibility with the checkbox.
        </p>
      </div>

      <DragList
        items={items}
        onChange={updateSections}
        renderItem={(item) => (
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.key}</p>
            </div>
            <label className="flex items-center gap-2 text-sm shrink-0">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={(e) => {
                  updateSections(
                    items.map((section) =>
                      section.key === item.key
                        ? { ...section, enabled: e.target.checked }
                        : section
                    )
                  );
                }}
              />
              Show
            </label>
          </div>
        )}
      />

      <SaveBar saving={saving} message={message} onSave={save} />
    </div>
  );
}
