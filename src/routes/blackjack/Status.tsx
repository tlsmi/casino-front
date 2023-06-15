import React from 'react';
import '../blackjack/styles/Status_style.css';

type StatusProps = {
  message: string,
  balance: number,
  winnings: number
};

const Status: React.FC<StatusProps> = ({ message, balance, winnings }) => {
  let displayedMessage = message;

  if (message === "You Win!") {
    displayedMessage = `${message} +$${winnings}!`;
  } else if (message === "Dealer Wins!" || message === "Bust!") displayedMessage = `${message} -$${winnings}`
  return (
    <div className="statusContainer">
      <div className="status">
        <h1 className="value">{displayedMessage}</h1>
      </div>
      <div className="balance">
        <h1 className="value">{balance !== undefined ? `$${balance}` : '$0'}</h1>
      </div>
    </div>
  );
}

export default Status;