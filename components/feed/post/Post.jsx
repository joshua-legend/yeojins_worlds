"use client";

import { useState, useEffect } from "react";
import { useNicknameStore } from "@/store/useNicknameStore";
import { fetchComments as fetchCommentsApi, createComment } from "@/api/commentApi";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import CommentButton from "../comment/CommentButton";
import CommentSection from "../comment/CommentSection";

export default function Post({ post }) {
  const currentNickname = useNicknameStore((state) => state.currentNickname);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(post?.commentCount ?? 0);
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // 컴포넌트 마운트 시 댓글 개수 가져오기
  useEffect(() => {
    const loadCommentCount = async () => {
      if (!post?.id) return;
      // 서버에서 commentCount가 제공되지 않은 경우에만 API 호출
      if (post.commentCount === undefined) {
        const result = await fetchCommentsApi(post.id);
        if (result.success && Array.isArray(result.data)) {
          setCommentCount(result.data.length);
        }
      }
    };
    loadCommentCount();
  }, [post?.id, post?.commentCount]);

  // 댓글 불러오기
  const handleFetchComments = async () => {
    if (!post?.id) return;
    const result = await fetchCommentsApi(post.id);
    if (result.success) {
      const fetchedComments = Array.isArray(result.data) ? result.data : [];
      setComments(fetchedComments);
      setCommentCount(fetchedComments.length);
    }
  };

  // 댓글 작성
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !currentNickname || !post?.id) return;

    setIsLoading(true);
    const result = await createComment(post.id, currentNickname, commentContent);
    if (result.success) {
      // 서버 응답에 필수 필드가 없는 경우 클라이언트 데이터로 보완
      const commentWithData = {
        ...result.data,
        author: result.data.author || currentNickname,
        content: result.data.content || commentContent,
        createdAt: result.data.createdAt || new Date().toISOString(),
      };
      setComments([...comments, commentWithData]);
      setCommentCount((prev) => prev + 1);
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

  // author의 첫 글자를 안전하게 가져오기
  const getAuthorInitial = () => {
    if (post?.author && typeof post.author === "string" && post.author.length > 0) {
      return post.author.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex gap-3">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">{getAuthorInitial()}</div>
        </div>
        <div className="flex-1 min-w-0">
          <PostHeader author={post?.author || "익명"} createdAt={post?.createdAt} />
          <PostContent content={post?.content || ""} />
          <CommentButton commentCount={commentCount} onClick={handleToggleComments} />
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
