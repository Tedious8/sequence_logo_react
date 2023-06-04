import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { sleep } from "../utils/util";

const Redirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function redirect() {
            await sleep(2000);
            navigate('/sequence_logo_react');
        }
        redirect();
    }, [navigate])

    return (
        <div className=" bg-neutral-100 h-screen w-screen flex items-center justify-center">
            <div className=" animate-spin rounded-full h-20 w-20 border-4 border-b-primary-green"></div>
        </div>
    )
};

export default Redirect;