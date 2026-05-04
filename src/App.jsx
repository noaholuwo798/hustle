import { useState } from 'react';
import Auth from './sections/Auth';
import HustleBot from './sections/HustleBot';
import Planner from './sections/Planner';
import Progress from './sections/Progress';
import Network from './sections/Network';
import Groups from './sections/Groups';
import Mentors from './sections/Mentors';
import Market from './sections/Market';
import Profile from './sections/Profile';
import Reels from './sections/Reels';

const NAV = [
  { id: 'reels',    label: 'Hustle Feed', icon: '🎬' },
  { id: 'bot',      label: 'HustleBot',   icon: '🤖' },
  { id: 'progress', label: 'Progress',    icon: '📊' },
  { id: 'planner',  label: 'Planner',     icon: '📅' },
  { id: 'network',  label: 'Network',     icon: '🔗' },
  { id: 'groups',   label: 'Groups',      icon: '💬' },
  { id: 'mentors',  label: 'Mentors',     icon: '🎓' },
  { id: 'market',   label: 'Market',      icon: '🛍️' },
  { id: 'profile',  label: 'Profile',     icon: '👤' },
];

const QUOTES = [
  '"Build the life they said was impossible."',
  '"Your future is created by what you do today."',
  '"Stay focused. Stay dangerous."',
  '"The grind is the gift."',
  '"Every no gets you closer to the yes."',
  '"Rich people have big libraries. Poor people have big TVs."',
  '"Don\'t stop when you\'re tired. Stop when you\'re done."',
];

export default function App() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('reels');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

  if (!user) return <Auth onLogin={setUser} />;

  const renderSection = () => {
    switch (section) {
      case 'reels':    return <Reels />;
      case 'bot':      return <HustleBot />;
      case 'planner':  return <Planner />;
      case 'progress': return <Progress />;
      case 'network':  return <Network />;
      case 'groups':   return <Groups />;
      case 'mentors':  return <Mentors />;
      case 'market':   return <Market />;
      case 'profile':  return <Profile />;
      default:         return <Reels />;
    }
  };

  return (
    <div className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 99, backdropFilter: 'blur(6px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-wordmark">HUSTLE</div>
          <div className="sidebar-tagline">Your Empire Starts Here</div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`nav-item ${section === item.id ? 'active' : ''}`}
              onClick={() => { setSection(item.id); setSidebarOpen(false); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {section === item.id && <div className="nav-indicator" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">🔥</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-tag">{user.niche ? user.niche.toUpperCase() : 'HUSTLER'}</div>
          </div>
          <div
            style={{ fontSize: 16, color: 'var(--text-dim)', cursor: 'pointer' }}
            title="Log out"
            onClick={() => setUser(null)}
          >⎋</div>
        </div>

        {/* Quote */}
        <div className="sidebar-quote">{quote}</div>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Mobile header */}
        <div className="mobile-header">
          <button className="btn btn-ghost btn-sm" onClick={() => setSidebarOpen(true)} style={{ padding: '7px 11px', fontSize: 18 }}>☰</button>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.1em', color: 'var(--gold)' }}>HUSTLE</div>
          <div style={{ width: 40 }} />
        </div>

        <div className="content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
