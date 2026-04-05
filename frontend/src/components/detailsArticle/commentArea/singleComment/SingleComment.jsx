import { formatDistanceToNow } from 'date-fns'
import './SingleComment.css'
import { ActionIcon, Rating } from '@mantine/core';
import { useAuth } from '../../../../contexts/AuthContext';
import DeleteIcon from '../../../../assets/DeleteIcon'
import { Trash2 } from 'lucide-react';

const SingleComment = ({ comment, onDelete }) => {
  const { authData } = useAuth();

  const isOwner = authData?._id === comment.author._id || authData?.id === comment.author._id;

  const formatDate = (isoString) => {
    return formatDistanceToNow(new Date(isoString));
  }

  return (
    <div
      className="single-comment-main-container"
    >
      <div className='d-flex justify-content-between align-items-start w-100'>
        <div
          className="comment-author-profile-container"
        >
          <div
            className="comment-author-profile-picture-container"
          >
            <img
              className="w-100 object-fit-cover d-block"
              src={comment?.author.avatar} alt="comment author profile picture"
            />
          </div>
          <div
            className="d-flex flex-column"
          >
            <p
              className='m-0'
            >{comment?.author.name} {comment?.author.surname} {isOwner && '(you)'}</p>
            <p
              className='m-0 text-secondary small'
            >{comment?.createdAt && formatDate(comment.createdAt)} ago</p>
          </div>
        </div>
        <div className="mt-2">
          <Rating value={comment.rating} readOnly size="xs" color="yellow" />
        </div>
      </div>

      <p className="m-0 small mt-2">
        {comment?.content}
      </p>

      {isOwner && (
        <ActionIcon
          className='align-self-end'
          variant="subtle"
          color="red"
          onClick={() => onDelete(comment._id)}
        >
          <Trash2 size={22} strokeWidth={1.5} />
        </ActionIcon>
      )}
    </div>
  )
}

export default SingleComment