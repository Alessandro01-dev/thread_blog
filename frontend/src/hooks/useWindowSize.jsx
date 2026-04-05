import { useEffect, useState } from "react"

export const useWindowSize = () => {

  const [size, setSize] = useState(null)

  useEffect(() => {
    let timeout

    const handleResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setSize(window.innerWidth)
      }, 200)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    size
  }
}