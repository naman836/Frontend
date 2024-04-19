import React, { useEffect } from 'react';
import Homepage from './Pages/Homepage/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextToSpeech from './Component/TextToSpeech/TextToSpeech';
import SpeechToText from './Component/SpeechToText/SpeechToText';
const App = () => {
  useEffect(()=>{
    document.addEventListener('contextmenu',handleContextMenu)
    return()=>(
      document.removeEventListener("contextmenu",handleContextMenu)
    )
  })
  const handleContextMenu=(e)=>{
e.preventDefault()
  }
  return (
    <> 
    {/* <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>List of Sentences</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data
          .filter(sentence => !sentence.status)  
          .map((sentence, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                <p>{sentence.sent1}</p>
                <p>{sentence.sent2}</p>
              </div>
              <div>
                <button onClick={()=>updateStatus(sentence._id,"Similar")} style={{ marginRight: '10px', color: 'green' }}>Similar</button>
                <button onClick={() => updateStatus(sentence._id, "Dissimilar")} style={{ color: 'red' }}>Dissimilar</button>
              </div>
            </li>
          ))}
      </ul>
    </div> */}
      <ToastContainer position='top-center' autoClose={1000} theme='dark' draggable />
    <Homepage/>
    {/* <TextToSpeech/> */}
    {/* <SpeechToText/> */}
    </>
  );
};

export default App;
