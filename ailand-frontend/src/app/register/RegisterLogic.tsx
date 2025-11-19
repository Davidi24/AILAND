"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/useAuth";
import { registerAction } from "../api/auth/register/route";
import { RegisterForm } from "@/components/ui/forms/RegisterForm";

export default function RegisterLogic() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    try {
      const user = await registerAction(name, email, password);
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed");
    }
  }

  function clearError() {
    setError("");
  }

  return (
    <RegisterForm onSubmit={handleSubmit} error={error} clearError={clearError} />
  );
}
