import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { getcomments, getprojects, getprofile, getAllUsers, ListTasks } from "../../api/main";
import Navbar from "../Navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../commentList/commentList";

const Comment = () => {

    const Tasks = useSelector(state => state.task.tasks);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const [num, setNum] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [projectID, setProjectID] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access')
            if (token === undefined || token === null) {
                navigate('/login', { replace: true });
            }
            else {
                dispatch(getprojects()).then(
                    () => dispatch(getprofile())
                ).then(
                    () => dispatch(getAllUsers())
                ).then(
                    () => dispatch(ListTasks())
                ).then(
                    () => dispatch(getcomments(id))
                ).then(
                    () => setIsLoading(false)
                )
            }
        }
        fetchData();
    }, [num, dispatch])

    const handleUsageComplete = () => {
        setNum(num + 1);
    }

    return (
        <div className="comment">
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div>
                <Navbar/>
                <Divider />
                <CommentList idt={id} onHandleUsage={handleUsageComplete}/>
            </div>}
        </div>
    );
}

export default Comment;