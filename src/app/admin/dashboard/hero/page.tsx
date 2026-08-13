"use client";

import { Input } from "@/components/ui/input";
import {
  ImageField,
  SaveBar,
  TextListEditor,
  useContentSection,
} from "@/components/admin/AdminFormUtils";
import type { HeroContent } from "@/lib/types";
import { DEFAULT_HERO } from "@/lib/data";

export default function HeroAdminPage() {
  const { data, setData, loading, saving, message, save } =
    useContentSection<HeroContent>("hero", DEFAULT_HERO);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-saira font-bold text-primary">Hero</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Greeting</label>
          <Input
            value={data.greeting}
            onChange={(e) => setData({ ...data, greeting: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Display name</label>
          <Input
            value={data.displayName}
            onChange={(e) => setData({ ...data, displayName: e.target.value })}
          />
        </div>
        <TextListEditor
          label="Rotating titles"
          values={data.titles}
          onChange={(titles) => setData({ ...data, titles })}
          placeholder="Role title"
        />
        <ImageField
          label="Hero image"
          value={data.heroImage}
          onChange={(heroImage) => setData({ ...data, heroImage })}
        />
        <ImageField
          label="Hero background image"
          value={data.heroBgImage}
          onChange={(heroBgImage) => setData({ ...data, heroBgImage })}
        />
        <div>
          <label className="text-sm font-medium">Hire CTA label</label>
          <Input
            value={data.hireCtaLabel}
            onChange={(e) => setData({ ...data, hireCtaLabel: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Hire CTA link</label>
          <Input
            value={data.hireCtaHref}
            onChange={(e) => setData({ ...data, hireCtaHref: e.target.value })}
          />
        </div>
      </div>
      <SaveBar saving={saving} message={message} onSave={save} />
    </div>
  );
}
