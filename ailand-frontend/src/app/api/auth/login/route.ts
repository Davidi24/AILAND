"use server";

import { cookies } from "next/headers";
import { loginUser } from "@/lib/api/auth"; 

export async function loginAction(email: string, password: string) {
  const data = await loginUser({ email, password }); 

  (await
    cookies()).set("auth_token", data.token, {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  (await
    cookies()).set("user", JSON.stringify(data.user), {
    httpOnly: false,
    path: "/",
  });

  return data.user;
}


export async function logoutAction() {
  (await cookies()).delete("auth_token");
  (await cookies()).delete("user");
}