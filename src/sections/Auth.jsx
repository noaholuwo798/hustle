import { useState, useEffect, useRef } from 'react';

const NICHES = ['Dropshipping','SMMA','Amazon FBA','Clothing Brand','Real Estate','Content Creator','Photography','Food Business','Service Business','Day Trading','Freelancing','Other'];

export default function Auth({ onLogin }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 110 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 0.8 + Math.random() * 3.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.18 + Math.random() * 0.55),
      color: ['#FFD700','#FFE44D','#7F77DD','#1D9E75','rgba(255,255,255,0.6)','#D85A30'][i % 6],
      opacity: 0.06 + Math.random() * 0.44,
      isCoin: i % 9 === 0,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.55, 0, canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.65);
      grad.addColorStop(0, 'rgba(255,215,0,0.025)');
      grad.addColorStop(0.4, 'rgba(127,119,221,0.012)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isCoin) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size + 3, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
          ctx.strokeStyle = '#D4A800';
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.font = `bold ${(p.size + 2) * 1.4}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', 0, 0);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const switchMode = (m) => { setVisible(false); setTimeout(() => { setMode(m); setVisible(true); }, 200); };

  const handleSubmit = () => {
    if (mode === 'login' && (!email || !password)) return;
    if (mode === 'signup' && (!name || !email || !password)) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: name || email.split('@')[0], username: username || '@hustler', niche }); }, 1200);
  };

  return (
    <div className="auth-bg">
      <canvas ref={canvasRef} className="auth-canvas" />

      <div className="auth-card" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
        <div className="auth-logo">HUSTLE</div>
        <div className="auth-tagline">Build Different. Live Different.</div>

        <div className="auth-title">{mode === 'login' ? 'WELCOME BACK' : 'JOIN THE MOVEMENT'}</div>

        {mode === 'signup' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <div className="auth-input-wrap">
              <label className="auth-label">Full Name</label>
              <input className="auth-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="auth-input-wrap">
              <label className="auth-label">Username</label>
              <input className="auth-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="@handle" />
            </div>
          </div>
        )}

        <div className="auth-input-wrap">
          <label className="auth-label">Email Address</label>
          <input className="auth-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
        </div>
        <div className="auth-input-wrap">
          <label className="auth-label">Password</label>
          <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        {mode === 'signup' && (
          <div className="auth-input-wrap">
            <label className="auth-label">Your Hustle / Niche</label>
            <select className="auth-select" value={niche} onChange={e => setNiche(e.target.value)}>
              <option value="">What do you do?</option>
              {NICHES.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        )}

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : mode === 'login' ? 'LOGIN →' : 'JOIN HUSTLE →'}
        </button>

        {mode === 'login' && (
          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--text-dim)', cursor: 'pointer' }}>Forgot password?</span>
          </div>
        )}

        <div className="auth-switch" style={{ marginTop: 20 }}>
          {mode === 'login'
            ? <>No account? <span onClick={() => switchMode('signup')}>Create Account</span></>
            : <>Have an account? <span onClick={() => switchMode('login')}>Log In</span></>}
        </div>
      </div>
    </div>
  );
}
