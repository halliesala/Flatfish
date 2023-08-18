import Piece from "./Piece"

export default function ChooseColor({setPlayerColor}) {

    return (
        <div className="choose-color-container">
            <button className="choose-color white" onClick={() => setPlayerColor('white')}>
                <Piece piece="wQ" />
            </button>
            <button className="choose-color black" onClick={() => setPlayerColor('black')}>
                <Piece piece="tQ" color="lightgray"/>
            </button>
        </div>
    )
}