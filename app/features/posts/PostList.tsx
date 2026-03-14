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
    return (
      <p className="flex items-center justify-center text-center text-gray">
        <img
          src="/refresh.svg"
          alt="Loading posts..."
          height={25}
          width={25}
          className="mr-2 animate-spin"
        />
        Loading posts...
      </p>
    );
  if (isError)
    return <p className="text-center text-danger">Failed to load posts.</p>;
  if (!posts?.length)
    return <p className="text-center text-gray">No posts yet.</p>;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} username={username} />
      ))}

      {hasNextPage ? (
        <div ref={loadMoreRef} className="py-2 text-center text-gray">
          {isFetchingNextPage ? (
            <img
              src="/refresh.svg"
              alt="Loading more posts..."
              height={25}
              width={25}
              className="mx-auto animate-spin"
            />
          ) : (
            "Scroll to load more"
          )}
        </div>
      ) : null}
    </div>
  );
}
