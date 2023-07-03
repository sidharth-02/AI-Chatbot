import React from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';

const ChatBody = ({chat}) => {

  const aiChat = "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto "

  const parent = useRef(null);
  useEffect( () => {
    parent.current && autoAnimate(parent.current);
  }, [parent])

  const bottomRef = useRef(null);
  useEffect( () => {
    bottomRef.current.scrollIntoView({behavior: "smooth"});
  },[chat])

  return (
    <div className="flex flex-col gap-4" ref={parent}>

        {chat.map((message, i)=> {
            return(
              <div 
                key={i} 
                className= {`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${message.sender === 'ai' && aiChat}`}
              >
                <pre className='whitespace-pre-wrap '>
                  <span>{message.message}</span>
                </pre>
              </div>
            )
        })}

        <div ref={bottomRef} className='h-3'></div>

    </div>
  )
}

export default ChatBody