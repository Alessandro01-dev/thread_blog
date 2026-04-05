import Offcanvas from 'react-bootstrap/Offcanvas';
import { Alert, Button, Spinner } from 'react-bootstrap';
import SingleComment from '../singleComment/SingleComment';
import AddComment from '../addComment/AddComment'
import { Toaster } from 'react-hot-toast';

const CommentCanvas = ({ show, onHide, comments, totalComments, commentsIsLoading, commentsError, getComments, commentsPageSize, loadMoreCommentsHandler, onDeleteComment }) => {
  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Comments ({totalComments || 0})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>
      <Toaster />
    </>
  );
};

export default CommentCanvas