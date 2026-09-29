import { NextResponse } from "next/server";
import { getExperience } from "@/lib/catalog";

export async function GET(_: Request, { params }: { params: { id: string } }) { const experience = getExperience(params.id); return experience ? NextResponse.json({ data: experience }) : NextResponse.json({ error: "Experience not found" }, { status: 404 }); }
