export default function CommentForm({ commentContent, onContentChange, onSubmit, isLoading, currentNickname }) {
  if (!currentNickname) return null;

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={commentContent}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="💭 댓글을 입력하세요..."
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!commentContent.trim() || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "⏳ 작성 중..." : "💬 댓글"}
      </button>
    </form>
  );
}

