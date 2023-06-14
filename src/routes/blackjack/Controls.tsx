import React, { useState, useEffect } from 'react';
import './styles/Controls_style.css';

type ControlsProps = {
  balance: number,
  gameState: number,
  buttonState: any,
  betEvent: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ balance, gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
  const [amount, setAmount] = useState(10);
  const [inputStyle, setInputStyle] = useState<string>(''); // Cambiar el tipo a string

  useEffect(() => {
    validation();
  }, [amount, balance]);

  const validation = () => {
    if (amount > balance) {
      setInputStyle('inputError');
      return false;
    }
    if (amount < 1) {
      setInputStyle('inputError');
      return false;
    }
    setInputStyle('input');
    return true;
  }

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  }

  const onBetClick = () => {
    if (validation()) {
      betEvent(Math.round(amount * 100) / 100);
    }
  }

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className="controlsContainer">
          <div className="betContainer">
            <h4>Amount:</h4>
            <input autoFocus type='number' value={amount} onChange={amountChange} className={inputStyle} />
          </div>
          <button onClick={() => onBetClick()} className="button">Bet</button>
        </div>
      );
    }
    else {
      return (
        <div className="controlsContainer">
          <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className="button">Hit</button>
          <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className="button">Stand</button>
          <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className="button">Reset</button>
        </div>
      );
    }
  }

  return (
    <>
      {getControls()}
    </>
  );
}

export default Controls;
