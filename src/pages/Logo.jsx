import axios from "axios";
import { url } from "../utils/globalVariable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Logo = ({data}) => {
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    async function download() {
        setLoading(true);
        await axios.get(url + '/download?filename=' + data.filename + '&format=' + data.format, {
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data.filename);
            link.click();
            window.URL.revokeObjectURL(url);
        }).catch(error => {
            console.error("Error downloading image:", error);
        })
        setLoading(false);
    }

    function Return() {
        navigate('/sequence_logo_react')
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {!imageLoaded && <div className=" fixed inset-0 bg-primary-gray opacity-80 z-50"></div>}
            <div>
                <img className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                src={data.url} alt="sequence_logo" onLoad={e => setImageLoaded(true)}/>
            </div>
            <div>
                <button onClick={e => download()}  
                className={`${loading ? 'cursor-wait' : 'cursor-pointer'} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity mr-11 font-bold text-neutral-100 mt-4 duration-200 hover:bg-primary-gray bg-secondary-gray rounded-full px-10 py-2`} 
                disabled={loading}>Download</button>
                <button onClick={Return}
                className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity font-bold text-neutral-100 mt-4 duration-200 hover:bg-primary-gray bg-secondary-gray rounded-full px-10 py-2`}>Return</button>
            </div>
        </div>
    )
};

export default Logo;