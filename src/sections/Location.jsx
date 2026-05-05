import { useState } from 'react';

const NEARBY_USERS = [
  { id:1, name:'Marcus J.', role:'Dropshipper', avatar:'MJ', color:'#FFD700', city:'Atlanta', dist:'0.8 mi', online:true, verified:true },
  { id:2, name:'Keisha W.', role:'Food Business', avatar:'KW', color:'#D85A30', city:'Atlanta', dist:'1.2 mi', online:true, verified:true },
  { id:3, name:'Andre L.', role:'Barber/Stylist', avatar:'AL', color:'#1D9E75', city:'Atlanta', dist:'2.1 mi', online:false, verified:false },
  { id:4, name:'DeShawn T.', role:'Amazon FBA', avatar:'DT', color:'#7F77DD', city:'Atlanta', dist:'3.4 mi', online:true, verified:true },
  { id:5, name:'Tamara B.', role:'Content Creator', avatar:'TB', color:'#4F8EF7', city:'Atlanta', dist:'4.0 mi', online:false, verified:false },
  { id:6, name:'Jordan M.', role:'Real Estate', avatar:'JM', color:'#FFD700', city:'Atlanta', dist:'5.2 mi', online:true, verified:true },
];

const NEARBY_LISTINGS = [
  { id:1, title:'Custom Hoodies (Wholesale)', price:25, category:'Clothing', seller:'Marcus J.', dist:'0.8 mi', img:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&q=70' },
  { id:2, title:'Homemade Hot Sauce 6-Pack', price:48, category:'Food & Bev', seller:'Keisha W.', dist:'1.2 mi', img:'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=200&q=70' },
  { id:3, title:'Photography Session 1hr', price:150, category:'Services', seller:'Tyrese A.', dist:'2.8 mi', img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=70' },
  { id:4, title:'Barber Tools Pro Set', price:220, category:'Equipment', seller:'Andre L.', dist:'2.1 mi', img:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&q=70' },
];

const MAP_PINS = [
  { id:1, top:'22%', left:'35%', color:'#FFD700', label:'Marcus J.', type:'user' },
  { id:2, top:'45%', left:'58%', color:'#D85A30', label:'Keisha W.', type:'user' },
  { id:3, top:'60%', left:'28%', color:'#1D9E75', label:'Hot Sauce', type:'listing' },
  { id:4, top:'30%', left:'70%', color:'#7F77DD', label:'DeShawn T.', type:'user' },
  { id:5, top:'55%', left:'48%', color:'#4F8EF7', label:'Tamara B.', type:'user' },
  { id:6, top:'72%', left:'65%', color:'#FFD700', label:'Hoodies', type:'listing' },
  { id:7, top:'38%', left:'82%', color:'#1D9E75', label:'Jordan M.', type:'user' },
  { id:8, top:'18%', left:'55%', color:'#D85A30', label:'Photo Session', type:'listing' },
];

const CITY_LABELS = [
  { top:'14%', left:'30%', text:'Midtown' },
  { top:'50%', left:'18%', text:'West End' },
  { top:'66%', left:'55%', text:'East Atlanta' },
  { top:'28%', left:'72%', text:'Buckhead' },
];

export default function Location() {
  const [locationOn, setLocationOn] = useState(true);
  const [connected, setConnected] = useState(new Set());
  const [selectedPin, setSelectedPin] = useState(null);
  const [tab, setTab] = useState('people');

  const toggle = (id) => setConnected(c => { const n = new Set(c); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">DISCOVER</div>
        <h1 className="section-title">HUSTLE <span>MAP</span></h1>
        <p className="section-desc">See who's grinding near you. Find buyers, sellers, and collaborators in your city.</p>
      </div>

      {/* Location toggle */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', background:'var(--bg-card)', borderRadius:'var(--radius)', border:'1px solid var(--border)', marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:22 }}>📍</span>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>Location Sharing</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>
              {locationOn ? 'Visible to nearby hustlers · Atlanta, GA' : 'Hidden — turn on to connect with people near you'}
            </div>
          </div>
        </div>
        <div onClick={() => setLocationOn(l => !l)} style={{ width:48, height:26, borderRadius:999, background: locationOn ? 'var(--gold)' : 'var(--bg-elevated)', border:`1px solid ${locationOn ? 'var(--gold)' : 'var(--border)'}`, cursor:'pointer', position:'relative', transition:'all 0.2s', flexShrink:0 }}>
          <div style={{ position:'absolute', top:3, left: locationOn ? 24 : 3, width:18, height:18, borderRadius:'50%', background: locationOn ? '#000' : 'var(--text-dim)', transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.4)' }} />
        </div>
      </div>

      {!locationOn && (
        <div style={{ padding:'20px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', textAlign:'center', marginBottom:20 }}>
          <div style={{ fontSize:32, marginBottom:10 }}>🔒</div>
          <div style={{ fontWeight:700, marginBottom:6 }}>Location is off</div>
          <div style={{ fontSize:14, color:'var(--text-muted)' }}>Turn on location sharing to see people and opportunities near you.</div>
        </div>
      )}

      {locationOn && (
        <>
          {/* Map */}
          <div className="map-container" style={{ height:320, marginBottom:20 }}>
            {/* Roads */}
            {[20,42,65,82].map(p => <div key={p} className="map-road-h" style={{ top:`${p}%` }} />)}
            {[15,32,50,68,85].map(p => <div key={p} className="map-road-v" style={{ left:`${p}%` }} />)}

            {/* City labels */}
            {CITY_LABELS.map((c,i) => (
              <div key={i} style={{ position:'absolute', top:c.top, left:c.left, fontSize:10, color:'rgba(255,255,255,0.2)', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase', pointerEvents:'none' }}>{c.text}</div>
            ))}

            {/* You pin */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:3 }}>
              <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--gold)', boxShadow:'0 0 0 4px rgba(255,215,0,0.25), 0 0 0 8px rgba(255,215,0,0.1)', border:'2px solid #000' }} />
              <div style={{ position:'absolute', top:20, left:'50%', transform:'translateX(-50%)', fontSize:9, color:'var(--gold)', fontWeight:700, whiteSpace:'nowrap', background:'rgba(0,0,0,0.8)', padding:'2px 6px', borderRadius:999 }}>YOU</div>
            </div>

            {/* Pins */}
            {MAP_PINS.map(pin => (
              <div key={pin.id} className="map-pin" style={{ top:pin.top, left:pin.left }} onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}>
                <div className={`map-pin-dot map-pin-pulse`} style={{ background: pin.color, boxShadow:`0 4px 16px ${pin.color}66` }}>
                  <div className="map-pin-inner">{pin.type === 'listing' ? '🏷️' : '👤'}</div>
                </div>
                <div className="map-pin-label">{pin.label}</div>
              </div>
            ))}

            {/* Selected pin tooltip */}
            {selectedPin && (
              <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', background:'rgba(20,20,20,0.95)', border:`1px solid ${selectedPin.color}44`, borderRadius:10, padding:'10px 16px', fontSize:13, color:'var(--text)', backdropFilter:'blur(8px)', whiteSpace:'nowrap', zIndex:5 }}>
                <strong style={{ color: selectedPin.color }}>{selectedPin.label}</strong> · {selectedPin.type === 'listing' ? 'Nearby listing' : 'Hustler near you'} · {MAP_PINS.find(p => p.id === selectedPin.id) ? '~1-3 mi' : ''}
              </div>
            )}

            {/* Map overlay text */}
            <div style={{ position:'absolute', top:12, right:14, fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:'var(--font-mono)' }}>ATLANTA, GA</div>
            <div style={{ position:'absolute', top:12, left:14 }}>
              <span className="badge badge-green" style={{ fontSize:10 }}>● LIVE</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginBottom:20 }}>
            {[
              { label:'Hustlers Near You', value: NEARBY_USERS.length, icon:'👥', color:'var(--gold)' },
              { label:'Listings Near You', value: NEARBY_LISTINGS.length, icon:'🛍️', color:'var(--green)' },
              { label:'Mile Radius', value:'5', icon:'📍', color:'var(--purple)' },
            ].map((s,i) => (
              <div key={i} className="card" style={{ textAlign:'center', padding:'16px 10px' }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:28, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tab toggle */}
          <div className="toggle-group" style={{ marginBottom:20, maxWidth:320 }}>
            <button className={`toggle-btn ${tab === 'people' ? 'active' : ''}`} onClick={() => setTab('people')}>👥 People</button>
            <button className={`toggle-btn ${tab === 'listings' ? 'active' : ''}`} onClick={() => setTab('listings')}>🛍️ Listings</button>
          </div>

          {/* Nearby people */}
          {tab === 'people' && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {NEARBY_USERS.map(u => (
                <div key={u.id} className="card" style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px' }}>
                  <div style={{ position:'relative', flexShrink:0 }}>
                    <div style={{ width:48, height:48, borderRadius:'50%', background:u.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:800, color:'#000', border:`2px solid ${u.color}44` }}>{u.avatar}</div>
                    {u.online && <div style={{ position:'absolute', bottom:1, right:1, width:11, height:11, borderRadius:'50%', background:'var(--green)', border:'2px solid var(--bg-card)' }} />}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontWeight:700, fontSize:15 }}>{u.name}</span>
                      {u.verified && <span style={{ fontSize:13, color:u.color }}>✓</span>}
                    </div>
                    <div style={{ fontSize:12, color:'var(--gold)', fontFamily:'var(--font-mono)' }}>{u.role}</div>
                    <div style={{ fontSize:11, color:'var(--text-dim)', marginTop:2 }}>📍 {u.dist} away</div>
                  </div>
                  <button className={`btn btn-sm ${connected.has(u.id) ? 'btn-ghost' : 'btn-gold'}`} onClick={() => toggle(u.id)}>
                    {connected.has(u.id) ? '✓ Connected' : '+ Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Nearby listings */}
          {tab === 'listings' && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:16 }}>
              {NEARBY_LISTINGS.map(l => (
                <div key={l.id} className="listing-card">
                  <img src={l.img} alt={l.title} className="listing-img" onError={e => { e.target.style.display='none'; }} />
                  <div className="listing-body">
                    <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:4 }}>{l.title}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>By {l.seller} · 📍 {l.dist}</div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:22, color:'var(--green)' }}>${l.price}</span>
                      <span className="badge badge-gold" style={{ fontSize:10 }}>{l.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
