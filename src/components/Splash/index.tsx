import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

function Splash() {
    return (
        <div className='h-full flex justify-center items-center'>
            <Spin indicator={<LoadingOutlined />} size='large' />
        </div>
    )
}

export default Splash