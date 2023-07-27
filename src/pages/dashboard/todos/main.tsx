import { PlusOutlined } from '@ant-design/icons'
import { UseGetTodos } from '@src/apis'
import { CenterWrapper } from '@src/components'
import { Empty, FloatButton, Spin } from 'antd'
import { todo } from 'node:test'
import React from 'react'

const main = () => {
    const { data, isLoading } = UseGetTodos()
     
    return (
        <div className='flex  justify-center items-center bg-blue-400 h-full'>
            <div className='bg-white relative h-[80%] w-[50%] shadow-xl rounded-xl'>
        
                {isLoading ? (
                    <CenterWrapper>
                        <Spin />
                    </CenterWrapper>
                ) : (
                    !data?.length ? (
                        <CenterWrapper>
                            <Empty />
                        </CenterWrapper>
                    ) : (
                        data.map((_todo) => <p key={_todo._id}>{_todo.title}</p>)
                    )
                )}
                <FloatButton type='primary' className='absolute' icon={<PlusOutlined />} />
            </div>
        </div>
    )
}

export default main