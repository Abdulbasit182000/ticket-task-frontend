import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { getTasks, getprojects, getprofile, getAllUsers } from "../../api/main";
import TaskList from "./taskList";
import Navbar from "../Navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";

const Task = () => {

    const dispatch = useDispatch();
    const [num, setNum] = useState(1)
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const profile = useSelector(state => state.profile.profile.role)


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access')
            if (token === undefined || token === null) {
                navigate('/login', { replace: true });
            }
            else {
                dispatch(getprojects()).then(
                    () => {
                        dispatch(getprofile())
                    }
                ).then(
                    () => dispatch(getAllUsers())
                ).then(
                    () => dispatch(getTasks(id))
                ).then(
                    () => setIsLoading(false)
                )
            }
        }
        fetchData();
    }, [num, dispatch, id, navigate])

    const handleUsageComplete = () => {
        setNum(num + 1);
    }

    return (
        <div className="task">
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div>
                <Navbar />
                <Divider />
                <TaskList role={profile} idp={id} onHandleUsage={handleUsageComplete} />
            </div>}
        </div>
    );
}

export default Task;