//@ts-nocheck
import { PlusOutlined } from '@ant-design/icons'
import { UseCreateBlog, UseDeleteBlog, UseEditBlog, UseGetBlog, } from '@src/apis'
import { BlogItem } from '@src/molecules/blog'
import CreateBlogModal, { CreateBlogModalRefProps } from '@src/molecules/blog/CreateBlogModal'
import { CreateBlogType, EditBlogType, IBlog } from '@src/types'
import { FloatButton, Typography, message } from 'antd'
import Item from 'antd/es/list/Item'
import { useCallback, useRef } from 'react'

function BlogDahboard() {
  const { data, isLoading, refetch } = UseGetBlog()
  const createblogmodal = useRef<CreateBlogModalRefProps>(null)

  const { mutateAsync: createblog, isLoading: createLoading } = UseCreateBlog()
  const { mutateAsync: editblog, isLoading: editloading } = UseEditBlog()
  const { mutateAsync: deleteblog } = UseDeleteBlog()

  const OncreateBlog = useCallback(async (v: CreateBlogType) => {
    await createblog(v, {
      onSuccess: () => {
        message.success("blog is sucessfully created")
        refetch()
      }
    })
  }, [createblog, refetch])

  const OneditBlog = useCallback(async (v: EditBlogType) => {
    await editblog(v, {
      onSuccess: () => {
        message.success("blog edit sucessfully")
        refetch()
      }
    })
  }, [editblog, refetch])


  const OndeleteBlog = useCallback(async (id: string) => {
    await deleteblog({ id }, {
      onSuccess: () => {
        message.success("blog deleted sucessfully")
        refetch()
      },
      onError: () => {
        message.error("some thing went wrong")
      }

    })

  }, [deleteblog, refetch])

  const onOpenCreateModal = () => createblogmodal.current?.open()

  const onEdit = useCallback(async (blog: IBlog) => {
    createblogmodal.current?.edit(blog)
  }, [])

  return (
    <div>
      <Typography.Title className='flex justify-center text-center mt-2'>Blogs</Typography.Title>
      <div className='flex justify-center flex-wrap mt-5'>
        {
          (data || []).map((item) => (
            <BlogItem
              key={item._id}
              item={item}
              onDelete={OndeleteBlog}
              onEdit={onEdit} />
          ))
        }


        <CreateBlogModal
          createLoading={createLoading | editloading}
          onCreateBlog={OncreateBlog}
          onEditBlog={OneditBlog}
          ref={createblogmodal}
        />
        <FloatButton
          onClick={onOpenCreateModal}
          type="primary"
          icon={<PlusOutlined />}

        />
      </div>
    </div>
  )
}

export default BlogDahboard