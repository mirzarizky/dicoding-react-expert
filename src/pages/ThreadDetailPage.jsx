import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import {asyncAddCommentThread, asyncDownvoteThread, asyncReceiveTalkDetail, asyncUpvoteThread} from '../states/threadDetail/action';
import {postedAt} from '../utils/postedAt';

export default function ThreadDetailPage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {threadDetail = null, authUser = null} = useSelector(
      (states) => states,
  );
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [dispatch, id]);

  if (!threadDetail) {
    return null;
  }

  function onSubmitComment(event) {
    event.preventDefault();

    dispatch(asyncAddCommentThread(id, comment));
    setComment('');
  }

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  function onClickLike() {
    dispatch(asyncUpvoteThread(id));
  }

  function onClickDislike() {
    dispatch(asyncDownvoteThread(id));
  }

  return (
    <div className="max-w-2xl min-h-screen py-6 mx-auto bg-white">
      <div className="px-6">
        <span className="px-2 py-1 text-sm text-gray-600 bg-white border border-gray-600 rounded">
                    #{threadDetail?.category}
        </span>
        <h1 className="mt-4 text-2xl font-bold">{threadDetail?.title}</h1>
        <div
          className="mt-4 text-gray-600 transition hover:text-gray-900"
          dangerouslySetInnerHTML={{__html: threadDetail?.body}}
        />
        <div className="flex flex-row items-center justify-start mt-4 space-x-4 text-xl min-w-10">
          <button type="button" onClick={onClickLike} className="flex items-center space-x-1">
            <AiOutlineLike />
            <span className="text-sm">{threadDetail?.upVotesBy.length}</span>
          </button>
          <button type="button" onClick={onClickDislike} className="flex items-center space-x-1">
            <AiOutlineDislike />
            <span className="text-sm">{threadDetail?.downVotesBy.length}</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-base">
              <img
                className="rounded-full size-6"
                src={threadDetail?.owner.avatar}
                alt={threadDetail?.owner.name}
              />
              <span>{threadDetail?.owner.name}</span>
            </div>
            <p className="text-base">{postedAt(threadDetail?.createdAt)}</p>
          </div>
        </div>

        <h3 className="mt-2 font-semibold">Beri komentar</h3>
        {authUser ? (
                    <form className="" onSubmit={onSubmitComment}>
                      <textarea
                        name="comment"
                        id="comment"
                        onChange={onCommentChange}
                        required
                        value={comment}
                        className="block w-full px-2 rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6 min-h-20"
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 mt-2 text-sm text-white transition bg-gray-900 border border-gray-900 rounded-full hover:bg-white hover:text-gray-900"
                      >
                            Kirim
                      </button>
                    </form>
                ) : (
                    <div className="mt-2">
                      <Link className="text-gray-900 underline" to="/login">
                            Login
                      </Link>{' '}
                        untuk memberi komentar
                    </div>
                )}

        <div className="mt-4">
          <div className="text-lg font-semibold">
            <span className="">Komentar </span>
            <span>({threadDetail?.comments.length})</span>
          </div>
          <div className="divide-y-2">
            {threadDetail?.comments.map((comment) => {
              return (
                <div key={comment.id} className="py-3">
                  <div dangerouslySetInnerHTML={{__html: comment.content}} />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-row items-center justify-start mt-4 space-x-4 text-xl min-w-10">
                      <button
                        type="button"
                        className="flex items-center space-x-1"
                      >
                        <AiOutlineLike />
                        <span className="text-sm">
                          {comment.upVotesBy.length}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center space-x-1"
                      >
                        <AiOutlineDislike />
                        <span className="text-sm">
                          {comment.downVotesBy.length}
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                      <div className="flex items-center space-x-2 text-base">
                        <img
                          className="rounded-full size-6"
                          src={comment.owner.avatar}
                          alt={comment.owner.name}
                        />
                        <span>{comment.owner.name}</span>
                      </div>
                      <span className="text-sm">
                        {postedAt(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
