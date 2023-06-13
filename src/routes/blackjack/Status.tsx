import React from 'react';
import '../blackjack/styles/Status_style.css';

type StatusProps = {
  message: string,
  balance: number
};

const Status: React.FC<StatusProps> = ({ message, balance }) => {
  return (
    <div className="statusContainer">
      <div className="status">
        <h1 className="value">{message}</h1>
      </div>
      <div className="balance">
        <h1 className="value">${balance}</h1>
      </div>
    </div>
  );
}

export default Status;