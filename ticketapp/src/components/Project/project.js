import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Space } from 'antd';
import ProjectList from "../projectList/projectList";
import { getprojects, getprofile, getAllUsers } from "../../api/main";
import Navbar from "../Navbar/navbar";

const Project = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)
    const profile = useSelector(state => state.profile.profile.role)
    const [num, setNum] = useState(1)

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
                )
            }
        }
        fetchData();
    }, [num, dispatch])

    const handleUsageComplete = () => {
        setNum(num + 1);
    }

    return (
        <div className="project">
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div> <Navbar/>  <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <ProjectList profile={profile} onHandleUsage={handleUsageComplete} />
            </Space> </div>}
        </div>
    );
}

export default Project;