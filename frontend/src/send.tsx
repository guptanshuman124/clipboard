import { useState } from 'react';
import './send.css';

const Send = () => {
  const [message, setMessage] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');

  const handleSend = async () => {
    if (message === '') {
      alert('Please enter a message before sending.');
      return; 
    }

    try {
      const response = await fetch('http://localhost:3000/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message}),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setUniqueCode(data.uniqueCode);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="container">
      <textarea className='input'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSend}>Send</button>
      {uniqueCode && (
        <div className="code-received">
          <p>Your Code: {uniqueCode}</p>
        </div>
      )}
    </div>
  );
};

export default Send;
