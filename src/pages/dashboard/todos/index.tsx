import { Button, Empty, FloatButton, Input, Spin } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateTodo, useGetTodos } from '@src/apis'
import { CenterWrapper } from "@src/components";

function TodosPage() {
  const [title, setTitle] = useState("");
  const { data, isLoading } = useGetTodos()
  const { mutateAsync: createTodo, isLoading: createLoading } = useCreateTodo()

  const onCreateTodo = () => {
    createTodo({ title })
  }
  
  return (
    <div className='flex justify-center items-center bg-blue-400 h-full'>
      <div className='bg-white relative h-[80%] w-[500px] shadow-2xl rounded-xl'>
        <Input value={title} onChange={e => setTitle(e.target.value)} />
        <Button loading={createLoading} onClick={onCreateTodo}>Add</Button>
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
          ))}
        <FloatButton className='absolute' type='primary' icon={<PlusOutlined />} />
      </div>
    </div>
  )
}

export default TodosPage