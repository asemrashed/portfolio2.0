"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageField,
  SaveBar,
  useContentSection,
} from "@/components/admin/AdminFormUtils";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SocialLinksEditor from "@/components/admin/SocialLinksEditor";
import type { AboutContent } from "@/lib/types";
import { DEFAULT_ABOUT } from "@/lib/data";

export default function AboutAdminPage() {
  const { data, setData, loading, saving, message, save } =
    useContentSection<AboutContent>("about", DEFAULT_ABOUT);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-saira font-bold text-primary">About</h1>

      <ImageField
        label="About image"
        value={data.aboutImage}
        onChange={(aboutImage) => setData({ ...data, aboutImage })}
      />

      <RichTextEditor
        label="About content"
        value={data.body || ""}
        onChange={(body) => setData({ ...data, body })}
        placeholder="Write your about section…"
      />

      <SocialLinksEditor
        links={data.socialLinks || []}
        onChange={(socialLinks) => setData({ ...data, socialLinks })}
      />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Offerings</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData({
                ...data,
                offerings: [
                  ...data.offerings,
                  { title: "", description: "", icon: "BookOpen" },
                ],
              })
            }
          >
            Add offering
          </Button>
        </div>
        {data.offerings.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) => {
                const offerings = [...data.offerings];
                offerings[index] = { ...item, title: e.target.value };
                setData({ ...data, offerings });
              }}
            />
            <Textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => {
                const offerings = [...data.offerings];
                offerings[index] = { ...item, description: e.target.value };
                setData({ ...data, offerings });
              }}
            />
            <Input
              placeholder="Icon (BookOpen, Building2, Hospital, ShoppingBag)"
              value={item.icon || ""}
              onChange={(e) => {
                const offerings = [...data.offerings];
                offerings[index] = { ...item, icon: e.target.value };
                setData({ ...data, offerings });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setData({
                  ...data,
                  offerings: data.offerings.filter((_, i) => i !== index),
                })
              }
            >
              Remove
            </Button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Education</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData({
                ...data,
                education: [
                  ...data.education,
                  { title: "", institution: "", period: "", description: "" },
                ],
              })
            }
          >
            Add
          </Button>
        </div>
        {data.education.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 grid gap-2">
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) => {
                const education = [...data.education];
                education[index] = { ...item, title: e.target.value };
                setData({ ...data, education });
              }}
            />
            <Input
              placeholder="Institution"
              value={item.institution}
              onChange={(e) => {
                const education = [...data.education];
                education[index] = { ...item, institution: e.target.value };
                setData({ ...data, education });
              }}
            />
            <Input
              placeholder="Period"
              value={item.period || ""}
              onChange={(e) => {
                const education = [...data.education];
                education[index] = { ...item, period: e.target.value };
                setData({ ...data, education });
              }}
            />
            <Textarea
              placeholder="Description"
              value={item.description || ""}
              onChange={(e) => {
                const education = [...data.education];
                education[index] = { ...item, description: e.target.value };
                setData({ ...data, education });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setData({
                  ...data,
                  education: data.education.filter((_, i) => i !== index),
                })
              }
            >
              Remove
            </Button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Courses</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData({
                ...data,
                courses: [
                  ...data.courses,
                  { title: "", provider: "", period: "", description: "" },
                ],
              })
            }
          >
            Add
          </Button>
        </div>
        {data.courses.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 grid gap-2">
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) => {
                const courses = [...data.courses];
                courses[index] = { ...item, title: e.target.value };
                setData({ ...data, courses });
              }}
            />
            <Input
              placeholder="Provider"
              value={item.provider}
              onChange={(e) => {
                const courses = [...data.courses];
                courses[index] = { ...item, provider: e.target.value };
                setData({ ...data, courses });
              }}
            />
            <Input
              placeholder="Period"
              value={item.period || ""}
              onChange={(e) => {
                const courses = [...data.courses];
                courses[index] = { ...item, period: e.target.value };
                setData({ ...data, courses });
              }}
            />
            <Textarea
              placeholder="Description"
              value={item.description || ""}
              onChange={(e) => {
                const courses = [...data.courses];
                courses[index] = { ...item, description: e.target.value };
                setData({ ...data, courses });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setData({
                  ...data,
                  courses: data.courses.filter((_, i) => i !== index),
                })
              }
            >
              Remove
            </Button>
          </div>
        ))}
      </section>

      <SaveBar saving={saving} message={message} onSave={save} />
    </div>
  );
}
