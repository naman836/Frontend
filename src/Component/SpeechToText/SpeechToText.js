import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechToText.css'
const SpeechToText = () => {
    const [text, setText] = useState('');
    const { transcript, resetTranscript } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        resetTranscript();
        setText('');
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <div>
                <textarea className='areastt' value={transcript} onChange={handleInputChange} />
            </div>
            <button onClick={startListening}>Start</button>
            <button onClick={stopListening}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default SpeechToText;
