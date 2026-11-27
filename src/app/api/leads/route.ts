import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/server/auth";
import { getLeadRepository } from "@/lib/server/leads-repository";
import type { LeadStatus } from "@/lib/server/types";
import { VALID_LEAD_STATUSES } from "@/lib/server/validation";

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const rawStatus = searchParams.get("status")?.trim();
  const status =
    rawStatus && VALID_LEAD_STATUSES.has(rawStatus as LeadStatus)
      ? (rawStatus as LeadStatus)
      : undefined;

  const search = searchParams.get("q")?.trim() || undefined;
  const limitRaw = Number.parseInt(searchParams.get("limit") ?? "25", 10);
  const offsetRaw = Number.parseInt(searchParams.get("offset") ?? "0", 10);

  const limit = Number.isFinite(limitRaw) ? limitRaw : 25;
  const offset = Number.isFinite(offsetRaw) ? offsetRaw : 0;

  const repo = getLeadRepository();
  const result = repo.findAll({ status, search, limit, offset });

  return NextResponse.json({
    success: true,
    data: result.items,
    meta: {
      total: result.total,
      limit: result.limit,
      offset: result.offset,
      stats: result.stats,
    },
  });
}
