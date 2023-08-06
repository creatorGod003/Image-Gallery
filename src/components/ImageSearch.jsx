/* eslint-disable react/prop-types */

import { useRef, useState } from "react"

const ImageSearch = ({onTermChange,inputRef}) => {

    const [text, setText] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        onTermChange(text);
    }

    const searchRef = useRef(null);

  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center py-6'>
            <input ref={inputRef} type="text" className='outline-none px-2 py-2 rounded text-xl' value={text} onChange={
              (e)=>{
                setText(e.target.value)
              }
            } onKeyDown={(e)=>{
                if(e.key=='Enter'){
                    searchRef.current.click();
                }
            }} />
            <button ref={searchRef} id="search" className='p-2 bg-teal-400 text-md rounded focus:border-2 focus:border-black' type="submit">Search</button>
      </form>
  )
}

export default ImageSearch