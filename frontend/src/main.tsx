import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Send from './send';
import Receive from './receive';
import { Analytics } from "@vercel/analytics/react"
import './main.css';

const App = () => {
  const [isSend, setIsSend] = useState(true);

  const toggleIsSend = () => {
    setIsSend(!isSend);
  };

  return (
    <StrictMode>
      <Analytics />
      <div className="header">
        <h1>ONCV</h1>
      </div>
      <div className="toggle">
        <button onClick={toggleIsSend}>
          {isSend ? 'Switch to Receive' : 'Switch to Send'}
        </button>
        {isSend ? <Send /> : <Receive />}
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);