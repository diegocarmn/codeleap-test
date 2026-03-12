"use client";

import { usePosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";

type PostListProps = {
  username: string;
};

export default function PostList({ username }: PostListProps) {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading)
    return <p className="text-center text-gray">Loading posts...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load posts.</p>;
  if (!posts?.length)
    return <p className="text-center text-gray">No posts yet.</p>;

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} username={username} />
      ))}
    </div>
  );
}
