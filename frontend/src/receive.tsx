import { useState } from 'react';
import './receive.css';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleReceive = async () => {
    if (code.length != 4) {
      alert('invlid code');
      return;
    }
    try {
      const responce =await fetch('/api/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      console.log(responce);

      const data = await responce.json();
      setReceivedMessage(data.message);
    } catch (error) {
      console.error('Error receiving message:', error);
      setReceivedMessage('Internal Server Error');
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
          <p>{receivedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Receive;