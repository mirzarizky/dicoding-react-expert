import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {asyncPopulateUsersAndThreads} from '../states/shared/action';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {threads = [], users = [], authUser = null} = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  function onClickAdd() {
    if (!authUser) {
      return navigate('/login');
    }
    return navigate('/create');
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <div className="max-w-2xl min-h-screen py-4 mx-auto bg-white">
      <div className='flex flex-row items-center justify-between px-4'>
        <h1 className='text-xl font-medium'>Top Thread</h1>
        <button
          type="button"
          onClick={onClickAdd}
          className="p-2 text-2xl text-white transition bg-gray-900 border border-gray-900 rounded-full hover:bg-white hover:text-gray-900"
        >
          <AiOutlinePlusCircle />
        </button>
      </div>
      <div className="space-y-4">
        {threadList.map((thread) => {
          return <ThreadItem {...thread} key={thread.id} />;
        })}
      </div>
    </div>
  );
}
