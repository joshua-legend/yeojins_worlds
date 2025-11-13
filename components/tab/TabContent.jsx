"use client";

import { useTabStore } from "@/store/useTabStore";
import FeedList from "@/components/feed/FeedList";
import PostCreateForm from "@/components/feed/create/PostCreateForm";

export default function TabContent() {
  const activeTab = useTabStore((state) => state.activeTab);
  return (
    <div className="min-h-[calc(100vh-200px)]">
      {activeTab === "feed" && <FeedList />}
      {activeTab === "create" && <PostCreateForm />}
    </div>
  );
}

