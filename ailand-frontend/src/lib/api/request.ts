"use server"
import { cookies } from "next/headers";

const BASE_URL = "http://localhost:8000";

export async function apiRequest(
  url: string,
  options: RequestInit = {},
  withCookies: boolean = true
) {

  const finalUrl = url.startsWith("http")
    ? url
    : BASE_URL + url;

  let token: string | undefined = undefined;

  if (withCookies) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("auth_token")?.value;
    } catch {
//do smth
    }
  }
  
  return fetch(finalUrl, {
    ...options,
    credentials: "omit",      
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}
