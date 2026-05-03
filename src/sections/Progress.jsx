import { useState } from 'react';

const INIT_GOALS = [
  { id: 1, title: 'First $1,000 Month', target: 1000, current: 680, category: 'Revenue', emoji: '💰', deadline: 'May 31' },
  { id: 2, title: 'Get 10 Clients', target: 10, current: 4, category: 'Growth', emoji: '🤝', deadline: 'Jun 15' },
  { id: 3, title: 'Launch Online Store', target: 1, current: 0, category: 'Launch', emoji: '🚀', deadline: 'Jun 1' },
  { id: 4, title: 'Grow to 5K Followers', target: 5000, current: 1240, category: 'Social', emoji: '📱', deadline: 'Jul 1' },
];

const INIT_SALES = [
  { id: 1, date: 'May 3', item: 'Custom hoodie drop', amount: 150, status: 'completed' },
  { id: 2, date: 'May 3', item: 'Coaching session', amount: 200, status: 'completed' },
  { id: 3, date: 'May 2', item: 'Product bundle', amount: 75, status: 'completed' },
  { id: 4, date: 'May 2', item: 'Website design', amount: 800, status: 'pending' },
  { id: 5, date: 'May 1', item: 'Social media mgmt', amount: 500, status: 'completed' },
];

const MONTHS_LABELS = ['Jan','Feb','Mar','Apr','May','Jun'];
const REVENUE_DATA = [420, 680, 890, 1240, 1680, null];

function BarChart({ data, labels, color }) {
  const max = Math.max(...data.filter(Boolean));
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100 }}>
      {data.map((val, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            {val ? `$${(val/1000).toFixed(val>=1000?1:0)}${val>=1000?'K':''}` : ''}
          </div>
          <div style={{ width: '100%', background: val ? color : 'var(--bg-input)', borderRadius: '4px 4px 0 0', height: val ? `${(val / max) * 80}px` : '4px', transition: 'height 0.5s ease', opacity: val ? 1 : 0.3 }} />
          <div style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

export default function Progress() {
  const [goals, setGoals] = useState(INIT_GOALS);
  const [sales, setSales] = useState(INIT_SALES);
  const [showAdd, setShowAdd] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', category: 'Revenue', emoji: '💰', deadline: '' });
  const [newSale, setNewSale] = useState({ item: '', amount: '' });

  const totalRevenue = sales.filter(s => s.status === 'completed').reduce((a, s) => a + s.amount, 0);
  const pending = sales.filter(s => s.status === 'pending').reduce((a, s) => a + s.amount, 0);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    setGoals(g => [...g, { ...newGoal, id: Date.now(), target: Number(newGoal.target), current: 0 }]);
    setNewGoal({ title: '', target: '', category: 'Revenue', emoji: '💰', deadline: '' });
    setShowAdd(false);
  };

  const addSale = () => {
    if (!newSale.item || !newSale.amount) return;
    const today = new Date();
    setSales(s => [{ ...newSale, id: Date.now(), amount: Number(newSale.amount), status: 'completed', date: `${today.toLocaleString('default',{month:'short'})} ${today.getDate()}` }, ...s]);
    setNewSale({ item: '', amount: '' });
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

      {/* Stats overview */}
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'TOTAL EARNED', value: `$${totalRevenue.toLocaleString()}`, change: '+23% this month', up: true, color: 'var(--green)' },
          { label: 'PENDING', value: `$${pending.toLocaleString()}`, change: `${sales.filter(s => s.status === 'pending').length} transactions`, up: true, color: 'var(--gold)' },
          { label: 'TOTAL SALES', value: sales.length, change: `${sales.filter(s => s.status === 'completed').length} completed`, up: true, color: 'var(--blue)' },
          { label: 'GOALS ACTIVE', value: goals.length, change: `${goals.filter(g => pct(g) >= 100).length} completed`, up: false, color: 'var(--purple)' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className={`stat-change ${s.up ? 'up' : ''}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Revenue chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', color: 'var(--text)' }}>REVENUE GROWTH</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>2026 · Monthly</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--green)' }}>📈</div>
          </div>
          <BarChart data={REVENUE_DATA} labels={MONTHS_LABELS} color="linear-gradient(180deg, var(--green), rgba(0,200,150,0.4))" />
          <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--green-dim)', borderRadius: 8, border: '1px solid rgba(0,200,150,0.2)' }}>
            <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>TREND: +25% MOM GROWTH 🔥</div>
          </div>
        </div>

        {/* Goals */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', color: 'var(--text)' }}>ACTIVE GOALS</div>
            <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(!showAdd)}>+ Goal</button>
          </div>
          {showAdd && (
            <div style={{ marginBottom: 16, padding: 16, background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-gold)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div>
                  <label className="input-label">Goal Title</label>
                  <input className="input" value={newGoal.title} onChange={e => setNewGoal(g => ({...g, title: e.target.value}))} placeholder="e.g. First $10K month" />
                </div>
                <div>
                  <label className="input-label">Target Number</label>
                  <input className="input" type="number" value={newGoal.target} onChange={e => setNewGoal(g => ({...g, target: e.target.value}))} placeholder="10000" />
                </div>
                <div>
                  <label className="input-label">Category</label>
                  <select className="select" value={newGoal.category} onChange={e => setNewGoal(g => ({...g, category: e.target.value}))}>
                    {['Revenue','Growth','Social','Launch','Skills','Health'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label">Deadline</label>
                  <input className="input" value={newGoal.deadline} onChange={e => setNewGoal(g => ({...g, deadline: e.target.value}))} placeholder="Jul 1" />
                </div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={addGoal} style={{ width: '100%' }}>Save Goal</button>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {goals.map(g => {
              const p = pct(g);
              return (
                <div key={g.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{g.emoji}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{g.title}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{g.category} · Due {g.deadline}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: barColor(p) }}>{p}%</div>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${p}%`, background: barColor(p) }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {typeof g.current === 'number' && g.current >= 1000 ? `$${g.current.toLocaleString()}` : g.current} / {typeof g.target === 'number' && g.target >= 1000 ? `$${g.target.toLocaleString()}` : g.target}
                    </span>
                    {p >= 100 && <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>✓ ACHIEVED</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sales tracker */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.05em', color: 'var(--text)' }}>SALES TRACKER</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Every dollar counts. Log it all.</div>
          </div>
          <button className="btn btn-gold btn-sm" onClick={() => setShowSale(!showSale)}>+ Log Sale</button>
        </div>
        {showSale && (
          <div style={{ marginBottom: 16, padding: 16, background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-gold)', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 2 }}>
              <label className="input-label">What Did You Sell?</label>
              <input className="input" value={newSale.item} onChange={e => setNewSale(s => ({...s, item: e.target.value}))} placeholder="e.g. Custom logo design" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="input-label">Amount ($)</label>
              <input className="input" type="number" value={newSale.amount} onChange={e => setNewSale(s => ({...s, amount: e.target.value}))} placeholder="250" />
            </div>
            <button className="btn btn-gold btn-sm" onClick={addSale}>Log It 💰</button>
          </div>
        )}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['DATE', 'SALE', 'AMOUNT', 'STATUS'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < sales.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '12px 12px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.date}</td>
                  <td style={{ padding: '12px 12px', fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{s.item}</td>
                  <td style={{ padding: '12px 12px', fontFamily: 'var(--font-display)', fontSize: 18, color: s.status === 'completed' ? 'var(--green)' : 'var(--gold)' }}>${s.amount.toLocaleString()}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span className={`badge ${s.status === 'completed' ? 'badge-green' : 'badge-gold'}`}>{s.status === 'completed' ? '✓ Paid' : '⏳ Pending'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
