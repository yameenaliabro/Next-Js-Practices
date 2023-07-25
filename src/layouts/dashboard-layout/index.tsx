import { Layout } from 'antd'
import React, { ReactNode } from 'react'
import { DashboardTopBar } from './components'
import { AuthGuard } from '@src/guards'

const { Content } = Layout

type DashboardLayoutProps = {
    children: ReactNode
}

function DashboardLayout(props: DashboardLayoutProps) {
    const { children } = props

    return (
        <Layout>
            <DashboardTopBar />
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

const WithAuth = (props: DashboardLayoutProps) => {
    return (
        <AuthGuard>
            <DashboardLayout {...props} />
        </AuthGuard>
    )
}

export default WithAuth