"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SaveBar, useContentSection } from "@/components/admin/AdminFormUtils";
import type { CtaContent } from "@/lib/types";
import { DEFAULT_CTA } from "@/lib/data";

export default function CtaAdminPage() {
  const { data, setData, loading, saving, message, save } =
    useContentSection<CtaContent>("cta", DEFAULT_CTA);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-saira font-bold text-primary">Home CTA</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Body</label>
          <Textarea
            value={data.body}
            onChange={(e) => setData({ ...data, body: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Button label</label>
          <Input
            value={data.buttonLabel}
            onChange={(e) => setData({ ...data, buttonLabel: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Button link</label>
          <Input
            value={data.buttonHref}
            onChange={(e) => setData({ ...data, buttonHref: e.target.value })}
          />
        </div>
      </div>
      <SaveBar saving={saving} message={message} onSave={save} />
    </div>
  );
}
