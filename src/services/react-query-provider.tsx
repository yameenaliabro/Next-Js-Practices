import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

function ReactQueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider