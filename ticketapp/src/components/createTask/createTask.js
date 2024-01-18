import { Col, Flex, Row, Button, Form, Input, Select, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTasks } from '../../api/main'

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


const CreateTask = ({id, onCreateComplete}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, SetTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('OP')

    const HandleClick = async () => {
        const data = {
            "title": title,
            "description": description,
            "status": status,
            "project": parseInt(id)
        }
        dispatch(createTasks(data)).then(
            () => onCreateComplete()
        )
    }
    const [form] = Form.useForm();
    return (
        <div className="create-task">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Create Task</h1>
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
                            {/* For title */}
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={title} onChange={(e) => SetTitle(e.target.value)} />
                            </Form.Item>


                            {/* For Description */}
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Item>

                            {/* For Status */}
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    value={status}
                                    onChange={(value) => setStatus(value)}
                                    allowClear
                                >
                                    <Option value="OP">Open</Option>
                                    <Option value="REV">Review</Option>
                                    <Option value="WOR">Working</Option>
                                    <Option value="AWAIT">Awaiting Release</Option>
                                    <Option value="WAIT">Waiting QA</Option>
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

export default CreateTask;