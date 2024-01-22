import { Col, Flex, Row } from "antd";
import { Table, Popconfirm, Button, message} from 'antd';
import { useState } from "react";
import { getDocuments, deleteDocuments } from "../../api/main";
import { useDispatch, useSelector } from "react-redux";
import CreateDocument from "../createDocument/createDocument";
import UpdateDocument from "../updateDocument/updateDocument";

const { Column } = Table;


const DoumentList = ({ idp, onHandleUsage }) => {

    const documents = useSelector(state => state.document.documents);
    const [usage, setUsage] = useState('none');
    const [documentID, setDocumentID] = useState('');
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteDocuments(id)).then(
            () => dispatch(getDocuments(idp))
        )
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Delete request withdrawn');
    };


    const handleUpdate = (did) => {
        setUsage('update')
        setDocumentID(did)
    }

    const handleCreate = () => {
        setUsage('create');
    }

    const handleCreateComplete = () => {
        setUsage('none');
        onHandleUsage();
    }

    const handleUpdateComplete = () => {
        setUsage('none')
        setDocumentID('')
        onHandleUsage();
    }



    return (
        <div className="document-list">
            {documents && usage === 'none' && <div> <Table dataSource={documents}>
                <Column title="Name" dataIndex="name" key="name"></Column>
                <Column title="Description" dataIndex="description" key="description"></Column>
                <Column title="File" dataIndex="file" key="file"></Column>
                <Column title="Version" dataIndex="version" key="version"></Column>
                <Column title="Project" dataIndex="project" key="project"></Column>
                <Column
                    title="Actions"
                    key="actions"
                    render={(text, record) => (
                        <span>
                            <Button onClick={() => handleUpdate(record.id)}>Edit</Button>
                            <Popconfirm
                                key="delete"
                                title="Delete the Document"
                                onConfirm={() => handleDelete(record.id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>Delete</Button>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
                <Flex
                    vertical
                    gap="small"
                    style={{ width: '100%', }}>
                    <Button onClick={() => handleCreate()} type="primary" block>
                        Upload Document
                    </Button>
                </Flex>
            </div>}
            {documents && usage === 'update' && <UpdateDocument id={documentID} onUpdateComplete={handleUpdateComplete}/>}
            {documents && usage === 'create' && <CreateDocument id={idp} onCreateComplete={handleCreateComplete}/>}
        </div>
    );
}

export default DoumentList;