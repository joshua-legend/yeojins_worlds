import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
        <span className="text-lg">💭</span> 아직 댓글이 없습니다.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

