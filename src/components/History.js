import { Chessboard } from 'react-chessboard';
import { useLoaderData } from 'react-router-dom'
import HistoricalGameCard from './HistoricalGameCard';

export default function History() {
    const { games } = useLoaderData();
    return (
        <>
            <h1>History</h1>
            <div className="historical-games-div">
                {
                    games.map(game => {
                        return (
                            <HistoricalGameCard key={game.id} game={game}/>
                        )
                    })
                }
            </div>
        </>
    )
}