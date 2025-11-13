import { create } from "zustand";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const usePostStore = create((set, get) => ({
  posts: [],
  postContent: "",
  isLoading: false,
  isLoadingPosts: true,

  setPostContent: (content) => set({ postContent: content }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingPosts: (loading) => set({ isLoadingPosts: loading }),

  fetchPosts: async () => {
    set({ isLoadingPosts: true });
    try {
      const response = await fetch(`${API_BASE_URL}/feeds`);
      if (response.ok) {
        const data = await response.json();
        set({ posts: data, isLoadingPosts: false });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ isLoadingPosts: false });
    }
  },

  createPost: async (currentNickname) => {
    const { postContent } = get();

    if (!postContent.trim() || !currentNickname) return false;

    set({ isLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/feeds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: currentNickname,
          content: postContent,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        set((state) => ({
          posts: [newPost, ...state.posts],
          postContent: "",
          isLoading: false,
        }));
        // 피드 작성 후 피드보기 탭으로 전환
        const { useTabStore } = await import("./useTabStore");
        useTabStore.getState().setActiveTab("feed");
        return true;
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      set({ isLoading: false });
    }
    return false;
  },
}));
