import ruleta from "./games/ruleta-logo.webp"
import slot from "./games/slot-logo.webp"
import blackjack from "./games/logo-blackjack.webp"
import "./games/games.css"

const Games = () => {
    console.log(window.innerWidth)
    return <div className="containerGames">
        <div className="header">GAMES</div>
        <div className="gamesContainer">

            <div className="imgContainer">
                <a href="/games/roulette" className="link"><img src={ruleta} alt="ruleta" width="100px" height="100px" className="logo" /></a>
                <span className="titulo">RULETA</span>
            </div>
            <div className="imgContainer">
                <a href="/games/slot" className="link"><img src={slot} alt="ruleta" width="100px" height="100px" className="logo" /></a>

                <span className="titulo">SLOT</span>
            </div>
            <div className="imgContainer">
                <a href="/games/blackjack" className="link"><img src={blackjack} alt="ruleta" width="100px" height="100px" className="logo" /></a>
                <span className="titulo">BLACK JACK</span>
            </div>
        </div>

    </div>


}
export default Games;