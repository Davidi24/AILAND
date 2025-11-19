// src/app/api/auth/register/route.ts
"use server";
import { cookies } from "next/headers";
import { registerUser } from "@/lib/api/auth";

export async function registerAction(
  name: string,
  email: string,
  password: string
) {
  const data = await registerUser({ name, email, password });

  (await cookies()).set("auth_token", data.token, {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  (await cookies()).set("user", JSON.stringify(data.user), {
    httpOnly: false,
    path: "/",
  });

  return data.user;
}
