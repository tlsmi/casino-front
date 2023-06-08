import React, { useEffect, useRef, useState, ReactDOM } from "react";
import "./SlotGame.css";

const SlotGame = () => {
  const items = ["🍒", "🍇", "🍊", "🍋", "🔔", "💵", "💰", "💎"];
  const valor = [1, 2, 3, 4, 5, 10, 20, 50];
  const doorRefs = [useRef(null), useRef(null), useRef(null)];

  const [credito, setCredito] = useState(Number(100));
  const [mensaje, setMensaje] = useState("");
  const [apuesta, setApuesta] = useState(Number(0));
  const [resultado, setResultado] = useState(["❓", "❓", "❓"]);
  const [resultadoFinal, setResultadoFinal] = useState(["❓", "❓", "❓"]);

  let doors = document.querySelectorAll(".door");
  let columnNumber = null;

  const handleChange = (event) => {
    console.log(event.target.value);
    if (Number(event.target.value) < 0) setApuesta(0);
    else setApuesta(event.target.value);
  };

  const handleClick = (column) => {
    spinColumn(column);
    if (column >= 0 && column <= 2) {
      document.getElementById(`spinColumn${column}`).style.display = "none";
    }
  };

  const spinColumn = async (column) => {
    // Realizar la solicitud POST al backend para generar el resultado de la columna
    try {
      const response = await fetch(
        "http://localhost:3000/games/slot/spinColumn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ column }),
        }
      );
      const data = await response.json();
      if (data.mensaje !== "") setMensaje(data.mensaje);
      else {
        resultado = data.resultado;
        console.log(resultado);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const spin = async () => {
    try {
      const response = await fetch("http://localhost:8082/games/slot/spin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        init(false, 3, 4);
      } else {
        document.getElementById("message").style.display = "none";
        console.log("JSON resultado: " + data.resultado);
        setResultado(data.resultado);
        setResultadoFinal(data.total);
        setCredito(data.creditos);
        console.log("LOCAL reslutado: " + resultado);
        init(false, 3, 4);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const init = async (firstInit = true, groups = 1, duration = 1) => {
    if (firstInit) {
      doors = document.querySelectorAll(".door");
      setCredito(100);
    }
    doors = [...document.querySelectorAll(".door")]; // Convertir NodeList a array
    doors.map((door, index) => {
      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      if (!firstInit) {
        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );
        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              if (index > 0) this.removeChild(box);
            });
            // door.replaceChild(boxesClone, boxes);
          },
          { once: true }
        );
      }
      console.log("HOLA: " + resultado[index]);
      const pool = resultado[index];

      /*       for (let i = pool.length - 1; i >= 0; i--) {
        const box = (
          <div
            className="box"
            style={{
              width: `${door.clientWidth}px`,
              height: `${door.clientHeight}px`,
            }}
          >
            {pool[i]}
          </div>
        );
      } */
    });
  };

  useEffect(() => {
    //init();
    console.log("1: " + resultadoFinal[0]);
    console.log("2: " + resultadoFinal[1]);
    console.log("3: " + resultadoFinal[2]);
    //document.getElementById("message").style.display = "none";
    //console.log(resultado);
  }, [resultadoFinal]);

  return (
    <div>
      <div id="app">
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
        <div>
          <button className="spins" id="spinColumn1" onClick={() => spin()} style={{display: 'none'}}>
            Spin
          </button>
          <button className="spins" id="spinColumn2" onClick={() => spin()} style={{display: 'none'}}>
            Spin
          </button>
          <button className="spins" id="spinColumn3" onClick={() => spin()} style={{display: 'none'}}>
            Spin
          </button>
        </div>
        <div className="buttons">
          <button id="spinner" onClick={() => spin()}>
            Spin All
          </button>
        </div>
        <div id="message" className="message" style={{display: 'none'}}>
          <span>{mensaje}</span>
        </div>

        <div>
          <p>
            Credito: <span id="credito">{credito}</span>
          </p>
          <p>
            Apostar:{" "}
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
