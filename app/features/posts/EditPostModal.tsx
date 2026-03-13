"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import type { Post } from "../../types/post";

type EditPostModalProps = {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditPostModal({
  post,
  isOpen,
  onClose,
}: EditPostModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { mutate, isPending } = useUpdatePost();

  const isDisabled = title.trim() === "" || content.trim() === "";

  function handleSave() {
    if (isDisabled) return;

    mutate({ id: post.id, data: { title, content } }, { onSuccess: onClose });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large" backdrop={true}>
      <h2 className="text-heading pb-5">Edit item</h2>

      <label className="block text-label mb-1" htmlFor="edit-title">
        Title
      </label>
      <input
        id="edit-title"
        className="input-field text-input mb-4"
        value={title}
        maxLength={256}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block text-label mb-1" htmlFor="edit-content">
        Content
      </label>
      <div className="input-field mb-4 overflow-hidden p-0 focus-within:outline focus-within:outline-gray">
        <textarea
          id="edit-content"
          className="text-input resize-y min-h-20 max-h-[50vh] w-full focus:outline-none"
          value={content}
          maxLength={4096}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          variant="success"
          disabled={isDisabled || isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </Modal>
  );
}
