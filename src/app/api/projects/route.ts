import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB, hasMongoUri } from "@/lib/db";
import { ProjectModel } from "@/lib/models";
import { ensureSeeded, getProjects } from "@/lib/content";
import type { ProjectCategory } from "@/lib/types";

export async function GET() {
  const projects = await getProjects({ includeDrafts: true });
  return NextResponse.json({ projects });
}

const CATEGORIES: ProjectCategory[] = ["Frontend", "Full Stack", "AI Coding"];

function normalizePayload(
  body: Record<string, unknown>,
  status: "draft" | "published"
) {
  const images = (body.images ?? {}) as { pc?: string; mobile?: string };
  const links = (body.links ?? {}) as { demo?: string; github?: string };
  const name = String(body.name ?? "").trim();
  const category = CATEGORIES.includes(body.category as ProjectCategory)
    ? (body.category as ProjectCategory)
    : "Full Stack";

  if (status === "published") {
    if (!name) throw new Error("Name is required to publish");
    if (!String(body.description ?? "").trim()) {
      throw new Error("Description is required to publish");
    }
    if (!images.pc || !images.mobile) {
      throw new Error("PC and mobile images are required to publish");
    }
  }

  return {
    name: name || "Untitled draft",
    images: {
      pc: String(images.pc ?? ""),
      mobile: String(images.mobile ?? ""),
    },
    description: String(body.description ?? ""),
    category,
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    features: Array.isArray(body.features) ? body.features.map(String) : [],
    links: {
      demo: String(links.demo ?? ""),
      github: String(links.github ?? ""),
    },
    featured: Boolean(body.featured),
    showInHomepage: status === "draft" ? false : Boolean(body.showInHomepage),
    homeOrder: Number(body.homeOrder ?? 0),
    order: typeof body.order === "number" ? body.order : undefined as number | undefined,
    status,
  };
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    if (!hasMongoUri()) {
      return NextResponse.json({ error: "MONGODB_URI is not configured" }, { status: 503 });
    }

    await ensureSeeded();
    await connectDB();

    const body = (await req.json()) as Record<string, unknown>;
    const status = body.status === "draft" ? "draft" : "published";
    const payload = normalizePayload(body, status);
    const count = await ProjectModel.countDocuments();
    const order = typeof payload.order === "number" ? payload.order : count;

    const project = await ProjectModel.create({
      name: payload.name,
      images: payload.images,
      description: payload.description,
      category: payload.category,
      tags: payload.tags,
      features: payload.features,
      links: payload.links,
      featured: payload.featured,
      showInHomepage: payload.showInHomepage,
      homeOrder: payload.homeOrder,
      order,
      status: payload.status,
    });

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Create failed";
    const statusCode = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
