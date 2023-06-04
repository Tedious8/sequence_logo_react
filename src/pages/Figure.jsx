// import {} from "@"
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../utils/globalVariable";
import Queue from "./Queue";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import axios from "axios";

const Figure = () => {
    const [queryParameters] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData() {
            const data = {xid: queryParameters.get('xid')};
            try {
                const response = await axios.post(url+'/requesting', data);
                if (response.status === 200) {
                    setData(response.data);
                    setLoading(false);
                } else {
                    alert(response.data.message);
                    navigate('/sequence_logo_react');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [queryParameters, navigate])

    return (
        <div>
            { loading ? <Queue/> : <Logo data={data}/> }
        </div>
    )
};

export default Figure;