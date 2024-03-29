import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select'
import Image from 'next/image'
import SettingsIcon from '@/assets/icons/settings.svg'
import PenIcon from '@/assets/icons/pen.svg'
import PaperClipIcon from '@/assets/icons/paperclip.svg'
import ArrowUpIcon from '@/assets/icons/arrowUp.svg'
import Chats from './Chats'

interface props {
    threadId: string
}

function ChatBox({ threadId }: props) {

    const [chats, setChats] = useState<Chat[]>([])
    const [responseTime, setResponseTime] = useState<number>(0.0)
    const [onGoingChat, setOnGoingChat] = useState<Chat | null>(null)
    const [question, setQuestion] = useState<string>('')

    const responseTimeRef = useRef<number>(0.0);
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        responseTimeRef.current = responseTime;
    }, [responseTime]);


    const generateResponse = async () => {
        if (!question.trim() || onGoingChat) return
        setResponseTime(0.0)
        setQuestion('')
        ref.current!.innerText = ''

        const newChat = {
            id: new Date().toISOString(),
            createdAt: new Date(),
            chatId: threadId,
            model: 'llama2',
            question: question,
            response: '',
            responseTime: 0,
            starred: false
        }

        streamResponse(newChat, '')

        // responseTimer.start()
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
                    handleResponse(newChat, answer)
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
                    streamResponse(newChat, answer)
                }
            }

        })
    }

    useEffect(() => {
        setOnGoingChat(null)
        setResponseTime(0.0)
    }, [chats])

    const streamResponse = (newChat: Chat, response: string) => {
        setOnGoingChat(prev => prev === null ? { ...newChat, response: response } : { ...prev, response: response })
    }

    const handleResponse = (chat: Chat, response: string) => {
        console.log("ON GOING", onGoingChat)
        setChats(prev => [
            ...prev,
            { ...chat, response: response, responseTime: responseTimeRef.current }
        ])
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

            {/* <div className='h-full relative overflow-y-scroll'> */}
            <Chats
                chats={chats}
                onGoingChat={onGoingChat}
                responseTime={responseTime}
            />
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

                    <div className='w-full relative'>
                        <div
                            ref={ref}
                            contentEditable
                            onInput={e => setQuestion(e.currentTarget.textContent || '')}
                            className='w-full outline-none leading-5 pt-1.5'
                        >
                        </div>

                        {!question && (
                            <p className='absolute top-1.5 select-none'>
                                ask a question...
                            </p>
                        )}

                    </div>

                    <button
                        disabled={!question.trim() || !!onGoingChat}
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