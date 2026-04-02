"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import { UserSignUpRequest } from "@/types/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserSignUpRequest>({
    email: "",
    password: "",
    nickname: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/signup", formData);
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          회원가입
        </h1>
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
          <input
            type="text"
            placeholder="닉네임"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.nickname}
            onChange={(e) =>
              setFormData({ ...formData, nickname: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
          >
            가입하기
          </button>
        </form>
      </div>
    </main>
  );
}
