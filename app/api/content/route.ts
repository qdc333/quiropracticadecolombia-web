import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { getSiteContent, saveSiteContent } from "@/lib/cms/repository";
import type { SiteContent } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    const saved = await saveSiteContent(body);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "No se pudo guardar el contenido" }, { status: 400 });
  }
}
