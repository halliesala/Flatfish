
import { Chessboard } from "react-chessboard";

export default function Board({ fen, handleDrop, arePiecesDraggable, color }) {

    return (
        <Chessboard
            position={fen}
            onPieceDrop={handleDrop}
            arePiecesDraggable={arePiecesDraggable ?? true}
            customDarkSquareStyle={{ backgroundColor: 'lightgray' }}
            customLightSquareStyle={{ backgroundColor: '#FFFFFF' }}
            customDropSquareStyle={{ boxShadow: 'inset 0 0 1px 6px darkgray' }}
        />
    )
}