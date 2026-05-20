// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header style={{ marginBottom: '40px', textAlign: 'center', zIndex: 1, position: 'relative' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '10px', fontWeight: '800' }}>
        Prasanatma P
      </h1>
      <p style={{ color: '#00bcd4', fontSize: '1.4rem', fontWeight: '600', margin: '0 0 10px 0' }}>
        -----------------------------------------
      </p>
      <p style={{ color: '#00bcd4', fontSize: '1.4rem', fontWeight: '600', margin: '0 0 10px 0' }}>
        Senior Software Engineer
      </p>
      <p style={{ color: '#bbb', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
        8+ years of expertise in backend development, specialized in Java-based microservices, secure financial transaction systems, and AI agentic systems.
      </p>
    </header>
  );
}

export default Header;