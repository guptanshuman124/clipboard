import { useState } from 'react';
import './receive.css';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const hadleCopy = () => {
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

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 4-digit code"
          maxLength={4}
        />
      </div>
      <div className="button-container">
        <button onClick={handleReceive}>Receive</button>
      </div>
      {receivedMessage && (
        <div className="message-container">
          <button onClick={hadleCopy}>copy to clipboard</button>
          <p>{receivedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Receive;