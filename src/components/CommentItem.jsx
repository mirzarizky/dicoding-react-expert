import React from 'react';
import PropTypes from 'prop-types';
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai';
import {postedAt} from '../utils/postedAt';

function CommentItem({id, content, upVotesBy, downVotesBy, owner, createdAt}) {
  return <div key={id} className="py-3">
    <div dangerouslySetInnerHTML={{__html: content}} />
    <div className="flex items-center justify-between">
      <div className="flex flex-row items-center justify-start mt-4 space-x-4 text-xl min-w-10">
        <button
          type="button"
          className="flex items-center space-x-1"
        >
          <AiOutlineLike />
          <span className="text-sm">
            {upVotesBy.length}
          </span>
        </button>
        <button
          type="button"
          className="flex items-center space-x-1"
        >
          <AiOutlineDislike />
          <span className="text-sm">
            {downVotesBy.length}
          </span>
        </button>
      </div>
      <div className="flex items-center justify-end space-x-3">
        <div className="flex items-center space-x-2 text-base">
          <img
            className="rounded-full size-6"
            src={owner.avatar}
            alt={owner.name}
          />
          <span>{owner.name}</span>
        </div>
        <span className="text-sm">
          {postedAt(createdAt)}
        </span>
      </div>
    </div>
  </div>;
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  createdAt: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
};

export default CommentItem;
