import { Col, Flex, Row, Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../../api/main";

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

const UpdateTask = ({id, onUpdateComplete}) => {

    const tasks = useSelector(state => state.task.tasks)
    const [title, setTitle] = useState('');
    const [description, setDecription] = useState('')
    const [status, setStatus] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedTask = tasks.find(element => element.id === parseInt(id));
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDecription(selectedTask.description);
            setStatus(selectedTask.status);
        }
    },[id, tasks])

    const HandleClick = async () => {
        const data = {
            "title": title,
            "description": description,
            "status": status,
        }
        dispatch(updateTasks(id, data)).then(
            () => onUpdateComplete()
        )
    }

    const [form] = Form.useForm();
    return (
        <div className="update-task">
            {title !== '' && <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Update Task</h1>
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
                                        required: false,
                                    },
                                ]}
                            >
                                <Input defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Item>


                            {/* For Description */}
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input defaultValue={description} onChange={(e) => setDecription(e.target.value)} />
                            </Form.Item>

                            {/* For Status */}
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={status}
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
            </Row>}
        </div>
    );
}

export default UpdateTask;