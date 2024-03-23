"use client"

import InitializeDB from '@/helpers/idb'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {

    const [isInitialized, setIsInitialized] = React.useState(false)

    InitializeDB().then(() => {
        setIsInitialized(true)
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