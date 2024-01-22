import { Col, Flex, Row, Button, Form, Input, Space, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComments, updateDocuments } from "../../api/main";

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

const UpdateDocument = ({ id, onUpdateComplete }) => {

    const documents = useSelector(state => state.document.documents)
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [version, setVersion] = useState('')

    useEffect(() => {
        const selectedDocument = documents.find(element => element.id === parseInt(id));
        if (selectedDocument) {
            setName(selectedDocument.name)
            setDescription(selectedDocument.description)
            setVersion(selectedDocument.version)
            setFile(selectedDocument.file)
        }
    }, [id, documents])

    const HandleClick = async () => {

        console.log('did is', id)

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('version', version);

        dispatch(updateDocuments(id,formData)).then(
            () => onUpdateComplete()
        )
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        const fileList = Array.isArray(e) ? e : e?.fileList;

        if (fileList && fileList.length > 0) {
            // Set the file state to the first uploaded file
            setFile(fileList[0]?.originFileObj); // Use originFileObj to get the file object
        }

        return fileList;
    };

    const [form] = Form.useForm();

    return (
        <div className="update-document">
            {name !== '' && <Row justify="center" align="middle" style={{ height: '100vh' }}>
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
                                        required: false,
                                    },
                                ]}
                            >
                                <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                name="file"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                                label="Upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload name="logo" action="/upload.do" listType="picture" maxCount={1} defaultFileList={file ? [{ uid: '-1', name: 'Current File', status: 'done' }] : []}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                name="version"
                                label="Version"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input defaultValue={version} onChange={(e) => setVersion(e.target.value)} />
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

export default UpdateDocument;