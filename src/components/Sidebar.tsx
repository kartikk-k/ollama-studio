import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/icons/logo.svg'
import CloseIcon from '@/assets/icons/close.svg'
import SearchIcon from '@/assets/icons/search.svg'
import TextIcon from '@/assets/icons/text.svg'

interface SidebarProps {
    onClose: () => void
}

function Sidebar({ onClose }: SidebarProps) {
    return (
        <div>
            <div className='flex items-center justify-between border-b border-border h-16 p-4'>
                <div className='flex items-center gap-2 text-sm text-[#6D7884b]'>
                    <Image
                        src={Logo}
                        alt='Ollama Studio'
                    />

                    <h1>Ollama Studio</h1>
                </div>

                <button onClick={onClose}>
                    <Image
                        src={CloseIcon}
                        alt='close sidebar'
                    />
                </button>
            </div>

            <div className='space-y-10 p-4'>
                <div className='space-y-4'>
                    {/* search */}
                    <div className='bg-black/20 h-10 rounded-full p-3 flex text-sm items-center gap-2 border border-border'>
                        <Image
                            src={SearchIcon}
                            alt='search'
                        />
                        <input
                            type="text"
                            placeholder='search chat...'
                            className='bg-transparent focus:outline-none focus:text-white w-full placeholder:text-secondary-foreground'
                        />
                    </div>

                    {/* create new */}
                    <button className='h-10 rounded-full text-sm  gap-2 text-white w-full create-btn'>
                        Create new
                    </button>
                </div>

                <div className='text-sm space-y-4'>
                    <p className='text-[#6D7884] text-xs'>History</p>

                    <div className='space-y-6'>
                        <div className='flex items-start gap-2'>
                            <Image
                                src={TextIcon}
                                alt='text icon'
                            />
                            <p>How to use Ollama?</p>
                        </div>

                        <div className='flex items-start gap-2'>
                            <Image
                                src={TextIcon}
                                alt='text icon'
                            />
                            <p>Top ideas to build in AI using no-code tools</p>
                        </div>
                        <div className='flex items-start gap-2'>
                            <Image
                                src={TextIcon}
                                alt='text icon'
                            />
                            <p>Best platform for using LLMs in cloud through API</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Sidebar