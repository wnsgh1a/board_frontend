"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { PostResponse, PageResponse } from "@/types/post";

export default function Home() {
  const { isLoggedIn, logout } = useAuthStore();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PageResponse<PostResponse>>(
          `/api/posts?page=${page}`,
        );
        setPosts(response.data.content);
      } catch (error) {
        console.error("게시글 로딩 실패", error);
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">게시판</h1>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/posts/write"
                className="text-blue-500 hover:underline"
              >
                글쓰기
              </Link>
              <button onClick={logout} className="text-red-500 hover:underline">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:underline">
                로그인
              </Link>
              <Link href="/signup" className="text-gray-600 hover:underline">
                회원가입
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="bg-white rounded-lg shadow">
        {posts.length > 0 ? (
          <ul className="divide-y">
            {posts.map((post) => (
              <li key={post.id} className="p-4 hover:bg-gray-50 transition">
                <Link href={`/posts/${post.id}`}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {post.title}
                    </h2>
                    <span className="text-sm text-gray-500">{post.writer}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-10 text-center text-gray-500">
            등록된 게시글이 없습니다.
          </p>
        )}
      </section>
    </main>
  );
}
