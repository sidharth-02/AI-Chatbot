import React, { useState } from 'react'

const ChatInput = ({sendMessage, loading}) => {

  const [value, setValue] = useState("")

  const handleSubmit = () => {
    if( value === "" ) return;
    sendMessage({ sender: "user", message: value });
    setValue("");
    // console.log("submitted");
  }

  return (
    <div className=' w-full bg-white bg-opacity-10 max-h-40 rounded-lg py-4 overflow-auto relative '>
        {loading? (
            <img src='./loader.gif' alt='Loading...' className='w-8 m-auto'/>
          ):(
            <>
                <textarea
                  onKeyDown={(e) => {
                    e.keyCode === 13 && e.shiftKey === false && handleSubmit();
                  }}
                  rows={1}
                  className=' border-0 bg-transparent px-6 outline-none w-11/12 '
                  value={value}
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='Ask me something...'
                />
                <img
                  onClick={handleSubmit}
                  src='./send.png'
                  width={20} alt="send-button"
                  className='absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125 '
                />
            </>
          )
        }

    </div>
  )
}

export default ChatInput