"use client";

import { useNicknameStore } from "@/store/useNicknameStore";

export default function NicknameDisplay() {
  const { currentNickname, removeNickname } = useNicknameStore();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          👤 별명: <span className="font-semibold text-gray-900 dark:text-white">{currentNickname}</span>
        </span>
        <button
          onClick={removeNickname}
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          🔄 변경
        </button>
      </div>
    </div>
  );
}

