import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB, hasMongoUri } from "@/lib/db";
import { ProjectModel } from "@/lib/models";

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    if (!hasMongoUri()) {
      return NextResponse.json({ error: "MONGODB_URI is not configured" }, { status: 503 });
    }

    await connectDB();
    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];

    await Promise.all(
      items.map(
        (item: {
          id: string;
          showInHomepage?: boolean;
          homeOrder?: number;
          order?: number;
        }) =>
          ProjectModel.findByIdAndUpdate(item.id, {
            ...(typeof item.showInHomepage === "boolean"
              ? { showInHomepage: item.showInHomepage }
              : {}),
            ...(typeof item.homeOrder === "number" ? { homeOrder: item.homeOrder } : {}),
            ...(typeof item.order === "number" ? { order: item.order } : {}),
          })
      )
    );

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reorder failed:", error);
    const message = error instanceof Error ? error.message : "Reorder failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
