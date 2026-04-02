"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/api/axios";
import AuthGuard from "@/components/AuthGuard";

export default function PostFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit"); // 수정 시 ?edit=id 형태로 접근

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (editId) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/posts/${editId}`);
          setFormData({
            title: response.data.title,
            content: response.data.content,
          });
        } catch (error) {
          alert("기존 글을 불러오지 못했습니다.");
        }
      };
      fetchPost();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        // 수정 로직 (PostUpdateRequest 사용)
        await axios.put(`/api/posts/${editId}`, formData);
        alert("수정되었습니다.");
      } else {
        // 작성 로직 (PostCreateRequest 사용)
        await axios.post("/api/posts", formData);
        alert("등록되었습니다.");
      }
      router.push(editId ? `/posts/${editId}` : "/");
      router.refresh();
    } catch (error: any) {
      alert(error.response?.data?.message || "요청 실패");
    }
  };

  return (
    <AuthGuard>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          {editId ? "게시글 수정" : "새 게시글 작성"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              rows={15}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="내용을 입력하세요"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editId ? "수정 완료" : "등록 완료"}
            </button>
          </div>
        </form>
      </main>
    </AuthGuard>
  );
}
