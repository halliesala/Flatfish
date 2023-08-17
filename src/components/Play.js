import { useState } from "react";
import { Chess } from "chess.js";
import MessageWindow from './MessageWindow';
import InfoBox from "./InfoBox";
import Board from "./Board";
import { useLoaderData } from "react-router-dom";

export default function Play() {

    const data = useLoaderData();

    const initialGame = new Chess();

    if (data) {
        initialGame.loadPgn(data.game.pgn);
    }

    const WELCOME_MESSAGE = {text: "Welcome! Messages will appear here."}

    const [game, setGame] = useState(initialGame);
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);

    
    return (
        <>
            <div className="buttonDiv">
                <button onClick={randomMove}>Random Move</button>
                <button onClick={resetGame}>Reset Board</button>
                <button onClick={undoLastMove}>Undo Last Move</button>
                {/* Disabling the Load FEN button until I can handle captured pieces via FEN rather than game.history */}
                {/* <button onClick={handleLoadFEN}>Load FEN</button> */}
                <button onClick={copyFEN}>Copy FEN to Clipboard</button>
                <button onClick={saveGame}>Save Game</button>
                <button onClick={addHeaders}>Update Headers</button>
                <button onClick={handleLoadPGN}>Load PGN</button>
            </div>
            <InfoBox game={game} />
            <Board fen={game.fen()} handleDrop={handleDrop}/>
            <MessageWindow messages={messages} clearMessages={clearMessages}/>
        </>
    )

    function handleLoadPGN() {
        const pgn = prompt("Enter a PGN: ");
        try {
            const copy = new Chess();
            copy.loadPgn(pgn);
            setGame(copy);
            addMessage("PGN loaded.");
        } catch (error) {
            addMessage("Failed to load PGN. Verify that your PGN is valid.");
        }
    }

    function addHeaders() {
        const white = prompt("Enter White's name: ");
        const black = prompt("Enter Black's name: ");
        const event = prompt("Enter a name for this match: ") ?? 'Untitled Match';
        
        const copy = copyGame();
        copy.header('White', white, 'Black', black, 'Date', new Date(), 'Event', event);
        setGame(copy);
    }

    function saveGame() {

        const name = prompt("Give this game a name:");

        const POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                date: new Date(),
                pgn: game.pgn(),
                fen: game.fen(),
            })
        }
        console.log("TODO: Post game to db");
        fetch('http://localhost:5000/games', POST_OPTIONS)
        .then(data => data.json())
        .then(gameObj => {
            console.log(gameObj);
        })
    }
    
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
        setMessages([WELCOME_MESSAGE]);
    }

    function copyGame() {
        const copy = new Chess();
        copy.loadPgn(game.pgn());
        return copy;
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
            addMessage(error.toString());
        }

        // Update state
        setGame(copy);
    }

    function addMessage(text) {
        setMessages([...messages, {text: text}])
    }

    function copyFEN() {
        // Copy FEN to clipboard
        navigator.clipboard.writeText(game.fen());
        addMessage(`Copied FEN to clipboard: ${game.fen()}`);
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
        addMessage("FEN loaded.")
    }
}