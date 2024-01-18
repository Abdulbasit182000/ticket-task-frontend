import { Button, Form, Input, Row, Col, Flex } from 'antd';
import { useState } from 'react';
import { login } from '../../api/accounts/accountAPI'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const HandleClick = async () => {
        localStorage.clear()
        const data = {
            "email": email,
            "password": password
        }
        try {
            const response = await login(data)
            localStorage.setItem('access', response.data.access);
            navigate('/project', { replace: true });
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="login">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                    <Flex gap="large" wrap="wrap">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={HandleClick}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input value={email} onChange={(e) => SetEmail(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default Login;