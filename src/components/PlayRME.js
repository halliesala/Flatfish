import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import MessageWindow from './MessageWindow';
import InfoBox from "./InfoBox";
import Board from "./Board";
import ChooseColor from "./ChooseColor";
import { useLoaderData, useOutletContext } from "react-router-dom";

export default function PlayRME() {

    const [color] = useOutletContext();
    const [playerColor, setPlayerColor] = useState();
    const [isComputersTurn, setIsComputersTurn] = useState();

    const data = useLoaderData();

    const initialGame = new Chess();

    if (data) {
        initialGame.loadPgn(data.game.pgn);
    }

    const WELCOME_MESSAGE = { timestamp: new Date(), text: "Welcome! Messages will appear here." }

    const [game, setGame] = useState(initialGame);
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);

    useEffect(() => {
        if (isComputersTurn) {
            randomMove();
            setIsComputersTurn(!isComputersTurn);
        }

        function randomMove() {
            const copy = copyGame();
            if (game.isCheckmate()) {
                addMessage(`That's checkmate! ${game.winner} wins!`)
            } else {
                const moves = copy.moves();
                const nextMove = moves[Math.floor(Math.random() * moves.length)]
                copy.move(nextMove)
                setGame(copy);
            }
        }

    },
    [isComputersTurn])

    if (!playerColor) {
        return (
            <div className="choose-color-page">
                <h1 className="choose-a-side">Choose a side:</h1>
                <ChooseColor setPlayerColor={setPlayerColor} setIsComputersTurn={setIsComputersTurn}/>
            </div>
        )
    } 

    return (
        <div>
            <div className="play-div">
                <div className="board-div">
                    {
                        game.turn() === playerColor.toLowerCase().slice(0, 1) 
                        ? <Board fen={game.fen()} handleDrop={handlePlayerDrop} color={color} orientation={playerColor}/>
                        : <Board fen={game.fen()} handleDrop={handleDrop} color={color} orientation={playerColor} arePiecesDraggable={false}/>
                    }
                    <MessageWindow messages={messages} clearMessages={clearMessages} />
                </div>
                <div className="info-actions-div">
                    <div className="actions-div">
                        <button className="action-button" onClick={resetGame}>Reset Board</button>
                        <button className="action-button" onClick={undoLastMove}>Undo Last Move</button>
                        <button className="action-button" onClick={addHeaders}>Update Headers</button>
                        <button className="action-button" onClick={copyFEN}>Copy FEN to Clipboard</button>
                        <button className="action-button" onClick={saveGame}>Save Game</button>
                    </div>
                    <InfoBox game={game} />
                </div>
            </div>
            

        </div>
    )

    function handlePlayerDrop(sourceSquare, targetSquare) {
        const move = {
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        }

        const copy = copyGame();

        // If valid, move
        try {
            copy.move(move)
            setGame(copy);
            setIsComputersTurn(!isComputersTurn);
        } catch (error) {
            addMessage(error.toString());
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

        let name = prompt("Give your game a name:");
        if (!name) {
            name = "Untitled Game";
        }



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
                color: color,
            })
        }
        fetch('http://localhost:5000/games', POST_OPTIONS)
            .then(data => data.json())
            .then(gameObj => {
                addMessage("Game saved. Go to 'History' to view saved games.");
            })
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
            setGame(copy);
        } catch (error) {
            addMessage(error.toString());
            // Update state
        }
    }

    function addMessage(text) {
        setMessages([...messages, { timestamp: new Date(), text: text }])
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

}