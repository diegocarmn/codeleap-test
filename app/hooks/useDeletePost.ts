import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../lib/api/posts";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
