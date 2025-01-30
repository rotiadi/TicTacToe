import { useState, useEffect } from "react";
import Player from "./Player";
import Board from "./Board";

function GameComponent() {
  const [currentRound, setCurrentRound] = useState(1);
  const [isNewGame, setIsNewGame] = useState(false);
  const [roundNumbers, setRoundNumbers] = useState(1);
  const [isNewRound, setIsNewRound] = useState(false);
  const [endRound, setEndRound] = useState(false);
  const [gameWinner, setGameWinner] = useState();
  const [roundWinner, setRoundWinner] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

  const [winnerSolution, setWinnerSolution] = useState([]);

  const [player1, setPlayer1] = useState({
    name: "",
    symbol: "X",
    score: 0,
    edit: false,
  });
  const [player2, setPlayer2] = useState({
    name: "",
    symbol: "O",
    score: 0,
    edit: false,
  });

  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(() => {
    if (isGameOver && roundNumbers === currentRound) {
      setGameWinner(
        player1.score > player2.score
          ? player1.name
          : player1.score === player2.score
          ? "DRAW"
          : player2.name
      );
      setIsNewGame(true);
      setIsGameOver(false);
    }
  }, [
    isGameOver,
    player1.score,
    player2.score,
    player1.name,
    player2.name,
    roundNumbers,
    currentRound,
    roundWinner,
  ]);

  const onSubmitName = (name, playerNumber) => {
    if (name) {
      switch (playerNumber) {
        case 1:
          setPlayer1((prevProp) => ({ ...prevProp, name: name, edit: false }));

          break;
        case 2:
          setPlayer2((prevProp) => ({ ...prevProp, name: name, edit: false }));
          break;
        default:
          break;
      }
    } else {
      alert("No name provided!");
    }
  };

  const editPlayerName = (player) => {
    switch (player) {
      case player1:
        setPlayer1((prevProp) => ({ ...prevProp, edit: true }));

        break;
      case player2:
        setPlayer2((prevProp) => ({ ...prevProp, edit: true }));
        break;
      default:
        break;
    }
  };

  const startNewGame = () => {
    setPlayer1({
      name: "",
      symbol: "X",
      score: 0,
      edit: true,
    });
    setPlayer2({
      name: "",
      symbol: "O",
      score: 0,
      edit: true,
    });
    setIsNewGame(true);
    setIsNewRound(false);
    setGameWinner();
    setIsGameOver(false);
  };

  const startGame = () => {
    setPlayer1((prevProp) => ({ ...prevProp, score: 0 }));
    setPlayer2((prevProp) => ({ ...prevProp, score: 0 }));
    setSquares(Array(9).fill(null));
    setIsNewGame(false);
    setCurrentPlayer(player1);
    setIsNewRound(true);
    setWinnerSolution([]);
    setCurrentRound(1);
    setGameWinner();
    setIsGameOver(false);
  };

  const newRound = () => {
    setEndRound(false);
    setSquares(Array(9).fill(null));
    setCurrentPlayer(player1);
    setCurrentRound(currentRound + 1);
    setWinnerSolution([]);
    setIsNewRound(true);
  };

  const handleCellClick = (squareIndex) => {
    if (squares[squareIndex] || calculateRoundWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[squareIndex] = currentPlayer.symbol;
    setSquares(newSquares);

    const winner = calculateRoundWinner(newSquares);

    if (!winner) {
      setCurrentPlayer(currentPlayer.name === player1.name ? player2 : player1);
    } else {
      if (currentRound < roundNumbers) setEndRound(true);

      setWinnerSolution(winner.winnerSolution);

      setRoundWinner(winner.winner);
      setIsNewRound(false);

      if (player1.symbol === winner.winner) {
        setPlayer1((prevProp) => ({ ...prevProp, score: player1.score + 1 }));
      }
      if (player2.symbol === winner.winner) {
        setPlayer2((prevProp) => ({ ...prevProp, score: player2.score + 1 }));
      }
      if (currentRound === roundNumbers) setIsGameOver(true);
    }
  };

  return (
    <div className="mainContainer">
      <div className="configGame">
        <button className="newgamebutton" onClick={startNewGame}>
          Start New Game
        </button>
        <div className="playersRegister">
          <Player
            onSubmitName={onSubmitName}
            playerNumber={1}
            style={{ display: player1.edit ? "block" : "none" }}
          />
          <Player
            onSubmitName={onSubmitName}
            playerNumber={2}
            style={{ display: player2.edit ? "block" : "none" }}
          />
        </div>
        <div className="playerCardsContainer ">
          <div
            className="PlayerCard"
            style={{
              backgroundColor: gameWinner === player1.name ? "green" : "white",
            }}
          >
            <h3>Player 1</h3>
            <div className="playerHeader">
              <h2>{player1.name}</h2>
            </div>
            <button
              style={{
                display: player1.name ? "inline-block" : "none",
                backgroundColor:
                  gameWinner === player1.name ? "green" : "white",
              }}
              onClick={() => editPlayerName(player1)}
              className="editNameButton"
            >
              Edit
            </button>
            <p>Symbol: {player1.symbol}</p>
            <p>
              Score: <span>{player1.score}</span>
            </p>
          </div>
          <div
            className="PlayerCard"
            style={{
              backgroundColor: gameWinner === player2.name ? "green" : "white",
            }}
          >
            <h3>Player 2</h3>
            <div className="playerHeader">
              <h2>{player2.name}</h2>
            </div>
            <button
              style={{
                display: player2.name ? "inline-block" : "none",
                backgroundColor:
                  gameWinner === player2.name ? "green" : "white",
              }}
              onClick={() => editPlayerName(player2)}
              className="editNameButton"
            >
              Edit
            </button>
            <p>Symbol: {player2.symbol}</p>
            <p>
              Score: <span>{player2.score}</span>
            </p>
          </div>
        </div>
        <div className="roundSelectorContainer">
          <label style={{ display: isNewGame ? "block" : "none" }}>
            Select number of rounds:{" "}
          </label>
          <select
            className="RoundSelector"
            style={{ display: isNewGame ? "block" : "none" }}
            name="RoundSelector"
            onChange={(e) => setRoundNumbers(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="9">9</option>
          </select>
          <button
            className="newgamebutton"
            onClick={startGame}
            style={{
              display:
                isNewGame && player1.name && player2.name ? "block" : "none",
            }}
          >
            Start Game
          </button>
        </div>
      </div>
      <div className="gameContainer">
        <div
          className="gamewinner"
          style={{ display: gameWinner ? "block" : "none" }}
        >
          {gameWinner === "DRAW"
            ? "Is a draw"
            : `${gameWinner} wins this game!`}
        </div>
        <div className="boardContainer">
          <h6 style={{ display: isNewRound ? "block" : "none" }}>
            Round <span>{currentRound}</span> / <span>{roundNumbers}</span>
          </h6>
          <h6 style={{ display: isNewRound ? "block" : "none" }}>
            The current player is: <span> {currentPlayer.name}</span>
          </h6>
          <Board
            handleCellClick={handleCellClick}
            squares={squares}
            isNewGame={!isNewGame}
            winnerSolution={winnerSolution}
          />
          <div
            className="winner"
            style={{ display: endRound ? "block" : "none" }}
          >
            Player {roundWinner} wins this round!
          </div>
          <button
            className="buttonRestart"
            style={{ display: endRound ? "block" : "none" }}
            onClick={newRound}
          >
            New Round
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateRoundWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerSolution: lines[i] };
    }
  }

  if (squares.filter((elem) => elem === "X" || elem === "O").length === 9) {
    return { winner: "Draw", winnerSolution: "" };
  }

  return null;
}

export default GameComponent;
