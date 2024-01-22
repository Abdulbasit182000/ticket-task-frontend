import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getDocuments,getprojects, getprofile, getAllUsers } from "../../api/main";
import DoumentList from "../documentList/documentList";
import Navbar from "../Navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";

const Document = () => {

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
            {!isLoading && <div>
                <Navbar/>
                <Divider/>
                <DoumentList idp={id} onHandleUsage={handleUsageComplete}/>
            </div>}
        </div>
    );
}

export default Document;