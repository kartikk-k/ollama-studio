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
                                    Ollama is an open-source tool designed for running large language models locally on your computer. It allows users to run models like Llama 2, Mistral, and others, customize and create their own models, and download available models for use. Ollama is available for macOS, Linux, and has a Windows version in preview.

                                    <br />
                                    <br />
                                    When it comes to suggesting models to explore with Ollama, you can consider the following based on the provided sources: <br />
                                    <ul className='list-disc pl-6 pt-2'>
                                        <li>
                                            Llama 2: A model mentioned in the sources that can be a good starting point for exploration
                                        </li>
                                        <li>
                                            Deep Coder 33b: Although it is noted to be a large model, it is highlighted as potentially one of the best open-source language models, worth considering for specific tasks
                                        </li>
                                    </ul>

                                    <br />
                                    The working of Ollama LLM (Large Language Model) involves running large language models locally on your computer. Users can install Ollama on their machines, which allows them to access and utilize models like Llama 2 and Mistral. Ollama simplifies the process of running LLMs, making it accessible even for individuals with limited coding skills. By installing Ollama and specific models like Mistral 7b, users can interact with these models through APIs, enabling them to generate responses and integrate them into various applications or workflows. Ollama&apos;s user-friendly approach and support for different models make it a valuable tool for leveraging the power of large language models in a local and private environment
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