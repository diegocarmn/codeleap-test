"use client";

import { useState } from "react";
import type { Post } from "../../types/post";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

type PostCardProps = {
  post: Post;
  username: string;
};

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes === 1) return "1 minute ago";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function PostCard({ post, username }: PostCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const isOwner = post.username === username;

  return (
    <>
      <article className="rounded-2xl overflow-hidden border border-darkgray">
        <header className="bg-primary text-white px-6 py-5 flex items-center justify-between">
          <h2 className="text-heading truncate">{post.title}</h2>

          {isOwner && (
            <div className="flex gap-4 ml-4 shrink-0">
              <button
                className="cursor-pointer"
                onClick={() => setIsDeleteOpen(true)}
                title="Delete post"
                aria-label="Delete post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>

              <button
                className="cursor-pointer"
                onClick={() => setIsEditOpen(true)}
                title="Edit post"
                aria-label="Edit post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          )}
        </header>

        <div className="px-6 py-5">
          <div className="flex justify-between mb-4">
            <span className="text-post-username text-darkgray">
              @{post.username}
            </span>
            <span className="text-lg text-gray">
              {getTimeAgo(post.created_datetime)}
            </span>
          </div>

          <p className="text-base whitespace-pre-line leading-5">
            {post.content}
          </p>
        </div>
      </article>

      <DeletePostModal
        postId={post.id}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />

      <EditPostModal
        post={post}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}
