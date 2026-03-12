import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../lib/api/posts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
