import React from 'react';
import './styles/Hand_style.css';
import Card from './Card';

type HandProps = {
  title: string,
  cards: any[]
};

const Hand: React.FC<HandProps> = ({ title, cards }) => {
  const getTitle = () => {
    if (cards.length > 0) {
      return (
        <h1 className="title">{title}</h1>
      );
    }
  }
  return (
    <div className="handContainer">
      {getTitle()}
      <div className="cardContainer">
        {cards.map((card: any, index: number) => {
          return (
            <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />
          );
        })}
      </div>
    </div>
  );
}

export default Hand;