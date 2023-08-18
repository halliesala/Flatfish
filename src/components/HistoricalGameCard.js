import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useNavigate } from 'react-router-dom'
import Board from './Board';


export default function HistoricalGameCard({ game }) {

    const navigate = useNavigate();

    const [showDetails, setShowDetails] = useState(false);

    const details = (
        <div className="historical-card-details">
            <button onClick={() => {navigator.clipboard.writeText(game.pgn)}}>Copy PGN</button>
            <button onClick={() => {navigator.clipboard.writeText(game.fen)}}>Copy FEN</button>
            <button onClick={openInPlayer}>Open in Player</button>
        </div>
    )

    const chessBoardSmall = (
        <div className="chessboard-small">
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
            onClick={() => setShowDetails(!showDetails)}
        >
            <h2 onMouseOver={showFullName}>{truncatedName}</h2>
            <small>{formatDate(game.date)}</small>
            {showDetails ? details : chessBoardSmall}
        </div>
    )

    function showFullName() {
        console.log(game.name);
    }

    function openInPlayer() {
        navigate(`/play/${game.id}`);
    }

    function formatDate(dateString) {
        return (new Date(dateString)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    }
}