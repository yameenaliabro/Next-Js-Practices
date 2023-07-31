import { DeleteOutlined, EditOutlined, MoreOutlined, } from "@ant-design/icons"
import { IBlog } from "@src/types"
import { Avatar, Button, Card, Image, Popconfirm, } from "antd"
type BlogItemProps = {
    item: IBlog;
    onEdit: (blog: IBlog) => void;
    onDelete: (id: string) => void,
}


function BlogItem(props: BlogItemProps) {
    const { item, onDelete, onEdit } = props
    const { _id, description, image, title, } = item
    const { Meta } = Card


    return (
        <div className="flex justify-center flex-wrap">
            <Card className="flex flex-col flex-wrap w-[300px] m-10"
                cover={
                    <Image
                        preview={false}
                        className="w-[300px] h-[200px]"
                        alt="example"
                        src={image}
                    />
                }
                actions={[
                    <Popconfirm
                        title="Are you sure you want to delete the blog!"
                        key={_id}
                        cancelText="cancel"
                        okText="ok"
                        onConfirm={() => onDelete(_id)}
                    >
                        <DeleteOutlined key="setting" />,
                    </Popconfirm>,
                    <EditOutlined key="edit" onClick={() => onEdit(item)} />,
                    <Button type='text' shape="default" icon={<MoreOutlined />} key={_id} />
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg" />}
                    title={title}
                    description={description}
                />
            </Card>
        </div>
    )
}
export default BlogItem