"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="닉네임"
            className="w-full p-2 border rounded"
            value={formData.nickname}
            onChange={(e) =>
              setFormData({ ...formData, nickname: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            가입하기
          </button>
        </form>
      </div>
    </main>
  );
}
