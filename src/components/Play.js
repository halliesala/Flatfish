import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function Play() {

    const [game, setGame] = useState(new Chess());
    const [messages, setMessages] = useState([
        {
            text: "Welcome!",
        },
        {
            text: "Messages will appear here.",
        },
    ]);

    function randomMove() {
        const copy = copyGame();
        if (game.isCheckmate()) {
            console.log("That's checkmate!")
        } else {
            const moves = copy.moves();
            const nextMove = moves[Math.floor(Math.random() * moves.length)]
            copy.move(nextMove)
            setGame(copy);
        }
    }

    function resetGame() {
        setGame(new Chess());
    }

    function clearMessages() {
        setMessages([]);
    }

    function copyGame() {
        const copy = new Chess();
        copy.loadPgn(game.pgn());
        return copy;
    }

    function logGame() {
        addMessage("PGN: " + game.pgn());
        console.log(game.pgn());
        console.log(game.ascii());
    }

    function handleDrop(sourceSquare, targetSquare) {
        const move = {
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        }

        const copy = copyGame();

        // If valid, move
        try {
            copy.move(move)
        } catch (error) {
            const newMessage = {
                text: error.toString(),
            };
            setMessages([...messages, newMessage]);
            console.log(error);
        }

        // Update state
        setGame(copy);
    }

    function getCapturedPieces(color) {
        function hasCapture(move) {
            return (move.flags.includes('c') || move.flags.includes('e'))
        }
        const captures = game.history({ verbose: true })
            .filter(move => move.color === color)
            .filter(colorMoves => hasCapture(colorMoves))
            .map(captureMoves => captureMoves.captured);
        return captures;
    }



    function addMessage(text) {
        setMessages([...messages, {text: text}])
    }


    function undoLastMove() {
        const copy = copyGame();
        try {
            const move = copy.undo()
            addMessage("Undoing move: " + move.color + " " + move.piece + " returns from " + move.to + " to " + move.from);
            setGame(copy);
        } catch (error) {
            addMessage("Cannot undo move.")
        }
    }

    function handleLoadFEN() {
        const fen = prompt("Enter a FEN:");
        setGame(new Chess(fen));
    }

    return (
        <>
            <button onClick={() => randomMove()}>Random Move</button>
            <button onClick={resetGame}>Reset Game</button>
            <button onClick={logGame}>Log Game</button>
            <button onClick={clearMessages}>Clear Message Console</button>
            <button onClick={undoLastMove}>Undo Last Move</button>
            <button onClick={handleLoadFEN}>Load FEN</button>
            <div>
                <h2>
                    {
                        game.isCheckmate() 
                        ? "Checkmate"
                        : game.turn() === 'w' ? 'Current Turn: White' : 'Current Turn: Black'
                    }
                </h2>
                <h2>Captures:</h2>
                <h3>White has captured:</h3>
                <ol className="captured-pieces">
                    {
                        getCapturedPieces('w').map((piece, idx) => {
                            return (
                                <li key={idx}>{piece}</li>
                            )
                        })
                    }
                </ol>
                <h3 className="captured-pieces">Black has captured</h3>
                <ol>
                    {
                        getCapturedPieces('b').map((piece, idx) => {
                            return (
                                <li key={idx}>{piece}</li>
                            )
                        })
                    }
                </ol>
            </div>
            <div>
                <Chessboard
                    position={game.fen()}
                    onPieceDrop={handleDrop}
                    customDarkSquareStyle={{ backgroundColor: 'lightgray' }}
                    customLightSquareStyle={{ backgroundColor: '#FFFFFF' }}
                    customDropSquareStyle={{ boxShadow: 'inset 0 0 1px 6px darkgray' }}
                />
            </div>
            <div className="messages">
                <h2>Messages</h2>
                {messages.map((message, idx) => {
                    return (
                        <p key={idx}>{message.text}</p>
                    )
                })}
            </div>
        </>
    )

}