import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

export function hashClientIp(ip: string): string {
  const salt = process.env.ADMIN_API_KEY?.trim() || "dtai-default-ip-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}

export function requireAdminAuth(request: NextRequest): NextResponse | null {
  const expectedKey = process.env.ADMIN_API_KEY?.trim();
  if (!expectedKey) {
    return NextResponse.json(
      { success: false, error: "Admin API is not configured" },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
  if (!match) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const providedBuf = Buffer.from(match[1].trim(), "utf8");
  const expectedBuf = Buffer.from(expectedKey, "utf8");

  if (
    providedBuf.length !== expectedBuf.length ||
    !timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
