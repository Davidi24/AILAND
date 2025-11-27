// src/app/login/page.tsx
import { AuthProvider } from "@/context/useAuth";
import LoginLogic from "./LoginLogic";


export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <AuthProvider>
           <LoginLogic/>
        </AuthProvider>
      </div>
    </div>
  )
}
