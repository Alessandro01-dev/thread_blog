import { useState } from 'react'

const useAuthors = () => {
  const [authorsIsLoading, setAuthorsIsLoading] = useState(false)
  const [authorsData, setAuthorsData] = useState([])
  const [authorsError, setAuthorsError] = useState(null)

  const clearAuthorsError = () => setAuthorsError(null)

  const URL = import.meta.env.VITE_BASE_SERVER_URL
  const getAuthors = async () => {
    setAuthorsError(null)
    setAuthorsIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${URL}/authors`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setAuthorsData(data)
      return data
    } catch (error) {
      setAuthorsError(error.message)
    } finally {
      setAuthorsIsLoading(false)
    }
  }

  const createAuthor = async (newAuthor) => {
    setAuthorsError(null)
    setAuthorsIsLoading(true)
    try {
      const response = await fetch(`${URL}/authors`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newAuthor)
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setAuthorsData(prevData => [...prevData, data])
      return { success: true, data }
    } catch (error) {
      setAuthorsError(error.message)
    } finally {
      setAuthorsIsLoading(false)
    }
  }

  return {
    authorsIsLoading,
    authorsData,
    authorsError,
    getAuthors,
    createAuthor,
    clearAuthorsError
  }
}

export default useAuthors