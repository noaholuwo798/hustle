import { useState, useRef } from 'react';

const BANNER_OPTIONS = [
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
];

const INIT_ACHIEVEMENTS = [
  { id: 1, emoji: '💰', title: 'First $1K Month', desc: 'Hit $1,000 in a single month', date: '—', unlocked: false, rarity: 'gold' },
  { id: 2, emoji: '🤝', title: 'First Client', desc: 'Closed your first paying client', date: '—', unlocked: false, rarity: 'silver' },
  { id: 3, emoji: '📱', title: '1K Followers', desc: 'Grew your social media to 1,000', date: '—', unlocked: false, rarity: 'silver' },
  { id: 4, emoji: '🔥', title: '30-Day Streak', desc: 'Showed up 30 days in a row', date: '—', unlocked: false, rarity: 'gold' },
  { id: 5, emoji: '🚀', title: 'First Launch', desc: 'Launched your first product or offer', date: '—', unlocked: false, rarity: 'gold' },
  { id: 6, emoji: '👑', title: '$10K Month', desc: 'Hit $10,000 in a single month', date: '—', unlocked: false, rarity: 'diamond' },
  { id: 7, emoji: '🏆', title: 'Top Hustler', desc: 'Ranked in the top 100 on the platform', date: '—', unlocked: false, rarity: 'diamond' },
  { id: 8, emoji: '💎', title: 'Six Figures', desc: '$100K+ in total revenue', date: '—', unlocked: false, rarity: 'diamond' },
];

const RARITY_COLORS = {
  silver: { border: '#A0A0B0', bg: 'rgba(160,160,176,0.12)', label: '#C0C0D0' },
  gold:   { border: '#FFD700', bg: 'rgba(255,215,0,0.12)',   label: '#FFD700' },
  diamond:{ border: '#7F77DD', bg: 'rgba(127,119,221,0.12)', label: '#A89EF5' },
};

const NICHES = ['Dropshipping','SMMA','Amazon FBA','Clothing Brand','Real Estate','Content Creator','Photography','Food Business','Service Business','Day Trading','Freelancing','Other'];

const PHOTOS = [];

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [showBannerPicker, setShowBannerPicker] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const [profile, setProfile] = useState({
    name: 'Your Name',
    handle: '@yourhustle',
    niche: 'Dropshipping',
    city: 'Atlanta, GA',
    bio: 'Building my empire one day at a time. Dropshipper turned brand builder. The grind never stops. 💪',
    goal: 'Hit $10K/month by Q3 2026',
  });
  const [draft, setDraft] = useState(profile);
  const [tab, setTab] = useState('achievements');
  const [photos, setPhotos] = useState(PHOTOS);
  const [newCaption, setNewCaption] = useState('');
  const [addingPhoto, setAddingPhoto] = useState(false);
  const [achievements] = useState(INIT_ACHIEVEMENTS);
  const fileRef = useRef(null);

  const saveProfile = () => { setProfile(draft); setEditing(false); };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarImg(ev.target.result);
    reader.readAsDataURL(file);
  };

  const addPhoto = () => {
    if (!newCaption.trim()) return;
    const imgs = ['https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=70','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=70'];
    setPhotos(p => [...p, { id: Date.now(), img: imgs[p.length % imgs.length], caption: newCaption }]);
    setNewCaption(''); setAddingPhoto(false);
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

      {/* Banner */}
      <div className="profile-banner" style={{ backgroundImage: `url(${BANNER_OPTIONS[bannerIdx]})`, position:'relative', height:200, borderRadius:16, overflow:'hidden', marginBottom: 0, border:'1px solid var(--border)' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)' }} />
        <button
          onClick={() => setShowBannerPicker(p => !p)}
          style={{ position:'absolute', top:14, right:14, background:'rgba(0,0,0,0.6)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', borderRadius:8, padding:'6px 12px', fontSize:12, cursor:'pointer', backdropFilter:'blur(8px)', fontFamily:'var(--font-mono)', letterSpacing:'0.08em' }}
        >
          ✎ CHANGE BANNER
        </button>

        {showBannerPicker && (
          <div style={{ position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)', display:'flex', gap:8, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(12px)', padding:'10px 14px', borderRadius:12, border:'1px solid var(--border)', zIndex:5 }}>
            {BANNER_OPTIONS.map((url, i) => (
              <div key={i} onClick={() => { setBannerIdx(i); setShowBannerPicker(false); }}
                style={{ width:52, height:36, borderRadius:6, backgroundImage:`url(${url})`, backgroundSize:'cover', backgroundPosition:'center', cursor:'pointer', border:`2px solid ${bannerIdx===i ? 'var(--gold)' : 'transparent'}`, transition:'border 0.15s', flexShrink:0 }} />
            ))}
          </div>
        )}
      </div>

      {/* Profile card */}
      <div className="card" style={{ marginTop: -48, marginBottom: 24, border: '1px solid var(--border-gold)', paddingTop: 60, position:'relative' }}>
        {/* Avatar overlapping banner */}
        <div style={{ position:'absolute', top: -44, left: 24 }}>
          <div style={{ position:'relative' }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ width:88, height:88, borderRadius:'50%', background: avatarImg ? 'transparent' : 'linear-gradient(135deg, #FFD700, #D4A800)', border:'3px solid var(--bg-card)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, cursor:'pointer', overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.6)' }}
            >
              {avatarImg ? <img src={avatarImg} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : '🔥'}
            </div>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ position:'absolute', bottom:0, right:0, width:26, height:26, borderRadius:'50%', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, cursor:'pointer', border:'2px solid var(--bg-card)', color:'#000', fontWeight:700 }}
            >
              ✎
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleAvatarUpload} />
          </div>
        </div>

        <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:88, flexShrink:0 }} /> {/* spacer for avatar */}

          {/* Info */}
          <div style={{ flex:1, minWidth:200 }}>
            {editing ? (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
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
                    <select className="select" style={{ width:'100%' }} value={draft.niche} onChange={e => setDraft(d => ({...d, niche: e.target.value}))}>
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
                  <input className="input" value={draft.bio} onChange={e => setDraft(d => ({...d, bio: e.target.value}))} />
                </div>
                <div>
                  <label className="input-label">Current Goal</label>
                  <input className="input" value={draft.goal} onChange={e => setDraft(d => ({...d, goal: e.target.value}))} />
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn btn-gold btn-sm" onClick={saveProfile}>Save</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setDraft(profile); setEditing(false); }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:4 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:28, letterSpacing:'0.03em' }}>{profile.name}</div>
                  <span className="badge badge-gold" style={{ fontSize:11 }}>✓ HUSTLER</span>
                  <span style={{ padding:'3px 8px', background:'rgba(127,119,221,0.15)', border:'1px solid #7F77DD44', borderRadius:6, fontSize:11, color:'#A89EF5', fontFamily:'var(--font-mono)' }}>🔥 {unlocked.length} BADGES</span>
                </div>
                <div style={{ fontSize:12, color:'var(--gold)', fontFamily:'var(--font-mono)', marginBottom:4 }}>{profile.handle} · {profile.niche.toUpperCase()}</div>
                <div style={{ fontSize:11, color:'var(--text-dim)', marginBottom:10 }}>📍 {profile.city}</div>
                <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.6, marginBottom:12 }}>{profile.bio}</div>
                <div style={{ padding:'8px 14px', background:'rgba(255,215,0,0.08)', borderRadius:8, border:'1px solid var(--border-gold)', fontSize:12, color:'var(--gold)', display:'inline-flex', alignItems:'center', gap:8, marginBottom:14 }}>
                  🎯 <strong>Goal:</strong> {profile.goal}
                </div>
                <div>
                  <button className="btn btn-outline btn-sm" onClick={() => { setDraft(profile); setEditing(true); }}>✎ Edit Profile</button>
                </div>
              </>
            )}
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, flexShrink:0 }}>
            {[
              { label:'Total Revenue', value:'$0', color:'var(--green)' },
              { label:'Connections',   value:'0',     color:'var(--gold)' },
              { label:'Streak',        value:'0d',    color:'var(--purple)' },
              { label:'Badges',        value:`0/${achievements.length}`, color:'var(--gold)' },
            ].map((s,i) => (
              <div key={i} style={{ padding:'12px 16px', background:'var(--bg-elevated)', borderRadius:10, border:'1px solid var(--border)', textAlign:'center', minWidth:90 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:20, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:9, color:'var(--text-dim)', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', marginTop:2 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="toggle-group" style={{ marginBottom:24 }}>
        {[['achievements','🏆 Badges'],['photos','📸 Posts'],['journey','📖 Journey']].map(([key,label]) => (
          <button key={key} className={`toggle-btn ${tab===key?'active':''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Achievements */}
      {tab === 'achievements' && (
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, letterSpacing:'0.05em' }}>YOUR <span style={{ color:'var(--gold)' }}>BADGES</span></div>
            <div style={{ fontSize:12, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{achievements.length} TO EARN</div>
          </div>

          {unlocked.length > 0 && (
            <>
              <div style={{ fontFamily:'var(--font-display)', fontSize:14, letterSpacing:'0.05em', color:'var(--gold)', marginBottom:10 }}>UNLOCKED ({unlocked.length})</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:12, marginBottom:24 }}>
                {unlocked.map(a => {
                  const r = RARITY_COLORS[a.rarity];
                  return (
                    <div key={a.id} style={{ padding:16, background:r.bg, borderRadius:12, border:`1px solid ${r.border}`, display:'flex', gap:12, alignItems:'flex-start', position:'relative', overflow:'hidden' }}>
                      <div style={{ position:'absolute', top:8, right:10, fontSize:9, fontFamily:'var(--font-mono)', color:r.label, letterSpacing:'0.1em', opacity:0.7 }}>{a.rarity.toUpperCase()}</div>
                      <div style={{ fontSize:28, flexShrink:0 }}>{a.emoji}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:3 }}>{a.title}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.4, marginBottom:6 }}>{a.desc}</div>
                        <div style={{ fontSize:10, color:r.label, fontFamily:'var(--font-mono)' }}>EARNED {a.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div style={{ fontFamily:'var(--font-display)', fontSize:14, letterSpacing:'0.05em', color:'var(--text-dim)', marginBottom:12 }}>LOCKED — KEEP GRINDING ({locked.length})</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:12 }}>
            {locked.map(a => (
              <div key={a.id} style={{ padding:16, background:'var(--bg-elevated)', borderRadius:12, border:'1px solid var(--border)', display:'flex', gap:12, alignItems:'flex-start', opacity:0.45 }}>
                <div style={{ fontSize:28, flexShrink:0, filter:'grayscale(1)' }}>{a.emoji}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:3 }}>🔒 {a.title}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.4 }}>{a.desc}</div>
                  <div style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'var(--font-mono)', marginTop:6 }}>DIAMOND BADGE</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      {tab === 'photos' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, letterSpacing:'0.05em' }}>YOUR <span style={{ color:'var(--gold)' }}>POSTS</span></div>
            <button className="btn btn-gold btn-sm" onClick={() => setAddingPhoto(p => !p)}>+ Add Post</button>
          </div>

          {addingPhoto && (
            <div style={{ marginBottom:20, padding:16, background:'var(--bg-elevated)', borderRadius:12, border:'1px solid var(--border-gold)' }}>
              <label className="input-label">CAPTION</label>
              <div style={{ display:'flex', gap:10, marginTop:6 }}>
                <input className="input" style={{ flex:1 }} value={newCaption} onChange={e => setNewCaption(e.target.value)} onKeyDown={e => e.key==='Enter' && addPhoto()} placeholder="Share your win, lesson, or milestone..." />
                <button className="btn btn-gold btn-sm" onClick={addPhoto}>Post</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setAddingPhoto(false)}>Cancel</button>
              </div>
            </div>
          )}

          {photos.length === 0 && !addingPhoto && (
            <div style={{ textAlign:'center', padding:'48px 20px', color:'var(--text-dim)', border:'1px dashed var(--border)', borderRadius:12 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>📸</div>
              <div style={{ fontSize:15, fontWeight:600, color:'var(--text-muted)', marginBottom:6 }}>No posts yet</div>
              <div style={{ fontSize:13, marginBottom:16 }}>Document your journey. Share your wins.</div>
              <button className="btn btn-gold btn-sm" onClick={() => setAddingPhoto(true)}>+ Add Your First Post</button>
            </div>
          )}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:12 }}>
            {photos.map(p => (
              <div key={p.id} style={{ borderRadius:12, overflow:'hidden', border:'1px solid var(--border)', background:'var(--bg-elevated)', cursor:'pointer', transition:'transform 0.15s', }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{ height:160, overflow:'hidden' }}>
                  <img src={p.img} alt={p.caption} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.target.style.display='none'; }} />
                </div>
                <div style={{ padding:'10px 12px' }}>
                  <div style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.4 }}>{p.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Journey */}
      {tab === 'journey' && (
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, letterSpacing:'0.05em', marginBottom:20 }}>YOUR <span style={{ color:'var(--gold)' }}>HUSTLE JOURNEY</span></div>
          <div style={{ position:'relative', paddingLeft:32 }}>
            <div style={{ position:'absolute', left:10, top:0, bottom:0, width:2, background:'linear-gradient(180deg, var(--gold), transparent)' }} />
            {[
              { date:'Today', event:'Joined HUSTLE platform', detail:'The journey starts now. Every empire began with a single step.', color:'var(--gold)', emoji:'⚡', locked:false },
              { date:'Coming', event:'Close your first client', detail:'Your first yes is the hardest — and the most important.', color:'var(--text-dim)', emoji:'🤝', locked:true },
              { date:'Coming', event:'Hit your first $1K month', detail:'The first thousand proves the model works.', color:'var(--text-dim)', emoji:'💰', locked:true },
              { date:'Coming', event:'Launch your first product', detail:'Execution beats perfection every time. Ship it.', color:'var(--text-dim)', emoji:'🚀', locked:true },
              { date:'Coming', event:'30-day consistency streak', detail:'Consistency is the one skill that unlocks everything else.', color:'var(--text-dim)', emoji:'🔥', locked:true },
              { date:'Coming', event:'Hit $10K/month', detail:'This is where it gets real. Keep moving.', color:'var(--text-dim)', emoji:'👑', locked:true },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:16, marginBottom:20, position:'relative' }}>
                <div style={{ position:'absolute', left:-26, width:22, height:22, borderRadius:'50%', background:item.locked ? 'var(--bg-elevated)' : item.color, border:`2px solid ${item.color}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, flexShrink:0 }}>
                  {item.locked ? '🔒' : ''}
                </div>
                <div style={{ padding:'14px 16px', background:'var(--bg-elevated)', borderRadius:10, border:`1px solid ${item.locked ? 'var(--border)' : item.color+'44'}`, flex:1, opacity:item.locked ? 0.5 : 1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{item.emoji} {item.event}</div>
                    <div style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{item.date}</div>
                  </div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.5 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
