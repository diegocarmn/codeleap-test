"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Post } from "../../types/post";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import IconButton from "@/app/components/IconButton";
import Animate from "@/app/components/Animate";

type PostCardProps = {
  post: Post;
  username: string;
};

const COLLAPSED_CONTENT_HEIGHT = 320;

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
  const [canExpand, setCanExpand] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const isOwner = post.username === username;

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) {
      return;
    }

    const checkOverflow = () => {
      setCanExpand(contentElement.scrollHeight > COLLAPSED_CONTENT_HEIGHT);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [post.content]);

  return (
    <>
      <Animate variant="fadeUp">
        <article className="rounded-2xl overflow-hidden">
          <header className="bg-primary text-white px-6 py-5 flex items-center justify-between">
            <h2 className="text-heading truncate">{post.title}</h2>

            {isOwner && (
              <div className="flex gap-1 md:gap-4 shrink-0">
                <IconButton
                  icon={
                    <img
                      src="/delete.svg"
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

          <div className="px-6 py-5 rounded-b-2xl border-b border-x border-darkgray">
            <div className="flex justify-between mb-4">
              <span className="text-post-username truncate text-darkgray">
                @{post.username}
              </span>
              <span className="text-post-datetime ml-4 whitespace-nowrap">
                {getTimeAgo(post.created_datetime)}
              </span>
            </div>
            <div className="relative">
              <motion.div
                className="overflow-hidden"
                initial={false}
                animate={{
                  height: canExpand
                    ? expanded
                      ? "auto"
                      : COLLAPSED_CONTENT_HEIGHT
                    : "auto",
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  ref={contentRef}
                  className="text-content whitespace-pre-line wrap-break-word leading-5"
                >
                  {post.content}
                </p>
              </motion.div>

              <AnimatePresence initial={false}>
                {!expanded && canExpand ? (
                  <motion.div
                    key="post-content-fade"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                ) : null}
              </AnimatePresence>
            </div>

            {canExpand ? (
              <button
                type="button"
                className="mt-3 ml-auto block text-base md:text-lg font-bold text-primary transition-opacity hover:opacity-80 cursor-pointer"
                onClick={() =>
                  setExpanded((currentExpanded) => !currentExpanded)
                }
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            ) : null}
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
