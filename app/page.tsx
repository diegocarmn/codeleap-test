"use client";

import { useEffect, useState } from "react";
import UsernameModal from "./features/auth/UsernameModal";
import CreatePostForm from "./features/posts/CreatePostForm";
import PostList from "./features/posts/PostList";

export default function Page() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("username");

    if (saved) {
      setUsername(saved);
    }
  }, []);

  function handleUsernameSubmit(name: string) {
    localStorage.setItem("username", name);
    setUsername(name);
  }

  return (
    <>
      <UsernameModal isOpen={!username} onSubmit={handleUsernameSubmit} />

      {username && (
        <main className="max-w-200 mx-auto bg-white min-h-screen">
          <h1 className="text-heading text-white bg-primary px-9.25 py-6.75">
            CodeLeap Network
          </h1>

          <section className="p-2 sm:p-6 flex flex-col gap-6 pb-6">
            <CreatePostForm username={username} />
            <PostList username={username} />
          </section>
        </main>
      )}
    </>
  );
}
