import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Row, Col, Flex, Checkbox } from 'antd';
import { updateProjects } from "../../api/main";

const UpdateProject = ({id, onUpdate}) => {
    const projects = useSelector(state => state.project.projects)
    const [project, setProject] = useState('')
    const [team_members, setTeam_members] = useState([])
    const all_users = useSelector(state => state.user.users)
    const [title, setTitle] = useState('')
    const [description, setDecription] = useState('')
    const dispatch = useDispatch();

    const HandleClick = async () => {
        const data = {
            "title": title,
            "description": description,
            "team_members": team_members
        }
        dispatch(updateProjects(id, data)).then(
            () => onUpdate()
        )
    }

    const onChange = (e) => {
        let arr = team_members.slice()
        const value = e.target.value
        console.log('value is:', value)
        if (team_members.includes(value)) {
            arr = []
            console.log('team includes value')
            team_members.map((element) => {
                if (element !== value) {
                    console.log('true', element)
                    arr.push(element)
                }
            })
            console.log('arr is', arr)
        }
        else { arr.push(value) }
        console.log('again', arr)
        setTeam_members(arr)
        console.log('new team list', team_members)
    }
    console.log('team-list', team_members)
    useEffect(() => {
        const selectedProject = projects.find(element => element.id === parseInt(id));
        if (selectedProject) {
            setProject(selectedProject);
            setTeam_members(selectedProject.team_members);
            setTitle(selectedProject.title);
            setDecription(selectedProject.description);
        }
    }, [id, projects]);


    const team = project.team_members

    return (
        <div className="update-project">
            {project?.title !== '' && team && <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    {console.log('title ype', typeof project.title)}
                    <h1 style={{ textAlign: 'center' }}>Update Project</h1>
                    <Flex gap="large" wrap="wrap">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={HandleClick}
                        >
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input title!',
                                    },
                                ]}
                            >
                                <Input defaultValue={project.title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input the description!',
                                    },
                                ]}
                            >
                                <Input defaultValue={project.description} onChange={(e) => setDecription(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Members"
                                name="Members"
                            >
                                {all_users.map((user) => (
                                    <Col span={8}>
                                        <Checkbox onChange={onChange} defaultChecked={team.includes(user.id)} value={user.id}>{user.email}</Checkbox>
                                    </Col>
                                ))}
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Col>
            </Row>}
        </div>
    );
}

export default UpdateProject;
