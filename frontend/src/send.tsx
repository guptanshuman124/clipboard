import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './send.css';
import './toast.css';
import resetImg from './assets/reset-svgrepo-com.svg';

const Send = () => {
  const [message, setMessage] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setUniqueCode('');
    if (message === '') {
      toast.error('Please enter a message before sending.');
      return; 
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setUniqueCode(data.uniqueCode);
      setIsLoading(false);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessage('');
  };

  return (
    <div className="container">
      <ToastContainer />
      <button onClick={handleReset} className='resetbtn'>
        <img src={resetImg} alt="reset" className="reset-icon" />
      </button>
      <textarea className='input'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        disabled={isLoading}
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