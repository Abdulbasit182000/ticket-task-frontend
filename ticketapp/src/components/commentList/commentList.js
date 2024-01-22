import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from '@ant-design/compatible'
import { Col, Flex, Row, Button, Avatar, Popconfirm, message } from "antd";
import { createComments, updateComments, deleteComments } from "../../api/main";
import CreateComment from "../createComment/createComments";
import UpdateComment from "../updateComment/updateComment";


const CommentList = ({ idt, onHandleUsage}) => {

    const comments = useSelector(state => state.comment.comments);
    const [usage, setUsage] = useState('none');
    const dispatch = useDispatch();
    const all_users = useSelector(state => state.user.users);
    const profile = useSelector(state => state.profile.profile.id);
    const [commentID, setCommentID] = useState('');
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const tasks = useSelector(state => state.task.tasks)
    const [projectID, setProjectID] = useState('')

    useEffect(() => {
        const selectedTask = tasks.find(element => element.id === parseInt(idt));
        if (selectedTask) {
            setTitle(selectedTask.title)
            setProjectID(selectedTask.project)
        }
    }, [usage])

    const getAuthor = (id) => {
        const selectedUser = all_users.find(element => element.id === parseInt(id));
        if (selectedUser) {
            console.log('selected user is', selectedUser)
            return selectedUser.email
        }
    }

    const handleModalOk = (com) => {

        const data = {
            "text": com,
            "author": profile,
            "task": idt,
            "project": projectID
        }
        dispatch(createComments(data)).then(
            () => {
                setUsage('none');
                onHandleUsage();
            }
        )

    };

    const handleUpdateOk = (com) => {
        const data = {
            "text": com,
            "author": profile,
            "task": idt,
            "project": projectID
        }
        dispatch(updateComments(commentID, data)).then(
            () => {
                setUsage('none')
                onHandleUsage();
            }
        )
    }

    const handleEdit = (cid) => {
        console.log('comment id is', cid);
        const selectedComment = comments.find(element => element.id === parseInt(cid))
        if (selectedComment) {
            console.log('select comment is:', selectedComment)
            setText(selectedComment.text)
        }
        setCommentID(cid)
        setUsage('update');
    }

    const confirm = async (id) => {
        dispatch(deleteComments(id)).then(
            () => onHandleUsage()
        )

    };
    const cancel = (e) => {
        console.log(e);
        message.error('Delete request withdrawn');
    };

    return (
        <div className="comment-list">
            {comments && title !== '' && <p><h1>{title}</h1></p>}
            {comments && <div>
                <Row justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>All Comments</h1>
                        <Flex gap="large" vertical>
                            {comments.map((comment) => (
                                <div className="comment-section">
                                    <Comment
                                        author={<a>{getAuthor(comment.author)} </a>}
                                        content={<p>{comment.text}</p>}
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                    >
                                    </Comment>
                                    <Button onClick={() => handleEdit(comment.id)}>Edit</Button>

                                    <Popconfirm
                                        key="delete"
                                        title="Delete the Document"
                                        onConfirm={() => confirm(comment.id)}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger>Delete</Button>
                                    </Popconfirm>
                                </div>
                            ))}
                        </Flex>
                    </Col>
                </Row>
            </div>}
            {comments && usage === 'none' && <CreateComment onComplete={handleModalOk} />}
            {comments && usage === 'update' && <UpdateComment com={text} onComplete={handleUpdateOk} />}
        </div>
    );
}

export default CommentList;