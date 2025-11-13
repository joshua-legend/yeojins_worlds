import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentSection({
  showComments,
  comments,
  commentContent,
  onContentChange,
  onSubmit,
  isLoading,
  currentNickname,
}) {
  if (!showComments) return null;

  return (
    <div className="mt-4 space-y-4">
      <CommentForm
        commentContent={commentContent}
        onContentChange={onContentChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
        currentNickname={currentNickname}
      />
      <CommentList comments={comments} />
    </div>
  );
}

