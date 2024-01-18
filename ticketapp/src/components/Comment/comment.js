import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { getcomments } from "../../api/main";
import Navbar from "../Navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";

const Comment = () => {

    const Tasks = useSelector(state => state.task.tasks);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const [num, setNum] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getcomments(id)).then(
            () => {
                const selectedTask = Tasks.find(element => element.id === parseInt(id));
                if (selectedTask) {
                    setTitle(selectedTask.title)
                }
            }
        )
    }, [num, dispatch])

    const handleHomeClick = () => {
        onHomeClick();
    }

    return (
        <div className="comment">
            {title !== '' && <div>
                <Navbar onHome={handleHomeClick} />
                <p> <h1>{title}</h1> </p>
                <Divider />
            </div>}
        </div>
    );
}

export default Comment;