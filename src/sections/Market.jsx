import { useState } from 'react';

const LISTINGS = [
  { id:1, seller:'Marcus J.', avatar:'MJ', color:'#F5A623', title:'Custom Hoodies (Wholesale)', category:'Clothing', price:25, unit:'per piece', city:'Atlanta', state:'GA', lat:33.749, lng:-84.388, emoji:'👕', condition:'New', desc:'Minimum order 12 units. Premium heavyweight 400gsm. Custom embroidery or DTF print included. Ships same week.', rating:4.9, sales:142 },
  { id:2, seller:'Sofia M.', avatar:'SM', color:'#FF4444', title:'Streetwear Brand Drop — Limited', category:'Clothing', price:65, unit:'per item', city:'Los Angeles', state:'CA', lat:34.052, lng:-118.244, emoji:'🧥', condition:'New', desc:'Limited drop. 50 units only. Heavyweight fleece, washed black. Ships in 3-5 days. DM for bulk pricing.', rating:4.8, sales:89 },
  { id:3, seller:'DeShawn T.', avatar:'DT', color:'#00C896', title:'iPhone 15 Pro Max — Like New', category:'Electronics', price:850, unit:'each', city:'Houston', state:'TX', lat:29.760, lng:-95.370, emoji:'📱', condition:'Like New', desc:'256GB Space Black. 30 days old. Comes with original box, charger, and 2 cases. No scratches.', rating:5.0, sales:23 },
  { id:4, seller:'Keisha W.', avatar:'KW', color:'#FF4444', title:'Homemade Hot Sauce (6 Pack)', category:'Food & Bev', price:48, unit:'per pack', city:'Detroit', state:'MI', lat:42.331, lng:-83.046, emoji:'🌶️', condition:'New', desc:'6 varieties: mild, medium, hot, garlic, mango habanero, ghost pepper. All natural. Local delivery or shipping available.', rating:4.9, sales:310 },
  { id:5, seller:'Andre L.', avatar:'AL', color:'#00C896', title:'Barber Tools Set — Pro Grade', category:'Tools & Equipment', price:220, unit:'per set', city:'Chicago', state:'IL', lat:41.878, lng:-87.630, emoji:'✂️', condition:'Used - Good', desc:'Wahl Senior clippers, Andis Outliner, 7 guards, barber cape, spray bottle. Barely used. Retiring old setup.', rating:4.7, sales:18 },
  { id:6, seller:'Tyrese A.', avatar:'TA', color:'#A855F7', title:'Photography Session — 1hr', category:'Services', price:150, unit:'per hour', city:'Nashville', state:'TN', lat:36.162, lng:-86.781, emoji:'📸', condition:'Service', desc:'Lifestyle, brand, and product photography. Edited gallery delivered in 48hrs. Available weekdays and weekends. DM to book.', rating:5.0, sales:67 },
  { id:7, seller:'Carlos V.', avatar:'CV', color:'#F5A623', title:'Box Truck — Available for Rent', category:'Vehicles', price:120, unit:'per day', city:'San Antonio', state:'TX', lat:29.425, lng:-98.494, emoji:'🚚', condition:'Good', desc:'2019 Isuzu NPR 16ft box. Perfect for moving, deliveries, or business. $500 deposit. Daily or weekly rates available.', rating:4.6, sales:44 },
  { id:8, seller:'Brianna S.', avatar:'BS', color:'#00C896', title:'Stock Trading Course — Digital', category:'Education', price:97, unit:'each', city:'Charlotte', state:'NC', lat:35.227, lng:-80.843, emoji:'📈', condition:'Digital', desc:'6-module course. Options, momentum trading, risk management. 40+ video lessons. Lifetime access. Over 500 students.', rating:4.8, sales:521 },
  { id:9, seller:'Nadia C.', avatar:'NC', color:'#4F8EF7', title:'Personal Training — 4 Week Program', category:'Services', price:280, unit:'per program', city:'Phoenix', state:'AZ', lat:33.449, lng:-112.074, emoji:'💪', condition:'Service', desc:'Custom workout + meal plan. 3x/week sessions + daily check-ins. In-person Phoenix or virtual. First session free.', rating:4.9, sales:38 },
  { id:10, seller:'Priya K.', avatar:'PK', color:'#F5A623', title:'UGC Video Content — Brand Deals', category:'Services', price:350, unit:'per video', city:'New York', state:'NY', lat:40.712, lng:-74.006, emoji:'🎬', condition:'Service', desc:'30-60 sec UGC videos for your brand. Script, filming, editing included. Delivered in 5 business days. TikTok/Reels optimized.', rating:5.0, sales:94 },
];

const CATEGORIES = ['All', 'Clothing', 'Electronics', 'Food & Bev', 'Services', 'Tools & Equipment', 'Education', 'Vehicles'];

const US_CITIES = [
  { name: 'Atlanta, GA', lat: 33.749, lng: -84.388 },
  { name: 'Miami, FL', lat: 25.761, lng: -80.191 },
  { name: 'New York, NY', lat: 40.712, lng: -74.006 },
  { name: 'Houston, TX', lat: 29.760, lng: -95.370 },
  { name: 'Los Angeles, CA', lat: 34.052, lng: -118.244 },
  { name: 'Chicago, IL', lat: 41.878, lng: -87.630 },
  { name: 'Dallas, TX', lat: 32.776, lng: -96.797 },
  { name: 'Detroit, MI', lat: 42.331, lng: -83.046 },
  { name: 'Phoenix, AZ', lat: 33.449, lng: -112.074 },
  { name: 'Charlotte, NC', lat: 35.227, lng: -80.843 },
  { name: 'Nashville, TN', lat: 36.162, lng: -86.781 },
  { name: 'San Antonio, TX', lat: 29.425, lng: -98.494 },
];

function distanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const PLATFORM_CUT = 0.12;

const BOT_RESPONSES = [
  { trigger: /hoodie|sweatshirt|fleece|pullover/i, cat: 'Clothing', keywords: ['hoodie', 'clothing', 'streetwear'] },
  { trigger: /phone|iphone|android|smartphone|device/i, cat: 'Electronics', keywords: ['electronics', 'phone'] },
  { trigger: /food|sauce|snack|meal|eat|drink/i, cat: 'Food & Bev', keywords: ['food', 'beverage'] },
  { trigger: /photo|shoot|portrait|brand photo|content/i, cat: 'Services', keywords: ['photography', 'content'] },
  { trigger: /barber|hair|cut|clipper|trimmer/i, cat: 'Tools & Equipment', keywords: ['barber', 'tools'] },
  { trigger: /truck|van|vehicle|car|rent|haul/i, cat: 'Vehicles', keywords: ['truck', 'vehicle'] },
  { trigger: /course|class|learn|train|education|program/i, cat: 'Education', keywords: ['course', 'training'] },
  { trigger: /trainer|workout|gym|fitness|exercise/i, cat: 'Services', keywords: ['fitness', 'training'] },
  { trigger: /video|ugc|content|tiktok|reel/i, cat: 'Services', keywords: ['content', 'video'] },
  { trigger: /clothing|shirt|jacket|outfit|apparel|wear/i, cat: 'Clothing', keywords: ['clothing', 'apparel'] },
];

export default function Market() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [purchased, setPurchased] = useState(new Set());
  const [botOpen, setBotOpen] = useState(false);
  const [botInput, setBotInput] = useState('');
  const [botCity, setBotCity] = useState('');
  const [botMessages, setBotMessages] = useState([
    { role: 'bot', text: "Hey! I'm your Hustle Market assistant 🛍️\n\nTell me what you're looking for and your city, and I'll find the closest sellers for you.\n\nExample: \"I need hoodies in Miami\"" }
  ]);
  const [botTyping, setBotTyping] = useState(false);
  const [botResults, setBotResults] = useState(null);
  const [sellMode, setSellMode] = useState(false);
  const [newListing, setNewListing] = useState({ title: '', category: 'Clothing', price: '', city: '', state: '', desc: '', emoji: '🛍️' });
  const [listed, setListed] = useState(false);

  const filtered = LISTINGS.filter(l => category === 'All' || l.category === category);

  const handleBotSend = () => {
    if (!botInput.trim()) return;
    const userMsg = botInput;
    setBotInput('');
    setBotMessages(m => [...m, { role: 'user', text: userMsg }]);
    setBotTyping(true);

    setTimeout(() => {
      setBotTyping(false);

      // Parse location from message
      const cityMatch = US_CITIES.find(c =>
        userMsg.toLowerCase().includes(c.name.split(',')[0].toLowerCase())
      );
      const detectedCity = cityMatch || (botCity ? US_CITIES.find(c => c.name.toLowerCase().includes(botCity.toLowerCase())) : null);

      // Find product category
      const match = BOT_RESPONSES.find(r => r.trigger.test(userMsg));
      const targetCat = match?.cat || null;

      if (!detectedCity && !botCity) {
        setBotMessages(m => [...m, { role: 'bot', text: "Got it! 📍 Just need your city to find sellers near you. Which city are you in?" }]);
        return;
      }

      if (!targetCat) {
        setBotMessages(m => [...m, { role: 'bot', text: "I can help find that! Can you be a bit more specific about what you're looking for? (e.g. hoodies, photography, electronics...)" }]);
        return;
      }

      const userLat = detectedCity?.lat || 33.749;
      const userLng = detectedCity?.lng || -84.388;

      const results = LISTINGS
        .filter(l => l.category === targetCat)
        .map(l => ({ ...l, distance: Math.round(distanceMiles(userLat, userLng, l.lat, l.lng)) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      const cityName = detectedCity?.name || botCity;
      setBotCity(cityName);

      if (results.length === 0) {
        setBotMessages(m => [...m, { role: 'bot', text: `No ${targetCat} listings found near ${cityName} right now. Check back soon — new sellers join daily! 🔄` }]);
        return;
      }

      const nearestDist = results[0].distance;
      setBotResults(results);
      setBotMessages(m => [...m, {
        role: 'bot',
        text: `Found ${results.length} ${targetCat} seller${results.length > 1 ? 's' : ''} near ${cityName}! 🎯\n\nClosest is ${results[0].seller} — only ${nearestDist} miles away. Check the results below 👇`,
        results
      }]);
    }, 1200);
  };

  const submitListing = () => {
    if (!newListing.title || !newListing.price || !newListing.city) return;
    setListed(true);
    setSellMode(false);
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">MARKETPLACE</div>
        <h1 className="section-title">HUSTLE <span>MARKET</span></h1>
        <p className="section-desc">Buy and sell with hustlers in your city. AI-powered matching. No middlemen.</p>
      </div>

      {/* Top bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn btn-gold" onClick={() => setBotOpen(!botOpen)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          🤖 Find Near Me
        </button>
        <button className="btn btn-outline" onClick={() => setSellMode(!sellMode)}>
          + List Something
        </button>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>
          Platform takes <strong style={{ color: 'var(--gold)' }}>{Math.round(PLATFORM_CUT * 100)}%</strong> of each sale · Sellers keep {Math.round((1 - PLATFORM_CUT) * 100)}%
        </div>
      </div>

      {/* AI Bot Panel */}
      {botOpen && (
        <div className="card animate-slide-up" style={{ marginBottom: 24, border: '1px solid var(--border-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.05em', color: 'var(--gold)' }}>AI MARKET FINDER</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Tell me what you want + your city — I'll find it</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setBotOpen(false)}>✕</button>
          </div>

          <div style={{ height: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12, padding: '4px 0' }}>
            {botMessages.map((msg, i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  {msg.role === 'bot' && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🤖</div>
                  )}
                  <div style={{ padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: msg.role === 'user' ? 'linear-gradient(135deg, #FFD700, #F5A623)' : 'var(--bg-elevated)', color: msg.role === 'user' ? '#000' : 'var(--text)', fontSize: 13, border: msg.role === 'bot' ? '1px solid var(--border)' : 'none', whiteSpace: 'pre-line', fontWeight: msg.role === 'user' ? 600 : 400 }}>
                    {msg.text}
                  </div>
                </div>
                {msg.results && (
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {msg.results.map(r => (
                      <div key={r.id} style={{ padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                        onClick={() => { setSelected(r); setBotOpen(false); }}>
                        <div style={{ fontSize: 24 }}>{r.emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{r.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.seller} · {r.city}, {r.state} · {r.distance} mi away</div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--green)' }}>${r.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {botTyping && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🤖</div>
                <div style={{ display: 'flex', gap: 4, padding: '10px 16px', background: 'var(--bg-elevated)', borderRadius: '4px 16px 16px 16px', border: '1px solid var(--border)' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', opacity: 0.6, animation: `pulse-gold 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <input className="input" value={botInput} onChange={e => setBotInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleBotSend()} placeholder='e.g. "hoodies in Atlanta" or "photography near me"' style={{ flex: 1 }} />
            <button className="btn btn-gold btn-sm" onClick={handleBotSend}>Search</button>
          </div>
        </div>
      )}

      {/* Sell listing form */}
      {sellMode && !listed && (
        <div className="card-gold animate-slide-up" style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: 4 }}>LIST YOUR PRODUCT</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Platform takes 12% of each successful sale. You keep 88%.</div>
          <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
            <div>
              <label className="input-label">Title</label>
              <input className="input" value={newListing.title} onChange={e => setNewListing(l => ({...l, title: e.target.value}))} placeholder="What are you selling?" />
            </div>
            <div>
              <label className="input-label">Category</label>
              <select className="select" style={{ width: '100%' }} value={newListing.category} onChange={e => setNewListing(l => ({...l, category: e.target.value}))}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Price ($)</label>
              <input className="input" type="number" value={newListing.price} onChange={e => setNewListing(l => ({...l, price: e.target.value}))} placeholder="0.00" />
            </div>
            <div>
              <label className="input-label">City</label>
              <input className="input" value={newListing.city} onChange={e => setNewListing(l => ({...l, city: e.target.value}))} placeholder="Your city" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Description</label>
              <input className="input" value={newListing.desc} onChange={e => setNewListing(l => ({...l, desc: e.target.value}))} placeholder="Describe your product or service..." />
            </div>
          </div>
          {newListing.price && (
            <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 14, fontSize: 12, color: 'var(--text-muted)' }}>
              You list at <strong style={{ color: 'var(--text)' }}>${newListing.price}</strong> → You receive <strong style={{ color: 'var(--green)' }}>${(newListing.price * 0.88).toFixed(2)}</strong> per sale after platform fee
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-gold btn-lg" style={{ flex: 1 }} onClick={submitListing}>List It Now →</button>
            <button className="btn btn-ghost" onClick={() => setSellMode(false)}>Cancel</button>
          </div>
        </div>
      )}

      {listed && (
        <div className="card animate-slide-up" style={{ marginBottom: 24, textAlign: 'center', border: '1px solid var(--green)', background: 'var(--green-dim)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--green)', letterSpacing: '0.05em' }}>LISTING LIVE!</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Your product is now visible to hustlers near you. Get ready for your first sale.</div>
        </div>
      )}

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto' }} className="scroll-x">
        {CATEGORIES.map(c => (
          <button key={c} className={`chip ${category === c ? 'chip-active' : ''}`}
            style={{ flexShrink: 0, borderColor: category === c ? 'var(--gold)' : 'var(--border)', color: category === c ? 'var(--gold)' : 'var(--text-muted)', background: category === c ? 'var(--gold-dim)' : 'var(--bg-elevated)' }}
            onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {/* Listings grid + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {filtered.map(l => (
            <div key={l.id} className="listing-card" onClick={() => setSelected(s => s?.id === l.id ? null : l)}
              style={{ border: `1px solid ${selected?.id === l.id ? l.color : purchased.has(l.id) ? 'var(--green)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 36 }}>{l.emoji}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--green)' }}>${l.price}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{l.unit}</div>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{l.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>{l.desc.slice(0, 80)}...</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#000' }}>{l.avatar}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l.seller}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>📍 {l.city}, {l.state}</div>
              </div>
              {purchased.has(l.id) && <div style={{ marginTop: 8, fontSize: 11, color: 'var(--green)', fontWeight: 700, textAlign: 'center' }}>✓ PURCHASED</div>}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="card animate-slide-up" style={{ border: `1px solid ${selected.color}`, alignSelf: 'start', position: 'sticky', top: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 40 }}>{selected.emoji}</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', letterSpacing: '0.03em', marginBottom: 4 }}>{selected.title}</div>
            <div style={{ fontSize: 11, color: selected.color, fontFamily: 'var(--font-mono)', marginBottom: 12 }}>{selected.category.toUpperCase()} · {selected.condition.toUpperCase()}</div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, padding: '10px', background: 'var(--bg-elevated)', borderRadius: 8, textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--green)' }}>${selected.price}</div>
                <div style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{selected.unit.toUpperCase()}</div>
              </div>
              <div style={{ flex: 1, padding: '10px', background: 'var(--bg-elevated)', borderRadius: 8, textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold)' }}>⭐ {selected.rating}</div>
                <div style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{selected.sales} SALES</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{selected.desc}</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 10, marginBottom: 16, border: '1px solid var(--border)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: selected.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#000' }}>{selected.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{selected.seller}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>📍 {selected.city}, {selected.state}</div>
              </div>
            </div>

            <div style={{ padding: '8px 12px', background: 'rgba(0,200,150,0.06)', borderRadius: 8, marginBottom: 16, fontSize: 11, color: 'var(--text-dim)', border: '1px solid rgba(0,200,150,0.12)' }}>
              Platform fee: {Math.round(PLATFORM_CUT * 100)}% · You pay: <strong style={{ color: 'var(--text)' }}>${selected.price}</strong> · Seller receives: <strong style={{ color: 'var(--green)' }}>${(selected.price * (1 - PLATFORM_CUT)).toFixed(2)}</strong>
            </div>

            <button
              className={`btn ${purchased.has(selected.id) ? 'btn-ghost' : 'btn-gold'} btn-lg`}
              style={{ width: '100%', marginBottom: 8 }}
              onClick={() => { if (!purchased.has(selected.id)) setPurchased(p => { const n = new Set(p); n.add(selected.id); return n; }); }}
            >
              {purchased.has(selected.id) ? '✓ Purchased — Contact Seller' : `Buy Now — $${selected.price} →`}
            </button>
            <button className="btn btn-ghost" style={{ width: '100%' }}>💬 Message Seller</button>
          </div>
        )}
      </div>
    </div>
  );
}
