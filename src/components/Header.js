import {Link} from "react-router-dom";
import Piece from "./Piece";
import { useState } from 'react'

export default function Header({color, setColor, className}) {


    return (
        <div className={`header-div ${className}`}>
            <div className="site-title-div">
                <span className="colorful-queen-span" onClick={randomColor}>
                    <Piece piece="cQ" color={color} />
                </span>
                <h1 onClick={randomColor}>Hallie's React Chess App</h1>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <span>{`\t|\t`}</span>
                <Link to="/about">About</Link>
                <span>{`\t|\t`}</span>
                <Link to="/history">History</Link>
                <span>{`\t|\t`}</span>
                <Link to="/play">Play</Link>
                <span>{`\t|\t`}</span>
                <Link to="/play/rme">Play RME</Link>
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