"use client"

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import CloseSidebar from '@/assets/icons/closeSidebar.svg'
import Image from 'next/image'
import ChatBox from '@/components/ChatBox'

function Page() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <main className={`${isSidebarOpen ? "" : ""} flex h-screen`}>

            <div className='h-full relative'>
                {isSidebarOpen && (
                    <div className='bg-secondary border-r border-border w-[300px] h-full'>
                        <Sidebar
                            onClose={() => setIsSidebarOpen(false)}
                        />
                    </div>
                )}


                {/* close sidebar button */}
                <div
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='absolute z-20 transform -translate-x-1/2 -translate-y-1/2 top-1/2 -right-10'
                >
                    <button className={`-space-y-0.5 group text-[#525B64] w-6 h-6 flex items-center flex-col ${isSidebarOpen ? 'rotate-180' : ''}`}>
                        <span
                            className='block h-3 w-1 bg-current rounded-sm group-hover:-rotate-[25deg] rotate-0 duration-200'
                        />
                        <span
                            className='block h-3 w-1 bg-current rounded-sm group-hover:rotate-[25deg] rotate-0 duration-200'
                        />
                    </button>
                </div>

            </div>

            <div className='flex-grow'>
               <ChatBox />
            </div>

        </main>
    )
}

export default Page