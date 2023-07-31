import React, { useMemo } from 'react'
import { Avatar, Dropdown, Layout, MenuProps, Typography } from 'antd';
import { useAuth } from '@src/hooks';

const { Header } = Layout

function DashboardTopBar() {

    const { signout } = useAuth();

    const items: MenuProps["items"] = useMemo(() => ([
        { label: "Signout", onClick: signout, key: "signout" }
    ]), [signout])

    return (
        <Header className='flex justify-between items-center'>
            <Typography.Title className='text-white' level={3}>Todo App</Typography.Title>
            <Dropdown arrow placement='bottomRight' menu={{ items }}>
                <Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />
            </Dropdown>
        </Header>
    )
}


export default DashboardTopBar