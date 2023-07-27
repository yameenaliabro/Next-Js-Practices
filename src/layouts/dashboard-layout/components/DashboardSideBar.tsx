import { Layout, Menu, MenuProps, } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Sider } = Layout

function DashboardSideBar() {

    const menuItems: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/dashboard">Dashboard</Link>,
            key: "dashboard"
        },
        {
            label: <Link href="/dashboard/todos">Todos</Link>,
            key: "dashboard-todos"
        },
        {
            label: <Link href="/dashboard/todos/main">main</Link>,
            key: "dashboard-todos/main"
        }
    ]), [])

    return (
        <Sider>
            <Menu theme='dark' items={menuItems} />
        </Sider>
    )
}

export default DashboardSideBar
