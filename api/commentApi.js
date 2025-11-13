import { API_BASE_URL, API_ENDPOINTS } from "./constants";

/**
 * 특정 피드의 댓글 목록 조회
 * @param {string} feedId - 피드 ID
 * @returns {Promise<Array>} 댓글 목록
 */
export async function fetchComments(feedId) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMENTS(feedId)}`);
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
    return { success: false, error: "Failed to fetch comments" };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 댓글 작성
 * @param {string} feedId - 피드 ID
 * @param {string} author - 작성자
 * @param {string} content - 댓글 내용
 * @returns {Promise<Object>} 생성된 댓글 또는 에러 정보
 */
export async function createComment(feedId, author, content) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMENTS(feedId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        content,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
    return { success: false, error: "Failed to create comment" };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 댓글 수정
 * @param {string} commentId - 댓글 ID
 * @param {string} content - 수정할 댓글 내용
 * @returns {Promise<Object>} 수정된 댓글 또는 에러 정보
 */
export async function updateComment(commentId, content) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMENT_BY_ID(commentId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
    return { success: false, error: "Failed to update comment" };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 댓글 삭제
 * @param {string} commentId - 댓글 ID
 * @returns {Promise<Object>} 삭제 성공 여부
 */
export async function deleteComment(commentId) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMENT_BY_ID(commentId)}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { success: true };
    }
    return { success: false, error: "Failed to delete comment" };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, error: error.message };
  }
}

