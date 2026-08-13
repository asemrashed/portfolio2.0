"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SaveBar, useContentSection } from "@/components/admin/AdminFormUtils";
import type { ContactContent } from "@/lib/types";
import { DEFAULT_CONTACT } from "@/lib/data";

export default function ContactAdminPage() {
  const { data, setData, loading, saving, message, save } =
    useContentSection<ContactContent>("contact", DEFAULT_CONTACT);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-saira font-bold text-primary">Contact</h1>
      <div className="space-y-4">
        {(
          [
            ["email", "Email"],
            ["phone", "Phone"],
            ["linkedin", "LinkedIn"],
            ["github", "GitHub"],
            ["facebook", "Facebook"],
            ["formTitle", "Form title"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-medium">{label}</label>
            <Input
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
            />
          </div>
        ))}
        <div>
          <label className="text-sm font-medium">Intro text</label>
          <Textarea
            value={data.intro}
            onChange={(e) => setData({ ...data, intro: e.target.value })}
          />
        </div>
      </div>
      <SaveBar saving={saving} message={message} onSave={save} />
    </div>
  );
}
