import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoScroll from "../components/AutoScroll";
import { HiArrowNarrowDown } from 'react-icons/hi';
import socketio from "socket.io-client";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { IoMdSend } from "react-icons/io";
let socket;
let myid;

function Chat() {
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const [run, setRun] = useState(true);
  const [msg, setMsg] = useState("");

  const onChangeMessage = (e) => {
    setMsg(e.target.value);
  }

  const onSendMessage = () => {
    if (msg) {
      socket.emit("send-message", { msg, id: myid });
      setMsg("");
    }
  };

  useEffect(() => {
    myid = String(Math.random()) * String(100 + Date.now());
    // connecting
    socket = socketio("https://my-group-chat-backend.herokuapp.com/", { transports: ["websocket"] });
    // listening
    socket.on('connect', () => {
      // toast.success("You connected to the group chat");
    });
    // emitting
    socket.emit("join", { name: params.name });

    socket.on("welcome", (data) => {
      toast.success(data.msg);
    });

    socket.on("user-joined", (data) => {
      toast.success(data.msg);
    });

    socket.on("leaved-user", (data) => {
      toast.error(data.msg);
    });
    // unmounting
    return () => {
      socket.emit("discon");

      socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on("receive-msg", (data) => {
      if(data.id !== myid){
        var audio = new Audio('/sound.mp3').play();
      };

      setMessages([...messages, data]);
      console.log(messages);
      setRun(!run);
    });
  }, [messages]);

  useEffect(() => {
    // removing animation from auto scrll btn
    setTimeout(() => {
      document.getElementById("icon").classList.remove("animate-bounce");
    }, [2000]);

  }, []);

  const onIconClc = () => {
    // setting run true if false and false if true
    setRun(!run);
    document.getElementById("icon").classList.add("animate-bounce");

    setTimeout(() => {
      document.getElementById("icon").classList.remove("animate-bounce");
    }, [1000]);
  }

  // press enter key
  useEffect(() => {
    window.onkeyup = (e) => {
      if (e.key === "Enter") {
        console.log("helo")
        document.getElementById('sendbtn').click();
      }
      // e.key === "Enter" && document.getElementById('login').click();
    }
  }, []);

  return (
    <div className="chat w-[100vw] h-[100vh] flex items-center justify-center bg-blue-200 flex-col">
      <div className="chat-box w-[100vw] h-[100vh] sm:w-[50vw] sm:h-96 bg-blue-500 flex flex-col items-start justify-start relative pb-2">
        <div className="sm:rounded-tl-md sm:rounded-tr-md header bg-black w-[100%] h-20 sm:min-h-[60px] sm:max-h-[60px] text-white text-2xl sm:text-xl flex items-center px-2">Group Chat</div>

        <AutoScroll run={run}>
          {messages.map((message, i) => {
            return <div key={i} className={`left max-w-[45%] px-4 rounded-xl h-auto bg-white break-words font-semibold my-2 clear-both p-2 ${message.id !== myid ? "float-left ml-2" : "float-right mr-2"}`}>{message.id !== myid ? message.name + " : " + message.msg : "You : " + message.msg}</div>
          })}
          {/* <div className="left max-w-[45%] px-4 rounded-xl h-auto bg-white break-words font-semibold ml-2 my-2 float-left clear-both p-2">This is left message</div>
          <div className="left max-w-[45%] px-4 rounded-xl h-auto bg-white break-all font-semibold mr-2 my-2 float-right p-2 clear-both">This is right message</div> */}
        </AutoScroll>

        <HiArrowNarrowDown onClick={onIconClc} id="icon" className='text-white cursor-pointer rounded-full sm:h-10 sm:w-10 h-14 w-14 absolute bottom-10 sm:bottom-4 right-10 p-2 animate-bounce ease-out bg-red-500' alt="" />
      </div>
      <div onDoubleClick={() => { setMsg("") }} className="w-[100vw] h-16 sm:w-[50vw] border-2 border-indigo-600 flex items-center px-3 rounded-bl-md rounded-br-md">
        <input value={msg} onChange={onChangeMessage} className="w-[90%] bg-transparent h-[60%] outline-none text-[20px]" placeholder="Enter message" type="text" />

        <div className="h-[100%] w-[10%] sm:w-[5%] sm:h-[70%] flex items-center cursor-pointer ease-in-out duration-300 hover:translate-x-1">
          <button id="sendbtn" onClick={onSendMessage}>
            <IoMdSend size={30} className="text-gray-800 hover:text-blue-900" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat