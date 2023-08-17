import Piece from "./Piece";

export default function InfoBox({ game }) {

    return (
        <div className="infoDiv">
            <h2>Game Info</h2>
            <button>Test getCapturedPiecesFromFEN</button>
            <p>Current Turn: {game.turn() === 'w' ? 'White' : 'Black'}</p>
            <p>Check: {game.inCheck() ? 'Yes' : 'No'}</p>
            <p>Checkmate: {game.isCheckmate() ? 'Yes' : 'No'}</p>
            <p>Game Over: {game.isGameOver() ? 'Yes' : 'No'}</p>
            <p>
                Draw: {game.isDraw() ? `Yes -- ${game.isInsufficientMaterial() ? 'Insufficient Material' : '50-Move Rule'}` : 'No'}
            </p>
            <p>White has captured:</p>
            <div className="captured-pieces">
                {
                    getCapturedPiecesFromPGN('w').map((piece, idx) => {
                        return (
                            <span key={idx}>
                                <Piece piece={`b${piece.toUpperCase()}`} />
                            </span>

                        )
                    })
                }
            </div>
            <p className="captured-pieces">Black has captured:</p>
            <div>
                {
                    getCapturedPiecesFromPGN('b').map((piece, idx) => {
                        return (
                            <span key={idx}>
                                <Piece piece={`w${piece.toUpperCase()}`} />
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )

    function getCapturedPiecesFromPGN(color) {
        function hasCapture(move) {
            return (move.flags.includes('c') || move.flags.includes('e'))
        }
        const captures = game.history({ verbose: true })
            .filter(move => move.color === color)
            .filter(colorMoves => hasCapture(colorMoves))
            .map(captureMoves => captureMoves.captured);
        return captures;
    }

    function getCapturedPiecesFromFEN(fen) {

        // Example FEN with one black knight captured
        // 
        // r1bqkbnr/2ppp3/p4pp1/4P2p/1p3B2/1PP2PPN/P3P1BP/RN1QK2R b KQkq - 1 9

        const piece_counts = {
            P: 8,
            N: 2,
            B: 2,
            R: 2,
            Q: 1,
            K: 1,
            p: 8,
            n: 2,
            b: 2,
            r: 2,
            q: 1,
            k: 1,
        }

        for (let char in fen) {
            console.log(char);
        }

    }
}