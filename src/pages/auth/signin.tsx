import React from 'react'
import { useAuth } from '@src/hooks'
import { LoginProps } from '@src/types'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import { useState } from "react"
import { useRouter } from 'next/router'

function SignInPage() {
    const { asPath, push } = useRouter()
    const { login } = useAuth();
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = async (props: LoginProps) => {
        console.log(props)
        try {
            setLoading(true)
            await login(props)
            if (asPath === "/auth/signin") {
                push("/dashboard")
            }
            message.success("your account is sucessfull created")
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <Card className='flex flex-col items-center'>
                <Typography.Title>Enter a Email and Password</Typography.Title>
                <Form
                    onFinish={onFinish}
                    disabled={loading}

                >
                    <Form.Item
                        rules={[
                            { required: true, message: "Enter a  email address!" },
                            { min: 4, message: "must be 4 character!" }]}
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
                        <Button type='primary' htmlType="submit" loading={loading} block>Login</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='link' block onClick={() => push("/auth/signup")} className='bg-green-500 text-white'>Create a New Account?</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default SignInPage