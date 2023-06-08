import tablaImg from "./img/tabla.webp"
import ruleta from "./img/ruleta.webp"
import fichas from "./img/fichas.webp"
import bola from "./img/bola.webp"
import "./roulette.css"
import anime from 'animejs/lib/anime.es'

const Roulette = () => {

    let auxBola = 0;
    let auxRuleta = 0;
    const gradosPorNum = 360 / 37;
    const numerosRuleta = [
        0, 32, 16, 19, 4, 21, 2, 25,
        17, 27, 6, 34, 13, 36, 11,
        30, 8, 23, 10, 5, 24, 15, 33,
        1, 20, 14, 31, 9, 22, 18, 29,
        7, 28, 12, 35, 3, 26
    ];

    let totalBet = 0;
    let squareArray = Array(49).fill(0);
    let coinValue = 1;
    let filaTable = 0;
    let columnaTable = 0;

    let fila = 0;
    let columna = 0;
    let typeCoin = 0;
    let playing = false;

    function getPos(e) {
        console.log('apuesta =>'+playing)
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

    function limpiar() {
        totalBet = 0;
        squareArray = Array(49);
        coinValue = 1;
        filaTable = 0;
        columnaTable = 0;


        fila = 0;
        columna = 0;
        typeCoin = 0;
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
        totalBet += bet;
    }

    function play() {
        console.log('antes del play =>'+playing)
        if (!playing) {
            playing = true;
            let num = Math.floor(Math.random() * 36);
            console.log(num)
    
    
            let rand = Math.floor(Math.random() * 360);
            document.getElementById('ruletaImg').style.transform = 'rotate(' + auxRuleta + 'deg)';
            document.getElementById('bola').style.transform = 'rotate(' + auxBola + 'deg)';
    
            // Rotar ruleta
            setTimeout(() => {
                console.log('durante del play =>'+playing)
                playing = false;
                console.log('despues del play =>'+playing)
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

            auxRuleta = rand;
            auxBola = numerosRuleta.indexOf(num) * gradosPorNum - rand;
        
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
                <img src={fichas} className="fichas" />
                <img src={tablaImg} className="tabla" />
            </div>

        </div>
    );


}

export default Roulette;