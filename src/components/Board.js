
import { Chessboard } from "react-chessboard";

export default function Board({ fen, handleDrop }) {
    return (
        <div className="boardDiv">
            <Chessboard
                position={fen}
                onPieceDrop={handleDrop}
                customDarkSquareStyle={{ backgroundColor: 'lightgray' }}
                customLightSquareStyle={{ backgroundColor: '#FFFFFF' }}
                customDropSquareStyle={{ boxShadow: 'inset 0 0 1px 6px darkgray' }}
            />
        </div>
    )
}