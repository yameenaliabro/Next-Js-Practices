import { UseGetTodoDetail, UseGetTodos } from '@src/apis';
import { Empty, Result, Spin, Typography } from 'antd';
import { useRouter } from 'next/router'
import React from 'react'

function TodoDetail() {
    const { query } = useRouter()
    const { todo_id } = query;
    const { data, isLoading } = UseGetTodoDetail({ id: todo_id as string })
    console.log("🚀 ~ file: [todo_id].tsx:9 ~ TodoDetail ~ data:", data)

    return (
        <div className='flex justify-center items-center bg-blue-400 h-full'>
            <div className='bg-white relative h-[80%] w-[50%] shadow-2xl rounded-xl overflow-y-auto p-5'>
                {isLoading ? <Spin /> : !data ? (
                    <Result
                        status={"404"}
                        title="Todo not found regarding selected id"
                    />
                ) : (
                    <div>
                        <Typography.Title>{data.title}</Typography.Title>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoDetail