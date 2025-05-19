import React, { useState } from 'react'

const InputForm = ({onGenerate=()=>{}}) => {
  const [prompt,setPrompt]=useState("");
  const [error,setError]=useState("");

  const handkeSubmit=(e)=>{
    e.preventDefault();
    if(!prompt.trim()){
      setError("Enter something to get result!");
      return;
    }
    setError("");
    onGenerate(prompt);
    setPrompt("");
    
  }

  return (
    <form className='max-w-md m-20 mx-auto' onSubmit={handkeSubmit}>
      <input type='text' placeholder='Enter your prompt....' value={prompt} onChange={(e)=>setPrompt(e.target.value)} className='border border-gray-300 rounded px-4 py-2 w-72'/>
      <button type='submit' className='bg-green-600 text-white px-4 py-2 rounded '>Generate</button>
      {error&& <p className='text-red-500 text-sm'>{error}</p>}
    </form>
  )
}

export default InputForm