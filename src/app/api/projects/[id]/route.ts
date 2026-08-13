import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB, hasMongoUri } from "@/lib/db";
import { ProjectModel } from "@/lib/models";
import { getSiteContent } from "@/lib/content";

async function normalizePayload(
  body: Record<string, unknown>,
  status: "draft" | "published"
) {
  const images = (body.images ?? {}) as { pc?: string; mobile?: string };
  const links = (body.links ?? {}) as { demo?: string; github?: string };
  const name = String(body.name ?? "").trim();
  const content = await getSiteContent();
  const allowed = content.projectCategories;
  const rawCategory = String(body.category ?? "").trim();
  const category =
    allowed.includes(rawCategory) || rawCategory
      ? rawCategory || allowed[0] || "Full Stack"
      : allowed[0] || "Full Stack";

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
    order: Number(body.order ?? 0),
    status,
  };
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    if (!hasMongoUri()) {
      return NextResponse.json({ error: "MONGODB_URI is not configured" }, { status: 503 });
    }

    await connectDB();
    const { id } = await context.params;
    const body = (await req.json()) as Record<string, unknown>;
    const status = body.status === "draft" ? "draft" : "published";
    const payload = await normalizePayload(body, status);

    const project = await ProjectModel.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ project });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    const statusCode = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    if (!hasMongoUri()) {
      return NextResponse.json({ error: "MONGODB_URI is not configured" }, { status: 503 });
    }

    await connectDB();
    const { id } = await context.params;
    const project = await ProjectModel.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    const statusCode = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
