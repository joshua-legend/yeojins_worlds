"use client";

import { useNicknameStore } from "@/store/useNicknameStore";
import { usePostStore } from "@/store/usePostStore";
import PostCreateEmptyState from "./PostCreateEmptyState";
import PostCreateHeader from "./PostCreateHeader";
import PostTextarea from "./PostTextarea";
import PostSubmitButton from "./PostSubmitButton";

export default function PostCreateForm() {
  const currentNickname = useNicknameStore((state) => state.currentNickname);
  const { postContent, isLoading, createPost, setPostContent } = usePostStore();

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    await createPost(currentNickname);
  };

  if (!currentNickname) {
    return <PostCreateEmptyState />;
  }

  return (
    <div className="space-y-4">
      <PostCreateHeader />
      <form onSubmit={handleSubmitPost} className="space-y-4">
        <PostTextarea value={postContent} onChange={(e) => setPostContent(e.target.value)} disabled={isLoading} />
        <PostSubmitButton isLoading={isLoading} disabled={!postContent.trim() || isLoading} />
      </form>
    </div>
  );
}
