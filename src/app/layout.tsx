"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Header";
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
      <body className="min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
