import { openDB } from "idb";

const CreateModelConfig = async (model: Model) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("models", "readwrite").objectStore("models")

    const document = await store.put(model)
    const res = await store.get(document)

    return res
}

const GetModelConfig = async (id: string) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("models", "readwrite").objectStore("models")

    const model = await store.get(id)

    return model as Model
}

const UpdateModelConfig = async (model: Model) => {
    const db = await openDB('ollama-studio-db')
    const store = db.transaction("models", "readwrite").objectStore("models")

    await store.put(model)

    return true
}