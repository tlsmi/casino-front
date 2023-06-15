import React, { useState, useEffect } from "react";
import Status from "./Status";
import Controls from "./Controls";
import Hand from "./Hand";
import jsonData from "./deck.json";

const App: React.FC = () => {
  enum GameState {
    BET,
    INIT,
    USER_TURN,
    DEALER_TURN,
  }

  enum Deal {
    USER,
    DEALER,
    HIDDEN,
  }

  enum Message {
    BET = "Place a Bet!",
    HIT_STAND = "Hit or Stand?",
    BUST = "Bust!",
    USER_WIN = "You Win!",
    DEALER_WIN = "Dealer Wins!",
    TIE = "Tie!",
  }

  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck]: any[] = useState(data);

  const [userCards, setUserCards]: any[] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.BET);
  const [message, setMessage] = useState(Message.BET);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true,
  });
  const [winnings, setWinning] = useState(0);

  useEffect(() => {
    getCredito();
  }, []);

  // Definimos la función para la solicitud Fetch
  const getCredito = async () => {
    try {
      const response = await fetch("http://localhost:8080/credito", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });
      const data = await response.json();
      setBalance(data.credito);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (gameState === GameState.INIT) {
      start();
    }
  }, [gameState]);

  const start = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/games/blackjack/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: JSON.stringify({ apuesta: bet }),
        }
      );
      const data = await response.json();
      setBalance(data.balance);
      setBet(data.betAmount);

      let userDeck = data.player.hand;
      let dealerDeck = data.dealer.hand;

      for (let i = 0; i < userDeck.length; i++) {
        let palo = userDeck[i].palo;
        let score = userDeck[i].rank;
        if (palo !== null) palo = elegirPalo(palo);
        if (score !== null) score = getValue(score);
        dealCard(Deal.USER, score, palo);
      }

      for (let i = 0; i < dealerDeck.length; i++) {
        let palo = dealerDeck[i].palo;
        let score = dealerDeck[i].rank;
        if (palo !== null) palo = elegirPalo(palo);
        if (score !== null) score = getValue(score);
        if (i === 0) dealCard(Deal.HIDDEN, score, palo);
        else dealCard(Deal.DEALER, score, palo);
      }

      setGameState(GameState.USER_TURN);
      setMessage(Message.HIT_STAND);
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  const elegirPalo = (palo: string) => {
    if (palo === "PICAS") return "♠";
    else if (palo === "DIAMANTES") return "♦";
    else if (palo === "TREBOLES") return "♣";
    else if (palo === "CORAZONES") return "♥";
    return null;
  };

  const getValue = (rank: string) => {
    switch (rank) {
      case "AS":
        return "A";
      case "DOS":
        return "2";
      case "TRES":
        return "3";
      case "CUATRO":
        return "4";
      case "CINCO":
        return "5";
      case "SEIS":
        return "6";
      case "SIETE":
        return "7";
      case "OCHO":
        return "8";
      case "NUEVE":
        return "9";
      case "DIEZ":
        return "10";
      default:
        return rank;
    }
  };

  useEffect(() => {
    calculate(userCards, setUserScore);
    setUserCount(userCount + 1);
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GameState.USER_TURN) {
      if (userScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (userScore > 21) {
        bust();
      }
    }
  }, [userCount]);

  useEffect(() => {
    if (gameState === GameState.DEALER_TURN) {
      if (dealerScore >= 17) {
        checkWin();
      } else {
        getCardDealer();
      }
    }
  }, [dealerCount]);

  const getCardDealer = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/games/blackjack/stand",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );
      const data = await response.json();
      let dealerDeck = data.hand;

      for (let i = dealerDeck.length - 1, count = 0; count < 1; count++) {
        let palo = dealerDeck[i].palo;
        let score = dealerDeck[i].rank;
        if (palo !== null) palo = elegirPalo(palo);
        if (score !== null) score = getValue(score);
        dealCard(Deal.DEALER, score, palo);
      }
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  const resetGame = () => {
    console.clear();
    setDeck(data);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setBet(0);
    setWinning(0);

    setGameState(GameState.BET);
    setMessage(Message.BET);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true,
    });
  };

  const placeBet = (amount: number) => {
    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.INIT);
  };

  const drawCard = (dealType: Deal) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
      console.log("Remaining Cards:", deck.length);
      switch (card.suit) {
        case "PICAS":
          dealCard(dealType, card.value, "♠");
          break;
        case "DIAMANTES":
          dealCard(dealType, card.value, "♦");
          break;
        case "TREBOLES":
          dealCard(dealType, card.value, "♣");
          break;
        case "CORAZONES":
          dealCard(dealType, card.value, "♥");
          break;
        default:
          break;
      }
    } else {
      alert("All cards have been drawn");
    }
  };

  const dealCard = (dealType: Deal, value: string, suit: string) => {
    switch (dealType) {
      case Deal.USER:
        userCards.push({ value: value, suit: suit, hidden: false });
        setUserCards([...userCards]);
        break;
      case Deal.DEALER:
        dealerCards.push({ value: value, suit: suit, hidden: false });
        setDealerCards([...dealerCards]);
        break;
      case Deal.HIDDEN:
        dealerCards.push({ value: value, suit: suit, hidden: true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
    }
  };

  const revealCard = () => {
    dealerCards.filter((card: any) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards]);
  };

  const calculate = (cards: any[], setScore: any) => {
    let total = 0;
    cards.forEach((card: any) => {
      if (card.hidden === false && card.value !== "A") {
        switch (card.value) {
          case "K":
            total += 10;
            break;
          case "Q":
            total += 10;
            break;
          case "J":
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card: any) => {
      return card.value === "A";
    });
    aces.forEach((card: any) => {
      if (card.hidden === false) {
        if (total + 11 > 21) {
          total += 1;
        } else if (total + 11 === 21) {
          if (aces.length > 1) {
            total += 1;
          } else {
            total += 11;
          }
        } else {
          total += 11;
        }
      }
    });
    setScore(total);
  };

  const hit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/games/blackjack/hit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );
      const data = await response.json();
      let userDeck = data.hand;

      for (let i = userDeck.length - 1, count = 0; count < 1; count++) {
        let palo = userDeck[i].palo;
        let score = userDeck[i].rank;
        if (palo !== null) palo = elegirPalo(palo);
        if (score !== null) score = getValue(score);
        dealCard(Deal.USER, score, palo);
      }
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  const stand = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.DEALER_TURN);
    revealCard();
  };

  const bust = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setMessage(Message.BUST);
  };

  const checkWin = () => {
    if (userScore > dealerScore || dealerScore > 21) {
      win("WIN");
      setMessage(Message.USER_WIN);
    } else if (dealerScore > userScore) {
      setWinning(bet);
      setMessage(Message.DEALER_WIN);
    } else {
      win("TIE");
      setMessage(Message.TIE);
    }
  };

  const win = async (result:string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/games/blackjack/win",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: JSON.stringify({ apuesta: bet, resultado: result}),
        });
        const data = await response.json();

        if (result === "WIN") setWinning(bet * 2);
        else if (result === "TIE") setWinning(bet);
        setBalance(data);
        getCredito();
    } catch (err) {
      console.error("Error: " + err);
    }
  }

  return (
    <>
      <div className="main">
        <Status message={message} balance={balance} winnings={winnings} />
        <Controls
          balance={balance}
          gameState={gameState}
          buttonState={buttonState}
          betEvent={placeBet}
          hitEvent={hit}
          standEvent={stand}
          resetEvent={resetGame}
        />
        <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
        <Hand title={`Your Hand (${userScore})`} cards={userCards} />
      </div>
    </>
  );
};

export default App;
