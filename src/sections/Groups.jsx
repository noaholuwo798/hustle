import { useState } from 'react';

const GROUPS = [
  { id: 1, name: 'Dropship Kings', emoji: '🛍️', members: 1240, preview: 'Marcus: "Hit $15K this month 🔥 using TikTok organic"', time: '2m ago', category: 'E-Commerce', unread: 3 },
  { id: 2, name: 'SMMA Collective', emoji: '📱', members: 890, preview: 'Sofia: "Landed a $3K/mo retainer from cold DM"', time: '5m ago', category: 'Agency', unread: 7 },
  { id: 3, name: 'Real Estate Hustlers', emoji: '🏠', members: 2100, preview: 'Jaylen: "Wholesale deal closed — $12K assignment fee"', time: '12m ago', category: 'Real Estate', unread: 0 },
  { id: 4, name: 'Brand Builders', emoji: '👕', members: 760, preview: 'Alicia: "First drop sold out in 47 minutes"', time: '1h ago', category: 'Clothing', unread: 1 },
  { id: 5, name: 'Amazon FBA Sharks', emoji: '📦', members: 1580, preview: 'DeShawn: "New product ranking page 1 in 3 days"', time: '2h ago', category: 'E-Commerce', unread: 0 },
  { id: 6, name: 'Content Creator Hub', emoji: '🎬', members: 3200, preview: 'Priya: "Just hit 100K on TikTok — AMA 🔥"', time: '3h ago', category: 'Content', unread: 12 },
  { id: 7, name: 'Service Business Circle', emoji: '🧹', members: 420, preview: 'Andre: "Cleaning biz doing $8K this month with 2 employees"', time: '5h ago', category: 'Services', unread: 0 },
  { id: 8, name: 'Day Traders Lounge', emoji: '📈', members: 950, preview: 'Brianna: "NVDA play from yesterday — here\'s the breakdown"', time: '1d ago', category: 'Trading', unread: 5 },
];

const MOCK_MSGS = {
  1: [
    { user: 'Marcus J.', avatar: 'MJ', color: '#F5A623', text: 'Hit $15K this month 🔥 using TikTok organic. No paid ads.', time: '2:45 PM' },
    { user: 'Sofia M.', avatar: 'SM', color: '#FF4444', text: 'What products are you moving? Health or general?', time: '2:47 PM' },
    { user: 'Marcus J.', avatar: 'MJ', color: '#F5A623', text: 'Posture correctors and LED face masks. Margins are insane.', time: '2:48 PM' },
    { user: 'DeShawn T.', avatar: 'DT', color: '#00C896', text: 'LED face masks have been good for me too. Spocket supplier?', time: '2:51 PM' },
    { user: 'You', avatar: 'ME', color: '#A855F7', text: 'Which TikTok hooks are converting the best for you?', time: '2:55 PM', isMe: true },
    { user: 'Marcus J.', avatar: 'MJ', color: '#F5A623', text: '"POV: I tried this for 30 days" and "You\'ve been lied to about..." — both crushed it', time: '2:58 PM' },
  ],
  6: [
    { user: 'Priya K.', avatar: 'PK', color: '#F5A623', text: 'Just hit 100K on TikTok! AMA — ask me anything about growing 🔥', time: '10:00 AM' },
    { user: 'Jaylen B.', avatar: 'JB', color: '#4F8EF7', text: 'Congrats!! How long did it take from 0?', time: '10:02 AM' },
    { user: 'Priya K.', avatar: 'PK', color: '#F5A623', text: '4 months of daily posting. First 3 months were brutal — under 500 views. Then one video hit 2M.', time: '10:05 AM' },
    { user: 'Keisha W.', avatar: 'KW', color: '#FF4444', text: 'What made that video different from the others?', time: '10:07 AM' },
    { user: 'Priya K.', avatar: 'PK', color: '#F5A623', text: 'The hook in the first 2 seconds + I used trending audio. Also posted at 9 PM EST.', time: '10:09 AM' },
    { user: 'You', avatar: 'ME', color: '#A855F7', text: 'How are you monetizing — brand deals or own products?', time: '10:15 AM', isMe: true },
  ],
};

export default function Groups() {
  const [active, setActive] = useState(null);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(MOCK_MSGS);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(GROUPS.map(g => g.category))];
  const filtered = filter === 'All' ? GROUPS : GROUPS.filter(g => g.category === filter);

  const sendMsg = () => {
    if (!input.trim() || !active) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    setMsgs(m => ({
      ...m,
      [active.id]: [...(m[active.id] || []), { user: 'You', avatar: 'ME', color: '#A855F7', text: input, time, isMe: true }]
    }));
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="section-header">
        <div className="section-eyebrow">COMMUNITY</div>
        <h1 className="section-title">GROUP <span>CHATS</span></h1>
        <p className="section-desc">Connect with your tribe. Share wins, strategies, and support.</p>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto' }} className="scroll-x">
        {categories.map(c => (
          <button key={c} className={`chip ${filter === c ? 'chip-active' : ''}`}
            style={{ flexShrink: 0, borderColor: filter === c ? 'var(--gold)' : 'var(--border)', color: filter === c ? 'var(--gold)' : 'var(--text-muted)', background: filter === c ? 'var(--gold-dim)' : 'var(--bg-elevated)' }}
            onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: active ? '320px 1fr' : '1fr', gap: 20, overflow: 'hidden' }}>
        {/* Group list */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtered.map(g => (
            <div key={g.id} className="group-item" style={{ borderColor: active?.id === g.id ? 'var(--border-gold)' : 'transparent', background: active?.id === g.id ? 'var(--gold-dim)' : 'transparent' }}
              onClick={() => setActive(a => a?.id === g.id ? null : g)}>
              <div className="group-icon">{g.emoji}</div>
              <div className="group-info">
                <div className="group-name">{g.name}</div>
                <div className="group-preview">{g.preview}</div>
              </div>
              <div className="group-meta">
                <div className="group-time">{g.time}</div>
                <div className="group-count">{g.members.toLocaleString()} members</div>
                {g.unread > 0 && (
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--red)', color: '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4, marginLeft: 'auto' }}>{g.unread}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat panel */}
        {active && (
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
            {/* Chat header */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-elevated)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 24 }}>{active.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{active.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{active.members.toLocaleString()} MEMBERS · {active.category.toUpperCase()}</div>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setActive(null)}>✕</button>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {(msgs[active.id] || [{ user: 'System', avatar: '⚡', text: `Welcome to ${active.name}! Share your wins and insights.`, time: 'Today', isSystem: true }]).map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, flexDirection: m.isMe ? 'row-reverse' : 'row', alignSelf: m.isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  {!m.isMe && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#000', flexShrink: 0 }}>{m.avatar}</div>
                  )}
                  <div>
                    {!m.isMe && <div style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 3, fontFamily: 'var(--font-mono)' }}>{m.user} · {m.time}</div>}
                    <div style={{ padding: '10px 14px', borderRadius: m.isMe ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: m.isMe ? 'linear-gradient(135deg, #FFD700, #F5A623)' : 'var(--bg-elevated)', color: m.isMe ? '#000' : 'var(--text)', fontSize: 13, fontWeight: m.isMe ? 600 : 400, border: m.isMe ? 'none' : '1px solid var(--border)' }}>{m.text}</div>
                    {m.isMe && <div style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'right', marginTop: 3, fontFamily: 'var(--font-mono)' }}>{m.time}</div>}
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              <input className="input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder={`Message ${active.name}...`} style={{ flex: 1 }} />
              <button className="btn btn-gold btn-sm" onClick={sendMsg}>Send</button>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: 'var(--text-dim)' }}>
            <div style={{ fontSize: 48 }}>💬</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-muted)' }}>Select a group to join the conversation</div>
            <div style={{ fontSize: 13 }}>Connect with {GROUPS.reduce((a,g) => a + g.members, 0).toLocaleString()}+ hustlers</div>
          </div>
        )}
      </div>
    </div>
  );
}
