import { useState } from 'react';

const MENTORS = [
  { id:1, name:'Marcus Williams', niche:'E-Commerce & Dropshipping', bio:'Generated $2.4M in revenue across 3 Shopify stores. I teach the exact system I used to scale from $0 to $50K/month.', price:197, annualPrice:1885, rating:4.9, students:842, banner:'🛍️', color:'#F5A623', courses:['Dropship Blueprint','TikTok Ads Mastery','Product Research System'], verified:true },
  { id:2, name:'Alicia Rosa', niche:'Social Media Marketing Agency', bio:'Runs a $40K/month SMMA serving restaurants and fitness studios. I\'ll show you how to land your first client in 30 days.', price:149, annualPrice:1430, rating:4.8, students:1240, banner:'📱', color:'#A855F7', courses:['SMMA Launchpad','Cold Outreach Mastery','Client Retention Secrets'], verified:true },
  { id:3, name:'DeShawn Chambers', niche:'Amazon FBA', bio:'7-figure Amazon seller with 3 private label brands. Went from working at UPS to $1.2M in Amazon sales last year.', price:247, annualPrice:2365, rating:4.9, students:630, banner:'📦', color:'#00C896', courses:['Amazon FBA Academy','Product Sourcing Secrets','PPC Profits'], verified:true },
  { id:4, name:'Sofia Martinez', niche:'Clothing Brand & Streetwear', bio:'Built a streetwear brand from zero to $800K/year. I teach you branding, drops strategy, and scaling without investors.', price:127, annualPrice:1220, rating:4.7, students:520, banner:'👕', color:'#FF4444', courses:['Brand Blueprint','Drop Strategy','Supplier Sourcing'], verified:false },
  { id:5, name:'Jaylen Brooks', niche:'Real Estate Wholesaling', bio:'Closed 47 wholesale deals in 2 years. Teaches motivated seller acquisition, deal analysis, and cash buyer lists.', price:297, annualPrice:2850, rating:4.9, students:310, banner:'🏠', color:'#4F8EF7', courses:['Wholesale Mastery','Deal Analysis System','Cash Buyer Academy'], verified:true },
  { id:6, name:'Priya Kapoor', niche:'Content Creation & Brand Deals', bio:'100K+ TikTok, $15K/month from brand deals and digital products. I teach the algorithm and monetization strategies.', price:97, annualPrice:930, rating:4.6, students:1860, banner:'🎬', color:'#F5A623', courses:['Algorithm Decoded','Brand Deal Secrets','Digital Product Launch'], verified:true },
];

const PLATFORM_CUT = 0.15; // 15% platform fee

export default function Mentors() {
  const [selected, setSelected] = useState(null);
  const [enrolled, setEnrolled] = useState(new Set());
  const [applyMode, setApplyMode] = useState(false);
  const [billing, setBilling] = useState('monthly');
  const [applyForm, setApplyForm] = useState({ niche: '', experience: '', revenue: '', bio: '' });
  const [applied, setApplied] = useState(false);

  const enroll = (id) => {
    setEnrolled(e => { const n = new Set(e); n.add(id); return n; });
    setSelected(null);
  };

  const submitApplication = () => {
    if (!applyForm.niche || !applyForm.bio) return;
    setApplied(true);
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">LEARNING</div>
        <h1 className="section-title">MENTOR <span>ROOMS</span></h1>
        <p className="section-desc">Learn from people who've already built what you're building. Real results, real strategies.</p>
      </div>

      {/* Revenue share banner */}
      <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg, rgba(0,200,150,0.1), rgba(245,166,35,0.1))', border: '1px solid var(--border-gold)', borderRadius: 10, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.05em', color: 'var(--gold)' }}>BECOME A MENTOR · EARN FROM YOUR KNOWLEDGE</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Mentors keep <strong style={{ color: 'var(--green)' }}>85%</strong> of all student payments. Platform takes 15% to maintain infrastructure, payments, and support.</div>
        </div>
        <button className="btn btn-gold" onClick={() => setApplyMode(!applyMode)}>Apply to Mentor →</button>
      </div>

      {/* Mentor application */}
      {applyMode && !applied && (
        <div className="card-gold animate-slide-up" style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 4 }}>MENTOR APPLICATION</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>A subscription of <strong style={{ color: 'var(--gold)' }}>$99/month</strong> unlocks your mentor room. You earn 85% of every student payment. Cancel anytime.</div>
          <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
            <div>
              <label className="input-label">Your Niche / Expertise</label>
              <input className="input" value={applyForm.niche} onChange={e => setApplyForm(f => ({...f, niche: e.target.value}))} placeholder="e.g. Amazon FBA, Dropshipping, Real Estate..." />
            </div>
            <div>
              <label className="input-label">Years of Experience</label>
              <select className="select" style={{ width: '100%' }} value={applyForm.experience} onChange={e => setApplyForm(f => ({...f, experience: e.target.value}))}>
                <option value="">Select years</option>
                {['1-2 years','3-5 years','5-10 years','10+ years'].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Annual Revenue in Your Niche</label>
              <select className="select" style={{ width: '100%' }} value={applyForm.revenue} onChange={e => setApplyForm(f => ({...f, revenue: e.target.value}))}>
                <option value="">Select range</option>
                {['$10K–$50K','$50K–$100K','$100K–$500K','$500K–$1M','$1M+'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">What Will You Teach?</label>
              <input className="input" value={applyForm.bio} onChange={e => setApplyForm(f => ({...f, bio: e.target.value}))} placeholder="Describe your expertise and course content..." />
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 16, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              💰 <strong style={{ color: 'var(--text)' }}>Example earnings:</strong> If you charge $197/student and get 20 students: $3,940/month. <strong style={{ color: 'var(--green)' }}>Your take: $3,349/month</strong>. The $99 subscription is worth it after your first 1 student.<br/>
              📋 <strong style={{ color: 'var(--text)' }}>Platform fee:</strong> 15% of all student payments goes to Hustle for payment processing, platform maintenance, and marketing support.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-gold btn-lg" style={{ flex: 1 }} onClick={submitApplication}>Apply + Subscribe ($99/mo) →</button>
            <button className="btn btn-ghost" onClick={() => setApplyMode(false)}>Cancel</button>
          </div>
        </div>
      )}

      {applied && (
        <div className="card animate-slide-up" style={{ marginBottom: 24, textAlign: 'center', border: '1px solid var(--green)', background: 'var(--green-dim)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--green)', letterSpacing: '0.05em' }}>APPLICATION SUBMITTED!</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>We'll review your application within 24 hours. Your mentor room will be live once approved. Get ready to change lives.</div>
        </div>
      )}

      {/* Billing toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div className="toggle-group" style={{ width: 260 }}>
          <button className={`toggle-btn ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
          <button className={`toggle-btn ${billing === 'annual' ? 'active' : ''}`} onClick={() => setBilling('annual')}>Annual (Save 20%)</button>
        </div>
        {billing === 'annual' && <span className="badge badge-green">🎉 SAVE 20%</span>}
      </div>

      {/* Mentor grid */}
      <div className="mentor-grid">
        {MENTORS.map(m => (
          <div key={m.id} className="mentor-card" style={{ border: enrolled.has(m.id) ? `1px solid ${m.color}` : '1px solid var(--border)' }}>
            <div className="mentor-banner" style={{ background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)`, color: m.color }}>
              {m.banner}
            </div>
            <div className="mentor-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="mentor-name">{m.name}</div>
                  <div className="mentor-niche">{m.niche}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {m.verified && <span className="badge badge-gold">✓ Verified</span>}
                  {enrolled.has(m.id) && <span className="badge badge-green">Enrolled</span>}
                </div>
              </div>
              <div className="mentor-bio">{m.bio}</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>COURSES INCLUDED</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {m.courses.map(c => <span key={c} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'var(--bg-input)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{c}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div className="mentor-stat"><strong>⭐ {m.rating}</strong>Rating</div>
                <div className="mentor-stat"><strong>{m.students.toLocaleString()}</strong>Students</div>
                <div className="mentor-stat" style={{ marginLeft: 'auto' }}>
                  <div className="mentor-price">${billing === 'annual' ? Math.round(m.annualPrice / 12) : m.price}</div>
                  <div className="mentor-price-label">{billing === 'annual' ? '/mo billed annually' : '/month'}</div>
                </div>
              </div>
              <button
                className={`btn ${enrolled.has(m.id) ? 'btn-ghost' : 'btn-gold'}`}
                style={{ width: '100%', marginTop: 14 }}
                onClick={() => enrolled.has(m.id) ? null : setSelected(m)}
              >
                {enrolled.has(m.id) ? '✓ Access Your Courses' : `Enroll for $${billing === 'annual' ? Math.round(m.annualPrice/12) : m.price}/mo →`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enroll modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }} onClick={() => setSelected(null)}>
          <div className="card" style={{ width: 440, border: `1px solid ${selected.color}`, background: 'var(--bg-card)' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{selected.banner}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.05em', color: 'var(--text)' }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: selected.color, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{selected.niche.toUpperCase()}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 10, marginBottom: 20, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Monthly subscription</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--green)' }}>${billing === 'annual' ? Math.round(selected.annualPrice/12) : selected.price}/mo</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                ✓ Unlimited access to all {selected.courses.length} courses<br/>
                ✓ Direct message the mentor<br/>
                ✓ Private student community access<br/>
                ✓ Cancel anytime — no lock-in
              </div>
            </div>
            <div style={{ padding: '10px 14px', background: 'rgba(0,200,150,0.08)', borderRadius: 8, marginBottom: 20, border: '1px solid rgba(0,200,150,0.15)', fontSize: 11, color: 'var(--green)' }}>
              ⚡ {selected.students.toLocaleString()} students are already inside. Limited spots available.
            </div>
            <button className="btn btn-gold btn-lg" style={{ width: '100%' }} onClick={() => enroll(selected.id)}>
              Enroll Now — ${billing === 'annual' ? Math.round(selected.annualPrice/12) : selected.price}/month →
            </button>
            <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={() => setSelected(null)}>Maybe Later</button>
          </div>
        </div>
      )}
    </div>
  );
}
