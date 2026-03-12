"use client";

import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { useDeletePost } from "../../hooks/useDeletePost";

type DeletePostModalProps = {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function DeletePostModal({
  postId,
  isOpen,
  onClose,
}: DeletePostModalProps) {
  const { mutate, isPending } = useDeletePost();

  function handleDelete() {
    mutate(postId, { onSuccess: onClose });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large" backdrop={true}>
      <h2 className="text-heading pb-10">
        Are you sure you want to delete this item?
      </h2>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}
