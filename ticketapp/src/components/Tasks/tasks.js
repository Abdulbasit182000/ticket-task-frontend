import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { getTasks, getprojects, getprofile, getAllUsers } from "../../api/main";
import TaskList from "../taskList/taskList";
import Navbar from "../Navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";

const Task = () => {

    const projects = useSelector(state => state.project.projects)
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const [num, setNum] = useState(1)
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access')
            if (token === undefined || token === null) {
                navigate('/login', { replace: true });
            }
            else {
                dispatch(getprojects()).then(
                    () => setIsLoading(false)
                ).then(
                    () => dispatch(getprofile())
                ).then(
                    () => dispatch(getAllUsers())
                ).then(
                    () => dispatch(getTasks(id))
                ).then(
                    () => {
                        const selectedProject = projects.find(element => element.id === parseInt(id));
                        if (selectedProject) {
                            setTitle(selectedProject.title);
                        }
                    }
                )
            }
        }
        fetchData();
    }, [num, dispatch])

    const handleUsageComplete = () => {
        setNum(num + 1);
    }

    return (
        <div className="task">
            {isLoading && <div>Loading...</div>}
            {!isLoading && title !== '' && <div>
                <Navbar />
                <p> <h1>{title}</h1> </p>
                <Divider />
                <TaskList idp={id} onHandleUsage={handleUsageComplete} />
            </div>}
        </div>
    );
}

export default Task;