window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const items = ["🍒", "🍇", "🍊", "🍋", "🔔", "💵", "💰", "💎"];
  const valor = [1, 2, 3, 4, 5, 10, 20, 50];
  let credito = 10;
  let apuesta;
  let columnNumber = null;
  this.document.getElementById("credito").innerHTML = credito;
  let resultado = [];
  let contenedor = document.querySelector(".info");

  for (let i = 0; i < items.length; i++) {
    let elemento = document.createElement("span");
    elemento.innerHTML = items[i].repeat(3) + " = " + valor[i] + ", ";
    contenedor.appendChild(elemento);
  }

  let doors = document.querySelectorAll(".door");

  document.querySelector("#spinner").addEventListener("click", () => spin(3));
  document
    .querySelector("#spinColumn1")
    .addEventListener("click", () => spin(0));
  document
    .querySelector("#spinColumn2")
    .addEventListener("click", () => spin(1));
  document
    .querySelector("#spinColumn3")
    .addEventListener("click", () => spin(2));
  document.querySelector("#reseter").addEventListener("click", init);

  async function spin(column = 3) {
    apuesta = document.getElementById("apuesta").value;
    columnNumber = null;
    if (column < 3) {
      if (resultado[0] === "❓") {
        alert("No puedes girar una columna sin haber girado las tres!");
        return;
      }
      //doors = document.querySelectorAll(`#door${column}`);
      columnNumber = column;
      doors = [document.querySelector(`#door${column}`)];
      document.querySelector(`#spinColumn${column + 1}`).disabled = true;
    } else {
      if (apuesta > credito) {
        alert("La apuesta es más grande que los créditos que tienes!");
        return;
      } else if (apuesta == 0) {
        alert("Tienes que apostar fichas!");
        return;
      }
      doors = document.querySelectorAll(".door");
      document.querySelector(`#spinColumn1`).disabled = false;
      document.querySelector(`#spinColumn2`).disabled = false;
      document.querySelector(`#spinColumn3`).disabled = false;
      credito -= apuesta;
      document.getElementById("credito").innerHTML = credito;
    }
    init(false, 3, 4);
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
    checkwin();
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    if (firstInit) {
      doors = document.querySelectorAll(".door");
      credito = 10;
      document.getElementById("credito").innerHTML = credito;
    }
    if (columnNumber == null) resultado = [];
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0";
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);

      const pool = ["❓"];
      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

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
      console.log(pool);
      if (columnNumber == null) resultado.push(pool[pool.length - 1]);
      else resultado[columnNumber] = pool[pool.length - 1];
      console.log(resultado);

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
      // console.log(door);
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  function checkwin() {
    // Si todos los resultados son iguales, aumentar el crédito y mostrar una alerta
    if (
      resultado[0] === resultado[1] &&
      resultado[0] === resultado[2] &&
      resultado[0] !== "❓"
    ) {
        let ganancia;
      for (let i = 0; i < items.length; i++) {
        if (items[i] === resultado[0]) ganancia = apuesta * valor[i];
      }
      document.getElementById("credito").innerHTML = credito + ganancia;
      credito += ganancia;
      alert("¡Ganaste un bono de " + ganancia + " créditos!");
    }

    // Si se queda sin crédito, mostrar una alerta y reiniciar el juego
    if (credito === 0) {
      if (
        document.querySelector(`#spinColumn1`).disabled == false &&
        document.querySelector(`#spinColumn2`).disabled == false &&
        document.querySelector(`#spinColumn3`).disabled == false
      ) setTimeout(function () {alert("¡Se acabó el crédito!")}, 4000);
    }
  }
  init();
});
