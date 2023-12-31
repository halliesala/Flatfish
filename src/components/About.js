export default function About() {

    const reactChessboardLink = (<a href="https://www.npmjs.com/package/react-chessboard">react-chessboard</a>);
    const chessjsLink = (<a href="https://www.npmjs.com/package/chess.js?activeTab=readme">chess.js</a>)
    return (
        <>
            <h1>About</h1>
            <p>
                This app was built with {reactChessboardLink} and {chessjsLink}.
            </p>
            <p>
                'Flatfish' is a portmanteau of 'Flatiron' (the coding bootcamp) 
                and 'Stockfish' (the chess engine).
            </p>
            <p>
                The Flatfish icon was generated by ChatGPT 
                -- I asked it to generate an SVG of a fish, and it ... mostly did?
                I think he's actually pretty cute! 
            </p>

        </>
    )
}