import { MoreOutlined } from '@ant-design/icons';
import { ITodo } from '@src/types/todo'
import { Button, Checkbox, Dropdown, List, MenuProps, Typography } from 'antd';
import Link from 'next/link';
import React, { useMemo } from 'react'

type TodoItemProps = {
    item: ITodo;
    onDelete: (id: string) => void
    onEdit: (todo: ITodo) => void
    onToggleComplete: (id: string, completed: boolean) => void
}

function TodoItem(props: TodoItemProps) {
    const { item, onDelete, onEdit, onToggleComplete } = props
    console.log(item)
    const { title, description, completed, _id } = item

    const actionItems: MenuProps["items"] = useMemo(() => ([
        { label: "Edit", key: "edit", onClick: () => onEdit(item), disabled: completed },
        { label: "Delete", key: "delete", danger: true, onClick: () => onDelete(_id) },
    ]), [_id, onDelete, onEdit, item, completed])

    return (
        <List.Item
            actions={[
                <Dropdown
                    trigger={["click"]}
                    arrow
                    placement='bottomRight'
                    menu={{ items: actionItems }}
                    key="actions"
                >
                    <Button type='text' shape='circle' icon={<MoreOutlined />} />
                </Dropdown>
            ]}
        >
            <List.Item.Meta
                avatar={
                    <Checkbox
                        checked={completed}
                        onChange={e => onToggleComplete(_id, e.target.checked)}
                    />
                }
                title={
                    <Link
                        href={`/dashboard/todo/${_id}`}
                        className={completed ? "line-through" : ""}
                    >
                        {title}
                    </Link>
                }
                description={description}
            />
        </List.Item>
    )
}

export default TodoItem