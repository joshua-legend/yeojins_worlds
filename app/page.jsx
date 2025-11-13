"use client";

import { useEffect } from "react";
import Header from "@/components/common/Header";
import NicknameSetup from "@/components/user/NicknameSetup";
import TabBar from "@/components/tab/TabBar";
import TabContent from "@/components/tab/TabContent";
import MainLayout from "@/components/layout/MainLayout";
import MusicPlayer from "@/components/common/MusicPlayer";
import { usePostStore } from "@/store/usePostStore";

export default function Home() {
  const { fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <Header />
      <NicknameSetup />
      <TabContent />
      <MusicPlayer />
      <TabBar />
    </MainLayout>
  );
}
