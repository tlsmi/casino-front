import tablaImg from "./img/tabla.webp"
import ruleta from "./img/ruleta.webp"
import fichas from "./img/fichas.webp"
import bola from "./img/bola.webp"
import ficha1Vacia from "./img/ficha1Vacia.webp"
import ficha5Vacia from "./img/ficha5Vacia.webp"
import ficha10Vacia from "./img/ficha10Vacia.webp"
import ficha25Vacia from "./img/ficha25Vacia.webp"
import ficha50Vacia from "./img/ficha50Vacia.webp"
import ficha100Vacia from "./img/ficha100Vacia.webp"
import "./roulette.css"
import anime from 'animejs/lib/anime.es'
import swal from "sweetalert"
import React, { useEffect, useState } from 'react';

const Roulette = () => {
    const [saldo, setSaldo] = useState(0);
    const [coinValue, setCoinValue] = useState(1);
    const [saldoInicial, setSaldoInicial] = useState(0);
    const [squareArray, setSquareArray] = useState(Array(49).fill(0));
    const [auxBola, setAuxBola] = useState(0);
    const [auxRuleta, setAuxRuleta] = useState(0);
    let positioned = false;
    const gradosPorNum = 360 / 37;
    const numerosRuleta = [
        0, 31, 16, 20, 3, 22, 1, 26,
        18, 28, 5, 33, 14, 35, 12,
        29, 7, 24, 9, 6, 23, 15, 34,
        2, 19, 13, 32, 10, 21, 17, 30,
        8, 27, 11, 36, 4, 25
    ];

    let cont = 0;
    let filaTable = 0;
    let columnaTable = 0;

    let fila = 0;
    let columna = 0;
    let playing = false;

    window.onload = function () {
        getSaldo();
    }

    async function getSaldo() {
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
            setSaldoInicial(data.credito);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function selectTypeCoin(num) {
        if (num < 5) {
            return 0;
        } else if (num < 10) {
            return 1;
        } else if (num < 25) {
            return 2;
        } else if (num < 50) {
            return 3;
        } else if (num < 100) {
            return 4;
        } else if (num >= 100) {
            return 5;
        }

    }

    function posicionarFichas(inicioHeightTabla, inicioWidthTabla, heightSquare, widthSquare) {
        for (let i = 0; i < 49; i++) {
            if (i === 0) {
                document.getElementById(i).style.top = (inicioHeightTabla + heightSquare + heightSquare * 0.25) + "px";
                document.getElementById(i).style.left = (inicioWidthTabla + widthSquare * 0.5) + "px";
            } else if (i > 39 && i < 43) {
                document.getElementById(i).style.top = (inicioHeightTabla + heightSquare * 3 + heightSquare * 0.25) + "px";
                document.getElementById(i).style.left = (inicioWidthTabla + document.getElementById('tabla').getBoundingClientRect().width * 0.104 + widthSquare * (1.5 + 4 * (i - 40))) + "px";
            } else if (i > 42) {
                document.getElementById(i).style.top = (inicioHeightTabla + heightSquare * 4 + heightSquare * 0.25) + "px";
                document.getElementById(i).style.left = (inicioWidthTabla + document.getElementById('tabla').getBoundingClientRect().width * 0.104 + widthSquare * (0.5 + 2 * (i - 43))) + "px";
            } else {
                for (let j = 1; j < 4; j++) {
                    if ((i - j) % 3 === 0) {
                        document.getElementById(i).style.top = (inicioHeightTabla + heightSquare * (3 - j) + heightSquare * 0.2) + "px";
                        document.getElementById(i).style.left = (inicioWidthTabla + document.getElementById('tabla').getBoundingClientRect().width * 0.104 + widthSquare * ((i - j) / 3)+0.1) + "px";

                    }
                }
            }
            if (squareArray[i] !== 0) {
                for (let k = 0; k < 4; k++) {
                    if (Math.pow(10, k) <= squareArray[i]) {
                        document.getElementById(i).getElementsByTagName("img")[selectTypeCoin(squareArray[i])].style.display = 'block';
                        document.getElementById("span " + i).style.top = document.getElementById(i).getBoundingClientRect().width * 0.2 + "px"
                        document.getElementById("span " + i).style.left = document.getElementById(i).getBoundingClientRect().width * (0.4 - 0.05 * k) + "px"
                        document.getElementById("span " + i).style.fontSize = document.getElementById(i).getBoundingClientRect().width * (0.5 - 0.07 * k) + "px"
                        document.getElementById("span " + i).innerHTML = squareArray[i];
                    }

                }
            }
        }
    }

    // detecta la posicion del click
    function getPos(e) {
        if (!playing) {
            // Info sobre tamaños del div que contiene la tabla
            const tabla = document.getElementById('table').getBoundingClientRect();
            const widthVentana = window.innerWidth;
            const widthTabla = tabla.width;

            // Posiciones de los bordes horizontales y verticales necesarios de las fichas
            const inicioHeightFichas = 96 + document.getElementById('topTable').getBoundingClientRect().height + document.getElementById('fichasContainer').getBoundingClientRect().height / 3;
            const finHeightFichas = 96 + document.getElementById('topTable').getBoundingClientRect().height + document.getElementById('fichasContainer').getBoundingClientRect().height * 2 / 3;
            const tamanoFicha = widthTabla * 0.3 / 6;


            // Posiciones de los bordes horizontales y verticales necesarios de la tabla
            const inicioHeightTabla = document.getElementById('fichasContainer').getBoundingClientRect().height + 96 + document.getElementById('topTable').getBoundingClientRect().height;
            const widthSquare = (document.getElementById('tabla').getBoundingClientRect().width - document.getElementById('tabla').getBoundingClientRect().width * 0.104) / 13;
            const heightSquare = document.getElementById('tabla').getBoundingClientRect().height / 5;


            let finWidthFichas;
            let inicioWidthFichas;
            let inicioWidthTabla;
            let inicioWidthNums;

            // posicion del raton dentro de la ventana
            let x = e.clientX;
            let y = e.clientY;

            if (widthVentana > 800) {
                finWidthFichas = document.getElementById('ruleta').getBoundingClientRect().width + widthTabla * 0.65;
                inicioWidthFichas = document.getElementById('ruleta').getBoundingClientRect().width + widthTabla * 0.35;
                inicioWidthTabla = document.getElementById('ruleta').getBoundingClientRect().width + document.getElementById('table').getBoundingClientRect().width * 0.1;
                inicioWidthNums = document.getElementById('ruleta').getBoundingClientRect().width + document.getElementById('table').getBoundingClientRect().width * 0.1 + document.getElementById('tabla').getBoundingClientRect().width * 0.104;
            } else {
                finWidthFichas = widthTabla * 0.65;
                inicioWidthFichas = widthTabla * 0.35;
                inicioWidthTabla = document.getElementById('table').getBoundingClientRect().width * 0.1;
                inicioWidthNums = document.getElementById('table').getBoundingClientRect().width * 0.1 + document.getElementById('tabla').getBoundingClientRect().width * 0.104;
            }

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
                        columna = i + 1;
                        columnaTable = columna;
                    }
                }
                selectSquare(columnaTable, filaTable);
                posicionarFichas(inicioHeightTabla, inicioWidthTabla, heightSquare, widthSquare);
            } else {
                if (y > (inicioHeightFichas) && y < (finHeightFichas) && x > (inicioWidthFichas) && x < (finWidthFichas)) {
                    for (let i = 0; i < 6; i++) {
                        if (x > inicioWidthFichas + tamanoFicha * i) {
                            selectCoin(i);
                        }
                    }
                }
            }

        }

    }

    function limpiarApuesta() {

        setSquareArray(Array(49).fill(0));
        getSaldo();
        for (let i = 0; i < 49; i++) {
            document.getElementById("span " + i).innerHTML = "";
            for (let j = 0; j < 6; j++) {
                document.getElementById(i).getElementsByTagName("img")[j].style.display = 'none';
            }
        }

    }

    function selectSquare(col, row) {
        if (saldo - coinValue < 0) {
            swal("", "No tienes suficiente saldo en tu cuenta", 'error');
        } else {

            for (let i = 0; i < 14; i++) {
                for (let j = 0; j < 5; j++) {
                    if (i === col && j === row) {
                        if (!((i === 0 || i === 13) && (j === 3 || j === 4))) {
                            if (j < 3 && i < 13) {
                                if (i === 0) {
                                    saveBet(0, coinValue);
                                    setSaldo(saldo - coinValue);

                                } else {
                                    saveBet(3 * i - j, coinValue);
                                    setSaldo(saldo - coinValue);
                                }
                            } else if (i === 13) {
                                saveBet(3 - j + 36, coinValue);
                                setSaldo(saldo - coinValue);
                            } else if (j === 3) {
                                if (i < 5) {
                                    saveBet(40, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else if (i > 8) {
                                    saveBet(42, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else {
                                    saveBet(41, coinValue);
                                    setSaldo(saldo - coinValue);
                                }
                            } else {
                                if (i < 3) {
                                    saveBet(43, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else if (i < 5) {
                                    saveBet(44, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else if (i < 7) {
                                    saveBet(45, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else if (i < 9) {
                                    saveBet(46, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else if (i < 11) {
                                    saveBet(47, coinValue);
                                    setSaldo(saldo - coinValue);
                                } else {
                                    saveBet(48, coinValue);
                                    setSaldo(saldo - coinValue);
                                }
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
                setCoinValue(1);
                break;
            case 1:
                setCoinValue(5);
                break;
            case 2:
                setCoinValue(10);
                break;
            case 3:
                setCoinValue(25);
                break;
            case 4:
                setCoinValue(50);
                break;
            case 5:
                setCoinValue(100);
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
        console.log(playing)
        let bet = getFormattedBet();
        if (bet.total === 0) {
            swal({
                text: "No has apostado nada",
                icon: 'error',
            });
        } else {
            if (!playing) {
                playing = true;

                const response = await fetch("http://localhost:8080/games/roulette", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + sessionStorage.getItem("token"),
                    },
                    body: JSON.stringify(bet)
                });
                const result = await response.json();

                let balance = result.balance;
                let num = result.n;
                let rand = Math.floor(Math.random() * 360);
                console.log(auxRuleta);
                console.log(auxBola);

                document.getElementById('ruletaImg').style.transform = 'rotate(' + auxRuleta + 'deg)';
                document.getElementById('bola').style.transform = 'rotate(' + auxBola + 'deg)';

                // Rotar ruleta
                setTimeout(() => {
                    playing = false;
                    if (balance > 0) {
                        swal("Has ganado " + balance + " coins", "", 'success');
                    } else {
                        swal("Has perdido " + balance + " coins", "", 'error');
                    }
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
                setAuxRuleta(360 - rand);
                setAuxBola(numerosRuleta.indexOf(num) * gradosPorNum - rand);
                limpiarApuesta(balance);

            }
        }
    }


    return (
        <div className="container" >
            <div className="ruleta" id="ruleta">
                <img src={bola} className="bola" id="bola" alt="bola" />
                <img src={ruleta} className="ruletaImg" id="ruletaImg" alt="ruleta" width="300px" height="300px"/>
                <div className="boton">
                    <button className="play" onClick={play}>PLAY</button>
                </div>
            </div>
            <div className="table" id="table" onMouseDown={getPos}>
                <div className="topTable" id="topTable">
                    <button className="reset" onClick={limpiarApuesta}>Reset Bet</button>
                    <span className="saldo">SALDO DISPONIBLE : {saldo}</span><br />
                    <span className="coinValue">FICHA SELECCIONADA : {coinValue}</span>

                </div>
                <div className="fichasContainer" id="fichasContainer">
                    <img src={fichas} className="fichas" id="fichas" alt="fichas" width="300px" height="100px"/>
                </div>
                <div className="fichasColocadas">
                    {
                        squareArray.map((value, index) =>
                            <div className="fichaIndiv" id={index} key={index}>

                                <img src={ficha1Vacia} alt="1" id="ficha1" style={{ position: "absolute" }} />
                                <img src={ficha5Vacia} alt="5" id="ficha5" style={{ position: "absolute" }} />
                                <img src={ficha10Vacia} alt="10" id="ficha10" style={{ position: "absolute" }} />
                                <img src={ficha25Vacia} alt="25" id="ficha25" style={{ position: "absolute" }} />
                                <img src={ficha50Vacia} alt="50" id="ficha50" style={{ position: "absolute" }} />
                                <img src={ficha100Vacia} alt="100" id="ficha100" />
                                <span id={"span " + index} style={{ position: "absolute" }}></span>
                            </div>)
                    }
                </div>
                <img src={tablaImg} alt="tabla" className="tabla" id="tabla" />

            </div>

        </div>
    );
}

export default Roulette;