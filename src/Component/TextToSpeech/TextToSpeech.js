import React, { useState } from 'react';
import './TextToSpeech.css'
const TextToSpeech = () => {
    const [text, setText] = useState('');

    const speak = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    return (
        <div>
            <textarea
            className='ttsarea'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to speak"
                rows={3}
                cols={50}
            />
            <button onClick={speak}>Speak</button>
        </div>
    );
};

export default TextToSpeech;
