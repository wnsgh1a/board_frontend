"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          BOARD
        </Link>
        <nav className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                href="/posts/write"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                글쓰기
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
