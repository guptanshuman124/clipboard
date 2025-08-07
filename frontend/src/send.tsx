import { useState ,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './send.css';
import './toast.css';
import resetImg from './assets/reset-svgrepo-com.svg';

const Send = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message === '') {
      toast.error('Please enter a message before sending.',{autoClose:1500});
      return; 
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/send`, {
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
      setIsLoading(false);
      toast.success('Message sent successfully!', { autoClose: 1500 });
      setMessage('');
      toast.success("Code copied to clipboard: " + data.uniqueCode,{autoClose: 2500});
      navigator.clipboard.writeText(data.uniqueCode);
    } catch (error) {
      toast.error('Failed to send message',{autoClose: 1500 });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessage('');
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading) {
        handleSend();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [message, isLoading]);

  return (
    <div className="container">
      <ToastContainer />
      <button onClick={handleReset} className='resetbtn'>
        <img src={resetImg} alt="reset" className="reset-icon" />
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        disabled={isLoading}
      />
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default Send;