"use client";

import { useNicknameStore } from "@/store/useNicknameStore";

export default function NicknameInputForm() {
  const { nickname, setNickname, saveNickname } = useNicknameStore();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-pink-50 dark:from-blue-900/20 dark:to-pink-900/20">
      <div className="flex gap-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="💫 별명을 입력하세요"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              saveNickname();
            }
          }}
        />
        <button
          onClick={saveNickname}
          disabled={!nickname.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          💾 저장
        </button>
      </div>
    </div>
  );
}

