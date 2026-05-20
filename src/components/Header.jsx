// src/components/Header.jsx
import React from 'react';

function Header() {
  // Replace this with your actual LinkedIn profile URL
  const linkedinUrl = "https://www.linkedin.com/in/prasanatma-p-anvekar-aab440112";

  // Format for WhatsApp API: https://wa.me/YOUR_PHONE_NUMBER (with country code, no spaces or '+' sign)
  // Using your number from the resume: 91738085922 (91 is India's country code)
  const whatsappUrl = "https://wa.me/919738085922?text=Hi%20Prasanatma,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!";

  // 🔗 Dynamically reference your photo from the public folder
  const profileImgPath = `${import.meta.env.BASE_URL}profile.jpg`;

  // Modern Flexbox layouts for the header alignment
  const headerContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '40px',
    zIndex: 1,
    position: 'relative',
    flexWrap: 'wrap', // Ensures it wraps beautifully on mobile screens
    textAlign: 'left'
  };

  const avatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%', // Makes the image a perfect circle
    border: '3px solid #00bcd4', // Gives it a glowing blue ring boundary
    objectFit: 'cover',
    boxShadow: '0 0 15px rgba(0, 188, 212, 0.4)' // Soft cyber glow
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    marginRight: '15px',
    marginTop: '15px',
    borderRadius: '5px',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  };

  return (
    <div style={headerContainerStyle}>
      {/* 1. Profile Picture Element */}
      <img
        src={profileImgPath}
        alt="Prasanatma P"
        style={avatarStyle}
        onError={(e) => {
          // Fallback if your photo isn't in the public folder yet
          e.target.src = "https://via.placeholder.com/120";
        }}
      />

      {/* 2. Professional Titles & Branding */}
      <div style={{ flex: '1', minWidth: '280px' }}>
        <h1 style={{ color: '#fff', fontSize: '3rem', margin: '0 0 5px 0', fontWeight: '800' }}>
          Prasanatma P
        </h1>
        <p style={{ color: '#00bcd4', fontSize: '1.4rem', fontWeight: '600', margin: '0 0 12px 0' }}>
          Senior Software Engineer
        </p>
        <p style={{ color: '#bbb', fontSize: '1.05rem', maxWidth: '600px', margin: '0 0 15px 0', lineHeight: '1.5' }}>
          8+ years of expertise in backend development, specialized in Java-based microservices, secure financial transaction systems, and AI agentic systems.
        </p>

        {/* 3. Action Connection Links Row */}
        <div>
          {/* LinkedIn Button */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...buttonStyle, backgroundColor: '#0077b5', color: '#fff' }}
          >
            💼 Connect on LinkedIn
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...buttonStyle, backgroundColor: '#25D366', color: '#fff' }}
          >
            💬 Chat on WhatsApp
          </a>

          <a
            href="mailto:prasanatmaanvekar@gmail.com?subject=Opportunity%20via%20Portfolio"
            style={{ ...buttonStyle, backgroundColor: '#ea4335', color: '#fff' }}
          >
            ✉️ Email Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;