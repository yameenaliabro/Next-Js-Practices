import React from 'react'
import { Button, Layout } from 'antd';
import { useAuth } from '@src/hooks';

const { Header } = Layout

function DashboardTopBar() {

    const {signout} =  useAuth()
    
    return (
        <Header>
            <Button onClick={signout}>SignOut</Button>
        </Header>
    )
}


export default DashboardTopBar