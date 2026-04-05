import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import useBlogPosts from "../../hooks/useBlogPosts"
import { useEffect } from "react"
import './DetailsArticle.css'
import DetailsArticleInfoCard from "./detailsArticleInfoCard/DetailsArticleInfoCard"
import CommentArea from "./commentArea/CommentArea"

const DetailsArticle = () => {

  const { blogPostId } = useParams()

  const { getBlogPostById, blogPostsData, blogPostsIsLoading } = useBlogPosts()

  useEffect(() => {
    getBlogPostById(blogPostId)
  }, [blogPostId])

  return (
    <Container
      className="py-5 text-center"
    >
      <Row>
        <Col>
          {blogPostsIsLoading && <Spinner />}
          {blogPostsData?.blogPost && (
            <>
              <h1
                className="my-5"
              >{blogPostsData.blogPost.title}</h1>
              <img
                className="w-100 d-block object-fit-cover"
                src={blogPostsData.blogPost.cover} alt="cover article image"
              />
              <DetailsArticleInfoCard
                blogPost={blogPostsData.blogPost}
              />
              <CommentArea />
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: `${blogPostsData.blogPost.content}` }}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default DetailsArticle