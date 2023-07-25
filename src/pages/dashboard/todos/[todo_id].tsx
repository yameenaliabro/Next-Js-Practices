import { useRouter } from 'next/router'
import React from 'react'

function TodoDetail() {
    const { query } = useRouter()
    const { todo_id } = query;
    
    return (
        <div>
        <div className='todo'>TodoDetail {todo_id}</div>
        </div>
    )
}

export default TodoDetail