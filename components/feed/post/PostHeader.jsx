import { formatDate } from "../utils/formatDate";

export default function PostHeader({ author, createdAt }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="font-bold text-gray-900 dark:text-white">{author}</span>
      <span className="text-gray-500 dark:text-gray-400 text-sm">{formatDate(createdAt)}</span>
    </div>
  );
}

