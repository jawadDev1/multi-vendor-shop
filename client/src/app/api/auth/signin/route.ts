import { apiRequest } from "@/utils/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, remember } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 400 }
    );
  }

  const result = await apiRequest({
    endpoint: "user/login",
    body: { email, password },
  });

  let res_payload = {
    success: result?.success,
    message: result?.message,
    data: result?.data,
    verified: result?.verified,
  };

  if (!result?.success) {
    return NextResponse.json(res_payload, { status: 400 });
  }

  if (!result?.verified) {
    return NextResponse.json(res_payload, { status: 200 });
  }

  // Set HTTP-only cookie
  const response = NextResponse.json(res_payload, { status: 200 });

  const days = remember ? 7 : 1;
  const token = result?.token;
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: days * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  response.cookies.set("token_client", token, {
    httpOnly: false,
    secure: true,
    path: "/",
    maxAge: maxAge,
    sameSite: "lax",
  });

  return response;
}
