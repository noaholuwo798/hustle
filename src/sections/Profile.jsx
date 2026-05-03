import { useState, useRef } from 'react';

const INIT_ACHIEVEMENTS = [
  { id: 1, emoji: '💰', title: 'First $1K Month', desc: 'Hit $1,000 in a single month', date: 'Mar 2026', unlocked: true },
  { id: 2, emoji: '🤝', title: 'First Client', desc: 'Closed your first paying client', date: 'Feb 2026', unlocked: true },
  { id: 3, emoji: '📱', title: '1K Followers', desc: 'Grew your social media to 1,000', date: 'Jan 2026', unlocked: true },
  { id: 4, emoji: '🔥', title: '30-Day Streak', desc: 'Showed up 30 days in a row', date: 'Apr 2026', unlocked: true },
  { id: 5, emoji: '🚀', title: 'First Launch', desc: 'Launched your first product or offer', date: 'Apr 2026', unlocked: true },
  { id: 6, emoji: '👑', title: '$10K Month', desc: 'Hit $10,000 in a single month', date: '—', unlocked: false },
  { id: 7, emoji: '🏆', title: 'Top Hustler', desc: 'Ranked in the top 100 on the platform', date: '—', unlocked: false },
  { id: 8, emoji: '💎', title: 'Six Figures', desc: '$100K+ in total revenue', date: '—', unlocked: false },
];

const INIT_STATS = [
  { label: 'Total Revenue', value: '$4,680', color: 'var(--green)' },
  { label: 'Connections', value: '24', color: 'var(--gold)' },
  { label: 'Mentor Rating', value: '—', color: 'var(--text-dim)' },
  { label: 'Days Active', value: '47', color: 'var(--blue)' },
];

const NICHES = ['Dropshipping', 'SMMA', 'Amazon FBA', 'Clothing Brand', 'Real Estate', 'Content Creator', 'Photography', 'Food Business', 'Service Business', 'Day Trading', 'Freelancing', 'Other'];

const PHOTOS = [
  { id: 1, emoji: '🏆', caption: 'First $1K week 🔥' },
  { id: 2, emoji: '📊', caption: 'Analytics looking good' },
  { id: 3, emoji: '🤝', caption: 'Closed a new client' },
  { id: 4, emoji: '💻', caption: 'Deep work session' },
  { id: 5, emoji: '🚀', caption: 'Product launch day' },
  { id: 6, emoji: '💰', caption: 'Another bag secured' },
];

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Your Name',
    handle: '@yourhustle',
    niche: 'Dropshipping',
    city: 'Atlanta, GA',
    bio: 'Building my empire one day at a time. Dropshipper turned brand builder. The grind never stops. 💪',
    goal: 'Hit $10K/month by Q3 2026',
    avatar: '🔥',
  });
  const [draft, setDraft] = useState(profile);
  const [tab, setTab] = useState('achievements');
  const [photos, setPhotos] = useState(PHOTOS);
  const [newCaption, setNewCaption] = useState('');
  const [addingPhoto, setAddingPhoto] = useState(false);
  const [achievements] = useState(INIT_ACHIEVEMENTS);
  const fileRef = useRef(null);

  const saveProfile = () => {
    setProfile(draft);
    setEditing(false);
  };

  const addPhoto = () => {
    if (!newCaption.trim()) return;
    const emojis = ['💪', '🔥', '⚡', '💡', '🎯', '🏆', '💰', '🚀'];
    setPhotos(p => [...p, { id: Date.now(), emoji: emojis[Math.floor(Math.random() * emojis.length)], caption: newCaption }]);
    setNewCaption('');
    setAddingPhoto(false);
  };

  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">YOU</div>
        <h1 className="section-title">YOUR <span>PROFILE</span></h1>
        <p className="section-desc">This is your hustle story. Document the journey. Celebrate the wins.</p>
      </div>

      {/* Profile card */}
      <div className="card" style={{ marginBottom: 24, border: '1px solid var(--border-gold)' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dim), rgba(245,166,35,0.3))', border: '3px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, cursor: 'pointer' }}
              onClick={() => fileRef.current?.click()}>
              {profile.avatar}
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer', border: '2px solid var(--bg-card)' }}
              onClick={() => fileRef.current?.click()}>
              ✎
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="grid-2" style={{ gap: 10 }}>
                  <div>
                    <label className="input-label">Display Name</label>
                    <input className="input" value={draft.name} onChange={e => setDraft(d => ({...d, name: e.target.value}))} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="input-label">Handle</label>
                    <input className="input" value={draft.handle} onChange={e => setDraft(d => ({...d, handle: e.target.value}))} placeholder="@yourhustle" />
                  </div>
                  <div>
                    <label className="input-label">Niche</label>
                    <select className="select" style={{ width: '100%' }} value={draft.niche} onChange={e => setDraft(d => ({...d, niche: e.target.value}))}>
                      {NICHES.map(n => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">City</label>
                    <input className="input" value={draft.city} onChange={e => setDraft(d => ({...d, city: e.target.value}))} placeholder="City, State" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Bio</label>
                  <input className="input" value={draft.bio} onChange={e => setDraft(d => ({...d, bio: e.target.value}))} placeholder="Tell your hustle story..." />
                </div>
                <div>
                  <label className="input-label">Current Goal</label>
                  <input className="input" value={draft.goal} onChange={e => setDraft(d => ({...d, goal: e.target.value}))} placeholder="What are you working toward?" />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-gold btn-sm" onClick={saveProfile}>Save Profile</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setDraft(profile); setEditing(false); }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '0.03em', color: 'var(--text)' }}>{profile.name}</div>
                  <span className="badge badge-gold">✓ Hustler</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{profile.handle} · {profile.niche.toUpperCase()}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 10 }}>📍 {profile.city}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>{profile.bio}</div>
                <div style={{ padding: '8px 12px', background: 'var(--gold-dim)', borderRadius: 8, border: '1px solid var(--border-gold)', fontSize: 12, color: 'var(--gold)', display: 'inline-block', marginBottom: 14 }}>
                  🎯 <strong>Goal:</strong> {profile.goal}
                </div>
                <div>
                  <button className="btn btn-outline btn-sm" onClick={() => { setDraft(profile); setEditing(true); }}>✎ Edit Profile</button>
                </div>
              </>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flexShrink: 0 }}>
            {INIT_STATS.map((s, i) => (
              <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', textAlign: 'center', minWidth: 90 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginTop: 2 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="toggle-group" style={{ width: 400, marginBottom: 24 }}>
        {[['achievements', '🏆 Achievements'], ['photos', '📸 Posts'], ['journey', '📖 Journey']].map(([key, label]) => (
          <button key={key} className={`toggle-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Achievements tab */}
      {tab === 'achievements' && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', marginBottom: 4 }}>UNLOCKED <span style={{ color: 'var(--gold)' }}>({unlocked.length})</span></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
            {unlocked.map(a => (
              <div key={a.id} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border-gold)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{a.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: 6 }}>{a.desc}</div>
                  <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', color: 'var(--text-dim)' }}>LOCKED ({locked.length})</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {locked.map(a => (
              <div key={a.id} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start', opacity: 0.45 }}>
                <div style={{ fontSize: 28, flexShrink: 0, filter: 'grayscale(1)' }}>{a.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', marginBottom: 2 }}>🔒 {a.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photos tab */}
      {tab === 'photos' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em' }}>YOUR <span style={{ color: 'var(--gold)' }}>POSTS</span></div>
            <button className="btn btn-gold btn-sm" onClick={() => setAddingPhoto(!addingPhoto)}>+ Add Post</button>
          </div>

          {addingPhoto && (
            <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border-gold)' }}>
              <label className="input-label">POST CAPTION</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <input className="input" style={{ flex: 1 }} value={newCaption} onChange={e => setNewCaption(e.target.value)} onKeyDown={e => e.key === 'Enter' && addPhoto()} placeholder="Share your win, lesson, or milestone..." />
                <button className="btn btn-gold btn-sm" onClick={addPhoto}>Post</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setAddingPhoto(false)}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {photos.map(p => (
              <div key={p.id} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-elevated)', cursor: 'pointer' }}>
                <div style={{ height: 160, background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-input))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
                  {p.emoji}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{p.caption}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>TAP TO VIEW</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Journey tab */}
      {tab === 'journey' && (
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', marginBottom: 20 }}>YOUR <span style={{ color: 'var(--gold)' }}>HUSTLE JOURNEY</span></div>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--gold), transparent)' }} />
            {[
              { date: 'May 2026', event: 'Joined HUSTLE platform', detail: 'Started the journey. Everything begins here.', color: 'var(--gold)', emoji: '⚡' },
              { date: 'Feb 2026', event: 'Closed first paying client', detail: 'First money hits different. The proof of concept moment.', color: 'var(--green)', emoji: '🤝' },
              { date: 'Mar 2026', event: 'Hit first $1K month', detail: '$1,080 earned. The momentum is real.', color: 'var(--green)', emoji: '💰' },
              { date: 'Apr 2026', event: 'Launched first product drop', detail: '37 units sold in 72 hours. The hustle is working.', color: 'var(--gold)', emoji: '🚀' },
              { date: 'Apr 2026', event: '30-day posting streak', detail: 'Consistency is the ultimate competitive advantage.', color: 'var(--purple)', emoji: '🔥' },
              { date: 'Next Up', event: 'Hit $10K/month', detail: 'The goal is locked in. The work is being done.', color: 'var(--text-dim)', emoji: '👑', locked: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -26, width: 22, height: 22, borderRadius: '50%', background: item.locked ? 'var(--bg-elevated)' : item.color, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>
                  {item.locked ? '🔒' : ''}
                </div>
                <div style={{ padding: '14px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: `1px solid ${item.locked ? 'var(--border)' : item.color + '44'}`, flex: 1, opacity: item.locked ? 0.5 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{item.emoji} {item.event}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{item.date}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
