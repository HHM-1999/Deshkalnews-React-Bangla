import React from 'react'
import Header from './Header'

export default function RLoader() {
    return (
        <div className="loading">
            <Header />
            <div className='loader'></div>
        </div>
    )
}
