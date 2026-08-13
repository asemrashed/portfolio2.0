import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { ensureSeeded } from "@/lib/content";

export async function POST() {
  try {
    await requireAdmin();
    const result = await ensureSeeded();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(req: NextRequest) {
  // Allow seed via secret query for first-time setup
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await ensureSeeded();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
