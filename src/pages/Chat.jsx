import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoScroll from "../components/AutoScroll";
import { HiArrowNarrowDown } from 'react-icons/hi';
import socketio from "socket.io-client";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { IoMdSend } from "react-icons/io";

function Chat() {
  const params = useParams();
  const [getFunc, setFunc] = useState({ func: () => { } });

  useEffect(() => {
    const socket = socketio("http://localhost:8000", { transports: ["websocket"] });
    socket.on('connect', () => {
      toast.success("You connected to the group chat");
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("icon").classList.remove("animate-bounce");
    }, [2000]);
  }, []);

  const onIconClc = () => {
    getFunc.func();
    document.getElementById("icon").classList.add("animate-bounce");

    setTimeout(() => {
      document.getElementById("icon").classList.remove("animate-bounce");
    }, [1000]);
  }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-blue-200 flex-col">
      <div className="chat-box w-[100vw] h-[92vh] sm:w-[50vw] sm:h-96 bg-blue-500 flex flex-col items-start justify-start relative pb-2">
        <div className="rounded-tl-md rounded-tr-md header bg-black w-[100%] h-20 sm:min-h-[60px] sm:max-h-[60px] text-white text-2xl sm:text-xl flex items-center px-2">Group Chat</div>

        <AutoScroll getFunction={setFunc}>
          <div className="left max-w-[45%] px-4 rounded-xl h-auto bg-white break-words font-semibold ml-2 my-2 float-left clear-both p-2">This is left message</div>
          <div className="left max-w-[45%] px-4 rounded-xl h-auto bg-white break-words font-semibold mr-2 my-2 float-right p-2 clear-both">This is right message</div>
        </AutoScroll>

        <HiArrowNarrowDown onClick={onIconClc} id="icon" className='text-white cursor-pointer rounded-full sm:h-10 sm:w-10 h-14 w-14 absolute bottom-10 sm:bottom-4 right-10 p-2 animate-bounce ease-out bg-red-500' alt="" />
      </div>
      <div className="w-[100vw] h-[8vh] sm:w-[50vw] border-2 border-indigo-600 flex items-center px-3 rounded-bl-md rounded-br-md">
        <input className="w-[90%] bg-transparent h-[60%] outline-none text-[20px]" placeholder="Enter message" type="text" />

        <div className="w-[5%] h-[70%] cursor-pointer ease-in-out duration-300 hover:translate-x-1">
          <IoMdSend size={30} className="text-gray-800 hover:text-blue-900" />
        </div>
      </div>
    </div>
  )
}

export default Chat