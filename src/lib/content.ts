import {
  DEFAULT_SITE_CONTENT,
  PROJECTS,
} from "@/lib/data";
import { DEFAULT_HOME_SECTIONS, DEFAULT_PROJECT_CATEGORIES } from "@/lib/types";
import type { Project, SiteContent } from "@/lib/types";
import { connectDB, hasMongoUri } from "@/lib/db";
import { ProjectModel, SiteContentModel } from "@/lib/models";

/** Convert mongoose/BSON values (ObjectId, etc.) into plain JSON-safe objects */
function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Migrate legacy string[] paragraphs into a single HTML body */
export function resolveAboutBody(
  about: { body?: string; paragraphs?: string[] } | undefined,
  fallback: string
): string {
  const body = about?.body?.trim();
  if (body && body !== "<p></p>") return about!.body!;
  if (about?.paragraphs?.length) {
    return about.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  }
  return fallback;
}

function serializeProject(doc: Record<string, unknown>): Project {
  const plain = toPlain(doc) as Record<string, unknown>;
  const images = (plain.images ?? {}) as { pc?: string; mobile?: string };
  const links = (plain.links ?? {}) as { demo?: string; github?: string };

  return {
    _id: String(plain._id ?? ""),
    name: String(plain.name ?? ""),
    images: {
      pc: String(images.pc ?? ""),
      mobile: String(images.mobile ?? ""),
    },
    description: String(plain.description ?? ""),
    category: String(plain.category ?? "Full Stack"),
    tags: (plain.tags as string[]) ?? [],
    features: (plain.features as string[]) ?? [],
    links: {
      demo: String(links.demo ?? ""),
      github: String(links.github ?? ""),
    },
    featured: Boolean(plain.featured),
    showInHomepage: Boolean(plain.showInHomepage),
    homeOrder: Number(plain.homeOrder ?? 0),
    order: Number(plain.order ?? 0),
    status: plain.status === "draft" ? "draft" : "published",
  };
}

function mergeHomeLayout(
  raw: SiteContent["homeLayout"] | undefined
): SiteContent["homeLayout"] {
  if (!raw?.sections?.length) {
    return { sections: DEFAULT_HOME_SECTIONS };
  }

  const byKey = new Map(raw.sections.map((s) => [s.key, s]));
  const merged = DEFAULT_HOME_SECTIONS.map((def) => {
    const existing = byKey.get(def.key);
    return existing
      ? {
          key: def.key,
          label: existing.label || def.label,
          enabled: existing.enabled !== false,
        }
      : def;
  });

  const orderedKeys = raw.sections.map((s) => s.key);
  const ordered = orderedKeys
    .map((key) => merged.find((s) => s.key === key))
    .filter(Boolean) as SiteContent["homeLayout"]["sections"];
  const missing = merged.filter((s) => !orderedKeys.includes(s.key));
  return { sections: [...ordered, ...missing] };
}

function mergeProjectCategories(raw: unknown): string[] {
  if (Array.isArray(raw) && raw.length) {
    const cleaned = raw
      .map((c) => String(c ?? "").trim())
      .filter(Boolean);
    if (cleaned.length) return [...new Set(cleaned)];
  }
  return [...DEFAULT_PROJECT_CATEGORIES];
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!hasMongoUri()) {
    return DEFAULT_SITE_CONTENT;
  }

  try {
    await connectDB();
    const doc = await SiteContentModel.findOne({ key: "main" }).lean();
    if (!doc) {
      return DEFAULT_SITE_CONTENT;
    }

    const plain = toPlain(doc) as Record<string, unknown>;
    const about = (plain.about ?? {}) as SiteContent["about"] & {
      education?: Array<Record<string, string>>;
      courses?: Array<Record<string, string>>;
      offerings?: Array<Record<string, string>>;
      socialLinks?: Array<{ platform?: string; url?: string }>;
      paragraphs?: string[];
      body?: string;
      aboutImage?: string;
    };
    const skillsRaw = plain.skills as
      | Array<{ category?: string; items?: Array<{ name?: string; icon?: string }> }>
      | undefined;

    return {
      settings: {
        ...DEFAULT_SITE_CONTENT.settings,
        ...((plain.settings as object) ?? {}),
      },
      hero: { ...DEFAULT_SITE_CONTENT.hero, ...((plain.hero as object) ?? {}) },
      about: {
        ...DEFAULT_SITE_CONTENT.about,
        ...about,
        education: about.education?.length
          ? about.education.map((item) => ({
              title: item.title ?? "",
              institution: item.institution ?? "",
              period: item.period,
              description: item.description,
            }))
          : DEFAULT_SITE_CONTENT.about.education,
        courses: about.courses?.length
          ? about.courses.map((item) => ({
              title: item.title ?? "",
              provider: item.provider ?? "",
              period: item.period,
              description: item.description,
            }))
          : DEFAULT_SITE_CONTENT.about.courses,
        offerings: about.offerings?.length
          ? about.offerings.map((item) => ({
              title: item.title ?? "",
              description: item.description ?? "",
              icon: item.icon,
            }))
          : DEFAULT_SITE_CONTENT.about.offerings,
        socialLinks: Array.isArray(about.socialLinks)
          ? about.socialLinks
              .map((item) => ({
                platform: String(item.platform ?? "").trim(),
                url: String(item.url ?? "").trim(),
              }))
              .filter((item) => item.platform && item.url)
          : DEFAULT_SITE_CONTENT.about.socialLinks,
        body: resolveAboutBody(about, DEFAULT_SITE_CONTENT.about.body),
        aboutImage: about.aboutImage || DEFAULT_SITE_CONTENT.about.aboutImage,
      },
      skills:
        Array.isArray(skillsRaw) && skillsRaw.length
          ? skillsRaw.map((cat) => ({
              category: cat.category ?? "",
              items: (cat.items ?? []).map((item) => ({
                name: item.name ?? "",
                icon: item.icon ?? "",
              })),
            }))
          : DEFAULT_SITE_CONTENT.skills,
      contact: {
        ...DEFAULT_SITE_CONTENT.contact,
        ...((plain.contact as object) ?? {}),
      },
      cta: { ...DEFAULT_SITE_CONTENT.cta, ...((plain.cta as object) ?? {}) },
      homeLayout: mergeHomeLayout(plain.homeLayout as SiteContent["homeLayout"]),
      projectCategories: mergeProjectCategories(plain.projectCategories),
    };
  } catch (error) {
    console.error("Failed to load site content:", error);
    return DEFAULT_SITE_CONTENT;
  }
}

export async function getProjects(options?: {
  includeDrafts?: boolean;
}): Promise<Project[]> {
  if (!hasMongoUri()) {
    return PROJECTS.map((p) => ({ ...p, status: "published" as const }));
  }

  try {
    await connectDB();
    const docs = options?.includeDrafts
      ? await ProjectModel.find().sort({ order: 1, createdAt: 1 }).lean()
      : await ProjectModel.find({ status: { $ne: "draft" as const } })
          .sort({ order: 1, createdAt: 1 })
          .lean();
    if (!docs.length) {
      return PROJECTS.map((p) => ({ ...p, status: "published" as const }));
    }
    return docs.map((doc) => serializeProject(doc as Record<string, unknown>));
  } catch (error) {
    console.error("Failed to load projects:", error);
    return PROJECTS.map((p) => ({ ...p, status: "published" as const }));
  }
}

export async function getHomepageProjects(): Promise<Project[]> {
  const projects = await getProjects({ includeDrafts: false });
  const selected = projects
    .filter((p) => p.showInHomepage && p.status !== "draft")
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

  if (selected.length) return selected;

  return projects.filter((p) => p.featured).slice(0, 6);
}

export async function ensureSeeded() {
  if (!hasMongoUri()) return { seeded: false, reason: "no-uri" as const };

  await connectDB();
  const existing = await SiteContentModel.findOne({ key: "main" });
  if (!existing) {
    await SiteContentModel.create({
      key: "main",
      ...DEFAULT_SITE_CONTENT,
    });
  } else if (!existing.homeLayout?.sections?.length) {
    await SiteContentModel.updateOne(
      { key: "main" },
      { $set: { homeLayout: DEFAULT_SITE_CONTENT.homeLayout } }
    );
  }

  if (
    !Array.isArray(existing?.projectCategories) ||
    existing.projectCategories.length === 0
  ) {
    await SiteContentModel.updateOne(
      { key: "main" },
      { $set: { projectCategories: DEFAULT_SITE_CONTENT.projectCategories } }
    );
  }

  const projectCount = await ProjectModel.countDocuments();
  if (projectCount === 0) {
    let homeIdx = 0;
    await ProjectModel.insertMany(
      PROJECTS.map((p, index) => ({
        ...p,
        order: p.order ?? index,
        showInHomepage: Boolean(p.showInHomepage),
        homeOrder: p.showInHomepage ? homeIdx++ : 0,
      }))
    );
  } else {
    const missingHomepage = await ProjectModel.countDocuments({
      showInHomepage: { $exists: false },
    });
    if (missingHomepage > 0) {
      const featured = await ProjectModel.find({ featured: true }).sort({ order: 1 });
      await Promise.all(
        featured.map((doc, index) =>
          ProjectModel.findByIdAndUpdate(doc._id, {
            showInHomepage: true,
            homeOrder: index,
          })
        )
      );
      await ProjectModel.updateMany(
        { showInHomepage: { $exists: false } },
        { $set: { showInHomepage: false, homeOrder: 0 } }
      );
    }
  }

  return { seeded: true };
}
