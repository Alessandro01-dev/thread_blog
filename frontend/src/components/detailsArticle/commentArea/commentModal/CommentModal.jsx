import { Modal, Spinner, Alert, Button } from "react-bootstrap"
import './CommentModal.css'
import SingleComment from "../singleComment/SingleComment"
import AddComment from "../addComment/AddComment"
import { Toaster } from "react-hot-toast"

const CommentModal = ({ show, onHide, comments, totalComments, commentsIsLoading, commentsError, getComments, commentsPageSize, loadMoreCommentsHandler, onDeleteComment }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="comment-modal"
        contentClassName="comment-modal-content"
      >
        <Modal.Header
          className="border-0"
          closeButton
        >
          <Modal.Title id="example-custom-modal-styling-title">
            Comments ({totalComments ?? 0})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddComment
            getComments={getComments}
            commentsPageSize={commentsPageSize}
          />

          {comments?.length === 0 && commentsIsLoading && (
            <Spinner className='d-block mx-auto mt-5' />
          )}

          {comments?.length === 0 && !commentsIsLoading && (
            <Alert className='text-center mt-3' variant='warning'>
              This article has no comments yet
            </Alert>
          )}

          {comments && comments.map(comment => (
            <SingleComment
              key={comment._id}
              comment={comment}
              onDelete={onDeleteComment}
            />
          ))}

          {comments?.length > 0 && commentsIsLoading && (
            <Spinner className='d-block mx-auto mt-3' />
          )}

          {totalComments > (comments?.length || 0) && (
            <Button
              className='d-block mt-3 mx-auto rounded-pill'
              size='sm'
              variant='dark'
              onClick={loadMoreCommentsHandler}
            >
              Load more
            </Button>
          )}
        </Modal.Body>
      </Modal>
      <Toaster />
    </>
  )
}

export default CommentModal