"use client";

import { useState } from "react";
import { useNicknameStore } from "@/store/useNicknameStore";
import { fetchComments as fetchCommentsApi, createComment } from "@/api/commentApi";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import CommentButton from "../comment/CommentButton";
import CommentSection from "../comment/CommentSection";

export default function Post({ post }) {
  const currentNickname = useNicknameStore((state) => state.currentNickname);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // 댓글 불러오기
  const handleFetchComments = async () => {
    const result = await fetchCommentsApi(post.id);
    if (result.success) {
      setComments(result.data);
    }
  };

  // 댓글 작성
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !currentNickname) return;

    setIsLoading(true);
    const result = await createComment(post.id, currentNickname, commentContent);
    if (result.success) {
      setComments([...comments, result.data]);
      setCommentContent("");
    }
    setIsLoading(false);
  };

  const handleToggleComments = () => {
    if (!showComments) {
      handleFetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex gap-3">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">{post.author.charAt(0).toUpperCase()}</div>
        </div>
        <div className="flex-1 min-w-0">
          <PostHeader author={post.author} createdAt={post.createdAt} />
          <PostContent content={post.content} />
          <CommentButton commentCount={comments.length} onClick={handleToggleComments} />
          <CommentSection
            showComments={showComments}
            comments={comments}
            commentContent={commentContent}
            onContentChange={setCommentContent}
            onSubmit={handleSubmitComment}
            isLoading={isLoading}
            currentNickname={currentNickname}
          />
        </div>
      </div>
    </div>
  );
}
