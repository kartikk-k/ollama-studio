

// base https client

import useCentralStore from "@/stores/centralStore"

const HTTPClient = async (path: string, method: string, body?: any): Promise<any> => {

    const PORT = useCentralStore(state => state.ollamaPORT)

    const response = await fetch(`http:localhost:${PORT}/api/generate`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return response.json()
}


// const generateResponse = async () => {

//     const response = 

// }