import { useEffect } from 'react'
import ThreadItem from '../components/ThreadItem'
import { useDispatch, useSelector } from 'react-redux'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'

export default function HomePage() {
    const dispatch = useDispatch()
    const { threads = [], users = [] } = useSelector((states) => states)

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads())
    }, [dispatch])

    const threadList = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
    }));

    return (
        <div className='max-w-2xl min-h-screen py-4 mx-auto bg-white'>
            <div className='space-y-4'>
                {threadList.map((thread) => {
                    return (<ThreadItem {...thread} key={thread.id} />)
                })}
            </div>
        </div>
    )
}