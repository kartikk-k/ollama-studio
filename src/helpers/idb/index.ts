import { openDB } from "idb";


const InitializeDB = async () => {

    await openDB('ollama-studio-db', 1, {
        upgrade(database, oldVersion, newVersion, transaction, event) {

            const modelsStore = database.createObjectStore("models", { keyPath: "id" })

            modelsStore.createIndex("name", "name")
            modelsStore.createIndex("modelFile", "modelFile")


            const threadStore = database.createObjectStore("threads", { keyPath: "id" })

            threadStore.createIndex("title", "title")
            threadStore.createIndex("createdAt", "createdAt")


            const chatsStore = database.createObjectStore("chats", { keyPath: "id" })

            chatsStore.createIndex("chatId", "chatId") // chatId is the id of the chat (collection of interactions)
            chatsStore.createIndex("model", "model")
            chatsStore.createIndex("question", "question")
            chatsStore.createIndex("response", "response")
            chatsStore.createIndex("createdAt", "createdAt")
            chatsStore.createIndex("responseTime", "responseTime")
            chatsStore.createIndex("starred", "starred")
        },
    })


}

export default InitializeDB;