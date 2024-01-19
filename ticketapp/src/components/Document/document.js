import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments, getTasks, getprojects, getprofile, getAllUsers } from "../../api/main";
import DoumentList from "../documentList/documentList";
import Navbar from "../Navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";

const Document = () => {

    const projects = useSelector(state => state.project.projects)
    const [title, setTitle] = useState('')
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
                    () => dispatch(getprofile())
                ).then(
                    () => dispatch(getAllUsers())
                ).then(
                    dispatch(getDocuments(id))
                ).then(
                    () => {
                        const selectedProject = projects.find(element => element.id === parseInt(id));
                        if (selectedProject) {
                            setTitle(selectedProject.title);
                        }
                    }
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
        <div className="document">
            {isLoading && <div> Loading... </div>}
            {!isLoading && title !== '' && <div>
                <Navbar/>
                <p><h1>{title}</h1></p>
                <Divider/>
                <DoumentList idp={id} onHandleUsage={handleUsageComplete}/>
            </div>}
        </div>
    );
}

export default Document;