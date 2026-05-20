// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import { careerData } from './careerData'; 

function App() {
  const appStyle = {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    backgroundColor: '#06060f', // Deep tech dark
  };

  // Modern CSS-only dynamic glowing grid background
  const animatedBgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    backgroundImage: `
      linear-gradient(rgba(0, 188, 212, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 188, 212, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px', // Creates a clean developer grid
    backgroundPosition: 'center',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.3))',
  };

  // Glowing tech ambient circles that create a radiant background layer
  const glowingOrbStyle = {
    position: 'fixed',
    top: '20%',
    left: '10%',
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, rgba(0, 188, 212, 0.12) 0%, transparent 70%)',
    zIndex: -1,
    pointerEvents: 'none',
  };

  const contentContainerStyle = {
    padding: '80px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative', 
    zIndex: 1, 
  };

  return (
    <div style={appStyle}>
      {/* 🚀 CSS Engine Background - Completely bypasses browser video blocks */}
      <div style={animatedBgStyle}></div>
      <div style={glowingOrbStyle}></div>
      <div style={{...glowingOrbStyle, top: '60%', left: '60%', background: 'radial-gradient(circle, rgba(0, 188, 212, 0.08) 0%, transparent 70%)'}}></div>

      <div style={contentContainerStyle}>
        <Header />
        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '40px 0' }} />
        <Timeline data={careerData} />
      </div>
    </div>
  );
}

export default App;