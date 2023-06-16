import React from 'react';
import './Help_games.css';

const RouletteExplanation = () => {
  return (
    <div className="slot-machine-container">
      <h1 className="title">How Roulette Works</h1>
      <div className="content">
        <p>
          Roulette is a classic casino game that is played with a spinning wheel and a small ball.
          The objective of the game is to predict which numbered pocket the ball will land in.
        </p>
        <p>
          Here is a step-by-step explanation of how roulette works:
        </p>
        <ol>
          <li>
            <strong>Wheel:</strong> The roulette wheel consists of numbered pockets ranging from 0 to 36 (in European roulette) or 00 to 36 (in American roulette). The numbers are alternately colored in red and black, and the 0 or 00 is green.
          </li>
          <li>
            <strong>Betting:</strong> Before the wheel is spun, players place their bets on the roulette table, which contains various betting options such as individual numbers, groups of numbers, colors, and more.
          </li>
          <li>
            <strong>Spin:</strong> Once all bets are placed, the croupier (dealer) spins the wheel in one direction and rolls the ball in the opposite direction along the track that runs around the outer edge of the wheel.
          </li>
          <li>
            <strong>Ball Lands:</strong> As the wheel slows down, the ball loses momentum and eventually falls into one of the numbered pockets. The winning number and color are determined by the pocket in which the ball lands.
          </li>
          <li>
            <strong>Payouts:</strong> Payouts are based on the type of bet placed. Different bets have different odds and payout ratios. For example, betting on a single number (straight bet) has higher odds but pays out more, while betting on red or black (even money bet) has lower odds but pays out 1:1.
          </li>
        </ol>
        <p>
          It's important to note that roulette is a game of chance, and each spin is independent of the previous ones. There are various betting strategies that players can use, but there is no guaranteed way to predict or influence the outcome of the game. Enjoy the excitement and entertainment that roulette offers!
        </p>
      </div>
    </div>
  );
};

export default RouletteExplanation;
