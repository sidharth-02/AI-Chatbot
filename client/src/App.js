import { useState } from 'react';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import { useMutation } from 'react-query';
import { fetchResponse } from './api';


function App() {
  
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) => setChat((prev) => [...prev, { sender: 'ai', message: data.message.replace(/^\n\n/, "") }])
  })

  const handleNewChat = () => {
    setChat([]);
  }

  const sendMessage = async (message) =>{
    await Promise.resolve(setChat((prev)=>[...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="bg-[#343541] h-screen py-6 sm:px-28 px-12 text-white overflow-hidden flex flex-col justify-between align-middle ">
      <div onClick={handleNewChat} className=' fixed left-10 top-8 p-3 bg-[#202123] rounded-md font-medium cursor-pointer '>
        +New Chat
      </div>
      <div className='uppercase font-bold mx-20 text-2xl text-center mb-3 bg-[#202123] py-5 box-shadow rounded-xl shadow-xl '>
        Bot-buddy
      </div>

      <div className=' h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center ' >
        <ChatBody chat={chat}/>
      </div>

      <div className='w-full max-w-4xl min-w-[20rem] self-center '>
        <ChatInput sendMessage= {sendMessage} loading={ mutation.isLoading}/>
      </div>

    </div>
  );
}
export default App;
