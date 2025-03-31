import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './receive.css';
import './toast.css';
import copyImg from './assets/copy-svgrepo-com.svg';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(receivedMessage);
    toast.success('Message copied to clipboard!');
  };

  const handleReceive = async () => {
    setReceivedMessage('');
    if (code.length !== 4) {
      toast.error('Invalid code');
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/receive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const { message, success } = await response.json();
      if (success) {
        setReceivedMessage(message);
        toast.success('Message received successfully!');
      } else {
        setCode('');
        toast.error(message);
      }
    } catch (error) {
      console.error('Error receiving message:', error);
      toast.error('Failed to receive message');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCode(value);
  };

  return (
    <div className="container">
      <ToastContainer />
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
          <button onClick={handleCopy} className="copybtn">
            <img src={copyImg} alt="Copy" className="copy-icon" />
          </button>
          <textarea
            value={receivedMessage}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default Receive;