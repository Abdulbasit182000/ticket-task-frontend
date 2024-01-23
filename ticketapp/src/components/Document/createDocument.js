import { Col, Flex, Row, Button, Form, Input, Space, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDocuments } from '../../api/main'

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


const CreateDocument = ({ id, onCreateComplete }) => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [version, setVersion] = useState('')

    const HandleClick = async () => {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('version', version);
        formData.append('project', id);

        dispatch(createDocuments(formData)).then(
            () => onCreateComplete()
        )
    }

    const normFile = (e) => {
        const fileList = Array.isArray(e) ? e : e?.fileList;

        if (fileList && fileList.length > 0) {
            setFile(fileList[0]?.originFileObj);
        }

        return fileList;
    };


    const [form] = Form.useForm();
    return (
        <div className="create-document">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Upload Document</h1>
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

                            {/* for name */}
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Item>

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

                            <Form.Item
                                name="file"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                label="Upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload name="logo" action="/upload.do" listType="picture" maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                name="version"
                                label="Version"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input value={version} onChange={(e) => setVersion(e.target.value)} />
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

export default CreateDocument;