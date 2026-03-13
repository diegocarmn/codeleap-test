"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Animate from "./Animate";

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
    medium: "m-2 md:w-125 md:m-0 md:max-w-[90%]",
    large: "m-2 w-full md:w-[660px] md:m-0 md:max-w-[90%]",
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
      <Animate variant="scale" className={`modal p-6 ${sizes[size]}`}>
        <form
          role="dialog"
          aria-modal="true"
          onSubmit={(e) => e.preventDefault()}
        >
          {children}
        </form>
      </Animate>
    </div>,
    document.body,
  );
}
