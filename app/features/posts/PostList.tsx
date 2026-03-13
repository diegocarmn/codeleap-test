"use client";

import { useEffect, useRef } from "react";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";

type PostListProps = {
  username: string;
};

export default function PostList({ username }: PostListProps) {
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePosts();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return <p className="text-center text-gray">Loading posts...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load posts.</p>;
  if (!posts?.length)
    return <p className="text-center text-gray">No posts yet.</p>;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} username={username} />
      ))}

      {hasNextPage ? (
        <div ref={loadMoreRef} className="py-2 text-center text-gray">
          {isFetchingNextPage ? "Loading more posts..." : "Scroll to load more"}
        </div>
      ) : null}
    </div>
  );
}
