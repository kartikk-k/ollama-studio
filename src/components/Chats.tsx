import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import CopyIcon from '@/assets/icons/copy.svg'
import RewriteIcon from '@/assets/icons/rewrite.svg'
import EditIcon from '@/assets/icons/edit.svg'
import moment from 'moment'

interface props {
    chats: Chat[]
    responseTime: number
}

function Chats({ chats, responseTime }: props) {


    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!ref.current) return
        ref.current.scrollTop = ref.current.scrollHeight
    }, [responseTime])

    return (
        <div
            ref={ref}
            className='relative h-full overflow-y-scroll space-y-12'
        >

            {chats.map(chat => (

                <div key={chat.id} className=''>

                    <div className='sticky z-10 top-0 p-4 pb-0 bg-[#1D1F22] backdrop-blur-sm'>
                        <div className='border-b border-border flex items-start pb-4'>
                            <div className='w-40'>
                                <p className='text-[#5FACF3] font-medium'>User</p>
                                <p className='text-[#A1ADB9] text-xxs'>at: {moment(chat.createdAt.toISOString()).hours() + ':' + moment(chat.createdAt.toISOString()).minutes()}</p>
                            </div>

                            <p className='line-clamp-2'>
                                {chat.question}
                            </p>
                        </div>

                    </div>

                    <div className='p-4 pb-0 bg-[#1D1F22]/20'>
                        <div className='border-b border-border flex items-start pb-4'>
                            <div className='w-40 shrink-0'>
                                <p className='text-[#28EBA5] font-medium'>Mixtral</p>
                                <p className='text-[#A1ADB9] text-xxs'>response time: {chat.id === 'running' ? responseTime : chat.responseTime}</p>
                            </div>

                            <div className='space-y-8'>
                                <p className=''>
                                    {chat.response}
                                </p>

                                <div className='flex gap-4'>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(chat.response)}
                                        className='bg-[#282B2F] px-2.5 text-xs h-7 rounded-full flex items-center gap-1.5'
                                    >
                                        <Image
                                            src={CopyIcon}
                                            alt='copy'
                                        />
                                        Copy
                                    </button>
                                    <button className='bg-[#282B2F] px-2.5 text-xs h-7 rounded-full flex items-center gap-1.5'>
                                        <Image
                                            src={RewriteIcon}
                                            alt='rewrite'
                                        />
                                        Rewrite
                                    </button>
                                    <button className='bg-[#282B2F] px-2.5 text-xs h-7 rounded-full flex items-center gap-1.5'>
                                        <Image
                                            src={EditIcon}
                                            alt='copyedit'
                                        />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            ))}

            {/* {onGoingChat && (
                <div className=''>

                    <div className='sticky z-10 top-0 p-4 pb-0 bg-[#1D1F22] backdrop-blur-sm'>
                        <div className='border-b border-border flex items-start pb-4'>
                            <div className='w-40'>
                                <p className='text-[#5FACF3] font-medium'>User</p>
                                <p className='text-[#A1ADB9] text-xxs'>at: {moment(onGoingChat.createdAt).hours() + ':' + moment(onGoingChat.createdAt).minutes()}</p>
                            </div>

                            <p className='line-clamp-2'>
                                {onGoingChat.question}
                            </p>
                        </div>

                    </div>

                    <div className='p-4 pb-0 bg-[#1D1F22]/20'>
                        <div className='border-b border-border flex items-start pb-4'>
                            <div className='w-40 shrink-0'>
                                <p className='text-[#28EBA5] font-medium'>Mixtral</p>
                                <p className='text-[#A1ADB9] text-xxs'>response time: {responseTime}</p>
                            </div>

                            <div className='space-y-8'>
                                <p className=''>
                                    {onGoingChat.response}
                                </p>

                                <div className='flex gap-4'>
                                    <button className='bg-[#282B2F] px-2.5 text-xs h-7 rounded-full flex items-center gap-1.5'>
                                        <Image
                                            src={CopyIcon}
                                            alt='copy'
                                        />
                                        Copy
                                    </button>
                                    <button className='bg-[#282B2F] px-2.5 text-xs h-7 rounded-full flex items-center gap-1.5'>
                                        <Image
                                            src={RewriteIcon}
                                            alt='rewrite'
                                        />
                                        Rewrite
                                    </button>
                                    <button className='bg-[#282B2F] px-2.5 text-xs h-7 rounded-full flex items-center gap-1.5'>
                                        <Image
                                            src={EditIcon}
                                            alt='copyedit'
                                        />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )} */}

        </div>
    )
}

export default Chats