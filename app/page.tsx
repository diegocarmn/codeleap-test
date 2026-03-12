"use client";

import { useEffect, useState } from "react";
import UsernameModal from "./features/auth/UsernameModal";
import CreatePostForm from "./features/posts/CreatePostForm";

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
        <main className="max-w-200 mx-auto bg-white h-screen">
          
          <h1 className="text-heading text-white bg-primary px-9.25 py-6.75">
            CodeLeap Network
          </h1>

          <section className="m-2 sm:m-6">
            <CreatePostForm username={username} />
          </section>
        </main>
      )}
    </>
  );
}
