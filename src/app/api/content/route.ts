import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB, hasMongoUri } from "@/lib/db";
import { SiteContentModel } from "@/lib/models";
import { getSiteContent, ensureSeeded } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

const ALLOWED_SECTIONS = [
  "settings",
  "hero",
  "about",
  "skills",
  "contact",
  "cta",
  "homeLayout",
  "projectCategories",
] as const;

type Section = (typeof ALLOWED_SECTIONS)[number];

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section") as Section | null;
  const content = await getSiteContent();

  if (section && ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ [section]: content[section] });
  }

  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    if (!hasMongoUri()) {
      return NextResponse.json(
        { error: "MONGODB_URI is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const section = body.section as Section | undefined;
    const data = body.data as SiteContent[Section] | undefined;

    if (!section || !ALLOWED_SECTIONS.includes(section) || data == null) {
      return NextResponse.json({ error: "Invalid section payload" }, { status: 400 });
    }

    let payload: unknown = data;
    if (section === "projectCategories") {
      if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Categories must be an array" }, { status: 400 });
      }
      const cleaned = (data as string[])
        .map((c) => String(c ?? "").trim())
        .filter(Boolean);
      if (!cleaned.length) {
        return NextResponse.json(
          { error: "Keep at least one category" },
          { status: 400 }
        );
      }
      payload = [...new Set(cleaned)];
    }

    await connectDB();
    await ensureSeeded();

    await SiteContentModel.findOneAndUpdate(
      { key: "main" },
      { $set: { [section]: payload } },
      { returnDocument: "after", upsert: true }
    );

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/projects");
    revalidatePath("/contact");

    const content = await getSiteContent();
    return NextResponse.json({ ok: true, [section]: content[section] });
  } catch (error) {
    console.error("Content PUT failed:", error);
    const message = error instanceof Error ? error.message : "Update failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
