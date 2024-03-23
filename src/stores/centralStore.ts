import { CreateThread } from "@/helpers/idb/thread"
import { create } from "zustand"

interface Store {

    threads: {
        info: Thread,
        chats: Chat[]
    }[]

    currentThread: Thread['id'] | null

    createNewThread: (title: string) => void
    // updateThreadName: (threadId: Thread['id'], newName: string) => void
    // deleteThread: (threadId: Thread['id']) => void

    // addChat: (chat: Chat) => void
    // updateChat: (chat: Chat) => void
    // deleteChat: (chatId: Chat['id']) => void
    
    // currentModel: Model | null
    // switchModel: (model: Model) => void

}

const useCentralStore = create<Store>((set) => ({
    threads: [],
    currentThread: null,
    currentModel: null,

    createNewThread: async (title) => {

        await CreateThread(title).then(res => {
            console.log(res)
        })
        
    }

}))