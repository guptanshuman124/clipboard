import { useState } from 'react';
import './receive.css';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleReceive = () => {
    // Simulate receiving a message from the server based on the code
    // In a real application, you would make an API call here
    if (code === '1234') { // Example code for demonstration
      setReceivedMessage('This is the received message from the server.');
    } else {
      alert('Invalid code. Please try again.');
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