import { Button, Empty, FloatButton, Input, List, Spin, message } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateTodo, useDeleteTodo, useEditTodo, UseGetTodos } from '@src/apis'
import { CenterWrapper } from "@src/components";
import { CreateTodoModal, CreateTodoModalRefProps, TodoItem } from '@src/molecules';
import { CreateTodoType, EditTodoType, ITodo } from '@src/types/todo';

function TodosPage() {
  const { data, isLoading, refetch } = UseGetTodos()
  const createTodoModal = useRef<CreateTodoModalRefProps>(null)
  const { mutateAsync: createTodo, isLoading: createLoading } = useCreateTodo()
  const { mutateAsync: editTodo, isLoading: updateLoading } = useEditTodo()
  const { mutateAsync: deleteTodo } = useDeleteTodo()

  const onCreateTodo = useCallback(async (v: CreateTodoType) => {
    await createTodo(v, {
      onSuccess: () => {
        refetch()
        message.success("Todo created successfully!");
      }
    })
  }, [createTodo, refetch])

  const onEditTodo = useCallback(async (v: EditTodoType) => {
    await editTodo(v, {
      onSuccess: () => {
        refetch()
        message.success("Todo edited successfully!");
      }
    })
  }, [editTodo, refetch])

  const onOpenCreateModal = () => createTodoModal.current?.open()

  const onEdit = useCallback((todo: ITodo) => {
    createTodoModal.current?.edit(todo)
  }, [])

  const onToggleComplete = useCallback(async (id: string, completed: boolean) => {
    await editTodo({ id, completed }, {
      onSuccess: () => {
        refetch()
      }
    })
  }, [editTodo, refetch])

  const onDelete = useCallback((id: string) => {
    deleteTodo({ id }, {
      onSuccess: () => {
        refetch()
        message.success("Todo deleted successfully!");
      }
    })
  }, [deleteTodo, refetch])

  return (
    <div className='flex justify-center items-center bg-blue-400 h-full'>
      <div className='bg-white relative h-[80%] w-[50%] shadow-2xl rounded-xl overflow-y-auto p-5'>
        <List
          dataSource={data || []}
          loading={isLoading}
          renderItem={(item) => {
            return (
              <TodoItem
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                item={item}
              />
            )
          }}
          rowKey={item => item._id}
        />
        <CreateTodoModal
          createLoading={createLoading || updateLoading}
          onCreateTodo={onCreateTodo}
          onEditTodo={onEditTodo}
          ref={createTodoModal}
        />
        <FloatButton
          onClick={onOpenCreateModal}
          className='absolute'
          type='primary'
          icon={<PlusOutlined />}
        />
      </div>
    </div>
  )
}


export default TodosPage