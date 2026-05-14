import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, location, message } = body;

    if (!name || !email || !projectType || !location || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log to stdout — in production this would forward to Resend / a CRM.
    // Owner can plug in their email provider via env var.
    // eslint-disable-next-line no-console
    console.log("[contact] inquiry received", {
      name,
      email,
      phone,
      projectType,
      location,
      message: String(message).slice(0, 800),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
