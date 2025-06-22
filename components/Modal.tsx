// components/Modal.tsx

"use client";

import React from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-theme/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-theme rounded-2xl shadow-xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          {/* &times; */}
          <FiX size={22} className="text-theme" />
        </button>
        {children}
      </div>
    </div>
  );
}
