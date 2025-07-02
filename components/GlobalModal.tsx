// components/GlobalModal.tsx
"use client";
import { useModalStore } from "@/store/useModalStore";
import { FiX } from "react-icons/fi";

export default function GlobalModal() {
  const { isOpen, content, closeModal } = useModalStore();

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className=" bg-[#fcfcfc] dark:bg-[#1C1D22] z-[9999] p-6 rounded-xl shadow-xl max-w-lg w-full relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-500 text-theme hover:text-black"
        >
          <FiX size={22} className="text-theme" />
        </button>
        {content}
      </div>
    </div>
  );
}
