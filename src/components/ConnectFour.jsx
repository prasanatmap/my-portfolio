// src/components/ConnectFour.jsx
import React, { useState, useEffect } from 'react';

const ROWS = 6;
const COLS = 7;

function ConnectFour() {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [isYellowTurn, setIsYellowTurn] = useState(true); 
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState(null); // 'pvp' or 'ai'

  const checkLine = (a, b, c, d) => (a && a === b && a === c && a === d);

  const evaluateWinner = (grid) => {
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS - 3; c++) if (checkLine(grid[r][c], grid[r][c+1], grid[r][c+2], grid[r][c+3])) return grid[r][c];
    for (let r = 0; r < ROWS - 3; r++) for (let c = 0; c < COLS; c++) if (checkLine(grid[r][c], grid[r+1][c], grid[r+2][c], grid[r+3][c])) return grid[r][c];
    for (let r = 0; r < ROWS - 3; r++) for (let c = 0; c < COLS - 3; c++) if (checkLine(grid[r][c], grid[r+1][c+1], grid[r+2][c+2], grid[r+3][c+3])) return grid[r][c];
    for (let r = 3; r < ROWS; r++) for (let c = 0; c < COLS - 3; c++) if (checkLine(grid[r][c], grid[r-1][c+1], grid[r-2][c+2], grid[r-3][c+3])) return grid[r][c];
    return null;
  };

  const executeGravityDrop = (grid, colIndex, discColor) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!grid[r][colIndex]) {
        grid[r][colIndex] = discColor;
        return true;
      }
    }
    return false;
  };

  const handleColumnClick = (c) => {
    if (winner) return;
    if (gameMode === 'ai' && !isYellowTurn) return; // Prevent clicking during AI turn

    let clone = board.map(row => [...row]);
    const color = isYellowTurn ? '💛' : '❤️';

    if (executeGravityDrop(clone, c, color)) {
      const matchWinner = evaluateWinner(clone);
      setBoard(clone);
      if (matchWinner) setWinner(matchWinner);
      else setIsYellowTurn(!isYellowTurn);
    }
  };

  useEffect(() => {
    if (gameMode !== 'ai' || isYellowTurn || winner) return;

    const timeout = setTimeout(() => {
      let clone = board.map(row => [...row]);
      let targetColumn = -1;

      for (let c = 0; c < COLS; c++) {
        let sim = board.map(row => [...row]);
        if (executeGravityDrop(sim, c, '❤️') && evaluateWinner(sim) === '❤️') {
          targetColumn = c; break;
        }
      }

      if (targetColumn === -1) {
        for (let c = 0; c < COLS; c++) {
          let sim = board.map(row => [...row]);
          if (executeGravityDrop(sim, c, '💛') && evaluateWinner(sim) === '💛') {
            targetColumn = c; break;
          }
        }
      }

      if (targetColumn === -1) {
        let validCols = [];
        for (let c = 0; c < COLS; c++) if (!board[0][c]) validCols.push(c);
        targetColumn = validCols[Math.floor(Math.random() * validCols.length)];
      }

      if (targetColumn !== undefined && executeGravityDrop(clone, targetColumn, '❤️')) {
        const matchWinner = evaluateWinner(clone);
        setBoard(clone);
        if (matchWinner) setWinner(matchWinner);
        else setIsYellowTurn(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isYellowTurn, board, winner, gameMode]);

  const menuButtonStyle = {
    padding: '12px 24px', margin: '10px', backgroundColor: '#00bcd4',
    border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '5px',
    cursor: 'pointer', fontSize: '1rem', width: '200px'
  };

  if (!gameMode) {
    return (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h3 style={{ color: '#00bcd4', marginBottom: '20px' }}>🔵 Connect Four Setup 🔴</h3>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>Select mode configuration:</p>
        <button onClick={() => setGameMode('pvp')} style={menuButtonStyle}>🎮 Pass & Play (2 Player)</button>
        <button onClick={() => setGameMode('ai')} style={menuButtonStyle}>🤖 Play Against Bot AI</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 5px 0' }}>🔵 Connect 4 ({gameMode === 'ai' ? 'vs AI' : 'Local 2P'})</h3>
      <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
        {winner ? <b style={{color: '#25D366'}}>Winner: {winner === '💛' ? 'Yellow' : 'Red'}</b> : `Current Turn: ${isYellowTurn ? '💛 Yellow' : gameMode === 'ai' ? '❤️ Red (AI)' : '❤️ Red'}`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', maxWidth: '320px', margin: '0 auto', padding: '10px', backgroundColor: '#0055ff', borderRadius: '8px' }}>
        {board.map((row, r) => row.map((cell, c) => (
          <div key={`${r}-${c}`} onClick={() => handleColumnClick(c)} style={{
            aspectRatio: '1', backgroundColor: cell ? 'transparent' : '#06060f', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', cursor: 'pointer'
          }}>{cell}</div>
        )))}
      </div>

      <button onClick={() => { setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null))); setIsYellowTurn(true); setWinner(null); setGameMode(null); }} style={{ padding: '8px 24px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}>
        Exit to Menu
      </button>
    </div>
  );
}

export default ConnectFour;