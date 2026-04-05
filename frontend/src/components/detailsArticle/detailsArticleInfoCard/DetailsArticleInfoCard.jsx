import { Button } from 'react-bootstrap'
import './DetailsArticleInfoCard.css'
import { Dot } from 'lucide-react'
import { parseISO } from 'date-fns'

const DetailsArticleInfoCard = ({ blogPost }) => {

  const formatDate = (isoString) => {
    const date = parseISO(isoString)
    return date.toString().slice(0, 15)
  }

  return (
    <div
      className="d-flex flex-column flex-sm-row justify-content-start align-items-start align-items-sm-center gap-5 gap-sm-2 my-5"
    >
      <div
        className="d-flex justify-content-between align-items-center gap-2"
      >
        <div
          className="blog-post-author-avatar-container"
        >
          <img
            className="w-100 object-fit-cover d-block"
            src={blogPost.author.avatar}
            alt="blog post author avatar" />
        </div>
        <p
          className="m-0 small"
        >
          {blogPost.author.name} {blogPost.author.surname}
        </p>
      </div>
      <div
        className='d-flex justify-content-between align-items-center'
      >
        <p
          className='m-0 small text-secondary'
        >
          {blogPost.readTime.value} {blogPost.readTime.unit.slice(0, 3)}
          {" "}
          read
        </p>
        <Dot
          size={18}
          className='text-secondary'
        />
        <p
          className='m-0 small text-secondary'
        >
          {formatDate(blogPost.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default DetailsArticleInfoCard