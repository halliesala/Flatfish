function putPieceOnSquare() {
    // chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5');
    const piece = prompt("Piece?");
    const color = prompt("Black or white?");
    const square = prompt("Square?");
    console.log(game.put({ type: piece, color: color }, square));
}

function getPieceOnSquare() {
const square = prompt("Square?");
console.log(game.get(square));
}


// function onDrop(sourceSquare, targetSquare) {
//   const move = makeAMove({
//     from: sourceSquare,
//     to: targetSquare,
//     promotion: "q", // always promote to a queen for example simplicity
//   });
// }

function testCopyGame() {
    const myCopy = copyGame();
    console.log("Copy PGN: ", myCopy.pgn());
    console.log("Copy ASCII: ", myCopy.ascii());
    console.log("Copy turn: ", myCopy.turn())
  }