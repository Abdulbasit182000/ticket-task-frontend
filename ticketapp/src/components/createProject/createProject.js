import { Button, Form, Input, Row, Col, Flex, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProjects } from '../../api/main';

const CreateProject = ({onCreate}) => {

    const [title, setTitle] = useState('')
    const [description, setDecription] = useState('')
    const [team_members, setTeam_members] = useState('')
    const all_users = useSelector(state => state.user.users)
    const dispatch = useDispatch();

    const onChange = (checkedValues) => {
        console.log('checked=', checkedValues)
        setTeam_members(checkedValues)
    }

    const HandleClick = async () => {
        const data = {
            "title": title,
            "description": description,
            "team_members": team_members
        }
        dispatch(createProjects(data)).then(
            () => onCreate()
        )
    }
    return (
        <div className="create-project">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Create Project</h1>
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
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input title!',
                                    },
                                ]}
                            >
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the description!',
                                    },
                                ]}
                            >
                                <Input value={description} onChange={(e) => setDecription(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Members"
                                name="Members"
                            >
                                <Checkbox.Group
                                    style={{
                                        width: '100%'
                                    }}
                                    onChange={onChange}
                                >
                                    <Row>
                                        {all_users.map((user) => (
                                            <Col span={8}>
                                                <Checkbox value={user.id}>{user.email}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
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

export default CreateProject;