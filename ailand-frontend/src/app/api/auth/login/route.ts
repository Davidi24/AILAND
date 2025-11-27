"use server";

import { cookies } from "next/headers";
import { loginUser } from "@/lib/api/auth"; 

export async function loginAction(username: string, password: string) {
  console.log("username: ",username)
  const data = await loginUser({ username, password }); 

  (await
    cookies()).set("auth_token", data.access_token,{
    httpOnly: true,
    secure: false,
    path: "/",
  });

  (await
    cookies()).set("auth_token", data.refresh_token,{
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