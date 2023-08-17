import {Link} from "react-router-dom";
import Piece from "./Piece";
import { useState } from 'react'

export default function Header() {

    const [color, setColor] = useState("blue");

    return (
        <div className="headerDiv">
            <h1 onClick={randomColor} >Chess!</h1>
            <div className="colorful-queen-div" onClick={randomColor}>
                <Piece piece="cQ" color={color} />
            </div>

            <nav>
                <Link to="/">Home</Link>
                <span>{`\t|\t`}</span>
                <Link to="/about">About</Link>
                <span>{`\t|\t`}</span>
                <Link to="/history">History</Link>
                <span>{`\t|\t`}</span>
                <Link to="/play">Play</Link>
            </nav>
        </div>
    )

    function randomColor() {

        const randomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

        let color = '#';
        for (let i = 0; i < 3; i++) color += randomHex();

        setColor(color);
    }
}