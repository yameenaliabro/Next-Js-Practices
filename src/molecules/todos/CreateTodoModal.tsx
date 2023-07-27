import { CreateTodosType, EditTodoType, ITodo } from '@src/types/todo'
import { Form, Input, Modal } from 'antd'
import React, { Ref, forwardRef, useCallback, useImperativeHandle, useState } from 'react'

type CreateTodoModalProps = {
    createLoading: boolean
    onCreateTodo: (props: CreateTodosType) => Promise<void>
    onEditTodo: (props: EditTodoType) => Promise<void>
}

export type CreateTodoModalRefProps = {
    open: VoidFunction;
    edit: (editTodo: ITodo) => void;
}

function CreateTodoModal(props: CreateTodoModalProps, ref: Ref<CreateTodoModalRefProps>) {
    const { onCreateTodo, createLoading, onEditTodo } = props
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    const [editTodo, setEditTodo] = useState<ITodo | null>(null);

    const onCancel = useCallback(() => {
        setEditTodo(null)
        form.resetFields()
        setOpen(false)
    }, [form])

    const onFinish = useCallback(async (v: CreateTodosType) => {
        console.log("🚀 ~ file: CreateTodoModal.tsx:29 ~ onFinish ~ v:", v)
        if (editTodo) {
            await onEditTodo({ id: editTodo._id, ...v })
        } else {
            await onCreateTodo(v);
        }
        onCancel()
    }, [onCreateTodo, onCancel, editTodo, onEditTodo]);

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        edit: (_editTodo) => {
            setEditTodo(_editTodo)
            setOpen(true)
            form.setFieldsValue(_editTodo)
        }
    }), [form])

    return (
        <Modal
            title={editTodo ? "Edit Todo" : "Create Todo"}
            okText={editTodo ? "Save" : "Create"}
            open={open}
            onCancel={onCancel}
            onOk={form.submit}
            confirmLoading={createLoading}
        >
            <Form onFinish={onFinish} form={form}>
                <Form.Item name="title" rules={[{ required: true, message: "Please add Title!" }]}>
                    <Input placeholder='Title' />
                </Form.Item>
                <Form.Item name="description">
                    <Input.TextArea rows={4} placeholder='Description' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default forwardRef(CreateTodoModal)