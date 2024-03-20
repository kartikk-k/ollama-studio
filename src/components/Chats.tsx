import React from 'react'
import Image from 'next/image'
import CopyIcon from '@/assets/icons/copy.svg'
import RewriteIcon from '@/assets/icons/rewrite.svg'
import EditIcon from '@/assets/icons/edit.svg'

function Chats() {
    return (
        <div className='relative h-full overflow-y-scroll space-y-24'>

            {Array(10).fill(0).map((_) => (

                <div key={_} className=''>

                    <div className='sticky z-10 top-0 p-4 pb-0 bg-[#1D1F22] backdrop-blur-sm'>
                        <div className='border-b border-border flex items-start pb-4'>
                            <div className='w-40'>
                                <p className='text-[#5FACF3] font-medium'>User</p>
                                <p className='text-[#A1ADB9] text-xxs'>at: 02:12 am</p>
                            </div>

                            <p className='line-clamp-2'>
                                How to use Ollama?
                                <br />
                                and what are some of the best models to try
                                <br />
                                How to use Ollama?
                            </p>
                        </div>

                    </div>

                    <div className='p-4 pb-0 bg-[#1D1F22]/20'>
                        <div className='border-b border-border flex items-start pb-4'>
                            <div className='w-40 shrink-0'>
                                <p className='text-[#28EBA5] font-medium'>Mixtral</p>
                                <p className='text-[#A1ADB9] text-xxs'>response time: 1.2s</p>
                            </div>

                            <div className='space-y-8'>
                                <p className=''>

                                    Kartik Khorwal&apos;s coding style, as reflected on his GitHub profile, emphasizes building websites and web apps with a focus on seamless user experiences across devices. He is described as an engineer with a passion for developing projects with stunning user interfaces. His GitHub repositories highlight his expertise in technologies like React, Next.js, Tailwind CSS, and Framer Motion, showcasing a commitment to creating visually appealing and user-friendly web applications
                                    <br />
                                    Kartik Khorwal is recognized for his talent as a designer and content creator, showcasing his skills through projects like the VSCode logo and a cloud code editor sidebar. His work reflects creativity and proficiency in design, indicating a high level of talent in his field.
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

            ))}

        </div>
    )
}

export default Chats