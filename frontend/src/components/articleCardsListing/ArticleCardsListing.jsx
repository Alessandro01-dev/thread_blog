import { Container, Row, Col, Spinner } from "react-bootstrap"
import SingleArticleCard from "./singleArticleCard/SingleArticleCard"
import useBlogPosts from "../../hooks/useBlogPosts"
import { useEffect, useState } from "react"
import CardsListingPagination from "./cardsListingPagination/CardsListingPagination"
import { Toaster } from "react-hot-toast"

const ArticleCardsListing = () => {

  const { getBlogPosts, blogPostsData, blogPostsIsLoading } = useBlogPosts()

  const [page, setPage] = useState(1)

  const [pageSize, setPageSize] = useState(4)

  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    setIsPageLoading(true)

    try {
      getBlogPosts(page, pageSize)
    } catch (error) {
      console.log(error)
    } finally {
      setIsPageLoading(false)
    }

    window.scrollTo(0, 0)
  }, [page, pageSize])

  const firstCurrentPagePostNumber = (page - 1) * pageSize + 1
  const lastCurrentPagePostNumber = Math.min(page * pageSize, blogPostsData.totalBlogPosts)

  return (
    <>
      <Container
        className="py-5"
      >
        <Row>
          <Col>
            <p
              className="text-secondary small"
            >
              page {page} of {blogPostsData.totalPages} ({firstCurrentPagePostNumber} - {lastCurrentPagePostNumber} articles of {blogPostsData.totalBlogPosts} total results)
            </p>
          </Col>
        </Row>
        <Row
          className="g-3"
        >
          {blogPostsIsLoading && <Spinner className="m-auto mt-5" />}
          {!isPageLoading && !blogPostsIsLoading && blogPostsData.blogPosts?.map(blogPost => (
            <SingleArticleCard
              key={blogPost._id}
              title={blogPost.title}
              coverImg={blogPost.cover}
              author={`${blogPost.author.name} ${blogPost.author.surname}`}
              authorAvatar={`${blogPost.author.avatar}`}
              blogPostId={blogPost._id}
            />
          ))}
        </Row>
        <Row>
          <Col>
            <CardsListingPagination
              page={page}
              setPage={setPage}
              totalPages={blogPostsData.totalPages}
            />
          </Col>
        </Row>
      </Container>
      <Toaster />
    </>
  )
}

export default ArticleCardsListing