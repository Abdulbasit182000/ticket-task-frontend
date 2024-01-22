import { Table, Popconfirm, Button, message, Flex } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, getTasks } from '../../api/main'
import UpdateTask from '../updateTask/updateTask';
import CreateTask from '../createTask/createTask';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Column } = Table;

const TaskList = ({ idp, onHandleUsage }) => {

    const tasks = useSelector(state => state.task.tasks)
    const [usage, setUsage] = useState('none')
    const [taskId, setTaskID] = useState('')
    const dispatch = useDispatch();


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
                                <Button>Details</Button>
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