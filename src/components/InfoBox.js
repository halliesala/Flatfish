import Piece from "./Piece";
import CapturedPieces from "./CapturedPieces";

export default function InfoBox({ game }) {

    return (
        <div className="info-div">
            <h2>Game Info</h2>
            <CapturedPieces fen={game.fen()} color='w' text="Black has captured:"/>
            <CapturedPieces fen={game.fen()} color='b' text="White has captured:" />
            <p>Current Turn: {game.turn() === 'w' ? 'White' : 'Black'}</p>
            <p>Check: {game.inCheck() ? 'Yes' : 'No'}</p>
            <p>Checkmate: {game.isCheckmate() ? 'Yes' : 'No'}</p>
            <p>Game Over: {game.isGameOver() ? 'Yes' : 'No'}</p>
            <p>
                Draw: {game.isDraw() ? `Yes -- ${game.isInsufficientMaterial() ? 'Insufficient Material' : '50-Move Rule'}` : 'No'}
            </p>
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

    function getCapturedPiecesFromFEN() {

        let fen = game.fen();
        fen = fen.split(" ")[0];
        console.log(fen);


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


        for (let char of fen) {
            if (char in piece_counts) {
                piece_counts[char]--;
            }
        }

        console.log(piece_counts);

    }
}