import { Comment } from '@ant-design/compatible';
import { Avatar, Button, Form, Input, List } from 'antd';
import React, { useState } from 'react';
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const CreateComment = ({ onComplete }) => {
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            // setComments([
            //     ...comments,
            //     {
            //         author: 'Han Solo',
            //         avatar: 'https://joeschmoe.io/api/v1/random',
            //         content: <p>{value}</p>,
            //     },
            // ]);
            onComplete(value);
        }, 1000);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="create-comment">
            <>
                <Comment
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        </div>
    );
}

export default CreateComment;

// const HandleClick = () => {
//     onComplete(comment);
// }