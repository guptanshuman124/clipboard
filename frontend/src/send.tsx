import { useState } from 'react';
import './send.css';
import resetImg from './assets/reset-svgrepo-com.svg';

const Send = () => {
  const [message, setMessage] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setUniqueCode('');
    if (message === '') {
      alert('Please enter a message before sending.');
      return; 
    }

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      alert('Failed to send message');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessage('');
  };

  return (
    <div className="container">
      <button onClick={handleReset} className='resetbtn'>
        <img src={resetImg} alt="reset" className="reset-icon" />
      </button>
      <textarea className='input'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      {uniqueCode && (
        <div className="code-received">
          <p>Your Code: {uniqueCode}</p>
        </div>
      )}
    </div>
  );
};

export default Send;
