import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <h1>TODO: Header</h1>
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
}