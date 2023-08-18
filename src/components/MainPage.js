import Piece from "./Piece"
import { useNavigate } from "react-router-dom";


export default function MainPage() {

    const navigate = useNavigate();

    return (
        <>
            <div className="choose-container">
                <button className="choose play-computer" onClick={() => {
                    navigate("/play/rme");
                }}>
                    <h2>Play the Computer</h2>
                    <p className="choose-text">
                        Not quite Stockfish -- meet Random Move Engine!
                        He attac, he protec, he kinda evade check.
                    </p>
                    <p></p>
                    <Piece piece="wQ" />
                </button>
                <button className="choose choose-chessboard" onClick={() => {
                    navigate("/play");
                }}>
                    <h2>Chessboard</h2>
                    <p className="choose-text">
                        Game logic controls the board, but you move both sides. 
                        Load a game from FEN or PGN or play a friend on one device.
                    </p>
                    <Piece piece="wQ" />
                </button>
                <button className="choose saved-games" onClick={() => {
                    navigate("/history")
                }}>
                    <h2>Saved Games</h2>
                    <p className="choose-text">
                        View and resume saved games.
                        Copy game PGN and FEN.
                    </p>
                    <Piece piece="wQ" />
                </button>
            </div>
        </>



    )
}
