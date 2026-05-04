import { useState } from 'react';

const REELS = [
  { id:1, creator:'Marcus J.', avatar:'MJ', color:'#FFD700', title:'How I Hit $15K This Month With TikTok Organic 🔥', desc:'No paid ads. Just product research + viral hooks. Here\'s the exact framework...', likes:4821, comments:312, shares:891, gradient:'linear-gradient(135deg, #0A0A1A 0%, #1A0A2A 50%, #0A1A0A 100%)', emoji:'💰', niche:'Dropshipping', verified:true },
  { id:2, creator:'Priya K.', avatar:'PK', color:'#7F77DD', title:'The TikTok Hook That Got Me 2.1M Views 📱', desc:'First 2 seconds are everything. I\'ll show you the exact formula I use for every video.', likes:9203, comments:847, shares:2341, gradient:'linear-gradient(135deg, #0A0A1A 0%, #1A0A2A 100%)', emoji:'🎬', niche:'Content Creator', verified:true },
  { id:3, creator:'DeShawn T.', avatar:'DT', color:'#1D9E75', title:'Amazon FBA Product Research in 10 Minutes 📦', desc:'New ranking strategy that got my product to page 1 in 3 days. Watch till the end.', likes:3102, comments:198, shares:543, gradient:'linear-gradient(135deg, #001A0A 0%, #0A1A0A 100%)', emoji:'📦', niche:'Amazon FBA', verified:true },
  { id:4, creator:'Sofia M.', avatar:'SM', color:'#D85A30', title:'Sold Out My Streetwear Drop in 47 Minutes 👕', desc:'The pre-launch strategy that made 300 people ready to buy before we even dropped.', likes:6714, comments:521, shares:1204, gradient:'linear-gradient(135deg, #1A0500 0%, #2A0A00 100%)', emoji:'👕', niche:'Clothing Brand', verified:false },
  { id:5, creator:'Jaylen B.', avatar:'JB', color:'#4F8EF7', title:'My First Wholesale Deal: $12K Assignment Fee 🏠', desc:'Found the deal on Zillow, locked it up in 48 hours. Step by step breakdown inside.', likes:2891, comments:267, shares:621, gradient:'linear-gradient(135deg, #00051A 0%, #000A2A 100%)', emoji:'🏠', niche:'Real Estate', verified:true },
  { id:6, creator:'Brianna S.', avatar:'BS', color:'#1D9E75', title:'NVDA Options Play: $3,200 in 4 Hours 📈', desc:'The setup, the entry, the exit. Full breakdown of exactly how I traded it.', likes:11402, comments:934, shares:3201, gradient:'linear-gradient(135deg, #001A0A 0%, #001A1A 100%)', emoji:'📈', niche:'Day Trading', verified:true },
  { id:7, creator:'Keisha W.', avatar:'KW', color:'#D85A30', title:'My Food Business Doing $8K/Month From Home 🌶️', desc:'Started with $200 and a hot sauce recipe. Now shipping to 12 states. Here\'s how.', likes:5304, comments:412, shares:987, gradient:'linear-gradient(135deg, #1A0500 0%, #1A0A00 100%)', emoji:'🌶️', niche:'Food Business', verified:true },
  { id:8, creator:'Andre L.', avatar:'AL', color:'#FFD700', title:'6 Figures From a Barber Chair: The Business Side ✂️', desc:'Most barbers think small. I\'ll show you how to turn one chair into a real business.', likes:7820, comments:634, shares:1543, gradient:'linear-gradient(135deg, #0A0A00 0%, #1A1A00 100%)', emoji:'✂️', niche:'Barber', verified:false },
];

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function Reels() {
  const [liked, setLiked] = useState(new Set());
  const [followed, setFollowed] = useState(new Set());
  const [likes, setLikes] = useState(Object.fromEntries(REELS.map(r => [r.id, r.likes])));

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setLikes(l => ({...l, [id]: l[id] - 1})); }
      else { next.add(id); setLikes(l => ({...l, [id]: l[id] + 1})); }
      return next;
    });
  };

  const toggleFollow = (id) => {
    setFollowed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header" style={{ marginBottom: 16 }}>
        <div className="section-eyebrow">TRENDING</div>
        <h1 className="section-title">HUSTLE <span>FEED</span></h1>
        <p className="section-desc">Real wins. Real strategies. Scroll through the moves that are making money right now.</p>
      </div>

      <div className="reels-container">
        {REELS.map(reel => (
          <div key={reel.id} className="reel-card">
            {/* Thumbnail */}
            <div className="reel-thumbnail" style={{ background: reel.gradient }}>
              <span style={{ fontSize: 140, filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.6))' }}>{reel.emoji}</span>
            </div>

            {/* Dark overlay */}
            <div className="reel-overlay" />

            {/* Creator info + caption */}
            <div className="reel-info">
              <div className="reel-creator">
                <div className="reel-avatar" style={{ background: reel.color }}>
                  {reel.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="reel-username">{reel.creator}</span>
                    {reel.verified && <span style={{ fontSize: 13, color: reel.color }}>✓</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{reel.niche.toUpperCase()}</div>
                </div>
                <button
                  className={`reel-follow ${followed.has(reel.id) ? 'following' : ''}`}
                  onClick={() => toggleFollow(reel.id)}
                >
                  {followed.has(reel.id) ? '✓ Following' : '+ Follow'}
                </button>
              </div>
              <div className="reel-title">{reel.title}</div>
              <div className="reel-desc">{reel.desc}</div>
            </div>

            {/* Action buttons */}
            <div className="reel-actions">
              <button className={`reel-action-btn ${liked.has(reel.id) ? 'liked' : ''}`} onClick={() => toggleLike(reel.id)}>
                <span className="reel-action-icon">{liked.has(reel.id) ? '💛' : '🤍'}</span>
                <span className="reel-action-count">{formatNum(likes[reel.id])}</span>
              </button>
              <button className="reel-action-btn">
                <span className="reel-action-icon">💬</span>
                <span className="reel-action-count">{formatNum(reel.comments)}</span>
              </button>
              <button className="reel-action-btn">
                <span className="reel-action-icon">↗️</span>
                <span className="reel-action-count">{formatNum(reel.shares)}</span>
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: reel.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#000', border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>
                  {reel.avatar}
                </div>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#000', fontWeight: 800, marginTop: -14, border: '1.5px solid #000' }}>+</div>
              </div>
            </div>

            {/* Niche badge */}
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <span className="badge badge-gold" style={{ fontSize: 11 }}>🔥 {reel.niche}</span>
            </div>
          </div>
        ))}

        {/* End of feed */}
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔄</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.05em' }}>You're all caught up</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>More wins dropping every day. Come back tomorrow. 💪</div>
        </div>
      </div>
    </div>
  );
}
