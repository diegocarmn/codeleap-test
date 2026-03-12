"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  size?: "medium" | "large";
  backdrop?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "medium",
  backdrop = false,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const mouseDownOnBackdrop = useRef(false);

  const sizes = {
    medium: "w-125 max-w-[90%]",
    large: "w-[660px] max-w-[90%]",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className={`fixed inset-0 flex items-center justify-center z-50 ${backdrop ? "bg-gray/70" : ""}`}
      onMouseDown={(e) => {
        mouseDownOnBackdrop.current = e.target === backdropRef.current;
      }}
      onMouseUp={(e) => {
        if (mouseDownOnBackdrop.current && e.target === backdropRef.current) {
          onClose?.();
        }
        mouseDownOnBackdrop.current = false;
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        className={`modal p-6 ${sizes[size]}`}
        onSubmit={(e) => e.preventDefault()}
      >
        {children}
      </form>
    </div>,
    document.body,
  );
}
