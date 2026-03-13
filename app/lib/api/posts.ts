const BASE_URL = "https://dev.codeleap.co.uk/careers/";
import type { Post, CreatePostInput, UpdatePostInput } from "../../types/post";

export type GetPostsPageResponse = {
  results: Post[];
  next: string | null;
};

export async function getPostsPage(
  url?: string,
): Promise<GetPostsPageResponse> {
  const endpoint = url ?? `${BASE_URL}?limit=5&offset=0`;
  const res = await fetch(endpoint, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return {
    results: data.results,
    next: data.next,
  };
}

export async function createPost(data: CreatePostInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  const result = await res.json();

  if (!result.id) {
    throw new Error("Failed to create post");
  }

  return result;
}

export async function updatePost(id: number, data: UpdatePostInput) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
}

export async function deletePost(id: number) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}
