'use client';

import React from 'react';
import Link from 'next/link';
import './LandingPage.css';

const LandingPage = () => {
  
  return (
    <div className="background-container">
      <h1>Welcome to Pulse AI</h1>
      <h2>Pulse AI is a responsive and intelligent conversational assistant designed to provide quick, accurate, and engaging interactions with users.</h2>
      <Link href="/chat">
        <button>Start Chat</button>
      </Link>
    </div>
  );
};

export default LandingPage;
