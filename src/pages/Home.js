import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

function Home() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    // this is onchange handler
    const onNameChange = (e) => {
        setName(e.target.value);
    };
    // this is onclick handler
    const onNextClick = (e) => {
        if (!name || name.length < 2) {
            e.preventDefault();
            toast.error("Please enter your name!");
            return;
        } else {
            navigate("/chat/"+name);
        }
    };

    return (
        <form className='w-[100vw] h-[100vh] flex items-center justify-center bg-blue-200'>
            <div className='w-80 sm:w-96 rounded-md bg-blue-500 flex h-72 flex-col p-5 items-center justify-center'>
                <p className='font-semibold text-lg text-center mb-3'>Welcome to Chat Group</p>
                <input value={name} onChange={onNameChange} className='w-52 rounded-md h-8 outline-none px-3' type="text" placeholder='Enter name here' />
                <button onClick={onNextClick} className='m-3 w-30 h-9 text-white font-semibold rounded-md flex items-center px-3 box-border text-center bg-slate-900'>Join Chat</button>
            </div>
        </form>
    )
}

export default Home;