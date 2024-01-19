import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from '@ant-design/compatible'
import { Col, Flex, Row, Button, Avatar, Tooltip } from "antd";
import { createComments } from "../../api/main";
import CreateComment from "../createComment/createComments";


const CommentList = ({ idt, onHandleUsage, idp }) => {

    const comments = useSelector(state => state.comment.comments);
    const [usage, setUsage] = useState('none');
    const dispatch = useDispatch();
    const all_users = useSelector(state => state.user.users);
    const profile = useSelector(state => state.profile.profile.id);
    const [commentID, setCommentID] = useState('');

    const getAuthor = (id) => {
        const selectedUser = all_users.find(element => element.id === parseInt(id));
        if (selectedUser) {
            console.log('selected user is', selectedUser)
            return selectedUser.email
        }
    }

    const handleModalOk = (text) => {

        const data = {
            "text": text,
            "author": profile,
            "task": idt,
            "project": idp
        }
        dispatch(createComments(data)).then(
            () => {
                setUsage('none');
                onHandleUsage();
            }
        )

    };

    const handleEdit = (cid) => {
        console.log('comment id is',cid);
    }

    return (
        <div className="comment-list">
            {comments && usage === 'none' && <div>
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
                                    <Button Onclick={handleEdit(comment.id)}>Edit</Button>
                                </div>
                            ))}
                        </Flex>
                    </Col>
                </Row>
                {/* <Flex
                    vertical
                    gap="small"
                    style={{ width: '100%', }}>
                    <Button onClick={() => handleCreate()} type="primary" block>
                        Post Comment
                    </Button>

                </Flex> */}
            </div>}
            {comments && <CreateComment onComplete={handleModalOk} />}
        </div>
    );
}

export default CommentList;