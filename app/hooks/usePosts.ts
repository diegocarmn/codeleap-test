import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../lib/api/posts";
import type { Post } from "../types/post";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    select: (data: Post[]) =>
      data.sort(
        (a, b) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime(),
      ),
  });
}
