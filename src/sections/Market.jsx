import { useState, useMemo } from 'react';

const LISTINGS = [
  { id:1, seller:'Marcus J.', avatar:'MJ', color:'#FFD700', title:'Custom Hoodies (Wholesale)', category:'Clothing', price:25, unit:'per piece', city:'Atlanta', state:'GA', lat:33.749, lng:-84.388, img:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=600&q=80', condition:'New', desc:'Minimum 12 units. Premium heavyweight 400gsm fleece. Custom embroidery or DTF print included. Multiple colorways. Ships same week.', rating:4.9, sales:142 },
  { id:2, seller:'Sofia M.', avatar:'SM', color:'#D85A30', title:'Streetwear Drop — Limited Run', category:'Clothing', price:65, unit:'per item', city:'Los Angeles', state:'CA', lat:34.052, lng:-118.244, img:'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80', condition:'New', desc:'Limited 50 units. Heavyweight washed fleece, oversized cut. Ships in 3-5 days. Bulk pricing for 10+ units.', rating:4.8, sales:89 },
  { id:3, seller:'DeShawn T.', avatar:'DT', color:'#7F77DD', title:'iPhone 15 Pro Max 256GB', category:'Electronics', price:850, unit:'each', city:'Houston', state:'TX', lat:29.760, lng:-95.370, img:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80', condition:'Like New', desc:'30 days old. Space Black. Original box + charger + 2 cases. No scratches, full battery health. Local pickup preferred.', rating:5.0, sales:23 },
  { id:4, seller:'Keisha W.', avatar:'KW', color:'#D85A30', title:'Homemade Hot Sauce — 6 Pack', category:'Food & Bev', price:48, unit:'per pack', city:'Detroit', state:'MI', lat:42.331, lng:-83.046, img:'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80', condition:'New', desc:'6 varieties: mild, medium, hot, garlic, mango habanero, ghost pepper. All natural ingredients. Local delivery or nationwide shipping.', rating:4.9, sales:310 },
  { id:5, seller:'Andre L.', avatar:'AL', color:'#1D9E75', title:'Pro Barber Tools Set', category:'Equipment', price:220, unit:'per set', city:'Chicago', state:'IL', lat:41.878, lng:-87.630, img:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80', condition:'Used - Good', desc:'Wahl Senior clippers, Andis Outliner, 7 guards, cape, spray bottle. Barely used — upgrading setup. Great for new barbers.', rating:4.7, sales:18 },
  { id:6, seller:'Tyrese A.', avatar:'TA', color:'#4F8EF7', title:'Brand Photography Session', category:'Services', price:150, unit:'per hour', city:'Nashville', state:'TN', lat:36.162, lng:-86.781, img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80', condition:'Service', desc:'Lifestyle, brand, and product photography. Full edited gallery in 48hrs. Studio or on-location. Book weekdays or weekends.', rating:5.0, sales:67 },
  { id:7, seller:'Carlos V.', avatar:'CV', color:'#FFD700', title:'Box Truck — Rent by Day', category:'Vehicles', price:120, unit:'per day', city:'San Antonio', state:'TX', lat:29.425, lng:-98.494, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', condition:'Good', desc:'2019 Isuzu NPR 16ft. Perfect for moving or deliveries. $500 deposit. Daily and weekly rates. Clean record, well maintained.', rating:4.6, sales:44 },
  { id:8, seller:'Brianna S.', avatar:'BS', color:'#1D9E75', title:'Stock Trading Masterclass', category:'Education', price:97, unit:'each', city:'Charlotte', state:'NC', lat:35.227, lng:-80.843, img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80', condition:'Digital', desc:'6-module course. Options, momentum, and risk management. 40+ video lessons, lifetime access, community included. 500+ students.', rating:4.8, sales:521 },
  { id:9, seller:'Nadia C.', avatar:'NC', color:'#4F8EF7', title:'Personal Training — 4 Week Program', category:'Services', price:280, unit:'per program', city:'Phoenix', state:'AZ', lat:33.449, lng:-112.074, img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80', condition:'Service', desc:'Custom workouts + meal plan. 3x/week sessions + daily check-ins. In-person Phoenix or virtual. First session free.', rating:4.9, sales:38 },
  { id:10, seller:'Priya K.', avatar:'PK', color:'#FFD700', title:'UGC Video Content Package', category:'Services', price:350, unit:'per video', city:'New York', state:'NY', lat:40.712, lng:-74.006, img:'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=80', condition:'Service', desc:'30-60 sec UGC videos. Script, filming, editing included. TikTok/Reels optimized. Delivered in 5 business days. 90+ brands served.', rating:5.0, sales:94 },
];

const CATEGORIES = ['All', 'Clothing', 'Electronics', 'Food & Bev', 'Services', 'Equipment', 'Education', 'Vehicles'];
const PLATFORM_CUT = 0.12;

const BOT_RESPONSES = [
  { trigger: /hoodie|sweatshirt|fleece|pullover|apparel|clothing|shirt|streetwear/i, cat: 'Clothing' },
  { trigger: /phone|iphone|android|smartphone|tech|electronics/i, cat: 'Electronics' },
  { trigger: /food|sauce|snack|meal|drink|beverage/i, cat: 'Food & Bev' },
  { trigger: /photo|shoot|portrait|brand|video|ugc|content/i, cat: 'Services' },
  { trigger: /barber|hair|clipper|tool|equipment/i, cat: 'Equipment' },
  { trigger: /truck|van|vehicle|rent|haul|car/i, cat: 'Vehicles' },
  { trigger: /course|class|learn|trade|finance|education/i, cat: 'Education' },
  { trigger: /trainer|workout|gym|fitness|training|personal/i, cat: 'Services' },
];

const US_CITIES = [
  { name:'Atlanta, GA', lat:33.749, lng:-84.388 },
  { name:'Miami, FL', lat:25.761, lng:-80.191 },
  { name:'New York, NY', lat:40.712, lng:-74.006 },
  { name:'Houston, TX', lat:29.760, lng:-95.370 },
  { name:'Los Angeles, CA', lat:34.052, lng:-118.244 },
  { name:'Chicago, IL', lat:41.878, lng:-87.630 },
  { name:'Dallas, TX', lat:32.776, lng:-96.797 },
  { name:'Detroit, MI', lat:42.331, lng:-83.046 },
  { name:'Phoenix, AZ', lat:33.449, lng:-112.074 },
  { name:'Charlotte, NC', lat:35.227, lng:-80.843 },
  { name:'Nashville, TN', lat:36.162, lng:-86.781 },
  { name:'San Antonio, TX', lat:29.425, lng:-98.494 },
];

function dist(lat1, lng1, lat2, lng2) {
  const R = 3958.8, dL = (lat2-lat1)*Math.PI/180, dG = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dL/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dG/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default function Market() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [purchased, setPurchased] = useState(new Set());
  const [botOpen, setBotOpen] = useState(false);
  const [botInput, setBotInput] = useState('');
  const [botCity, setBotCity] = useState('');
  const [botMsgs, setBotMsgs] = useState([{ role:'bot', text:"Hey! Tell me what you're looking for and your city — I'll find the closest sellers.\n\nExample: \"hoodies in Atlanta\" or \"photography near me\"" }]);
  const [botTyping, setBotTyping] = useState(false);
  const [sellMode, setSellMode] = useState(false);
  const [newListing, setNewListing] = useState({ title:'', category:'Clothing', price:'', city:'', desc:'' });
  const [listed, setListed] = useState(false);

  const filtered = useMemo(() => LISTINGS.filter(l => {
    const matchCat = category === 'All' || l.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || l.title.toLowerCase().includes(q) || l.seller.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.category.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  }), [category, search]);

  const sendBot = () => {
    if (!botInput.trim()) return;
    const msg = botInput; setBotInput('');
    setBotMsgs(m => [...m, { role:'user', text:msg }]);
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      const city = US_CITIES.find(c => msg.toLowerCase().includes(c.name.split(',')[0].toLowerCase())) || (botCity ? US_CITIES.find(c => c.name.toLowerCase().includes(botCity.toLowerCase())) : null);
      const match = BOT_RESPONSES.find(r => r.trigger.test(msg));
      if (!city && !botCity) { setBotMsgs(m => [...m, { role:'bot', text:"What city are you in? I'll find sellers close to you 📍" }]); return; }
      if (!match) { setBotMsgs(m => [...m, { role:'bot', text:"Can you describe what you're looking for more specifically? (e.g. hoodies, photography, electronics...)" }]); return; }
      if (city) setBotCity(city.name);
      const uLat = city?.lat || 33.749, uLng = city?.lng || -84.388;
      const results = LISTINGS.filter(l => l.category === match.cat).map(l => ({ ...l, distance: Math.round(dist(uLat, uLng, l.lat, l.lng)) })).sort((a,b) => a.distance - b.distance).slice(0, 3);
      if (!results.length) { setBotMsgs(m => [...m, { role:'bot', text:`No ${match.cat} listings found near ${city?.name || botCity} right now. Check back soon! 🔄` }]); return; }
      setBotMsgs(m => [...m, { role:'bot', text:`Found ${results.length} ${match.cat} seller${results.length > 1 ? 's' : ''} near ${city?.name || botCity}! Closest is ${results[0].seller} — ${results[0].distance} miles away. 🎯`, results }]);
    }, 1100);
  };

  const submitListing = () => {
    if (!newListing.title || !newListing.price || !newListing.city) return;
    setListed(true); setSellMode(false);
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">MARKETPLACE</div>
        <h1 className="section-title">HUSTLE <span>MARKET</span></h1>
        <p className="section-desc">Buy and sell with hustlers everywhere. AI-powered location matching. No middlemen.</p>
      </div>

      {/* Search + actions */}
      <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:200, position:'relative' }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, pointerEvents:'none' }}>🔍</span>
          <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, sellers, cities..." style={{ paddingLeft:42 }} />
        </div>
        <button className="btn btn-gold" onClick={() => setBotOpen(b => !b)}>🤖 Find Near Me</button>
        <button className="btn btn-outline" onClick={() => setSellMode(s => !s)}>+ List Item</button>
      </div>

      {/* Platform cut notice */}
      <div style={{ fontSize:12, color:'var(--text-dim)', marginBottom:16, fontFamily:'var(--font-mono)' }}>
        Platform takes <strong style={{ color:'var(--gold)' }}>{Math.round(PLATFORM_CUT * 100)}%</strong> of each sale · Sellers keep {Math.round((1 - PLATFORM_CUT) * 100)}%
      </div>

      {/* AI Bot */}
      {botOpen && (
        <div className="card animate-slide-up" style={{ marginBottom:20, border:'1px solid var(--border-gold)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, letterSpacing:'0.05em', color:'var(--gold)' }}>AI MARKET FINDER</div>
              <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Tell me what you want + your city</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setBotOpen(false)}>✕</button>
          </div>
          <div style={{ height:220, overflowY:'auto', display:'flex', flexDirection:'column', gap:10, marginBottom:12 }}>
            {botMsgs.map((m, i) => (
              <div key={i}>
                <div style={{ display:'flex', gap:10, flexDirection: m.role==='user' ? 'row-reverse' : 'row', maxWidth:'85%', alignSelf: m.role==='user' ? 'flex-end' : 'flex-start' }}>
                  {m.role==='bot' && <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--gold-dim)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>🤖</div>}
                  <div style={{ padding:'10px 14px', borderRadius: m.role==='user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: m.role==='user' ? 'linear-gradient(135deg, #FFE44D, #FFD700)' : 'var(--bg-elevated)', color: m.role==='user' ? '#000' : 'var(--text)', fontSize:13, border: m.role==='bot' ? '1px solid var(--border)' : 'none', fontWeight: m.role==='user' ? 600 : 400, whiteSpace:'pre-line' }}>
                    {m.text}
                  </div>
                </div>
                {m.results && (
                  <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:8 }}>
                    {m.results.map(r => (
                      <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'var(--bg-elevated)', borderRadius:10, border:'1px solid var(--border)', cursor:'pointer' }} onClick={() => { setSelected(r); setBotOpen(false); }}>
                        <img src={r.img} alt={r.title} style={{ width:48, height:48, borderRadius:8, objectFit:'cover', flexShrink:0 }} onError={e => e.target.style.display='none'} />
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:700, fontSize:13 }}>{r.title}</div>
                          <div style={{ fontSize:11, color:'var(--text-muted)' }}>{r.seller} · {r.city}, {r.state} · {r.distance} mi</div>
                        </div>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:18, color:'var(--green)' }}>${r.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {botTyping && (
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--gold-dim)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
                <div style={{ display:'flex', gap:4, padding:'10px 14px', background:'var(--bg-elevated)', borderRadius:'4px 16px 16px 16px', border:'1px solid var(--border)' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)', opacity:0.5, animation:`pulse-gold 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            )}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <input className="input" value={botInput} onChange={e => setBotInput(e.target.value)} onKeyDown={e => e.key==='Enter' && sendBot()} placeholder="e.g. hoodies in Atlanta" style={{ flex:1 }} />
            <button className="btn btn-gold btn-sm" onClick={sendBot}>Find</button>
          </div>
        </div>
      )}

      {/* Sell form */}
      {sellMode && !listed && (
        <div className="card-gold animate-slide-up" style={{ marginBottom:20 }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:20, color:'var(--gold)', letterSpacing:'0.05em', marginBottom:4 }}>LIST YOUR PRODUCT</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>Platform takes 12% per sale. You keep 88%.</div>
          <div className="grid-2" style={{ gap:12, marginBottom:12 }}>
            <div><label className="input-label">Title</label><input className="input" value={newListing.title} onChange={e => setNewListing(l => ({...l, title:e.target.value}))} placeholder="What are you selling?" /></div>
            <div><label className="input-label">Category</label><select className="select" style={{ width:'100%' }} value={newListing.category} onChange={e => setNewListing(l => ({...l, category:e.target.value}))}>{CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="input-label">Price ($)</label><input className="input" type="number" value={newListing.price} onChange={e => setNewListing(l => ({...l, price:e.target.value}))} placeholder="0.00" /></div>
            <div><label className="input-label">City</label><input className="input" value={newListing.city} onChange={e => setNewListing(l => ({...l, city:e.target.value}))} placeholder="Your city" /></div>
            <div style={{ gridColumn:'1/-1' }}><label className="input-label">Description</label><input className="input" value={newListing.desc} onChange={e => setNewListing(l => ({...l, desc:e.target.value}))} placeholder="Describe your product..." /></div>
          </div>
          {newListing.price && <div style={{ padding:'10px 14px', background:'var(--bg-elevated)', borderRadius:8, marginBottom:12, fontSize:12, color:'var(--text-muted)' }}>You list at <strong style={{ color:'var(--text)' }}>${newListing.price}</strong> → You receive <strong style={{ color:'var(--green)' }}>${(newListing.price * 0.88).toFixed(2)}</strong> per sale</div>}
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn btn-gold btn-lg" style={{ flex:1 }} onClick={submitListing}>List Now →</button>
            <button className="btn btn-ghost" onClick={() => setSellMode(false)}>Cancel</button>
          </div>
        </div>
      )}

      {listed && (
        <div className="card animate-slide-up" style={{ marginBottom:20, textAlign:'center', border:'1px solid var(--green)', background:'var(--green-dim)' }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🚀</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:22, color:'var(--green)', letterSpacing:'0.05em' }}>LISTING LIVE!</div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:6 }}>Your product is now visible to hustlers near you.</div>
        </div>
      )}

      {/* Category chips */}
      <div style={{ display:'flex', gap:6, marginBottom:18, overflowX:'auto' }} className="scroll-x">
        {CATEGORIES.map(c => (
          <button key={c} className={`chip ${category === c ? 'chip-active' : ''}`} style={{ flexShrink:0 }} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {search && <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Found <strong style={{ color:'var(--gold)' }}>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''} for "{search}"</div>}

      {/* Listings grid + detail */}
      <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap:20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16 }}>
          {filtered.map(l => (
            <div key={l.id} className="listing-card" onClick={() => setSelected(s => s?.id === l.id ? null : l)} style={{ border:`1px solid ${selected?.id === l.id ? l.color : purchased.has(l.id) ? 'var(--green)' : 'var(--border)'}` }}>
              <div style={{ position:'relative', overflow:'hidden', height:180 }}>
                <img src={l.img} alt={l.title} className="listing-img" style={{ height:180 }} onError={e => { e.target.style.background='var(--bg-elevated)'; e.target.src=''; }} />
                <div style={{ position:'absolute', top:10, right:10 }}><span className="badge badge-gold" style={{ fontSize:10 }}>{l.condition}</span></div>
                {purchased.has(l.id) && <div style={{ position:'absolute', inset:0, background:'rgba(29,158,117,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontFamily:'var(--font-display)', fontSize:28, color:'var(--green)' }}>✓ PURCHASED</span></div>}
              </div>
              <div className="listing-body">
                <div style={{ fontWeight:700, fontSize:15, color:'var(--text)', marginBottom:4 }}>{l.title}</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:10, lineHeight:1.5 }}>{l.desc.slice(0, 72)}...</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:10, borderTop:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ width:24, height:24, borderRadius:'50%', background:l.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800, color:'#000' }}>{l.avatar}</div>
                    <span style={{ fontSize:11, color:'var(--text-muted)' }}>{l.seller}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:22, color:'var(--green)', textAlign:'right' }}>${l.price}</div>
                    <div style={{ fontSize:10, color:'var(--text-dim)', textAlign:'right' }}>{l.unit}</div>
                  </div>
                </div>
                <div style={{ marginTop:8, display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:11, color:'var(--text-dim)' }}>📍 {l.city}, {l.state}</span>
                  <span style={{ fontSize:11, color:'var(--gold)', marginLeft:'auto' }}>⭐ {l.rating} · {l.sales} sales</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px 0', color:'var(--text-dim)' }}>
              <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:15 }}>No listings match your search. Try something different.</div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="card animate-slide-up" style={{ border:`1px solid ${selected.color}44`, alignSelf:'start', position:'sticky', top:20 }}>
            <div style={{ position:'relative', marginBottom:16, borderRadius:12, overflow:'hidden', height:200 }}>
              <img src={selected.img} alt={selected.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} onError={e => e.target.style.background='var(--bg-elevated)'} />
              <button className="btn btn-ghost btn-sm" style={{ position:'absolute', top:10, right:10 }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:22, color:'var(--text)', letterSpacing:'0.03em', marginBottom:4 }}>{selected.title}</div>
            <div style={{ fontSize:11, color:selected.color, fontFamily:'var(--font-mono)', marginBottom:12 }}>{selected.category.toUpperCase()} · {selected.condition.toUpperCase()}</div>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              <div style={{ flex:1, padding:'10px', background:'var(--bg-elevated)', borderRadius:8, textAlign:'center', border:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:24, color:'var(--green)' }}>${selected.price}</div>
                <div style={{ fontSize:9, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{selected.unit.toUpperCase()}</div>
              </div>
              <div style={{ flex:1, padding:'10px', background:'var(--bg-elevated)', borderRadius:8, textAlign:'center', border:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:24, color:'var(--gold)' }}>⭐ {selected.rating}</div>
                <div style={{ fontSize:9, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{selected.sales} SALES</div>
              </div>
            </div>
            <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7, marginBottom:14 }}>{selected.desc}</div>
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background:'var(--bg-elevated)', borderRadius:10, marginBottom:14, border:'1px solid var(--border)' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:selected.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#000' }}>{selected.avatar}</div>
              <div><div style={{ fontWeight:700, fontSize:13 }}>{selected.seller}</div><div style={{ fontSize:11, color:'var(--text-muted)' }}>📍 {selected.city}, {selected.state}</div></div>
            </div>
            <div style={{ padding:'8px 12px', background:'rgba(29,158,117,0.06)', borderRadius:8, marginBottom:14, fontSize:11, color:'var(--text-dim)', border:'1px solid rgba(29,158,117,0.12)' }}>
              You pay <strong style={{ color:'var(--text)' }}>${selected.price}</strong> · Seller receives <strong style={{ color:'var(--green)' }}>${(selected.price * (1 - PLATFORM_CUT)).toFixed(2)}</strong>
            </div>
            <button className={`btn ${purchased.has(selected.id) ? 'btn-ghost' : 'btn-gold'} btn-lg`} style={{ width:'100%', marginBottom:8 }} onClick={() => { if (!purchased.has(selected.id)) setPurchased(p => { const n = new Set(p); n.add(selected.id); return n; }); }}>
              {purchased.has(selected.id) ? '✓ Purchased — Contact Seller' : `Buy Now — $${selected.price} →`}
            </button>
            <button className="btn btn-ghost" style={{ width:'100%' }}>💬 Message Seller</button>
          </div>
        )}
      </div>
    </div>
  );
}
