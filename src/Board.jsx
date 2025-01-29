import Square from "./Square";

function Board({ handleCellClick, squares, isNewRound, winnerSolution }) {
  const generateBoard = (x, y) => {
    const board = [];
    for (let i = 0; i < y; i++) {
      const row = [];
      for (let j = 0; j < x; j++) {
        row.push(
          <Square
            key={i * 3 + j}
            value={squares[i * 3 + j]}
            onSquareClick={() => handleCellClick(i * 3 + j)}
            style={{
              backgroundColor:
                winnerSolution.indexOf(i * 3 + j) > -1 ? "green" : "white",
            }}
          />
        );
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <>
      <div className="board" style={{ display: isNewRound ? "block" : "none" }}>
        {generateBoard(3, 3)}
      </div>
    </>
  );
}

export default Board;
