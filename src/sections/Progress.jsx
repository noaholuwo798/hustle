import { useState, useEffect, useRef } from 'react';

const INIT_GOALS = [];
const INIT_SALES = [];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun'];
const REVENUE_DATA = [0, 0, 0, 0, 0, 0];

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const steps = duration / 16;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function AnimatedStat({ value, prefix = '', color }) {
  const count = useCountUp(value);
  return <span style={{ color }}>{prefix}{count.toLocaleString()}</span>;
}

function BarChart({ data, labels }) {
  const max = Math.max(...data) || 1;
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-end', height:120 }}>
      {data.map((val, i) => {
        const pct = (val / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <div style={{ fontSize:10, color: isLast ? 'var(--green)' : 'var(--text-dim)', fontFamily:'var(--font-mono)', fontWeight: isLast ? 700 : 400 }}>
              ${val >= 1000 ? (val/1000).toFixed(1)+'K' : val}
            </div>
            <div style={{ width:'100%', borderRadius:'6px 6px 0 0', background: isLast ? 'linear-gradient(180deg, var(--green), rgba(29,158,117,0.3))' : 'linear-gradient(180deg, var(--gold), rgba(255,215,0,0.2))', height:`${pct * 0.95}px`, boxShadow: isLast ? '0 0 12px rgba(29,158,117,0.4)' : 'none', transition:'height 0.8s ease' }} />
            <div style={{ fontSize:10, color: isLast ? 'var(--gold)' : 'var(--text-dim)', fontFamily:'var(--font-mono)', fontWeight: isLast ? 700 : 400 }}>{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Progress() {
  const [goals, setGoals] = useState(INIT_GOALS);
  const [sales, setSales] = useState(INIT_SALES);
  const [showAdd, setShowAdd] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const [newGoal, setNewGoal] = useState({ title:'', target:'', category:'Revenue', emoji:'💰', deadline:'' });
  const [newSale, setNewSale] = useState({ item:'', amount:'' });

  const totalRevenue = sales.filter(s => s.status === 'completed').reduce((a, s) => a + s.amount, 0);
  const pending = sales.filter(s => s.status === 'pending').reduce((a, s) => a + s.amount, 0);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    setGoals(g => [...g, { ...newGoal, id:Date.now(), target:Number(newGoal.target), current:0 }]);
    setNewGoal({ title:'', target:'', category:'Revenue', emoji:'💰', deadline:'' });
    setShowAdd(false);
  };

  const addSale = () => {
    if (!newSale.item || !newSale.amount) return;
    const today = new Date();
    setSales(s => [{ ...newSale, id:Date.now(), amount:Number(newSale.amount), status:'completed', date:`${today.toLocaleString('default',{month:'short'})} ${today.getDate()}` }, ...s]);
    setNewSale({ item:'', amount:'' });
    setShowSale(false);
  };

  const pct = (g) => Math.min(100, Math.round((g.current / g.target) * 100));
  const barColor = (p) => p >= 80 ? 'var(--green)' : p >= 50 ? 'var(--gold)' : 'var(--red)';

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">ANALYTICS</div>
        <h1 className="section-title">PROGRESS <span>TRACKER</span></h1>
        <p className="section-desc">Track every dollar, every goal, every win. What gets measured gets mastered.</p>
      </div>

      <div className="stat-grid" style={{ marginBottom:24 }}>
        {[
          { label:'TOTAL EARNED', value:totalRevenue, prefix:'$', color:'var(--green)', change:'+23% this month', up:true, icon:'💰' },
          { label:'PENDING', value:pending, prefix:'$', color:'var(--gold)', change:`${sales.filter(s => s.status==='pending').length} transactions`, up:true, icon:'⏳' },
          { label:'TOTAL SALES', value:sales.length, color:'var(--blue)', change:`${sales.filter(s => s.status==='completed').length} completed`, up:true, icon:'🧾' },
          { label:'ACTIVE GOALS', value:goals.length, color:'var(--purple)', change:`${goals.filter(g => pct(g) >= 100).length} achieved`, up:false, icon:'🎯' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderLeft:`3px solid ${s.color}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div className="stat-label">{s.label}</div>
              <span style={{ fontSize:20 }}>{s.icon}</span>
            </div>
            <div className="stat-value"><AnimatedStat value={s.value} prefix={s.prefix || ''} color={s.color} /></div>
            <div className={`stat-change ${s.up ? 'up' : ''}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom:24 }}>
        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, letterSpacing:'0.05em' }}>REVENUE GROWTH</div>
              <div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)', marginTop:2 }}>2026 Monthly Trend</div>
            </div>
            <span style={{ fontSize:28 }}>📈</span>
          </div>
          <BarChart data={REVENUE_DATA} labels={MONTHS} />
          <div style={{ marginTop:14, padding:'10px 14px', background:'var(--green-dim)', borderRadius:8, border:'1px solid rgba(29,158,117,0.2)' }}>
            <div style={{ fontSize:12, color:'var(--green)', fontFamily:'var(--font-mono)', fontWeight:700 }}>TREND: +25% MONTH OVER MONTH 🔥</div>
          </div>
        </div>

        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:20, letterSpacing:'0.05em' }}>ACTIVE GOALS</div>
            <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(!showAdd)}>+ Goal</button>
          </div>
          {showAdd && (
            <div style={{ marginBottom:16, padding:14, background:'var(--bg-elevated)', borderRadius:10, border:'1px solid var(--border-gold)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
                <div><label className="input-label">Goal Title</label><input className="input" value={newGoal.title} onChange={e => setNewGoal(g => ({...g, title:e.target.value}))} placeholder="First $10K month" /></div>
                <div><label className="input-label">Target</label><input className="input" type="number" value={newGoal.target} onChange={e => setNewGoal(g => ({...g, target:e.target.value}))} placeholder="10000" /></div>
                <div><label className="input-label">Category</label><select className="select" value={newGoal.category} onChange={e => setNewGoal(g => ({...g, category:e.target.value}))}>{['Revenue','Growth','Social','Launch','Skills','Health'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className="input-label">Deadline</label><input className="input" value={newGoal.deadline} onChange={e => setNewGoal(g => ({...g, deadline:e.target.value}))} placeholder="Jul 1" /></div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={addGoal} style={{ width:'100%' }}>Save Goal</button>
            </div>
          )}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {goals.length === 0 && (
              <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-dim)' }}>
                <div style={{ fontSize:32, marginBottom:8 }}>🎯</div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-muted)' }}>No goals yet</div>
                <div style={{ fontSize:12, marginTop:4 }}>Hit "+ Goal" to set your first target</div>
              </div>
            )}
            {goals.map(g => {
              const p = pct(g);
              return (
                <div key={g.id}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:18 }}>{g.emoji}</span>
                      <div>
                        <div style={{ fontSize:14, fontWeight:700 }}>{g.title}</div>
                        <div style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{g.category} · Due {g.deadline}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:22, color:barColor(p) }}>{p}%</div>
                  </div>
                  <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width:`${p}%`, background:barColor(p) }} /></div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                    <span style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>
                      {g.current >= 1000 ? `$${g.current.toLocaleString()}` : g.current} / {g.target >= 1000 ? `$${g.target.toLocaleString()}` : g.target}
                    </span>
                    {p >= 100 && <span style={{ fontSize:11, color:'var(--green)', fontWeight:700 }}>ACHIEVED ✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:20, letterSpacing:'0.05em' }}>SALES TRACKER</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Every dollar counts. Log it all.</div>
          </div>
          <button className="btn btn-gold btn-sm" onClick={() => setShowSale(!showSale)}>+ Log Sale</button>
        </div>
        {showSale && (
          <div style={{ marginBottom:16, padding:14, background:'var(--bg-elevated)', borderRadius:10, border:'1px solid var(--border-gold)', display:'flex', gap:10, alignItems:'flex-end', flexWrap:'wrap' }}>
            <div style={{ flex:2, minWidth:150 }}><label className="input-label">What Did You Sell?</label><input className="input" value={newSale.item} onChange={e => setNewSale(s => ({...s, item:e.target.value}))} placeholder="e.g. Logo design" /></div>
            <div style={{ flex:1, minWidth:100 }}><label className="input-label">Amount ($)</label><input className="input" type="number" value={newSale.amount} onChange={e => setNewSale(s => ({...s, amount:e.target.value}))} placeholder="250" /></div>
            <button className="btn btn-gold btn-sm" onClick={addSale}>Log It 💰</button>
          </div>
        )}
        {sales.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px 0', color:'var(--text-dim)' }}>
            <div style={{ fontSize:36, marginBottom:10 }}>💰</div>
            <div style={{ fontSize:15, fontWeight:600, color:'var(--text-muted)', marginBottom:6 }}>No sales logged yet</div>
            <div style={{ fontSize:13 }}>Hit "+ Log Sale" to record your first win</div>
          </div>
        ) : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>{['DATE','SALE','AMOUNT','STATUS'].map(h => <th key={h} style={{ textAlign:'left', padding:'8px 12px', fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)', letterSpacing:'0.12em', borderBottom:'1px solid var(--border)' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {sales.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < sales.length-1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding:'12px', fontSize:12, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{s.date}</td>
                  <td style={{ padding:'12px', fontSize:14, color:'var(--text)', fontWeight:500 }}>{s.item}</td>
                  <td style={{ padding:'12px', fontFamily:'var(--font-display)', fontSize:20, color: s.status==='completed' ? 'var(--green)' : 'var(--gold)' }}>${s.amount.toLocaleString()}</td>
                  <td style={{ padding:'12px' }}><span className={`badge ${s.status==='completed' ? 'badge-green' : 'badge-gold'}`}>{s.status==='completed' ? '✓ Paid' : '⏳ Pending'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
