import React, { useState } from 'react';

import * as styles from './index.module.css';

export function App() {
  const lastMoveState = localStorage.getItem("lastMoveState");
  const savedGameState = localStorage.getItem("savedGameState");
  const [ moveState, setMoveState ] = useState(lastMoveState === "X" ? "O" : "X");


  const onClickCell = (e) => {
    console.log("event", e.target);
    if (e.target.innerHTML !== "") {
      e.stopPropagation();
      e.preventDefault();
      
      return;
    }

    const clickedCell = document.getElementById(e.target.id); 
    if (moveState === "X") {
      setMoveState("O");
      clickedCell.innerHTML = "X";
      clickedCell.classList.add(`${styles.unclickable}`);
      localStorage.setItem("lastMoveState", "X");
      processGameState("X"+e.target.id);
    } else {
      setMoveState("X");
      clickedCell.innerHTML = "O";
      clickedCell.classList.add(`${styles.unclickable}`);
      localStorage.setItem("lastMoveState", "O");
      processGameState("O"+e.target.id);
    }
  };

  const processGameState = (latestMove) => {
    console.log("latestMove", latestMove);

    if (savedGameState) {
      let savedGameStateArray = JSON.parse(savedGameState);

      savedGameStateArray.push(latestMove);
      localStorage.setItem("savedGameState", JSON.stringify(savedGameStateArray));
    } else {
      localStorage.setItem("savedGameState", JSON.stringify([latestMove]));
    }
  };

  return <div className={styles.ticTacToeContainer}>
    <div className={styles.ticTacToeGrid}>
      <div className={styles.row}>
        <button className={styles.cell} onClick={onClickCell} id="c1"></button>
        <button className={styles.cell}></button>
        <button className={styles.cell}></button>
      </div>
      <div className={styles.row}>
        <button className={styles.cell}></button>
        <button className={styles.cell}></button>
        <button className={styles.cell}></button>
      </div>
      <div className={styles.row}>
        <button className={styles.cell}></button>
        <button className={styles.cell}></button>
        <button className={styles.cell}></button>
      </div>
    </div>
  </div>;
}
