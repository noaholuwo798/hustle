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
import Location from './sections/Location';

const NAV = [
  { id: 'reels',    label: 'Feed',      icon: '🎬' },
  { id: 'bot',      label: 'AI',        icon: '🤖' },
  { id: 'progress', label: 'Progress',  icon: '📊' },
  { id: 'planner',  label: 'Planner',   icon: '📅' },
  { id: 'network',  label: 'Network',   icon: '🔗' },
  { id: 'groups',   label: 'Groups',    icon: '💬' },
  { id: 'mentors',  label: 'Mentors',   icon: '🎓' },
  { id: 'market',   label: 'Market',    icon: '🛍️' },
  { id: 'location', label: 'Map',       icon: '📍' },
  { id: 'profile',  label: 'Profile',   icon: '👤' },
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
  const [badges, setBadges] = useState({ groups: 28, network: 3, market: 5 });

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
      case 'location': return <Location />;
      case 'profile':  return <Profile />;
      default:         return <Reels />;
    }
  };

  const navigate = (id) => {
    setSection(id);
    setSidebarOpen(false);
    if (badges[id]) setBadges(b => ({ ...b, [id]: 0 }));
  };

  return (
    <div className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:99, backdropFilter:'blur(6px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (desktop) */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-wordmark">HUSTLE</div>
          <div className="sidebar-tagline">Your Empire Starts Here</div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`nav-item ${section === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-icon" style={{ position:'relative' }}>
                {item.icon}
                {badges[item.id] > 0 && (
                  <span className="nav-badge">{badges[item.id] > 99 ? '99+' : badges[item.id]}</span>
                )}
              </span>
              <span className="nav-label">{item.label}</span>
              {section === item.id && <div className="nav-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">🔥</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-tag">{user.niche ? user.niche.toUpperCase() : 'HUSTLER'}</div>
          </div>
          <div style={{ fontSize:16, color:'var(--text-dim)', cursor:'pointer' }} onClick={() => setUser(null)}>⎋</div>
        </div>

        <div className="sidebar-quote">{quote}</div>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Mobile header */}
        <div className="mobile-header">
          <button className="btn btn-ghost btn-sm" onClick={() => setSidebarOpen(true)} style={{ padding:'7px 11px', fontSize:18 }}>☰</button>
          <div style={{ fontFamily:'var(--font-display)', fontSize:24, letterSpacing:'0.1em', color:'var(--gold)' }}>HUSTLE</div>
          <div style={{ width:40 }} />
        </div>

        <div className="content">
          {renderSection()}
        </div>
      </div>

      {/* Bottom nav (mobile only) */}
      <nav className="bottom-nav">
        {NAV.map(item => (
          <button
            key={item.id}
            className={`bottom-nav-btn ${section === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <span className="bn-icon" style={{ position:'relative' }}>
              {item.icon}
              {badges[item.id] > 0 && (
                <span className="nav-badge" style={{ top:-4, right:-6 }}>{badges[item.id] > 9 ? '9+' : badges[item.id]}</span>
              )}
            </span>
            <span className="bn-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
