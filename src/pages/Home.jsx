import axios from "axios";
import { url } from "../utils/globalVariable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [seqFile, setSeqFile] = useState('');
    const [format, setFormat] = useState('default');
    const [loading, setLoading] = useState(false);
    const [isLengthEqual, setIsLengthEqual] = useState(true);
    const navigate = useNavigate();

    async function readFile(e) {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                setSeqFile('');
                setSeqFile(e.target.result);
            }
            reader.readAsText(e.target.files[0]);
        }
    }

    function checkFormat() {
        const words = seqFile.split(/[\s,]+/);
        const filteredWords = words.filter(word => word.trim() !== '');
        const firstWordLength = filteredWords[0]?.length || 0;
        if (filteredWords.length > 16) {setIsLengthEqual(false); return;}
        for (let i = 0; i < filteredWords.length; i++) {
            if (filteredWords[i].length !== firstWordLength || filteredWords[i].length > 16) {
                setIsLengthEqual(false);
                return;
            }
        }
        setIsLengthEqual(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        checkFormat();
        if (isLengthEqual) {
            if (format !== 'default') {
                setLoading(true);
                const data = {sequence: seqFile.replace(/ /g, '\n').replace(/\r/g, '\n'), format: format}
                try {
                    const response = await axios.post(url+'/request', data);
                    if (response.status === 200) {
                        navigate('/request?xid=' + response.data.data.xid);
                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            } else {
                alert('Select the download type')
            }
        } else {
            alert("The length of each sequence must be the same and the length of the sequence cannot be more than 16.");
        }
    }
    return (
        <div className="bg-neutral-150 flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-3/4">
                <div className="flex flex-row gap-4 py-2">
                    <h1 className=" text-primary-gray text-2xl font-bold">Upload Sequence Data:</h1>
                    <label className="cursor-pointer font-bold text-sm min-w-fit px-6 py-1 rounded-3xl bg-primary-gray text-neutral-150" 
                        htmlFor="sequence_file">Choose File</label>
                    <input className="hidden" 
                        accept="text/plain" type="file" name="sequence_file" id="sequence_file" onChange={e => readFile(e)}/>
                </div>
                <div>
                    <label htmlFor="sequence_text"></label>
                    <textarea value={seqFile} onChange={e => setSeqFile(e.target.value)}
                        className="resize-none h-36 focus:outline-none focus:ring-2 focus:ring-tertiary-green focus:border-tertiary-green font-normal text-xl w-full p-6 border-2 border-secondary-green rounded-3xl"
                        name="sequence_text" id="sequence_text" cols="16" rows="16" placeholder="Type something..."></textarea>
                </div>
                <div className="flex justify-end gap-2">
                    <button type="submit" disabled={loading} className={`${loading ? 'cursor-wait' : 'cursor-pointer'} duration-200 font-bold text-xl min-w-fit px-16 h-12 rounded-3xl bg-primary-green hover:bg-tertiary-green text-neutral-100`}>Create Logo</button>
                    <button className=" cursor-pointer duration-200 font-bold text-xl min-w-fit px-16 h-12 rounded-3xl bg-secondary-gray hover:bg-primary-gray text-neutral-100" 
                        onClick={e => setSeqFile('')} disabled={loading} >Reset</button>
                    <label className=" " 
                        htmlFor="download_as">
                        <select className=" cursor-pointer focus:bg-quaternary-green focus:outline-none text-center text-xl px-16 h-12 bg-tertiary-green font-bold text-neutral-100 rounded-full " 
                            value={format} onChange={(e) => setFormat(e.target.value)} name="download_as" id="download_as">
                            <option className=" text-left bg-neutral-100 text-primary-gray" value="default">Download as</option>
                            <option className=" text-left bg-neutral-100 text-primary-gray" value="PNG">PNG</option>
                            <option className=" text-left bg-neutral-100 text-primary-gray" value="JPEG">JPEG</option>
                            <option className=" text-left bg-neutral-100 text-primary-gray" value="SVG">SVG</option>
                        </select>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default Home;
