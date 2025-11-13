export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  FEEDS: "/feeds",
  FEED_BY_ID: (feedId) => `/feeds/${feedId}`,
  COMMENTS: (feedId) => `/feeds/${feedId}/comments`,
  COMMENT_BY_ID: (commentId) => `/comments/${commentId}`,
};
