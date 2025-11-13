"use client";

import Post from "@/components/feed/post/Post";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";
import { usePostStore } from "@/store/usePostStore";

export default function FeedList() {
  const { posts, isLoadingPosts } = usePostStore();
  if (isLoadingPosts) return <LoadingState />;
  if (posts.length === 0) return <EmptyState />;
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id || post._id || Math.random()} post={post} />
      ))}
    </div>
  );
}
