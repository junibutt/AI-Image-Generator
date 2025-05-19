import { useState, version } from 'react'
import './App.css'
import InputForm from './InputForm'
import axios from "axios";
function App() {
  const [image,setImage]=useState(null);
  const [loading,setLoading]=useState(false);

  const generateImage=async (prompt)=>{
    setLoading(true);
    setImage(null);
    try{
      const response = await axios.post("https://api.replicate.com/v1/predictions",
        {
          version: "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
          input:{
            prompt:prompt,
            width:512,
            height:512,
            refine:"expert_ensemble_refiner",
            "apply_watermark": false,
            "num_inference_steps": 25,
          },
        },
        {
          headers:{
            Authorization:`Token ${import.meta.env.VITE_REPLICATE_API_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "wait",
          },
        }
      );

      const result =response.data;
      if(result.output){
        setImage(result.output[0]);
      }
    } catch(error) {
      console.error("img generation failed"),
      alert("There's something wrong.Try again.")
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold mb-4'>AI Image Generator</h1>
      <InputForm onGenerate={generateImage}/>
      {loading && <p className='mt-4 text-gray-600 '>Generating Img...</p>}

      {
        image&&(
          <div className='mt-6'>
            <img src={image}
            className='rounded shadow-md max-w-md'/>
          </div>
        )
      }
    </div>
      
  
  )
}

export default App
