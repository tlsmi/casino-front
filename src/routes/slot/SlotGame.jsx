import React, { useEffect, useRef, useState, ReactDOM } from "react";
import "./SlotGame.css";

const SlotGame = () => {
  const items = ["🍒", "🍇", "🍊", "🍋", "🔔", "💵", "💰", "💎"];
  const valor = [1, 2, 3, 4, 5, 10, 20, 50];
  const doorRefs = [useRef(null), useRef(null), useRef(null)];

  const [credito, setCredito] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [apuesta, setApuesta] = useState(Number(0));
  const [resultado, setResultado] = useState(["❓", "❓", "❓"]);
  const [resultadoFinal, setResultadoFinal] = useState(["❓", "❓", "❓"]);

  const handleChange = (event) => {
    console.log(event.target.value);
    if (Number(event.target.value) < 0) setApuesta(0);
    else setApuesta(event.target.value);
  };

  const spin = async () => {
    try {
      const response = await fetch("http://localhost:8080/games/slot/spin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ apuesta }),
      });
      const data = await response.json();
      if (data.message !== "" && !data.resultado) {
        document.getElementById("message").style.display = "block";
        setMensaje(data.message);
      } else if (data.message !== "" && data.resultado) {
        document.getElementById("message").style.display = "block";
        setMensaje(data.message);
        console.log("JSON resultado: " + data.resultado);
        setResultado(data.resultado);
        setResultadoFinal(data.total);
        setCredito(data.creditos);
        console.log("LOCAL reslutado: " + resultado);
        //init(false, 3, 4);
      } else {
        document.getElementById("message").style.display = "none";
        console.log("JSON resultado: " + data.resultado);
        setResultado(data.resultado);
        setResultadoFinal(data.total);
        setCredito(data.creditos);
        console.log("LOCAL reslutado: " + resultado);
        //init(false, 3, 4);
      }
      getCredito();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCredito();
  }, []);

  // Definimos la función para la solicitud Fetch
  const getCredito = async () => {
    try {
      const response = await fetch('http://localhost:8080/credito', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("token"),
        }
      });
      const data = await response.json();
      setCredito(data.credito);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <div id="app">
          <p className="creditoSlot">
            Coins: <span id="credito">{credito}</span>
          </p>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Fruta</th>
                <th>Bono</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.repeat(3)}</td>
                  <td>{valor[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="doors">
          <div id="door0" className="door" ref={doorRefs[0]}>
            <div id="box0" className="boxes">
              <div className="box">{resultadoFinal[0]}</div>
            </div>
          </div>
          <div id="door1" className="door" ref={doorRefs[1]}>
            <div id="box1" className="boxes">
              <div className="box">{resultadoFinal[1]}</div>
            </div>
          </div>
          <div id="door2" className="door" ref={doorRefs[2]}>
            <div id="box2" className="boxes">
              <div className="box">{resultadoFinal[2]}</div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button id="spinner" onClick={() => spin()}>
           <span> Spin All </span>
          </button>
        </div>
        <div id="message" className="message" style={{ display: 'none' }}>
          <span>{mensaje}</span>
        </div>

        <div>
          <p className="apuestaSlot">
            <label htmlFor="apuesta">Apostar{" "}</label>
            <input
              type="number"
              name="apuesta"
              id="apuesta"
              min={0}
              value={apuesta}
              onChange={handleChange}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlotGame;
