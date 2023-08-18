import { useNavigate } from 'react-router-dom'
import Board from './Board';


export default function HistoricalGameCard({ game }) {

    const navigate = useNavigate();

    const details = (
        <span className="detail-container">
            <small>{formatDate(game.date)} · </small>
            <button className="historical-card-button" onClick={() => {navigator.clipboard.writeText(game.pgn)}}>Copy PGN</button>
            <button className="historical-card-button" onClick={() => {navigator.clipboard.writeText(game.fen)}}>Copy FEN</button>
        </span>
    )

    const chessBoardSmall = (
        <div className="chessboard-small" onClick={openInPlayer}>
            <Board fen={game.fen} arePiecesDraggable={false} color={game.color}/>
        </div>
    )

    let truncatedName;
    if (game.name) {
        truncatedName = game.name.length < 35 ? game.name : game.name.slice(0, 35) + "...";
    }

    return (
        <div 
            className="historical-game" 
            key={game.id}
        >
            <h2 className="game-name">{truncatedName}</h2>
            {details}
            {chessBoardSmall}
        </div>
    )

    function openInPlayer() {
        navigate(`/play/${game.id}`);
    }

    function formatDate(dateString) {
        return (new Date(dateString)).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})
    }
}