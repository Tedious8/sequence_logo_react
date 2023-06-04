import { useEffect, useState } from "react";

const Queue = () => {
    const [count, setCount] = useState('');
    useEffect(() => {
        setTimeout(() => {
            if (count === '...') 
                setCount('')
            else setCount(count + '.');
        }, 1000)

    }, [count, setCount])
    return (
        <div className="bg-primary-150 flex justify-center items-center h-screen">
            <h1 className="font-bold text-9xl text-center">Waiting for request{count}</h1>
        </div>
    )
}

export default Queue;