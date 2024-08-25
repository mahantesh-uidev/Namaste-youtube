import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomNames, makeRandomMessage } from '../utils/helper';

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");
    const dispatch = useDispatch();
    const chatMessages = useSelector((store) => store.chat.messages);

    useEffect(() => {
       const i = setInterval(() => {
        // API Polling
        dispatch(addMessage({
            name: generateRandomNames(),
            message: makeRandomMessage(20) + " 🚀",
        }))
        }, 2000);

        return () =>  clearInterval(i);
    }, []);

    const handleLiveMessageSubmit = (e) => {
        e.preventDefault();
        dispatch(addMessage({
            name: "Mahantesh Hiremath",
            message: liveMessage 
        }));
        setLiveMessage("");
    }
  return (
    <>
    <div className='w-full h-[500px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
        {chatMessages.map((c, index) => <ChatMessage name={c.name} message={c.message} key={index} />)}
    </div>
    <form className='w-full p-2 ml-2 border border-black' onSubmit={handleLiveMessageSubmit}>
        <input value={liveMessage} placeholder='Enter your live chat message here...' onChange={(e) => setLiveMessage(e.target.value)} className='w-80 px-2 outline-none' type="text" />
        <button className='px-2 mx-2 bg-green-100'>Send</button>
    </form>
    </>
  )
}

export default LiveChat