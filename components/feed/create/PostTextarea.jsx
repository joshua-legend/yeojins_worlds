"use client";

export default function PostTextarea({ value, onChange, disabled }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="💭 여진스에 대해 이야기해보세요..."
      rows={8}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      disabled={disabled}
    />
  );
}

