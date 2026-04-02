"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { UserLoginRequest } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", formData);
      const token = response.data; // 백엔드에서 String으로 토큰 반환
      login(formData.email, token);
      alert("로그인 성공!");
      router.push("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
          >
            로그인
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:underline"
          >
            회원가입
          </button>
        </p>
      </div>
    </main>
  );
}
