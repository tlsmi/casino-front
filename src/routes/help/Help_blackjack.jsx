import React from 'react';
import './Help_games.css';

const BlackjackExplanation = () => {
  return (
    <div className="slot-machine-container">
      <h1 className="title">How Blackjack Works</h1>
      <div className="content">
        <p>
          Blackjack, also known as twenty-one, is a popular card game played in casinos.
          The objective of the game is to have a hand with a total value closer to 21 than the dealer's hand without exceeding 21.
        </p>
        <p>
          Here is a step-by-step explanation of how blackjack works:
        </p>
        <ol>
          <li>
            <strong>Card Values:</strong> In blackjack, numbered cards are worth their face value, face cards (King, Queen, Jack) are worth 10, and an Ace can be worth 1 or 11, depending on the player's choice.
          </li>
          <li>
            <strong>Dealing:</strong> The game starts with the dealer dealing two cards to each player and two cards to themselves. One of the dealer's cards is face-up, while the other is face-down.
          </li>
          <li>
            <strong>Player's Turn:</strong> Each player takes turns deciding whether to "hit" (receive an additional card) or "stand" (keep their current hand). The goal is to get a hand value as close to 21 as possible without going over.
          </li>
          <li>
            <strong>Dealer's Turn:</strong> Once all players have completed their turns, the dealer reveals their face-down card. The dealer must follow a specific set of rules, usually hitting until they reach a hand value of 17 or higher.
          </li>
          <li>
            <strong>Winning and Losing:</strong> The outcome of each hand is determined by comparing the total value of the player's hand to the dealer's hand. If the player's hand value exceeds 21, they bust and lose. If the player's hand value is higher than the dealer's without busting, they win. If the player and the dealer have the same hand value, it's a tie or a push, and the player's bet is returned.
          </li>
        </ol>
        <p>
          Blackjack offers various additional options and side bets, such as splitting pairs, doubling down, and taking insurance. Each casino may have slightly different rules and variations of the game, so it's important to familiarize yourself with the specific rules before playing.
        </p>
      </div>
    </div>
  );
};

export default BlackjackExplanation;
