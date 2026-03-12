"use client";

import { useEffect, useState } from "react";
import UsernameModal from "./features/auth/UsernameModal";
import CreatePostForm from "./features/posts/CreatePostForm";
import PostList from "./features/posts/PostList";
import IconButton from "./components/IconButton";

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
          
          <header className="text-heading text-white bg-primary px-9 py-6">
            CodeLeap Network
            <IconButton
              icon={
                <img
                  src="/logout.svg"
                  alt="Logout"
                  height={30}
                  width={30}
                />
              }
              className="cursor-pointer float-right"
              onClick={() => {
                localStorage.removeItem("username");
                setUsername(null);
              }}
              title="Logout"
              aria-label="Logout"
            />
          </header>

          <section className="p-2 sm:p-6 flex flex-col gap-6 pb-6">
            <CreatePostForm username={username} />
            <PostList username={username} />
          </section>
        </main>
      )}
    </>
  );
}
