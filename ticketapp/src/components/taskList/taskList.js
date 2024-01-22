import { Table, Popconfirm, Button, message, Flex } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, getTasks } from '../../api/main'
import UpdateTask from '../updateTask/updateTask';
import CreateTask from '../createTask/createTask';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const { Column } = Table;

const TaskList = ({ idp, onHandleUsage }) => {

    const tasks = useSelector(state => state.task.tasks)
    const [usage, setUsage] = useState('none')
    const [taskId, setTaskID] = useState('')
    const [title, setTitle] = useState('')
    const dispatch = useDispatch();
    const projects = useSelector(state => state.project.projects )


    useEffect(() => {
        const selectedProject = projects.find(element => element.id === parseInt(idp))
        if (selectedProject) {
            setTitle(selectedProject.title)
        }
    },[projects])

    const handleDelete = (id) => {
        dispatch(deleteTasks(id)).then(
            () => dispatch(getTasks(idp))
        )
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Delete request withdrawn');
    };

    const handleUpdate = (tid) => {
        setUsage('update');
        setTaskID(tid)
    }

    const handleCreate = () => {
        setUsage('create');
    }

    const handleUpdateComplete = () => {
        setUsage('none');
        setTaskID('');
        onHandleUsage();
    }

    const handleCreateComplete = () => {
        setUsage('none');
        onHandleUsage();
    }

    return (
        <div className="task-list">
            {tasks && title !== '' && <p><h1>{title}</h1></p>}
            {tasks && usage === 'none' && <div> <Table dataSource={tasks}>
                <Column title="Title" dataIndex="title" key="title"></Column>
                <Column title="Description" dataIndex="description" key="description"></Column>
                <Column title="Status" dataIndex="status" key="status"></Column>
                <Column
                    title="Actions"
                    key="actions"
                    render={(text, record) => (
                        <span>
                            <Button onClick={() => handleUpdate(record.id)}>Edit</Button>
                            <Popconfirm
                                key="delete"
                                title="Delete the Task"
                                onConfirm={() => handleDelete(record.id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>Delete</Button>
                            </Popconfirm>
                            <Link to={`/comment/${record.id}`}>
                                <Button>Comments</Button>
                            </Link>
                        </span>
                    )}
                />
            </Table>
                <Flex
                    vertical
                    gap="small"
                    style={{ width: '100%', }}>
                    <Button onClick={() => handleCreate()} type="primary" block>
                        Create Task
                    </Button>
                </Flex>
            </div>}
            {tasks && usage === 'update' && <UpdateTask id={taskId} onUpdateComplete={handleUpdateComplete} />}
            {tasks && usage === 'create' && <CreateTask id={idp} onCreateComplete={handleCreateComplete} />}
        </div>
    );
}

export default TaskList;