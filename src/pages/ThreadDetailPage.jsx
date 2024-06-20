import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { asyncReceiveTalkDetail } from '../states/threadDetail/action'

export default function ThreadDetailPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { threadDetail = null, authUser = null } = useSelector((states) => states)

    useEffect(() => {
        dispatch(asyncReceiveTalkDetail(id))
    }, [dispatch])

    return (
        <div className='max-w-2xl min-h-screen py-4 mx-auto bg-white'>
            <div className='space-y-4'>
                {threadDetail?.title}
            </div>
        </div>
    )
}