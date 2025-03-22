import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Send from './send';
import Receive from './receive';

const App = () => {
  const [isSend, setIsSend] = useState(true);

  const toggleIsSend = () => {
    setIsSend(!isSend);
  };

  return (
    <StrictMode>
      <div>
        <h1>ONCV</h1>
      </div>
      <div>
        <button onClick={toggleIsSend}>
          {isSend ? 'Switch to Receive' : 'Switch to Send'}
        </button>
        {isSend ? <Send /> : <Receive />}
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);