"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      login("user@example.com", token);
    }
  }, [login]);

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
