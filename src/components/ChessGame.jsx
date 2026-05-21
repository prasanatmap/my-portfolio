// src/components/ChessGame.jsx
import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

function ChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState(() => game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [status, setStatus] = useState("White's Turn");
  const [gameMode, setGameMode] = useState(null);       // 'pvp' or 'ai'
  const [difficulty, setDifficulty] = useState(null);  // 'easy', 'medium', 'hard'

  const pieceSymbols = {
    p: { w: '♙', b: '♟' }, r: { w: '♖', b: '♜' }, n: { w: '♘', b: '♞' },
    b: { w: '♗', b: '♝' }, q: { w: '♕', b: '♛' }, k: { w: '♔', b: '♚' }
  };

  const getSquareName = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return files[col] + ranks[row];
  };

  const syncState = (engine) => {
    setGame(engine);
    setBoard(engine.board());
    setSelectedSquare(null);

    if (engine.isCheckmate()) setStatus("⚠️ Checkmate! Game Over.");
    else if (engine.isDraw()) setStatus("🤝 Draw Match!");
    else if (engine.inCheck()) setStatus(`💥 Check! (${engine.turn() === 'w' ? 'White' : 'Black'}'s Turn)`);
    else setStatus(`Current Turn: ${engine.turn() === 'w' ? 'White (You)' : `Black (AI - ${difficulty.toUpperCase()})`}`);
  };

  // 🤖 Multilevel Difficulty AI Evaluation Engine Loop
  useEffect(() => {
    if (gameMode === 'ai' && game.turn() === 'b' && !game.isCheckmate() && !game.isDraw()) {
      const timeout = setTimeout(() => {
        const moves = game.moves({ verbose: true });
        if (moves.length === 0) return;

        let selectedMove = moves[0];

        // 🟢 LEVEL 1: EASY MODE (70% Blunder Ratio / Random Selection)
        if (difficulty === 'easy' && Math.random() < 0.7) {
          selectedMove = moves[Math.floor(Math.random() * moves.length)];
        } 
        // 🟡 & 🔴 LEVEL 2 & 3: MEDIUM & HARD HEURISTIC SCANNERS
        else {
          const weights = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 1000 };
          let highestScore = -Infinity;

          for (let move of moves) {
            let score = 0;

            // Material capture assessment values
            if (move.captured) {
              score += weights[move.captured] * 10;
            }

            const sim = new Chess(game.fen());
            sim.move(move);

            if (sim.isCheckmate()) score += 10000;
            if (sim.inCheck()) score += 15;

            // 🔴 HARD MODE EXCLUSIVE: Lookahead defensive grid checking
            if (difficulty === 'hard') {
              // Check if the landing square is attacked by player's pieces after moving there
              const squareAttacked = sim.moves({ verbose: true }).some(m => m.to === move.to);
              if (squareAttacked) {
                score -= weights[move.piece] * 8; // Heavy penalty for hanging pieces
              }
              // Slight bonus for controlling center squares (d4, d5, e4, e5)
              if (['d4', 'd5', 'e4', 'e5'].includes(move.to)) {
                score += 2;
              }
            }

            // Inject tiny variation noise so AI doesn't make the exact same opening game move every time
            score += Math.random() * 0.5;

            if (score > highestScore) {
              highestScore = score;
              selectedMove = move;
            }
          }
        }

        const engineCopy = new Chess(game.fen());
        engineCopy.move(selectedMove);
        syncState(engineCopy);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [game, gameMode, difficulty]);

  const handleSquareClick = (row, col) => {
    if (game.isCheckmate() || game.isDraw()) return;
    if (gameMode === 'ai' && game.turn() === 'b') return; 
    
    const squareName = getSquareName(row, col);

    if (selectedSquare === null) {
      const piece = board[row][col];
      if (piece && piece.color === game.turn()) setSelectedSquare(squareName);
    } else {
      if (selectedSquare === squareName) {
        setSelectedSquare(null);
        return;
      }
      try {
        const engineCopy = new Chess(game.fen());
        const moveSuccess = engineCopy.move({ from: selectedSquare, to: squareName, promotion: 'q' });
        if (moveSuccess) syncState(engineCopy);
      } catch (error) {
        const targetPiece = board[row][col];
        if (targetPiece && targetPiece.color === game.turn()) setSelectedSquare(squareName);
        else setSelectedSquare(null);
      }
    }
  };

  const menuButtonStyle = (colorBg = '#00bcd4') => ({
    padding: '12px 24px', margin: '10px', backgroundColor: colorBg,
    border: 'none', color: colorBg === '#00bcd4' ? '#000' : '#fff', fontWeight: 'bold', borderRadius: '5px',
    cursor: 'pointer', fontSize: '1rem', width: '220px'
  });

  // Welcome Screen Menu Router Loop
  if (!gameMode) {
    return (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h3 style={{ color: '#00bcd4', marginBottom: '20px' }}>♟️ Chess Setup Panel ♟️</h3>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>Choose your match variant layout:</p>
        <button onClick={() => { setGameMode('pvp'); setDifficulty('local'); setStatus("White's Turn"); }} style={menuButtonStyle()}>🎮 Local Pass & Play</button>
        <button onClick={() => setGameMode('ai')} style={menuButtonStyle()}>🤖 Play Against Bot AI</button>
      </div>
    );
  }

  // Difficulty Tier Selector Panel for AI Setup
  if (gameMode === 'ai' && !difficulty) {
    return (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h3 style={{ color: '#00bcd4', marginBottom: '15px' }}>🤖 Choose AI Engine Difficulty</h3>
        <p style={{ color: '#aaa', marginBottom: '25px' }}>Configure lookahead algorithm weights:</p>
        <button onClick={() => { setDifficulty('easy'); setStatus("White's Turn (vs Easy AI)"); }} style={menuButtonStyle('#25D366')}>🟢 Easy Engine (Casual)</button>
        <button onClick={() => { setDifficulty('medium'); setStatus("White's Turn (vs Medium AI)"); }} style={menuButtonStyle('#ffc107')}>🟡 Medium Engine (Greedy)</button>
        <button onClick={() => { setDifficulty('hard'); setStatus("White's Turn (vs Hard AI)"); }} style={menuButtonStyle('#dc3545')}>🔴 Hard Engine (Strategic)</button>
        <br />
        <button onClick={() => setGameMode(null)} style={{ padding: '6px 12px', background: 'transparent', color: '#aaa', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', marginTop: '15px' }}>← Back to Main Menu</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h3 style={{ color: '#00bcd4', margin: '0 0 5px 0' }}>♟️ Chess ({gameMode === 'ai' ? `Bot AI - ${difficulty}` : 'Local 2P'})</h3>
      <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '0.95rem' }}>{status}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', maxWidth: '340px', margin: '0 auto 20px auto', border: '3px solid #333' }}>
        {board.map((rowArr, rowIndex) => rowArr.map((piece, colIndex) => {
          const squareName = getSquareName(rowIndex, colIndex);
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected = selectedSquare === squareName;
          return (
            <button key={squareName} onClick={() => handleSquareClick(rowIndex, colIndex)} style={{
              aspectRatio: '1', backgroundColor: isSelected ? '#25D366' : isLight ? '#f0d9b5' : '#b58863',
              border: 'none', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0,
              color: piece?.color === 'w' ? '#fff' : '#000', textShadow: piece?.color === 'w' ? '1px 1px 2px #000' : 'none'
            }}>
              {piece ? pieceSymbols[piece.type][piece.color] : ''}
            </button>
          );
        }))}
      </div>

      <button onClick={() => { setGame(new Chess()); setBoard(new Chess().board()); setDifficulty(null); setGameMode(null); }} style={{ padding: '8px 24px', backgroundColor: '#dc3545', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
        Exit to Menu
      </button>
    </div>
  );
}

export default ChessGame;