"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/useAuth";
import { loginAction } from "../../actions/auth";
import { LoginForm } from "@/components/ui/forms/loginForm";


export default function LoginLogic() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const data = await loginAction(email, password)
      console.log(data)


      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  }

  function clearError() {
    setError("");
  }


  return (
    <LoginForm onSubmit={handleSubmit} error={error} clearError={clearError} />
  );
}
