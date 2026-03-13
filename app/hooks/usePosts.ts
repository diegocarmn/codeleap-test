import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsPage } from "../lib/api/posts";

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }: { pageParam?: string }) => getPostsPage(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    select: (data) =>
      data.pages
        .flatMap((page) => page.results)
        .sort(
          (a, b) =>
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime(),
        ),
  });
}
