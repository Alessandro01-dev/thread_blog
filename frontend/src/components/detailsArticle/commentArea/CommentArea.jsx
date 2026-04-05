import { useEffect, useState } from 'react';
import './CommentArea.css'
import { useWindowSize } from '../../../hooks/useWindowSize';
import CommentModal from './commentModal/CommentModal';
import { useParams } from 'react-router-dom';
import useComments from '../../../hooks/useComments';
import CommentCanvas from './commentCanvas/CommentCanvas';
import toast from 'react-hot-toast';
import { BookmarkPlus, MessageCircle, Share, ThumbsUp } from 'lucide-react';

const CommentArea = () => {
  const { blogPostId } = useParams();
  const { commentsData, commentsIsLoading, commentsError, getComments, deleteComment } = useComments();
  const { comments, totalComments } = commentsData;
  const [commentsPageSize, setCommentsPageSize] = useState(2);

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Do you want to delete this comment?")) {
      const result = await deleteComment(blogPostId, commentId);
      if (result) {
        toast.success("Comment deleted");
        await getComments(blogPostId, 1, commentsPageSize);
      }
    }
  };

  const loadMoreCommentsHandler = () => {
    setCommentsPageSize(commentsPageSize + 2)
  }

  useEffect(() => {
    getComments(blogPostId, 1, commentsPageSize)
  }, [blogPostId, commentsPageSize])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { size } = useWindowSize()

  return (
    <>
      <div
        className="comment-area-container d-flex align-items-center justify-content-between border-bottom border-top p-2 mb-5"
      >
        <div
          className="d-flex align-items-center justify-content-between gap-3"
        >
          <ThumbsUp size={22} strokeWidth={1.5} />
          <div
            className='d-flex align-items-center justify-content-between gap-1'
            onClick={handleShow}
          >
            <MessageCircle size={22} strokeWidth={1.5} />
            <p
              className='small m-0 text-secondary'
            >{totalComments ?? 0}
            </p>
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-between gap-3"
        >
          <BookmarkPlus size={22} strokeWidth={1.5} />
          <Share size={22} strokeWidth={1.5} />
        </div>
      </div>
      {size > 576 ? (
        <CommentCanvas
          show={show}
          onHide={handleClose}
          comments={comments}
          totalComments={totalComments}
          commentsIsLoading={commentsIsLoading}
          commentsError={commentsError}
          getComments={getComments}
          commentsPageSize={commentsPageSize}
          loadMoreCommentsHandler={loadMoreCommentsHandler}
          onDeleteComment={handleDeleteComment}
        />) : (
        <CommentModal
          show={show}
          onHide={handleClose}
          comments={comments}
          totalComments={totalComments}
          commentsIsLoading={commentsIsLoading}
          commentsError={commentsError}
          getComments={getComments}
          commentsPageSize={commentsPageSize}
          loadMoreCommentsHandler={loadMoreCommentsHandler}
          onDeleteComment={handleDeleteComment}
        />
      )}
    </>
  )
}

export default CommentArea