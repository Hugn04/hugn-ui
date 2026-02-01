import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  return NextResponse.json({ token }, { status: 200 });
}
