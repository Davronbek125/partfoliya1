import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/server/auth";
import { getLeadRepository } from "@/lib/server/leads-repository";
import { validateLeadPatchPayload } from "@/lib/server/validation";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  const { id } = await context.params;
  const repo = getLeadRepository();
  const lead = repo.findById(id);

  if (!lead) {
    return NextResponse.json(
      { success: false, error: "Lead not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: lead });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const validation = validateLeadPatchPayload(rawBody);
  if (!validation.ok) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: validation.status }
    );
  }

  const { id } = await context.params;
  const repo = getLeadRepository();
  const updated = repo.updateLead(id, validation.data);

  if (!updated) {
    return NextResponse.json(
      { success: false, error: "Lead not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  const { id } = await context.params;
  const repo = getLeadRepository();
  const deleted = repo.deleteById(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Lead not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: { id, deleted: true } });
}
