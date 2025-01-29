import { useState } from "react";

function Player({ onSubmitName, playerNumber, style }) {
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitName(name, playerNumber);
    setName("");
  };

  return (
    <>
      <form onSubmit={onSubmit} style={style}>
        <label style={{ marginRight: "2rem" }}>
          Name player {playerNumber}:
        </label>
        <input
          style={{ marginRight: "1rem" }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="Ok" />
      </form>
    </>
  );
}
export default Player;
