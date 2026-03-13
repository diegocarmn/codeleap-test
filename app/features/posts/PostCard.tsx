"use client";

import { useState } from "react";
import type { Post } from "../../types/post";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import IconButton from "@/app/components/IconButton";
import Animate from "@/app/components/Animate";

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
  const [expanded, setExpanded] = useState(false);

  const isOwner = post.username === username;

  return (
    <>
      <Animate variant="fadeUp">
        <article className="rounded-2xl overflow-hidden border border-darkgray">
          <header className="bg-primary text-white px-6 py-5 flex items-center justify-between">
            <h2 className="text-heading truncate">{post.title}</h2>

            {isOwner && (
              <div className="flex gap-1 md:gap-4 shrink-0">
                <IconButton
                  icon={
                    <img
                      src="/ic_baseline-delete-forever.svg"
                      alt="Delete"
                      height={30}
                    />
                  }
                  className="cursor-pointer"
                  onClick={() => setIsDeleteOpen(true)}
                  title="Delete post"
                  aria-label="Delete post"
                />

                <IconButton
                  icon={<img src="/bx_bx-edit.svg" alt="Edit" height={30} />}
                  className="cursor-pointer"
                  onClick={() => setIsEditOpen(true)}
                  title="Edit post"
                  aria-label="Edit post"
                />
              </div>
            )}
          </header>

          <div className="px-6 py-5">
            <div className="flex justify-between mb-4">
              <span className="text-post-username truncate text-darkgray">
                @{post.username}
              </span>
              <span className="text-post-datetime ml-4 whitespace-nowrap">
                {getTimeAgo(post.created_datetime)}
              </span>
            </div>

            <p
              className={`text-content whitespace-pre-line wrap-break-word leading-5`}
            >
              {post.content}
            </p>
          </div>
        </article>
      </Animate>

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
