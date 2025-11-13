export default function CommentButton({ commentCount, onClick }) {
  return (
    <div className="mt-3 flex items-center gap-6">
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <span className="text-lg">💬</span>
        <span className="font-semibold">{commentCount}</span>
      </button>
    </div>
  );
}

