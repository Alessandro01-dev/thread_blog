import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./SingleArticleCard.css"

const SingleArticleCard = ({ title, coverImg, author, authorAvatar, blogPostId }) => {

  return (

    <Col
      xs={12}
      sm={6}
      lg={4}
      xl={3}
    >
      <Card
        className='article-card-main-container text-decoration-none h-100'
        as={Link}
        to={`/detailsArticlePage/${blogPostId}`}
      >
        <Card.Img
          variant="top"
          src={coverImg}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <div
            className='d-flex align-items-center gap-3'
          >
            <div
              className='article-author-avatar-container'
            >
              <img
                className='w-100 object-fit-cover'
                src={authorAvatar}
                alt="article author avatar"
              />
            </div>
            <div
              className='d-flex flex-column'
            >
              <div>
                by
              </div>
              <h6
                className='m-0'
              >{author}
              </h6>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Col>

  )

}

export default SingleArticleCard