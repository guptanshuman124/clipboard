import { useState } from 'react';
import './receive.css';
import copyImg from './assets/copy-svgrepo-com.svg';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(receivedMessage);
  };

  const handleReceive = async () => {
    setReceivedMessage('');
    if (code.length !== 4) {
      alert('Invalid code');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const { message , success } = await response.json();
      if(success){
        setReceivedMessage(message);
      }else{
        setCode('');
        alert(message);
      }
    } catch (error) {
      console.error('Error receiving message:', error);
      alert('Invalid code');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCode(value);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={code}
        onChange={handleInput}
        maxLength={4}
        pattern="\d*"
      />
      <button onClick={handleReceive}>Receive</button>
      {receivedMessage && (
        <div className="message-container">
          <button onClick={handleCopy} className='copybtn'>
            <img src={copyImg} alt="Copy" className="copy-icon" />
          </button>
          <textarea
            value={receivedMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Receive;