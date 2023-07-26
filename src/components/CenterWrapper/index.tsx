import React, { ReactNode } from 'react'

function CenterWrapper({ children }: { children: ReactNode }) {
    return (
        <div className='flex justify-center items-center h-full'>
            {children}
        </div>
    )
}

export default CenterWrapper