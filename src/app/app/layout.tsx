"use client"

import React, { useState } from 'react'
import InitializeDB from '@/helpers/idb'
import useCentralStore from '@/stores/centralStore'

function Layout({ children }: { children: React.ReactNode }) {

    const [isInitialized, setIsInitialized] = useState(false)
    const GetThreads = useCentralStore(state => state.getThreadsFromDB)

    InitializeDB().then(() => {
        setIsInitialized(true)
        GetThreads()
        console.log('DB initialized')
    }).catch(err => {
        console.error(err)
    })

    return (
        <div>
            {isInitialized && children}
            {!isInitialized && (
                <div className='h-screen all-center'>
                    Loading...
                </div>
            )}
        </div>
    )
}

export default Layout