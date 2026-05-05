import { useState } from 'react';

const REELS = [
  { id:1, creator:'Marcus J.', avatar:'MJ', color:'#FFD700', title:'How I Hit $15K This Month With TikTok Organic 🔥', desc:'No paid ads. Just product research + viral hooks. Here\'s the exact framework I used to scale fast.', likes:4821, comments:312, shares:891, img:'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80', niche:'Dropshipping', verified:true },
  { id:2, creator:'Priya K.', avatar:'PK', color:'#7F77DD', title:'The Hook That Got Me 2.1M Views on TikTok 📱', desc:'First 2 seconds are everything. I\'ll show you the exact formula I use for every single video I post.', likes:9203, comments:847, shares:2341, img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80', niche:'Content Creator', verified:true },
  { id:3, creator:'DeShawn T.', avatar:'DT', color:'#1D9E75', title:'Amazon FBA Product Research in 10 Minutes 📦', desc:'New ranking strategy that got my product to page 1 in just 3 days. Full breakdown, watch till the end.', likes:3102, comments:198, shares:543, img:'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80', niche:'Amazon FBA', verified:true },
  { id:4, creator:'Sofia M.', avatar:'SM', color:'#D85A30', title:'Sold Out My Streetwear Drop in 47 Minutes 👕', desc:'The pre-launch strategy that had 300 people ready to buy before we even went live. Here\'s everything.', likes:6714, comments:521, shares:1204, img:'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80', niche:'Clothing Brand', verified:false },
  { id:5, creator:'Jaylen B.', avatar:'JB', color:'#4F8EF7', title:'My First Wholesale Deal: $12K Assignment Fee 🏠', desc:'Found the deal on Zillow, locked it in 48 hours, assigned it for $12K. Step by step breakdown inside.', likes:2891, comments:267, shares:621, img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80', niche:'Real Estate', verified:true },
  { id:6, creator:'Brianna S.', avatar:'BS', color:'#1D9E75', title:'NVDA Options Play: $3,200 in 4 Hours 📈', desc:'The setup, the entry, the exit. Full breakdown of exactly how I read the chart and made the trade.', likes:11402, comments:934, shares:3201, img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80', niche:'Day Trading', verified:true },
  { id:7, creator:'Keisha W.', avatar:'KW', color:'#D85A30', title:'My Food Business Hitting $8K/Month From Home 🌶️', desc:'Started with $200 and a hot sauce recipe. Now shipping to 12 states. Here\'s exactly how I did it.', likes:5304, comments:412, shares:987, img:'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80', niche:'Food Business', verified:true },
  { id:8, creator:'Andre L.', avatar:'AL', color:'#FFD700', title:'How I Built 6 Figures From a Single Barber Chair ✂️', desc:'Most barbers think small. I\'ll show you how to turn one chair into a real scalable business empire.', likes:7820, comments:634, shares:1543, img:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80', niche:'Barber', verified:false },
];

function fmtNum(n) { return n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toString(); }

export default function Reels() {
  const [liked, setLiked] = useState(new Set());
  const [followed, setFollowed] = useState(new Set());
  const [likes, setLikes] = useState(Object.fromEntries(REELS.map(r => [r.id, r.likes])));

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setLikes(l => ({...l, [id]: l[id]-1})); }
      else { next.add(id); setLikes(l => ({...l, [id]: l[id]+1})); }
      return next;
    });
  };

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="section-header" style={{ marginBottom:16 }}>
        <div className="section-eyebrow">TRENDING</div>
        <h1 className="section-title">HUSTLE <span>FEED</span></h1>
        <p className="section-desc">Real wins. Real strategies. Scroll the moves making money right now.</p>
      </div>

      <div className="reels-container">
        {REELS.map(reel => (
          <div key={reel.id} className="reel-card">
            <img src={reel.img} alt={reel.title} className="reel-thumbnail" onError={e => { e.target.style.display='none'; e.target.parentElement.style.background=`linear-gradient(135deg, #0A0A1A, #1A0A2A)`; }} />
            <div className="reel-overlay" />

            {/* Badge */}
            <div style={{ position:'absolute', top:16, left:16 }}>
              <span className="badge badge-gold" style={{ fontSize:11 }}>🔥 {reel.niche}</span>
            </div>

            {/* Creator info + caption */}
            <div className="reel-info">
              <div className="reel-creator">
                <div className="reel-avatar" style={{ background:reel.color }}>
                  {reel.avatar}
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span className="reel-username">{reel.creator}</span>
                    {reel.verified && <span style={{ fontSize:14, color:reel.color }}>✓</span>}
                  </div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)', letterSpacing:'0.06em' }}>{reel.niche.toUpperCase()}</div>
                </div>
                <button className={`reel-follow ${followed.has(reel.id) ? 'following' : ''}`} onClick={() => setFollowed(f => { const n = new Set(f); n.has(reel.id) ? n.delete(reel.id) : n.add(reel.id); return n; })}>
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
                <span className="reel-action-count">{fmtNum(likes[reel.id])}</span>
              </button>
              <button className="reel-action-btn">
                <span className="reel-action-icon">💬</span>
                <span className="reel-action-count">{fmtNum(reel.comments)}</span>
              </button>
              <button className="reel-action-btn">
                <span className="reel-action-icon">↗️</span>
                <span className="reel-action-count">{fmtNum(reel.shares)}</span>
              </button>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:reel.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:'#000', border:'2px solid rgba(255,255,255,0.3)', cursor:'pointer' }}>{reel.avatar}</div>
                <div style={{ width:20, height:20, borderRadius:'50%', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#000', fontWeight:800, marginTop:-14, border:'2px solid #000' }}>+</div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign:'center', padding:'48px 20px', color:'var(--text-dim)' }}>
          <div style={{ fontSize:36, marginBottom:12 }}>🔄</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:22, letterSpacing:'0.05em' }}>You're all caught up</div>
          <div style={{ fontSize:14, marginTop:8 }}>More wins dropping every day. Come back tomorrow. 💪</div>
        </div>
      </div>
    </div>
  );
}
