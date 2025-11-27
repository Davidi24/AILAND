"use server"
import { LoginPayload } from "@/types/authTypes";
import { LoginResponse } from "@/types/authTypes";
import { RegisterPayload } from "@/types/authTypes";
import { apiRequest } from "./request";

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const form = new URLSearchParams();
  form.append("username", payload.username);
  form.append("password", payload.password);

  const res = await apiRequest(
    "/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    },
    false
  );

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
     throw new Error(
      body?.detail?.[0]?.msg ||
      "Login failed"
    );
  }

  return body as LoginResponse;
}





export async function registerUser(payload: RegisterPayload): Promise<LoginResponse> {
  const res = await apiRequest(
    "/signup",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    false
  );
  
  const body = await res.json().catch(() => ({}));
 
  if (!res.ok) {
    throw new Error(
      body?.detail?.[0]?.msg ||
      "Registration failed"
    );

  }


  return body as LoginResponse;
}
