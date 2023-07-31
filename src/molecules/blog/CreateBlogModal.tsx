import { CreateBlogType, EditBlogType, IBlog } from '@src/types'
import { Form, Input, Modal, } from 'antd'
import React, { Ref, forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import UploadImage from './uploadimage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { fireabaseStorage } from '@src/services'

type CreateBlogModalProps = {
    createLoading: boolean
    onCreateBlog: (props: CreateBlogType) => Promise<void>
    onEditBlog: (props: EditBlogType) => Promise<void>
}

export type CreateBlogModalRefProps = {
    open: VoidFunction;
    edit: (editBlog: IBlog) => void;
}

function CreateBlogModal(props: CreateBlogModalProps, reference: Ref<CreateBlogModalRefProps>) {
    const { onCreateBlog, createLoading, onEditBlog } = props
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [editblog, setEditBlog] = useState<IBlog | null>(null);
    const [productImage, setProductImage] = useState<Blob | null>(null);

    const onCancel = useCallback(() => {
        setEditBlog(null)
        form.resetFields()
        setOpen(false)
    }, [form])

    const onFinish = useCallback(async (v: CreateBlogType) => {
        if (editblog) {
            await onEditBlog({ id: editblog._id, ...v })
        } else {
            let url: string = "";
            if (productImage) {
                const imageExt = productImage?.name.split('.')[1];
                const Imageref = ref(fireabaseStorage, `uploads/${Date.now()}.${imageExt}`)
                const result = await uploadBytes(Imageref, productImage)
                url = await getDownloadURL(result.ref)
            }
            await onCreateBlog({ ...v, image: url });
        }
        onCancel()
    }, [onCreateBlog, onCancel, onEditBlog, editblog, productImage]);

    useImperativeHandle(reference, () => ({
        open: () => setOpen(true),
        edit: (_editBlog) => {
            setEditBlog(_editBlog)
            setOpen(true)
            form.setFieldsValue(_editBlog)
        }
    }), [form])

    const handleImageSelect = (image: File) => {
        setProductImage(image);
    }

    return (
        <Modal
            title={editblog ? "Edit Blog" : "Create Blog"}
            okText={editblog ? "Save" : "Create"}
            open={open}
            onCancel={onCancel}
            onOk={form.submit}
            confirmLoading={createLoading}
        >
            <Form onFinish={onFinish} form={form}>
                <Form.Item
                    name="image"
                    className='flex justify-center'
                >
                    <UploadImage onImageSelect={handleImageSelect} />
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: "Please enter a Title!" }
                ]}
                    name="title"
                >
                    <Input type='text' placeholder='Enter a title' />
                </Form.Item>
                <Form.Item rules={[
                    { required: true, message: "Enter a description" }
                ]}
                    name='description'
                >
                    <Input.TextArea rows={4} placeholder='enter a description...'>
                    </Input.TextArea>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default forwardRef(CreateBlogModal)