"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/api/axios";
import { PostResponse, PageResponse } from "@/types/post";

export default function Home() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [page] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PageResponse<PostResponse>>(
          `/api/posts?page=${page}`,
        );
        setPosts(response.data.content);
      } catch (error) {
        console.error("로딩 실패");
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">최신 게시글</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {posts.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {posts.map((post) => (
              <li key={post.id} className="hover:bg-gray-50 transition">
                <Link href={`/posts/${post.id}`} className="block p-5">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {post.title}
                    </h2>
                    <span className="text-sm text-gray-500">{post.writer}</span>
                  </div>
                  <time className="text-xs text-gray-400 mt-2 block">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-20 text-center text-gray-400">
            게시글이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
