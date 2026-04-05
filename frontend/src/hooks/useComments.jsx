import { useState } from "react"

const useComments = () => {
  const [commentsIsLoading, setCommentsIsLoading] = useState(false)
  const [commentsData, setCommentsData] = useState([])
  const [commentsError, setCommentsError] = useState(null)

  const URL = import.meta.env.VITE_BASE_SERVER_URL

  const getComments = async (blogPostId, page, pageSize) => {
    setCommentsIsLoading(true)
    setCommentsError(null)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/blogPosts/${blogPostId}/comments?page=${page}&pageSize=${pageSize}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 404) {
          setCommentsData({ comments: [], totalComments: 0 });
        }
        throw new Error(errorResponse.message);
      }

      const data = await response.json()
      setCommentsData({
        comments: data.comments,
        totalComments: data.totalComments
      })
      return data
    } catch (error) {
      setCommentsError(error.message)
    } finally {
      setCommentsIsLoading(false)
    }
  }

  const createComment = async (blogPostId, newComment) => {
    setCommentsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/blogPosts/${blogPostId}/comments`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(newComment)
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      return data
    } catch (error) {
      setCommentsError(error.message)
    } finally {
      setCommentsIsLoading(false)
    }
  }

  const deleteComment = async (blogPostId, commentId) => {
    setCommentsIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/blogPosts/${blogPostId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setCommentsError(error.message);
    } finally {
      setCommentsIsLoading(false);
    }
  };

  return {
    commentsIsLoading,
    commentsData,
    commentsError,
    getComments,
    createComment,
    deleteComment
  }

}

export default useComments