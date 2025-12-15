"use client";

import { logoutAction } from "@/app/actions/auth";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { setUser } = useAuth();
  const router = useRouter();

  async function logout() {
    await logoutAction();
    setUser(null);
    router.push("/login");
  }

  return (
    <button onClick={logout} className="p-2 bg-red-500 text-white">
      Logout
    </button>
  );
}
