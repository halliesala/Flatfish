import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useNavigate } from 'react-router-dom'


export default function HistoricalGameCard({ game }) {

    const navigate = useNavigate();

    const [showDetails, setShowDetails] = useState(false);

    const details = (
        <div className="historical-card-details">
            <p>PGN: {game.pgn}</p>
            <p>FEN: {game.fen}</p>
            <button onClick={openInPlayer}>Open in Player</button>
        </div>
    )

    const chessBoardSmall = (
        <div className="chessboard-small">
            <Chessboard position={game.fen} arePiecesDraggable={false} />
        </div>
    )

    return (
        <div 
            className="historical-game" 
            key={game.id}
            onClick={() => setShowDetails(!showDetails)}
        >
            <h2>{game.name}</h2>
            <small>{formatDate(game.date)}</small>
            {showDetails ? details : chessBoardSmall}
        </div>
    )

    function openInPlayer() {
        navigate(`/play/${game.id}`);
    }

    function formatDate(dateString) {
        return (new Date(dateString)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    }
}