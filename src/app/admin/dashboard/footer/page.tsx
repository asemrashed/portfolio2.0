"use client";

import { Input } from "@/components/ui/input";
import { SaveBar, useContentSection } from "@/components/admin/AdminFormUtils";
import type { SiteSettings } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/data";

export default function FooterAdminPage() {
  const { data, setData, loading, saving, message, save } =
    useContentSection<SiteSettings>("settings", DEFAULT_SETTINGS);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-saira font-bold text-primary">Footer</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Footer text</label>
          <Input
            value={data.footerText}
            onChange={(e) => setData({ ...data, footerText: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.showSocialInFooter}
            onChange={(e) =>
              setData({ ...data, showSocialInFooter: e.target.checked })
            }
          />
          Show social icons
        </label>
      </div>
      <SaveBar saving={saving} message={message} onSave={save} />
    </div>
  );
}
