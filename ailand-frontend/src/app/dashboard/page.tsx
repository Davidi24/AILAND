import Image from "next/image";

import LogoutButton from "@/components/common/LogoutButton";
import { AuthProvider } from "@/context/useAuth";

export default function Home() {

  return (
    <div className="flex flex-1   p-1 pt-0">
      <AuthProvider>
  <LogoutButton />
      </AuthProvider>
      
      <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
