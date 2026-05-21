// src/components/TicTacToe.jsx
import React, { useState, useEffect } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); 
  const [gameMode, setGameMode] = useState(null); // null = choosing, 'pvp' = 2 Player, 'ai' = AI Bot

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const minimax = (squares, depth, isMaximizing) => {
    const currentWinner = calculateWinner(squares);
    if (currentWinner === 'O') return 10 - depth;
    if (currentWinner === 'X') return depth - 10;
    if (squares.every(s => s !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        let bestScore = -Infinity;
        let bestMove = -1;
        let boardClone = [...board];

        for (let i = 0; i < 9; i++) {
          if (boardClone[i] === null) {
            boardClone[i] = 'O';
            let score = minimax(boardClone, 0, false);
            boardClone[i] = null;
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }

        if (bestMove !== -1) {
          const finalBoard = [...board];
          finalBoard[bestMove] = 'O';
          setBoard(finalBoard);
          setIsXNext(true);
        }
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [isXNext, gameMode, board, winner, isDraw]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    if (gameMode === 'ai' && !isXNext) return; // Block clicking during AI turn

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const menuButtonStyle = {
    padding: '12px 24px', margin: '10px', backgroundColor: '#00bcd4',
    border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '5px',
    cursor: 'pointer', fontSize: '1rem', width: '200px'
  };

  // Render Selection Menu if no mode is chosen yet
  if (!gameMode) {
    return (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h3 style={{ color: '#00bcd4', marginBottom: '20px' }}>❌ Tic-Tac-Toe Setup ⭕</h3>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>Choose your match structure:</p>
        <button onClick={() => setGameMode('pvp')} style={menuButtonStyle}>🎮 Pass & Play (2 Player)</button>
        <button onClick={() => setGameMode('ai')} style={menuButtonStyle}>🤖 Challenge Unbeatable AI</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', marginBottom: '10px' }}>❌ Tic-Tac-Toe ({gameMode === 'ai' ? 'vs AI' : 'Local 2P'}) ⭕</h3>
      <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${isXNext ? '❌ (Player 1)' : gameMode === 'ai' ? '⭕ (AI Engine)' : '⭕ (Player 2)'}`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {board.map((value, index) => (
          <button key={index} onClick={() => handleClick(index)} style={{
            width: '80px', height: '80px', backgroundColor: 'rgba(0, 188, 212, 0.05)',
            border: '2px solid #00bcd4', borderRadius: '8px', fontSize: '2rem',
            color: value === 'X' ? '#25D366' : '#ffc107', fontWeight: 'bold', cursor: 'pointer'
          }}>{value}</button>
        ))}
      </div>

      <button onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); setGameMode(null); }} style={{ padding: '8px 24px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
        Exit to Menu
      </button>
    </div>
  );
}

export default TicTacToe;