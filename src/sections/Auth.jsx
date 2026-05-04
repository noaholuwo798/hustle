import { useState } from 'react';

const NICHES = ['Dropshipping','SMMA','Amazon FBA','Clothing Brand','Real Estate','Content Creator','Photography','Food Business','Service Business','Day Trading','Freelancing','Other'];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.round(Math.sin(i * 137.5 * Math.PI / 180) * 50 + 50),
  delay: (i * 0.7) % 15,
  duration: 12 + (i * 1.3) % 12,
  size: 3 + (i * 2.1) % 9,
  color: ['#FFD700','#7F77DD','#1D9E75','#FFE44D','#D85A30','#ffffff'][i % 6],
  opacity: 0.08 + (i % 5) * 0.06,
  isSquare: i % 3 === 0,
  startY: 60 + (i * 7) % 40,
}));

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (mode === 'login' && (!email || !password)) return;
    if (mode === 'signup' && (!name || !email || !password)) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: name || 'Hustler', username: username || 'hustler', niche }); }, 1200);
  };

  return (
    <div className="auth-bg">
      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className={`auth-particle${p.isSquare ? ' square' : ''}`}
          style={{
            left: `${p.x}%`,
            bottom: `-${p.startY}px`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Subtle radial glow behind card */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,215,0,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="auth-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="auth-logo">HUSTLE</div>
        <div className="auth-tagline">Your Empire Starts Here</div>

        <div className="auth-title">{mode === 'login' ? 'WELCOME BACK' : 'JOIN THE MOVEMENT'}</div>

        {mode === 'signup' && (
          <>
            <div className="auth-input-wrap">
              <label className="auth-label">Full Name</label>
              <input className="auth-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="auth-input-wrap">
              <label className="auth-label">Username</label>
              <input className="auth-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="@yourhustle" />
            </div>
          </>
        )}

        <div className="auth-input-wrap">
          <label className="auth-label">Email</label>
          <input className="auth-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>

        <div className="auth-input-wrap">
          <label className="auth-label">Password</label>
          <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        {mode === 'signup' && (
          <div className="auth-input-wrap">
            <label className="auth-label">Your Hustle / Niche</label>
            <select className="auth-select" value={niche} onChange={e => setNiche(e.target.value)}>
              <option value="">Select your niche...</option>
              {NICHES.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        )}

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : mode === 'login' ? 'LOGIN →' : 'JOIN HUSTLE →'}
        </button>

        <div className="auth-switch">
          {mode === 'login' ? (
            <>Don't have an account? <span onClick={() => setMode('signup')}>Create Account</span></>
          ) : (
            <>Already a member? <span onClick={() => setMode('login')}>Log In</span></>
          )}
        </div>

        <div className="auth-demo" onClick={() => onLogin({ name: 'Demo User', username: '@demo', niche: 'Dropshipping' })}>
          Skip — enter as demo user
        </div>
      </div>
    </div>
  );
}
