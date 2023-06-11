import tablaImg from "./img/tabla.webp"
import ruleta from "./img/ruleta.webp"
import fichas from "./img/fichas.webp"
import bola from "./img/bola.webp"
import "./roulette.css"
import anime from 'animejs/lib/anime.es'
import swal from "sweetalert"
import React, { useState } from 'react';

const Roulette = () => {
    const [saldo, setSaldo] = useState(0);
    let auxBola = 0;
    let auxRuleta = 0;
    const gradosPorNum = 360 / 37;
    const numerosRuleta = [
        0, 31, 16, 20, 3, 22, 1, 26,
        18, 28, 5, 33, 14, 35, 12,
        29, 7, 24, 9, 6, 25, 15, 34,
        2, 19, 13, 32, 10, 21, 17, 30,
        8, 27, 11, 36, 4, 25
    ];
    let squareArray = Array(49).fill(0);
    let coinValue = 1;
    let filaTable = 0;
    let columnaTable = 0;

    let fila = 0;
    let columna = 0;
    let typeCoin = 0;
    let playing = false;

    function getPos(e) {
        console.log(playing)
        if (!playing) {
            // Info sobre tamaños del div que contiene la tabla
            const tabla = document.getElementById('table').getBoundingClientRect();
            const widthVentana = window.innerWidth;
            const heightTabla = tabla.height;
            const widthTabla = tabla.width;

            // Posiciones de los bordes horizontales y verticales necesarios de las fichas
            const inicioWidthFichas = widthVentana * 0.4 + widthTabla * 0.2;
            const finWidthFichas = widthVentana * 0.4 + widthTabla * 0.8;
            const inicioHeightFichas = heightTabla * 0.35 + 95;
            const tamanoFicha = widthTabla * 0.6 / 6;

            // Posiciones de los bordes horizontales y verticales necesarios de las fichas
            const inicioHeightTabla = heightTabla * 0.5 + 95;
            const inicioWidthTabla = widthVentana * 0.4;
            const widthSquare = widthTabla / 14;
            const heightSquare = heightTabla * 0.5 / 5;

            // posicion del raton dentro de la ventana
            let x = e.clientX;
            let y = e.clientY;

            if (y > inicioHeightTabla) {
                for (let i = 0; i < 6; i++) {
                    if (y > (inicioHeightTabla + heightSquare * i)) {
                        filaTable = i;
                    }
                }
                for (let i = 0; i < 15; i++) {
                    if (x > (inicioWidthTabla + widthSquare * i)) {
                        columna = i;
                        columnaTable = columna;
                    }
                }
                selectSquare(columnaTable, filaTable)

            } else {
                if (y > (inicioHeightFichas) && x > (inicioWidthFichas) && x < (finWidthFichas)) {
                    for (let i = 0; i < 6; i++) {
                        if (x > inicioWidthFichas + tamanoFicha * i) {
                            typeCoin = i;
                        }
                    }
                    selectCoin(typeCoin);
                }
            }
        }

    }

    function limpiarApuesta() {
        squareArray = Array(49).fill(0);
    }

    function selectSquare(col, row) {
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 5; j++) {
                if (i === col && j === row) {

                    if (!((i === 0 || i === 13) && (j === 3 || j === 4))) {

                        if (j < 3 && i < 13) {
                            if (i === 0) {
                                saveBet(0, coinValue);
                            } else {
                                saveBet(3 * i - j, coinValue);
                            }
                        } else if (i === 13) {
                            saveBet(3 - j + 36, coinValue);
                        } else if (j === 3) {
                            if (i < 5) {
                                saveBet(40, coinValue);
                            } else if (i > 8) {
                                saveBet(42, coinValue);
                            } else {
                                saveBet(41, coinValue);
                            }
                        } else {
                            if (i < 3) {
                                saveBet(43, coinValue);
                            } else if (i < 5) {
                                saveBet(44, coinValue);
                            } else if (i < 7) {
                                saveBet(45, coinValue);
                            } else if (i < 9) {
                                saveBet(46, coinValue);
                            } else if (i < 11) {
                                saveBet(47, coinValue);
                            } else {
                                saveBet(48, coinValue);
                            }
                        }
                    }
                }
            }
        }
    }

    function selectCoin(typeCoin) {
        switch (typeCoin) {
            case 0:
                coinValue = 1;
                break;
            case 1:
                coinValue = 5;
                break;
            case 2:
                coinValue = 10;
                break;
            case 3:
                coinValue = 25;
                break;
            case 4:
                coinValue = 50;
                break;
            case 5:
                coinValue = 100;
        }
    }

    function saveBet(pos, bet) {
        squareArray[pos] += bet;
    }

    function getFormattedBet() {
        let bet = {
            total: 0,
            par: [],
            color: [],
            mitad: [],
            docena: [],
            columna: [],
            number: []
        };
        let total = 0;
        for (let i = 0; i < squareArray.length; i++) {
            if (i < 37 && squareArray[i] != 0) {
                bet.number.push([i, squareArray[i]]);
                total += squareArray[i];
            } else if (i < 40 && squareArray[i] != 0) {
                bet.columna.push([i - 36, squareArray[i]]);
                total += squareArray[i];
            } else if (i < 43 && squareArray[i] != 0) {
                bet.docena.push([i - 39, squareArray[i]]);
                total += squareArray[i];
            } else if (i == 43 && squareArray[i] != 0) {
                bet.mitad.push([1, squareArray[i]]);
                total += squareArray[i];
            } else if (i == 44 && squareArray[i] != 0) {
                bet.par.push([true, squareArray[i]]);
                total += squareArray[i];
            } else if (i == 45 && squareArray[i] != 0) {
                bet.color.push(["rojo", squareArray[i]]);
                total += squareArray[i];
            } else if (i == 46 && squareArray[i] != 0) {
                bet.color.push(["negro", squareArray[i]]);
                total += squareArray[i];
            } else if (i == 47 && squareArray[i] != 0) {
                bet.par.push([false, squareArray[i]]);
                total += squareArray[i];
            } else if (i == 48 && squareArray[i] != 0) {
                bet.mitad.push([2, squareArray[i]]);
                total += squareArray[i];
            }

        }
        bet.total = total;
        return bet;
    }

    async function play() {
        if (!playing) {
            setSaldo(100)
            playing = true;
            let bet = getFormattedBet();
            const response = await fetch("http://localhost:8080/games/roulette", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify(getFormattedBet())
            });
            const result = await response.json();
            console.log(result);

            if (result.message != "ok") {

                swal({
                    text: result.message,
                    icon: 'error',
                    background: '#14A200'
                });
                playing = false;

            } else {

                let num = result.n;
                console.log(result);


                let rand = Math.floor(Math.random() * 360);
                document.getElementById('ruletaImg').style.transform = 'rotate(' + auxRuleta + 'deg)';
                document.getElementById('bola').style.transform = 'rotate(' + auxBola + 'deg)';

                // Rotar ruleta
                setTimeout(() => {
                    playing = false;
                }, 7200);

                anime({
                    targets: '.ruletaImg',
                    rotate: {
                        value: -720 - 360 - rand,
                        duration: 7000,
                        easing: 'linear',
                    }
                });



                // Rotar bola
                anime({
                    targets: '.bola',
                    rotate: {
                        value: 720 + 360 + numerosRuleta.indexOf(num) * gradosPorNum - rand,
                        duration: 7000,
                        easing: 'linear',
                    }
                });

                auxRuleta = 360 - rand;
                auxBola = numerosRuleta.indexOf(num) * gradosPorNum - rand;
                console.log(squareArray);
                limpiarApuesta();
                console.log(squareArray);

            }
        }
    }

    return (
        <div className="container" >
            <div className="ruleta" id="ruleta">

                <img src={bola} className="bola" id="bola" />
                <img src={ruleta} className="ruletaImg" id="ruletaImg" />
                <div className="boton">
                    <button className="play" onClick={play}>PLAY!!</button>
                </div>
            </div>
            <div className="table" id="table" onMouseDown={getPos}>
                <div className="saldo">
                    <label htmlFor="saldo">Saldo disponible  </label>
                    <input type="number" id="saldo" disabled value={saldo}/>
                </div>
                <img src={fichas} className="fichas" />
                <img src={tablaImg} className="tabla" />
            </div>

        </div>
    );


}

export default Roulette;