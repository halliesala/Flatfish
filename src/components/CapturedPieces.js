import Piece from "./Piece";

export default function CapturedPieces({ fen, color, text }) {

    return (
        <div className="captured-pieces">
            <p>{text}</p>
            {
                getCapturedPiecesFromFEN()[color].map((piece, idx) => {
                    return (
                        <Piece key={idx} piece={piece}/>
                    )
                })
            }
        </div>
    )

    function getCapturedPiecesFromFEN() {

        let boardFen = fen.split(" ")[0];

        // Example FEN with one black knight captured:
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


        for (let char of boardFen) {
            if (char in piece_counts) {
                piece_counts[char]--;
            }
        }

        const piece_counts_for_svgs = {
            w: {
                wP: piece_counts.P,
                wN: piece_counts.N,
                wB: piece_counts.B,
                wR: piece_counts.R,
                wQ: piece_counts.Q,
                wK: piece_counts.K,
            },
            b: {
                bP: piece_counts.p,
                bN: piece_counts.n,
                bB: piece_counts.b,
                bR: piece_counts.r,
                bQ: piece_counts.q,
                bK: piece_counts.k,
            }
        }

        const captures = {
            w: [],
            b: [],
        };

        for (const color in piece_counts_for_svgs) {
            for (const piece in piece_counts_for_svgs[color]) {
                const count = piece_counts_for_svgs[color][piece];
                for (let i = 0; i < count; i++) {
                    captures[color].push(piece);
                }
            }
        }

        return (captures);
    }
}