import { useState } from "react"

const useBlogPosts = () => {
  const [blogPostsIsLoading, setBlogPostsIsLoading] = useState(false)
  const [blogPostsData, setBlogPostsData] = useState([])
  const [blogPostsError, setBlogPostsError] = useState(null)

  const URL = import.meta.env.VITE_BASE_SERVER_URL

  const getBlogPosts = async (page, pageSize) => {
    setBlogPostsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/blogPosts?page=${page}&pageSize=${pageSize}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setBlogPostsData(data)
      return data
    } catch (error) {
      setBlogPostsError(error.message)
    } finally {
      setBlogPostsIsLoading(false)
    }
  }

  const getBlogPostById = async (blogPostId) => {
    setBlogPostsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/blogPosts/${blogPostId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setBlogPostsData(data)
      return data
    } catch (error) {
      setBlogPostsError(error.message)
    } finally {
      setBlogPostsIsLoading(false)
    }
  }

  const getBlogPostsByAuthorId = async (authorId) => {
    setBlogPostsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/authors${authorId}/blogPosts`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setBlogPostsData(data)
      return data
    } catch (error) {
      setBlogPostsError(error.message)
    } finally {
      setBlogPostsIsLoading(false)
    }
  }

  const getBlogPostsByTitle = async (query) => {
    setBlogPostsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/search/blogPosts?title=${query}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setBlogPostsData(data)
      return data
    } catch (error) {
      setBlogPostsError(error.message)
    } finally {
      setBlogPostsIsLoading(false)
    }
  }

  const createBlogPost = async (newPost) => {
    setBlogPostsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/blogPosts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(newPost)
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setBlogPostsData(prevData => [...prevData, data])
      return data
    } catch (error) {
      setBlogPostsError(error.message)
    } finally {
      setBlogPostsIsLoading(false)
    }
  }

  return {
    blogPostsIsLoading,
    blogPostsData,
    blogPostsError,
    getBlogPosts,
    getBlogPostById,
    getBlogPostsByAuthorId,
    getBlogPostsByTitle,
    createBlogPost
  }

}

export default useBlogPosts