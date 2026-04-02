"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!isLoggedIn && !token) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
}
