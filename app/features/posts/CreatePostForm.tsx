"use client";

import { useState } from "react";
import Button from "../../components/Button";
import { useCreatePost } from "../../hooks/useCreatePost";

type CreatePostFormProps = {
  username: string;
};

export default function CreatePostForm({ username }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, isPending } = useCreatePost();

  const isDisabled = title.trim() === "" || content.trim() === "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isDisabled) return;

    mutate(
      { username, title, content },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        },
      },
    );
  }

  return (
    <form className="p-6 border border-darkgray rounded-2xl" onSubmit={handleSubmit}>
       
      <h2 className="text-heading pb-5">What's on your mind?</h2>

      <label className="block text-label mb-1" htmlFor="post-title">
        Title
      </label>

      <input
        id="post-title"
        className="input-field text-input mb-4"
        placeholder="Hello world"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block text-label mb-1" htmlFor="post-content">
        Content
      </label>

      <textarea
        id="post-content"
        className="input-field text-input mb-4 resize-none h-20"
        placeholder="Content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-end">
        <Button 
        type="submit"
        disabled={isDisabled || isPending}
        aria-label="Create a new post with the provided title and content"
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
}
