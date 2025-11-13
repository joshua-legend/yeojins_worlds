import { formatDate } from "../utils/formatDate";

export default function CommentItem({ comment }) {
  // 안전하게 author 및 이니셜 처리
  const author = comment.author && typeof comment.author === "string" && comment.author.trim().length > 0 ? comment.author : "익명";
  const initial = author.charAt(0).toUpperCase();

  return (
    <div className="flex gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">{initial}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900 dark:text-white">{author}</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap wrap-break-word">{comment.content}</p>
      </div>
    </div>
  );
}
