import tablaImg from "./img/tabla.webp"
import ruleta from "./img/ruleta.webp"
import fichas from "./img/fichas.webp"
import bola from "./img/bola.webp"
import ficha1 from "./img/ficha1.webp"
import ficha5 from "./img/ficha5.webp"
import ficha10 from "./img/ficha10.webp"
import ficha25 from "./img/ficha25.webp"
import ficha50 from "./img/ficha50.webp"
import ficha100 from "./img/ficha100.webp"
import "./roulette.css"
import anime from 'animejs/lib/anime.es'
import swal from "sweetalert"
import React, { useEffect, useState } from 'react';

const Roulette = () => {
    const [saldo, setSaldo] = useState(0);
    let auxBola = 0;
    let auxRuleta = 0;
    let positioned = false;
    const gradosPorNum = 360 / 37;
    const numerosRuleta = [
        0, 31, 16, 20, 3, 22, 1, 26,
        18, 28, 5, 33, 14, 35, 12,
        29, 7, 24, 9, 6, 25, 15, 34,
        2, 19, 13, 32, 10, 21, 17, 30,
        8, 27, 11, 36, 4, 25
    ];

    let cont = 0;
    let squareArray = Array(49).fill(0);
    let coinValue = 1;
    let filaTable = 0;
    let columnaTable = 0;

    let fila = 0;
    let columna = 0;
    let typeCoin = 0;
    let playing = false;

    useEffect(() => {
        getSaldo()
    });

    const getSaldo = async () => {
        try {
            const response = await fetch('http://localhost:8080/credito', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                }
            });
            const data = await response.json();
            setSaldo(data.credito);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function posicionarFichas(inicioHeightTabla,inicioWidthTabla,heightSquare) {
        for (let i = 0; i < 49; i++) {
            if (i === 0) {
                console.log(typeCoin)
                document.getElementById(i).style.top = inicioHeightTabla + heightSquare;
                document.getElementById(i).getElementsByTagName("img")[typeCoin].style.display = 'block';
                
            }
        }
    }

    // detecta la posicion del click
    function getPos(e) {
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

           
            // Posiciones de los bordes horizontales y verticales necesarios de la tabla
            const inicioHeightTabla = document.getElementById('fichasContainer').getBoundingClientRect().height + 96 + document.getElementById('saldoContainer').getBoundingClientRect().height;
            const inicioWidthTabla =  document.getElementById('ruleta').getBoundingClientRect().width +  document.getElementById('table').getBoundingClientRect().width*0.1;
            const inicioWidthNums =  document.getElementById('ruleta').getBoundingClientRect().width +  document.getElementById('table').getBoundingClientRect().width*0.1 + document.getElementById('tabla').getBoundingClientRect().width*0.104;
            const widthSquare = (document.getElementById('tabla').getBoundingClientRect().width - document.getElementById('tabla').getBoundingClientRect().width*0.104) / 13;
            const heightSquare = document.getElementById('tabla').getBoundingClientRect().height / 5;
            // posicion del raton dentro de la ventana
            let x = e.clientX;
            let y = e.clientY;

            if (y > inicioHeightTabla && x > inicioWidthTabla) {
                    for (let i = 0; i < 6; i++) {
                        if (y > (inicioHeightTabla + heightSquare * i)) {
                            filaTable = i;
                        }
                    }
                    for (let i = 0; i < 14; i++) {
                        if (x < inicioWidthNums) {
                            
                            columnaTable = 0;
                            break;
                        }
                        if (x > (inicioWidthNums + widthSquare * i)) {
                            columna = i+1;
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
        console.log("coinValue :" + coinValue);
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
            playing = true;
            let bet = getFormattedBet();
            const response = await fetch("http://localhost:8080/games/roulette", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify(bet)
            });
            const result = await response.json();

            if (result.message != "ok") {

                swal({
                    text: result.message,
                    icon: 'error',
                    background: '#14A200'
                });
                playing = false;

            } else {

                let num = result.n;

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

                //reseteamos la posicion de la bola y la ruleta para no tener que volver a la posicion inicial
                auxRuleta = 360 - rand;
                auxBola = numerosRuleta.indexOf(num) * gradosPorNum - rand;
                limpiarApuesta();

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
                <div className="saldo" id="saldoContainer">
                    <label htmlFor="saldo">Saldo disponible  </label>
                    <input type="number" id="saldo" disabled value={saldo} />
                </div>
                <div className="fichasContainer" id="fichasContainer">
                    <img src={fichas} className="fichas" id="fichas" />
                </div>
                <div className="fichasColocadas">
                    {
                        squareArray.map( (value,index)  => 
                        <div className="fichaIndiv" id={index}>
                            <img src={ficha1} alt=" " id="ficha1" style={{position:'absolute'}} />
                            <img src={ficha5} alt=" " id="ficha5"  style={{position:'absolute'}}/>
                            <img src={ficha10} alt=" " id="ficha10"  style={{position:'absolute'}}/>
                            <img src={ficha25} alt=" " id="ficha25"  style={{position:'absolute'}}/>
                            <img src={ficha50} alt=" " id="ficha50"  style={{position:'absolute'}}/>
                            <img src={ficha100} alt=" " id="ficha100"  />
                        </div>)
                    }
                </div>
                <img src={tablaImg} className="tabla" id="tabla" />
                
            </div>

        </div>
    );


}

export default Roulette;