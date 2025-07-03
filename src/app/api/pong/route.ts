import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await axios.get(`${process.env.NEXT_PUBLIC_SSO_URL}/api/ping`);

  const authHeader = request.headers.get("authorization"); // header tên thường là "authorization"

  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
    if (token === "e852254c-9413-45b7-a81b-ffc24b35b9d0") {
      return NextResponse.json(true, {
        status: 200,
      });
    }
  }

  return NextResponse.json(false, { status: 200 });
}
