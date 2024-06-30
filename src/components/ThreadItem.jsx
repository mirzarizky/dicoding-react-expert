import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import {postedAt} from '../utils/postedAt';

function ThreadItem({
  title,
  id,
  body,
  category,
  createdAt,
  user,
  totalComments,
  downVotesBy,
  upVotesBy,
}) {
  return (
    <div className="px-2 py-4 bg-white rounded-sm even:bg-gray-50">
      <div className="flex space-x-3">
        <div className="flex flex-col items-end justify-center space-y-2 text-xl min-w-10">
          <Link to={`/thread/${id}`} className="flex items-center space-x-1">
            <AiOutlineComment />
            <span className="text-sm">{totalComments}</span>
          </Link>
          <div className="flex items-center space-x-1">
            <AiOutlineLike />
            <span className="text-sm">{upVotesBy.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <AiOutlineDislike />
            <span className="text-sm">{downVotesBy.length}</span>
          </div>
        </div>
        <div>
          <Link to={`/thread/${id}`}>
            <h3 className="mb-1 text-lg font-bold text-gray-700 hover:text-gray-900">
              {title}
            </h3>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="px-2 py-1 text-sm text-gray-600 bg-white border rounded">
              #{category}
            </span>
            <span className="font-medium">{user?.name}</span>
            <span>{postedAt(createdAt)}</span>
          </div>
          <div
            className="mt-2 text-gray-600 transition hover:text-gray-900 line-clamp-1"
            dangerouslySetInnerHTML={{__html: body}}
          />
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export {threadItemShape};

export default ThreadItem;
