import { useState } from 'react';
import HustleBot from './sections/HustleBot';
import Planner from './sections/Planner';
import Progress from './sections/Progress';
import Network from './sections/Network';
import Groups from './sections/Groups';
import Mentors from './sections/Mentors';
import Market from './sections/Market';
import Profile from './sections/Profile';

const NAV = [
  { id: 'bot', label: 'HustleBot', icon: '🤖' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'planner', label: 'Planner', icon: '📅' },
  { id: 'network', label: 'Network', icon: '🔗' },
  { id: 'groups', label: 'Groups', icon: '💬' },
  { id: 'mentors', label: 'Mentors', icon: '🎓' },
  { id: 'market', label: 'Market', icon: '🛍️' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

const QUOTES = [
  '"Build the life they said was impossible."',
  '"Your future is created by what you do today."',
  '"Stay focused. Stay dangerous."',
  '"The grind is the gift."',
  '"Every no gets you closer to the yes."',
];

export default function App() {
  const [section, setSection] = useState('bot');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

  const renderSection = () => {
    switch (section) {
      case 'bot': return <HustleBot />;
      case 'planner': return <Planner />;
      case 'progress': return <Progress />;
      case 'network': return <Network />;
      case 'groups': return <Groups />;
      case 'mentors': return <Mentors />;
      case 'market': return <Market />;
      case 'profile': return <Profile />;
      default: return <HustleBot />;
    }
  };

  return (
    <div className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 99, backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '0.1em', color: 'var(--gold)', lineHeight: 1 }}>HUSTLE</div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.25em', marginTop: 2 }}>YOUR EMPIRE STARTS HERE</div>
        </div>

        {/* Nav items */}
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

        {/* User avatar */}
        <div className="sidebar-user">
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #F5A623)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#000', flexShrink: 0 }}>
            🔥
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Your Name</div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>HUSTLER</div>
          </div>
        </div>

        {/* Quote */}
        <div className="sidebar-quote">
          <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 6 }}>DAILY FUEL</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>{quote}</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="main">
        {/* Mobile header */}
        <div className="mobile-header">
          <button className="btn btn-ghost btn-sm" onClick={() => setSidebarOpen(true)} style={{ padding: '6px 10px' }}>☰</button>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.1em', color: 'var(--gold)' }}>HUSTLE</div>
          <div style={{ width: 36 }} />
        </div>

        <div className="content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
