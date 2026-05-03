import { useState } from 'react';

const PEOPLE = [
  { id:1, name:'Marcus J.', role:'Dropshipper', city:'Atlanta, GA', age:24, gender:'M', avatar:'MJ', color:'#F5A623', followers:'8.2K', verified:true, online:true },
  { id:2, name:'Alicia R.', role:'SMMA Owner', city:'Miami, FL', age:28, gender:'F', avatar:'AR', color:'#A855F7', followers:'12.4K', verified:true, online:false },
  { id:3, name:'DeShawn T.', role:'Amazon FBA', city:'Houston, TX', age:31, gender:'M', avatar:'DT', color:'#00C896', followers:'5.1K', verified:false, online:true },
  { id:4, name:'Sofia M.', role:'Clothing Brand', city:'Los Angeles, CA', age:22, gender:'F', avatar:'SM', color:'#FF4444', followers:'22K', verified:true, online:true },
  { id:5, name:'Jaylen B.', role:'Real Estate', city:'Dallas, TX', age:35, gender:'M', avatar:'JB', color:'#4F8EF7', followers:'3.8K', verified:false, online:false },
  { id:6, name:'Priya K.', role:'Content Creator', city:'New York, NY', age:26, gender:'F', avatar:'PK', color:'#F5A623', followers:'45K', verified:true, online:true },
  { id:7, name:'Andre L.', role:'Barber/Stylist', city:'Chicago, IL', age:29, gender:'M', avatar:'AL', color:'#00C896', followers:'7.3K', verified:false, online:false },
  { id:8, name:'Keisha W.', role:'Food Business', city:'Detroit, MI', age:33, gender:'F', avatar:'KW', color:'#FF4444', followers:'9.1K', verified:true, online:true },
  { id:9, name:'Tyrese A.', role:'Photographer', city:'Nashville, TN', age:27, gender:'M', avatar:'TA', color:'#A855F7', followers:'16K', verified:true, online:false },
  { id:10, name:'Nadia C.', role:'Personal Trainer', city:'Phoenix, AZ', age:25, gender:'F', avatar:'NC', color:'#4F8EF7', followers:'11.2K', verified:false, online:true },
  { id:11, name:'Carlos V.', role:'Trucking Business', city:'San Antonio, TX', age:40, gender:'M', avatar:'CV', color:'#F5A623', followers:'2.4K', verified:false, online:false },
  { id:12, name:'Brianna S.', role:'Day Trader', city:'Charlotte, NC', age:30, gender:'F', avatar:'BS', color:'#00C896', followers:'18.6K', verified:true, online:true },
];

const NICHES = ['All Niches','Dropshipping','SMMA','Amazon FBA','Clothing Brand','Real Estate','Content Creator','Photography','Food Business','Barber/Stylist','Personal Trainer','Trucking','Day Trader'];

export default function Network() {
  const [genderFilter, setGenderFilter] = useState('All');
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(99);
  const [niche, setNiche] = useState('All Niches');
  const [connected, setConnected] = useState(new Set());
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = PEOPLE.filter(p => {
    if (genderFilter !== 'All' && p.gender !== genderFilter[0]) return false;
    if (p.age < minAge || p.age > maxAge) return false;
    if (niche !== 'All Niches' && p.role !== niche) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.role.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleConnect = (id) => {
    setConnected(c => {
      const next = new Set(c);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">COMMUNITY</div>
        <h1 className="section-title">NETWORK <span>HUB</span></h1>
        <p className="section-desc">Connect with entrepreneurs in your field. Your network is your net worth.</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, alignItems: 'end' }}>
          <div>
            <label className="input-label">Search</label>
            <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, city, niche..." />
          </div>
          <div>
            <label className="input-label">Gender</label>
            <div className="toggle-group">
              {['All', 'Male', 'Female'].map(g => (
                <button key={g} className={`toggle-btn ${genderFilter === g ? 'active' : ''}`} onClick={() => setGenderFilter(g)}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="input-label">Min Age: {minAge}</label>
            <input type="range" min={18} max={99} value={minAge} onChange={e => setMinAge(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
          </div>
          <div>
            <label className="input-label">Max Age: {maxAge}</label>
            <input type="range" min={18} max={99} value={maxAge} onChange={e => setMaxAge(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
          </div>
          <div>
            <label className="input-label">Niche</label>
            <select className="select" style={{ width: '100%' }} value={niche} onChange={e => setNiche(e.target.value)}>
              {NICHES.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {filtered.length} HUSTLERS FOUND · {connected.size} CONNECTED
          </span>
          {(genderFilter !== 'All' || minAge !== 18 || maxAge !== 99 || niche !== 'All Niches' || search) && (
            <button className="btn btn-ghost btn-sm" onClick={() => { setGenderFilter('All'); setMinAge(18); setMaxAge(99); setNiche('All Niches'); setSearch(''); }}>Clear filters</button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: 20 }}>
        <div className="person-grid">
          {filtered.map(p => (
            <div key={p.id} className="person-card" onClick={() => setSelected(s => s?.id === p.id ? null : p)}
              style={{ border: `1px solid ${selected?.id === p.id ? p.color : 'var(--border)'}` }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
                <div className="person-avatar-lg" style={{ background: p.color }}>
                  {p.avatar}
                </div>
                {p.online && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--bg-card)' }} />}
                {p.verified && (
                  <div style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#000' }}>✓</div>
                )}
              </div>
              <div className="person-name">{p.name}</div>
              <div className="person-role">{p.role}</div>
              <div className="person-location">📍 {p.city}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>Age {p.age} · {p.followers} followers</div>
              <button
                className={`btn btn-sm ${connected.has(p.id) ? 'btn-ghost' : 'btn-gold'}`}
                style={{ width: '100%', marginTop: 12 }}
                onClick={e => { e.stopPropagation(); toggleConnect(p.id); }}
              >
                {connected.has(p.id) ? '✓ Connected' : '+ Connect'}
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 14 }}>No hustlers match your filters. Try widening the search.</div>
            </div>
          )}
        </div>

        {/* Profile panel */}
        {selected && (
          <div className="card animate-slide-up" style={{ border: `1px solid ${selected.color}`, alignSelf: 'start' }}>
            <div style={{ textAlign: 'center', padding: '0 0 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: selected.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#000', margin: '0 auto 12px', border: `3px solid ${selected.color}` }}>{selected.avatar}</div>
                {selected.online && <div style={{ position: 'absolute', bottom: 14, right: 0, width: 14, height: 14, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--bg-card)' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.03em' }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: selected.color, fontFamily: 'var(--font-mono)', marginTop: 2 }}>{selected.role.toUpperCase()}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>📍 {selected.city}</div>
            </div>
            <div style={{ padding: '16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
              {[['AGE', selected.age], ['FOLLOWERS', selected.followers], ['STATUS', selected.online ? 'Online' : 'Offline']].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{l}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: l === 'STATUS' ? (selected.online ? 'var(--green)' : 'var(--text-dim)') : 'var(--text)', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 0' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'center' }}>
                Building their {selected.role} empire one day at a time. Open to collaborations, joint ventures, and knowledge sharing. 💪
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => toggleConnect(selected.id)}>
                {connected.has(selected.id) ? '✓ Connected' : '+ Connect Now'}
              </button>
              <button className="btn btn-ghost" style={{ width: '100%' }}>💬 Send Message</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
