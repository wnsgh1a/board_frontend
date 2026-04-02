"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { PostResponse } from "@/types/post";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, userEmail } = useAuthStore();
  const [post, setPost] = useState<PostResponse | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<PostResponse>(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error: any) {
        alert(error.response?.data?.message || "게시글을 불러오지 못했습니다.");
        router.push("/");
      }
    };
    fetchPost();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      alert("삭제되었습니다.");
      router.push("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "삭제 실패");
    }
  };

  if (!post) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <article className="bg-white p-8 rounded-lg shadow-md mb-8">
        <header className="border-bottom pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
            <span>작성자: {post.writer}</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </header>

        <div className="text-gray-800 leading-relaxed min-h-[200px] whitespace-pre-wrap">
          {post.content}
        </div>

        {isLoggedIn && post.writer === userEmail && (
          <div className="flex justify-end gap-2 mt-8">
            <button
              onClick={() => router.push(`/posts/write?edit=${id}`)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
            >
              삭제
            </button>
          </div>
        )}
      </article>

      <section className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          댓글 ({post.comments.length})
        </h3>
        <ul className="space-y-4 mb-6">
          {post.comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-white p-4 rounded shadow-sm border border-gray-100"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">{comment.writer}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{comment.content}</p>
            </li>
          ))}
        </ul>

        {isLoggedIn ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="댓글을 입력하세요..."
              rows={3}
            />
            <button className="self-end px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              댓글 등록
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4 border-t">
            댓글을 작성하려면 로그인이 필요합니다.
          </p>
        )}
      </section>
    </main>
  );
}
