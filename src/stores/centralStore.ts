import { CreateThread, GetThreads } from "@/helpers/idb/thread"
import { create } from "zustand"

interface Store {

    threads: {
        info: Thread,
        chats: Chat[]
    }[]

    currentThread: Thread['id'] | null

    createNewThread: (title: string) => Promise<void>
    getThreadsFromDB: () => Promise<void>

    models: Model[]
    getModels: () => Promise<void>

    ollamaPORT: string
    setOllamaPORT: (url: string) => void
}

const useCentralStore = create<Store>((set) => ({
    threads: [],
    currentThread: null,
    currentModel: null,

    createNewThread: async (title) => {

        await CreateThread(title).then(res => {
            console.log(res)
            set(state => ({
                threads: [...state.threads, {
                    info: res,
                    chats: []
                }]
            }))

        })
    },

    getThreadsFromDB: async () => {
        await GetThreads()
        .then(res => {
            set(state => ({
                threads: res.map(thread => ({
                    info: thread,
                    chats: []
                }))
            }))
        })
    },

    models: [],
    getModels: async () => {
        
    },

    ollamaPORT: '11434',
    setOllamaPORT: (url) => {
        set({ ollamaPORT: url })
    }

}))

export default useCentralStore;