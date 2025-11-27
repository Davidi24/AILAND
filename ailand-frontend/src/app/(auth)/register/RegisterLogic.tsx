"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { RegisterForm } from "@/components/ui/forms/RegisterForm";
import { registerUser } from "@/lib/api/auth";
import { AlertDialogDemo } from "@/components/ui/alerts/AlertDialogDemo";

export default function RegisterLogic() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [error, setError] = useState("");
  const [isAlert, showAlert] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;

    const username = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    try {
      await registerUser({
        username,
        email,
        password
      });
      showAlert(true);
    } catch (err: any) {
      setError(err.message);
      console.log(err.message)
    }
  }

  function clearError() {
    setError("");
  }

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} error={error} clearError={clearError} />
      {isAlert &&
        <AlertDialogDemo
          title="Registration Successful"
          description="Your account has been created successfully. You can now log in."
          confirmText="Go to Login"
          onConfirm={() => {
            showAlert(false);
            router.push("/login");
          }}

        />
      }
    </>
  );
}
