import { create } from "zustand";

const API_BASE_URL = "http://localhost:3000";

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
        // createdAt 기준으로 최신순 정렬 (내림차순)
        const sortedPosts = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA; // 최신이 위로
        });
        set({ posts: sortedPosts, isLoadingPosts: false });
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
        // 서버 응답에 필수 필드가 없는 경우 클라이언트 데이터로 보완
        const postWithData = {
          ...newPost,
          author: newPost.author || currentNickname,
          content: newPost.content || postContent,
          createdAt: newPost.createdAt || new Date().toISOString(),
        };
        set((state) => {
          // 새 게시글을 추가하고 최신순 정렬 유지
          const updatedPosts = [postWithData, ...state.posts].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA; // 최신이 위로
          });
          return {
            posts: updatedPosts,
            postContent: "",
            isLoading: false,
          };
        });
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
