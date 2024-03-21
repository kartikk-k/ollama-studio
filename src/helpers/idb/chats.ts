import { openDB } from "idb";


const CreateChat = async (chat: Chat) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("chats", "readwrite").objectStore("chats")

    const document = await store.put(chat)
    const res = await store.get(document)

    return res
}

const ReadChat = async (id: string) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("chats", "readwrite").objectStore("chats")

    const chat = await store.get(id)

    return chat as Chat
}

const GetChats = async (start?:string, count?:Number) => {

    const db = await openDB('ollama-studio-db')
    const store = db.transaction("chats", "readwrite").objectStore("chats")

    const chats = await store.getAll() as Chat[]

    return chats as Chat[]
}

const UpdateChat = async (chat: Chat) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("chats", "readwrite").objectStore("chats")

    await store.put(chat)

    return true
}

const DeleteChat = async (id: string) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("chats", "readwrite").objectStore("chats")

    await store.delete(id)

    return true
}


export { CreateChat, ReadChat, GetChats, UpdateChat, DeleteChat };