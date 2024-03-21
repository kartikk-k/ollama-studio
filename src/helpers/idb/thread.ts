import { openDB } from "idb";


const CreateThread = async (title: string) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("threads", "readwrite").objectStore("threads")

    const thread: Thread = {
        id: new Date().getTime().toString(),
        title: title,
        createdAt: new Date(),
    }

    const document = await store.put(thread)
    const res = await store.get(document)

    return res
}

const ReadThread = async (id: string) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("threads", "readwrite").objectStore("threads")

    const thread = await store.get(id)

    return thread as Thread
}

const GetThreads = async (start?:string, count?:Number) => {

    const db = await openDB('ollama-studio-db')
    const store = db.transaction("threads", "readwrite").objectStore("threads")

    const threads = await store.getAll() as Thread[]

    return threads as Thread[]
}


const UpdateThread = async (thread: Thread) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("threads", "readwrite").objectStore("threads")

    await store.put(thread)

    return true
}

const DeleteThread = async (id: string) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("threads", "readwrite").objectStore("threads")

    await store.delete(id)

    return true
}


export { CreateThread, ReadThread, GetThreads, UpdateThread, DeleteThread };