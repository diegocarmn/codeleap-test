"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

type UsernameModalProps = {
  isOpen: boolean;
  onSubmit: (username: string) => void;
};

export default function UsernameModal({
  isOpen,
  onSubmit,
}: UsernameModalProps) {
  const [username, setUsername] = useState("");

  const isDisabled = username.trim() === "";

  function handleSubmit() {
    if (isDisabled) return;

    onSubmit(username);
  }

  return (
    <Modal isOpen={isOpen}>
      <h2 className="text-heading pb-5">Welcome to CodeLeap network!</h2>

      <label className="block text-label mb-1" htmlFor="username-input">
        Please enter your username
      </label>

      <input
        id="username-input"
        className="input-field text-input mb-4 "
        placeholder="John Doe"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="Username input field"
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isDisabled}
          aria-label="Enter the app with the provided username"
        >
          ENTER
        </Button>
      </div>
    </Modal>
  );
}

export { UsernameModal };