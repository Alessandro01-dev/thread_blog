import { useEffect, useState } from "react"

const useScrollDown = () => {
  const [scrollYValue, setScrollYValue] = useState(0)

  const handleScrollDown = () => {
    setScrollYValue(window.scrollY)
  }

  useEffect(() => {

    window.addEventListener('scroll', handleScrollDown)

    return () => {
      window.removeEventListener('scroll', handleScrollDown)
    }

  }, [])

  const shrinkedNavbar = scrollYValue > 100

  return shrinkedNavbar

}

export default useScrollDown