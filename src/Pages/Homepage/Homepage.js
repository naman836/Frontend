import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Homepage.css'
import ClipLoader from 'react-spinners/ClipLoader'
function Homepage() {
  const [data, setData] = useState([])
  const [correctSentence, setCorrectSentence] = useState(false)
  const [correction,setCorrection ] = useState("")
  const [language, setLanguage] = useState('');
  const [word, setWords] = useState([]);
  const [loader, setLoader] = useState(true);
  const addWord = (newWord) => {
    setWords([...word, newWord]);
  };
  const options = [
    { label: 'English to Mandarin', value: 'English to Mandarin' },
    { label: 'English to Gujarati', value: 'English to Gujarati' },
    { label: 'English to Japanese', value: 'English to Japanese' },
    { label: 'English to Cantonese', value: 'English to Cantonese' },
    { label: 'English to Polish', value: 'English to Polish' },
    { label: 'English to Hindi', value: 'English to Hindi' },
    { label: 'English to Tamil', value: 'English to Tamil' },
    { label: 'English to Spanish', value: 'English to Spanish' },
    { label: 'English to Tagalog', value: 'English to Tagalog' },
    { label: 'English to Arabic', value: 'English to Arabic' },
    { label: 'English to Urdu', value: 'English to Urdu' },
    { label: 'English to French', value: 'English to French' },
    { label: 'English to German', value: 'English to German' },
  ];
  const handleWrongButtonClick = (sentenceId) => {
    setCorrectSentence(prevState => ({
      ...prevState,
      [sentenceId]: true
    }));
  };
  const handleChange=(e)=>{
    setCorrection(e.target.value)
  }
  useEffect(() => {
    fetchData()
  }, [language])
  const fetchData = async () => {
    console.log(language)
    setLoader(true)
    try {
      const response = await axios.get(`https://backend-25hi.onrender.com/api/sentence?language=${language}`);
      setLoader(false)
      console.log(response)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
  };
  const updateStatus = async (id, data) => {
    setLoader(true)
    try {
      const response = await axios.put(`https://backend-25hi.onrender.com/api/sentence/status/${id}`, { status: data });
      console.log(response)
      fetchData()
    }
    catch (err) {
      console.log(err)
    }
  }
  const updateWord = async (id, data) => {
    setLoader(true)
    updateStatus(id, "Similar")
    try {
      const response = await axios.put(`https://backend-25hi.onrender.com/api/sentence/word/${id}`, { words: data });
      setWords([])
    }
    catch (err) {
      console.log(err)
    }
  }
  const updateCorrection = async (id, data) => {
    setLoader(true)
    updateStatus(id, "Similar")
    try {
      const response = await axios.put(`https://backend-25hi.onrender.com/api/sentence/correction/${id}`, { correction: data});
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSelectChange = (event) => {
    setLanguage(event.target.value);
  };
  const handlesubmit = (id, Translation) => {
    if (Translation !==correction){
      updateCorrection(id, { correctSent: correction }); }
      if(word.length>0)
      {
        updateWord(id,{word:word})
      }
    fetchData()
      toast.success("Saved successfully")
  };
  
  return (
    <> 
    
    <div>
       
          <div className='loader'>
            <ClipLoader
              color={'#52ab98'}
              loading={loader}
              size={25}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
         
          {/* <h1>⚫ Welcome to aavaaz.ai</h1> */}
        <select id="correctionInput" value={language} onChange={handleSelectChange}>
          <option value={''}>All</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {data
          .filter(sentence => !sentence.status)
          .map((sentence, index) => (
            <div>
              <div class="sentence" data-label="Sentence">{sentence.Sentence}</div>
              <div class="translation" data-label="Translation">{sentence.Translation}</div>
          <div class="message"></div>
          <div class="buttons">
                <button onClick={() => updateStatus(sentence._id, "Similar")} id="rightBtn">✅ Right</button>
                <button onClick={() => { handleWrongButtonClick(sentence._id); setCorrection(sentence.Translation)}} id="wrongBtn">❌ Wrong</button>
          </div>
          {correctSentence[sentence._id] && ( 
            <div>
              <div className='word'>
                    {sentence.Translation.split(" ").map((item)=>(
                    word.includes(item) ? (<div
                      className={`wordButtons ${word.includes(item) ? 'wordGrey' : ''}`}
                    >{item}</div>):(<div
                      onClick={() => addWord(item)}
                      className={`wordButtons ${word.includes(item) ? 'wordGrey' : ''}`}
>{item}</div>)
                  ))}
                  </div>
                  <input value={correction} onChange={handleChange} type="text" id="correctionInput" placeholder="Enter your comments/corrected version here"   />
                  <button onClick={() => handlesubmit(sentence._id, sentence.Translation)} id="submitBtn">Submit</button>
              </div>)}
              </div>
          ))}
    </div>
    </>
  )
}

export default Homepage
