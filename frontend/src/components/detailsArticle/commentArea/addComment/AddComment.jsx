import { FloatingLabel, Form, Button, Spinner, Alert } from 'react-bootstrap'
import './AddComment.css'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import useComments from '../../../../hooks/useComments'
import { useAuth } from '../../../../contexts/AuthContext'
import { Rating } from '@mantine/core'

const AddComment = ({ getComments, commentsPageSize }) => {
  const { blogPostId } = useParams()
  const { authData } = useAuth()
  const { createComment, commentsError, commentsIsLoading } = useComments()
  const [newComment, setNewComment] = useState({
    content: "",
    rating: 5
  })

  const handleOnChangeForm = (e) => {
    const { name, value } = e.target
    setNewComment({
      ...newComment,
      [name]: value
    })
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    if (!newComment.content.trim()) return toast.error("Please write something!");

    try {
      const newCommentData = await createComment(blogPostId, {
        ...newComment,
        author: authData?._id
      })

      if (newCommentData) {
        toast.success('Comment created successfully!')
        setNewComment({ content: "", rating: 2 })
        await getComments(blogPostId, 1, commentsPageSize)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!authData) {
    return (
      <Alert variant="info" className="text-center small">
        Please <Link to="/login">Login</Link> to leave a comment.
      </Alert>
    )
  }

  return (
    <div
      className='add-comment-main-container'
    >
      <div
        className="add-comment-author-profile-container"
      >
        <div
          className="add-comment-author-profile-picture-container"
        >
          <img
            className="w-100 object-fit-cover d-block"
            src={authData?.avatar}
            alt="profile"
          />
        </div>
        <div className="d-flex flex-column">
          <p className='m-0'>{authData?.fullName}</p>
        </div>
      </div>
      <Form
        className='d-flex flex-column'
        onSubmit={handleSubmitForm}
      >
        <div className="mb-2">
          <p className="m-0 small text-secondary">Your rating:</p>
          <Rating
            value={newComment.rating}
            onChange={(val) => setNewComment({ ...newComment, rating: val })}
          />
        </div>
        <FloatingLabel
          controlId="floatingTextarea"
          label="What are your thoughts?"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            name="content"
            value={newComment.content}
            onChange={handleOnChangeForm}
          />
        </FloatingLabel>
        {commentsError && (
          <Alert
            variant='danger'
          >
            {commentsError}
          </Alert>
        )}
        <Button
          className='align-self-end'
          variant='dark'
          type='submit'
          disabled={commentsIsLoading}
        >
          {commentsIsLoading ? (
            <Spinner
              size='sm'
            />
          ) : "Send"}
        </Button>
      </Form>
    </div>
  )
}

export default AddComment