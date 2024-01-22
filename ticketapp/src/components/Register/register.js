import React, { useState } from "react";
import { Button, Form, Input, Select, Space, Row, Col, Flex } from 'antd';
import Password from "antd/es/input/Password";
import { register } from "../../api/accounts/accountAPI";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [role, setRole] = useState('DEV')
    const navigate = useNavigate();

    const HandleClick = async () => {
        const data = {
            "user": {
                "username": username,
                "email": email,
                "password": password
            },
            "contact_number": contact_number,
            "role": role
        }
        try {
            const response = await register(data).then(
                () => navigate('/login', { replace: true })
            )

        }
        catch(error) {
            console.log(error)
        }
    }
    const [form] = Form.useForm();
    return (
        <div className="register">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Provide Login Details</h1>
                    <Flex gap="large" wrap="wrap">
                        <Form
                            {...layout}
                            form={form}
                            name="control-hooks"
                            onFinish={HandleClick}
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            {/* For username */}
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Item>

                            {/* For Email */}
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Item>

                            {/* For Password */}
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>

                            {/* For Contact */}
                            <Form.Item
                                name="contact"
                                label="Contact"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={contact_number} onChange={(e) => setContact_number(e.target.value)} />
                            </Form.Item>

                            {/* For Role */}
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    value={role}
                                    onChange={(value) => setRole(value)}
                                    allowClear
                                >
                                    <Option value="DEV">Developer</Option>
                                    <Option value="MA">Manager</Option>
                                    <Option value="QA">QA</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default Register
