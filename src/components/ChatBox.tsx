import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './Select'
import Image from 'next/image'
import SettingsIcon from '@/assets/icons/settings.svg'
import PenIcon from '@/assets/icons/pen.svg'
import PaperClipIcon from '@/assets/icons/paperclip.svg'
import ArrowUpIcon from '@/assets/icons/arrowUp.svg'
import Chats from './Chats'

function ChatBox() {
    return (
        <div className='text-sm h-full flex flex-col'>

            {/* header */}
            <div className='border-b p-4 border-border h-16 flex items-center justify-between'>

                <Select >
                    <SelectTrigger>
                        <SelectValue placeholder="Get model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='llama2'>Llama2</SelectItem>
                        <SelectItem value='mistral'>Mixtral</SelectItem>
                    </SelectContent>
                </Select>

                <div className='flex items-center gap-3'>
                    <button className='bg-[#28EBA5]/10 text-[#28EBA5] h-8 rounded-full px-4'>
                        Export Chat
                    </button>

                    <button className='h-8 w-8 rounded-full bg-secondary all-center hover:brightness-125'>
                        <Image
                            src={SettingsIcon}
                            alt='settings icon'
                        />
                    </button>

                    <button className='h-8 w-8 rounded-full bg-secondary all-center hover:brightness-125'>
                        <Image
                            src={PenIcon}
                            alt='settings icon'
                        />
                    </button>

                </div>
            </div>

            {/* <div className='h-full relative overflow-y-scroll'> */}
                <Chats />
            {/* </div> */}

            <div className='p-4'>
                <div className='bg-secondary rounded-2xl min-h-12 h-auto flex items-start gap-2 p-3'>
                    <button className='h-8 w-8'>
                        <Image
                            src={PaperClipIcon}
                            alt='attachments icon'
                            width={18}
                            className='shrink-0'
                        />
                    </button>

                    <div
                        contentEditable
                        className='w-full outline-none leading-5 pt-1.5'
                    >
                        ask a question...
                    </div>

                    <button className='h-8 w-8 shrink-0 rounded-full bg-[#28EBA5]/20 all-center hover:brightness-125'>
                        <Image
                            src={ArrowUpIcon}
                            alt='send icon'
                            width={16}
                        />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ChatBox