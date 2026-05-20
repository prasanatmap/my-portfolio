// src/components/Timeline.jsx
import React from 'react';

// The specific Blue we will use:
const themeBlue = '#00bcd4'; // Bright Cyan-Blue for contrast against the background's red/yellow lights

function Timeline({ data }) {
  return (
    <section>
      {/* White main section header */}
      <h2 style={{ color: '#ffffff', borderBottom: `2px solid ${themeBlue}`, paddingBottom: '10px', marginBottom: '30px' }}>
        Work Timeline
      </h2>
      
      {data.map((item) => (
        <div key={item.id} style={{ borderLeft: `4px solid ${themeBlue}`, paddingLeft: '20px', marginBottom: '40px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}>
          
          {/* Main role/title in White */}
          <h3 style={{ color: '#ffffff', margin: '0 0 10px 0' }}>
            {item.role} 
            {/* Company name in themeBlue */}
            <span style={{ color: themeBlue, fontWeight: 'normal' }}> at {item.company}</span>
          </h3>
          
          {/* Date is now Blue and White */}
          <p style={{ color: '#ffffff', fontWeight: 'bold', margin: '0 0 15px 0' }}>
            <span style={{ color: themeBlue }}>📅</span> {item.duration}
          </p>
          
          {/* Main description is White */}
          <p style={{ color: '#eeeeee', lineHeight: '1.6', fontSize: '1.05rem' }}>{item.description}</p>
          
          <div style={{ marginTop: '15px' }}>
            {item.skills.map((skill, index) => (
              // Skill tags are now Blue background with White text
              <span key={index} style={{ backgroundColor: themeBlue, color: '#000', padding: '6px 12px', marginRight: '10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '5px' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Timeline;