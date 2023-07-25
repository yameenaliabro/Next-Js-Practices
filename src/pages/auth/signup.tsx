import { useAuth } from '@src/hooks'
import { SignupProps } from '@src/types'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import { useRouter } from 'next/router'
import { useState } from "react"
import React from 'react'

function SignUppage() {
    const { asPath, push } = useRouter()
    const { signup } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = async (props: SignupProps) => {
        try {
            setLoading(true)
            await signup(props)   
            if (asPath === "/auth/signup") {
                push("/dashboard")
            }
            message.success("your account is sucessfull created")
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <Card className='flex flex-col items-center'>
                <Typography.Title>Create a New Account </Typography.Title>
                <Form
                    onFinish={onFinish}
                    disabled={loading}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "enter a username" }]}
                    >
                        <Input type='text' placeholder='enter a username' />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            { required: true, message: "Enter a  email address!" },
                            { min: 4, message: "must be 4 character!" }
                        ]}
                        name="email"
                    >
                        <Input placeholder='Enter a email Address' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: "Enter a password!" }]}
                        name="password"
                    >
                        <Input.Password placeholder='enter a password' />
                    </Form.Item>
                    <Form.Item className='flex justify-center items-center'>
                        <Button type='primary' htmlType="submit" loading={loading}>Signup</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='link' block onClick={() => push("/auth/signin")}>Already have a Account!</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default SignUppage