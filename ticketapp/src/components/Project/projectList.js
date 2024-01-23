import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, message, Popconfirm, Col, Flex, Row, Card } from "antd";
import { getprojects, deleteprojects } from '../../api/main'
import CreateProject from "./createProject";
import UpdateProject from "./updatePoject";
import { Link } from "react-router-dom";

const { Meta } = Card;


const ProjectList = ({ role, onHandleUsage }) => {

    const projects = useSelector(state => state.project.projects)
    const dispatch = useDispatch();
    const [usage, setUsage] = useState('none')
    const [projectID, setProjectID] = useState('')

    useEffect(() => {
        dispatch(getprojects())
    }, [usage, dispatch])

    const handleCreate = () => {
        setUsage('create')
    }

    const handleUpdate = (id) => {
        setUsage('update')
        setProjectID(id)
    }

    const handleCreateComplete = () => {
        setUsage('none')
        onHandleUsage();
    }

    const handleUpdateComplete = () => {
        setUsage('none')
        setProjectID('')
        onHandleUsage();
    }

    const confirm = async (id) => {
        dispatch(deleteprojects(id)).then(
            () => dispatch(getprojects())
        )

    };
    const cancel = (e) => {
        message.error('Delete request withdrawn');
    };

    return (
        <div className="project-list">
            {projects && usage === 'none' && <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>All Projects</h1>
                    <Flex gap="large" vertical>
                        {projects.map((project) => (
                            <div className="project-preview">
                                <div>
                                    <Card
                                        style={{
                                            width: 400,
                                        }}
                                        actions={[
                                            role === 'MA' ? (
                                            <Button onClick={() => handleUpdate(project.id)} >Edit</Button> ): null,
                                            role === 'MA' ? (
                                            <Popconfirm
                                                key="delete"
                                                title="Delete the Project"
                                                onConfirm={() => confirm(project.id)}
                                                onCancel={cancel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button danger>Delete</Button>
                                            </Popconfirm>) : null,
                                            <Link to={`/task/${project.id}`}>
                                                <Button>Task Details</Button>
                                            </Link>,
                                            <Link to={`/document/${project.id}`}>
                                                <Button>Documents</Button>
                                            </Link>,
                                        ]}
                                    >
                                        <Meta
                                            title={project.title}
                                            description={project.description}
                                        />
                                    </Card>

                                </div>
                            </div>
                        ))}
                    </Flex>
                    {role === 'MA' && <Flex
                        vertical
                        gap="small"
                        style={{ width: '100%', }}>
                        <Button onClick={() => handleCreate()} type="primary" block>
                            Create Project
                        </Button>
                    </Flex>}
                </Col>
            </Row>}
            {projects && usage === 'create' && <CreateProject onCreate={handleCreateComplete} />}
            {projects && usage === 'update' && <UpdateProject id={projectID} onUpdate={handleUpdateComplete} />}
        </div>
    );
}

export default ProjectList;