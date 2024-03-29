import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select'
import Image from 'next/image'
import SettingsIcon from '@/assets/icons/settings.svg'
import PenIcon from '@/assets/icons/pen.svg'
import PaperClipIcon from '@/assets/icons/paperclip.svg'
import ArrowUpIcon from '@/assets/icons/arrowUp.svg'
import Chats from './Chats'
import { CreateChat, GetChatsByThread } from '@/helpers/idb/chats'

interface props {
    threadId: string
}

function ChatBox({ threadId }: props) {

    const [chats, setChats] = useState<Chat[]>([])
    const [responseTime, setResponseTime] = useState(0.0)
    const [question, setQuestion] = useState('')
    const [response, setResponse] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [pendingChatCreation, setPendingChatCreation] = useState(false)

    const responseTimeRef = useRef(0.0);
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        responseTimeRef.current = responseTime;
    }, [responseTime]);

    useEffect(() => {
        if (!response.trim()) return
        setChats(prev => prev.map(chat => chat.id === 'running'
            ? { ...chat, response }
            : chat))
    }, [response])

    useEffect(() => {
        loadChats()
    }, [])

    useEffect(() => {
        if(!pendingChatCreation) return
        CreateChat(chats[chats.length - 1])
        setPendingChatCreation(false)
    }, [pendingChatCreation])

    const loadChats = async () => {
        const res = await GetChatsByThread(threadId)
        setChats(res)
    }

    const generateResponse = async () => {
        if (!question.trim() || isRunning) return
        setQuestion('')
        setIsRunning(true)
        ref.current!.innerText = ''

        const newChat = {
            id: 'running',
            createdAt: new Date(),
            chatId: threadId,
            model: 'llama2',
            question: question,
            response: '',
            responseTime: 0,
            starred: false
        }

        handleChatCreation(newChat)

        const timer = setInterval(() => {
            setResponseTime(prev => parseFloat((prev + 0.1).toFixed(1)))
        }, 100)

        await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama2',
                prompt: question,
                stream: true
            })
        }).then(async res => {
            const reader = res.body?.getReader()
            let partialData = ''
            let answer = ''

            while (true && reader) {
                const { done, value } = await reader.read();

                if (done) {
                    clearInterval(timer)
                    setIsRunning(false)
                    handleResponseComplete()
                    break;
                }

                // Decode the received value and split by lines
                const textChunk = new TextDecoder().decode(value);
                const lines = (partialData + textChunk).split('\n');
                // @ts-ignore
                partialData = lines.pop(); // The last line might be incomplete

                for (const line of lines) {
                    if (line.trim() === '') continue;
                    const parsedResponse = JSON.parse(line);
                    answer = answer.concat(parsedResponse.response); // Process each response word
                    setResponse(prev => prev.concat(parsedResponse.response))
                }
            }

        })
    }

    const handleChatCreation = (newChat: Chat) => {
        setChats(prev => [...prev, newChat])
    }

    const handleResponseComplete = () => {
        setChats(prev => prev.map(chat => chat.id === 'running'
            ? { ...chat, id: new Date().toISOString(), responseTime: responseTimeRef.current }
            : chat))
        setResponse('')
        setResponseTime(0.0)
        setPendingChatCreation(true)
    }


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

            <Chats
                chats={chats}
                responseTime={responseTime}
            />

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

                    <div className='w-full relative'>
                        <div
                            ref={ref}
                            contentEditable
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), generateResponse())}
                            onInput={e => setQuestion(e.currentTarget.textContent || '')}
                            onPaste={e => {
                                e.preventDefault();
                                var text = e.clipboardData.getData('text/plain');
                                document.execCommand("insertHTML", false, text);
                            }}
                            className='w-full relative z-10 outline-none leading-5 pt-1.5'
                        >
                        </div>

                        {!question && (
                            <p className='absolute top-1.5 select-none'>
                                ask a question...
                            </p>
                        )}

                    </div>

                    <button
                        disabled={!question.trim() || isRunning}
                        onClick={generateResponse}
                        className='h-8 w-8 shrink-0 disabled:opacity-50 rounded-full bg-[#28EBA5]/20 all-center hover:brightness-125'
                    >
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