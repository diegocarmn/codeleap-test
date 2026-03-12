"use client";

import { useEffect, useState } from "react";
import UsernameModal from "./features/auth/UsernameModal";

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

      {username && <main>
        <p>Welcome, {username}!</p>
        </main>}
    </>
  );
}
