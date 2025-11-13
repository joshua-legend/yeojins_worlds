"use client";

import { useTabStore } from "@/store/useTabStore";
import TabButton from "@/components/tab/tab-button/TabButton";

export default function TabBar() {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black z-20">
      <div className="max-w-2xl mx-auto border-x border-t border-gray-200 dark:border-gray-800 flex">
        <TabButton tab="feed" activeTab={activeTab} icon="📰" label="피드보기" onClick={() => setActiveTab("feed")} />
        <TabButton tab="create" activeTab={activeTab} icon="✏️" label="피드 작성" onClick={() => setActiveTab("create")} />
      </div>
    </div>
  );
}
