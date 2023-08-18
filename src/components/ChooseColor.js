import Piece from "./Piece"

export default function ChooseColor({setPlayerColor, setIsComputersTurn}) {

    return (
        <div className="choose-color-container">
            <button className="choose-color white" onClick={() => {
                    setPlayerColor('white');
                    setIsComputersTurn(false);
                }}>
                <Piece piece="wQ" />
            </button>
            <button className="choose-color black" onClick={() => {
                    setPlayerColor('black');
                    setIsComputersTurn(true);
                }}>
                <Piece piece="tQ" color="lightgray"/>
            </button>
        </div>
    )
}