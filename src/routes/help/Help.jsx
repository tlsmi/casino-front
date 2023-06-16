import React from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/help_page.css';

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help</h1>
      <div className="help-buttons">
        <Link to="/help/roulette" className="help-button">
          Roulette
        </Link>
        <Link to="/help/blackjack" className="help-button">
          Blackjack
        </Link>
        <Link to="/help/slot" className="help-button">
          Slot
        </Link>
      </div>
    </div>
  );
};

export default HelpPage;