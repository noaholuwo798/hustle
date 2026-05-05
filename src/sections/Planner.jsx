import { useState } from 'react';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];


const TASK_CATS = [
  { label: '📞 Sales Call', color: 'gold' },
  { label: '📝 Content', color: 'green' },
  { label: '⚡ Launch', color: 'red' },
  { label: '🤝 Networking', color: 'gold' },
  { label: '📊 Review', color: 'green' },
  { label: '🎯 Goal Work', color: 'red' },
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Planner() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState({});
  const [selected, setSelected] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [taskColor, setTaskColor] = useState('gold');
  const [view, setView] = useState('month');

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

  const dateKey = (day) => `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const addTask = () => {
    if (!newTask.trim() || !selected) return;
    setEvents(ev => ({
      ...ev,
      [selected]: [...(ev[selected] || []), { text: newTask, color: taskColor }]
    }));
    setNewTask('');
  };

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const WEEKLY_PLAN = [
    { time: '6:00 AM', task: 'Morning routine + mindset', type: 'personal' },
    { time: '8:00 AM', task: 'Deep work block #1', type: 'hustle' },
    { time: '10:00 AM', task: 'Outreach / prospecting', type: 'hustle' },
    { time: '12:00 PM', task: 'Lunch + review analytics', type: 'admin' },
    { time: '1:00 PM', task: 'Content creation block', type: 'hustle' },
    { time: '3:00 PM', task: 'Client calls / meetings', type: 'hustle' },
    { time: '5:00 PM', task: 'Admin + email responses', type: 'admin' },
    { time: '7:00 PM', task: 'Learning / skill building', type: 'personal' },
    { time: '9:00 PM', task: 'Plan tomorrow + wind down', type: 'personal' },
  ];

  const typeColor = { hustle: 'var(--gold)', admin: 'var(--blue)', personal: 'var(--green)' };

  return (
    <div>
      <div className="section-header">
        <div className="section-eyebrow">SCHEDULE</div>
        <h1 className="section-title">YOUR <span>PLANNER</span></h1>
        <p className="section-desc">Plan your grind. Every successful day starts the night before.</p>
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <div className="toggle-group" style={{ width: 240 }}>
          <button className={`toggle-btn ${view === 'month' ? 'active' : ''}`} onClick={() => setView('month')}>📅 Calendar</button>
          <button className={`toggle-btn ${view === 'week' ? 'active' : ''}`} onClick={() => setView('week')}>🕐 Daily Template</button>
        </div>
      </div>

      {view === 'month' ? (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 300px' : '1fr', gap: 20 }}>
          {/* Calendar */}
          <div className="card">
            {/* Nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <button className="btn btn-ghost btn-sm" onClick={prevMonth}>←</button>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.05em', color: 'var(--text)' }}>
                {MONTHS[month]} <span style={{ color: 'var(--gold)' }}>{year}</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={nextMonth}>→</button>
            </div>
            {/* Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'var(--text-dim)', padding: '6px 0' }}>{d}</div>
              ))}
            </div>
            {/* Days grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: totalCells }, (_, i) => {
                const day = i - firstDay + 1;
                const isValid = day >= 1 && day <= daysInMonth;
                const key = dateKey(day);
                const isToday = key === today;
                const isSelected = key === selected;
                const dayEvents = events[key] || [];
                return (
                  <div
                    key={i}
                    onClick={() => isValid && setSelected(isSelected ? null : key)}
                    style={{
                      minHeight: 72, padding: 8, borderRadius: 8,
                      border: `1px solid ${isSelected ? 'var(--gold)' : isToday ? 'rgba(245,166,35,0.3)' : 'var(--border)'}`,
                      background: isSelected ? 'var(--gold-dim)' : isToday ? 'rgba(245,166,35,0.05)' : 'var(--bg-elevated)',
                      cursor: isValid ? 'pointer' : 'default',
                      opacity: isValid ? 1 : 0.3,
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: isToday ? 'var(--gold)' : isValid ? 'var(--text-muted)' : 'transparent', marginBottom: 4 }}>{isValid ? day : ''}</div>
                    {dayEvents.slice(0, 2).map((ev, j) => (
                      <div key={j} style={{ fontSize: 9, borderRadius: 3, padding: '2px 5px', marginBottom: 2, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        background: ev.color === 'red' ? 'var(--red-dim)' : ev.color === 'green' ? 'var(--green-dim)' : 'var(--gold-dim)',
                        color: ev.color === 'red' ? 'var(--red)' : ev.color === 'green' ? 'var(--green)' : 'var(--gold)',
                      }}>{ev.text}</div>
                    ))}
                    {dayEvents.length > 2 && <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>+{dayEvents.length - 2} more</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Day Panel */}
          {selected && (
            <div className="card animate-slide-up">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.05em' }}>
                {MONTHS[parseInt(selected.split('-')[1]) - 1]} {parseInt(selected.split('-')[2])}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {(events[selected] || []).length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', textAlign: 'center', padding: '20px 0' }}>No tasks yet. Add one below 👇</div>
                )}
                {(events[selected] || []).map((ev, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: ev.color === 'red' ? 'var(--red)' : ev.color === 'green' ? 'var(--green)' : 'var(--gold)' }} />
                    <span style={{ fontSize: 13, flex: 1 }}>{ev.text}</span>
                    <button onClick={() => setEvents(ev2 => ({ ...ev2, [selected]: ev2[selected].filter((_,j) => j !== i) }))} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 16 }}>×</button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div className="input-label">ADD TASK</div>
                <input className="input" style={{ marginBottom: 10 }} value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Task description..." />
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  {['gold', 'green', 'red'].map(c => (
                    <button key={c} onClick={() => setTaskColor(c)} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: `1px solid ${taskColor === c ? (c === 'gold' ? 'var(--gold)' : c === 'green' ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`, background: taskColor === c ? (c === 'gold' ? 'var(--gold-dim)' : c === 'green' ? 'var(--green-dim)' : 'var(--red-dim)') : 'var(--bg-elevated)', cursor: 'pointer', fontSize: 11, fontWeight: 700, color: c === 'gold' ? 'var(--gold)' : c === 'green' ? 'var(--green)' : 'var(--red)', textTransform: 'uppercase' }}>{c}</button>
                  ))}
                </div>
                <button className="btn btn-gold" style={{ width: '100%' }} onClick={addTask}>+ Add Task</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Daily Template */
        <div className="grid-2">
          <div className="card">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.05em', color: 'var(--text)', marginBottom: 4 }}>DAILY GRIND TEMPLATE</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>The proven schedule of high-performers. Customize it for your hustle.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {WEEKLY_PLAN.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', width: 60, flexShrink: 0 }}>{item.time}</div>
                  <div style={{ width: 3, height: 28, borderRadius: 999, background: typeColor[item.type], flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: 'var(--text)', flex: 1 }}>{item.task}</div>
                  <div style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'var(--bg-input)', color: typeColor[item.type], fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.type}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card-gold">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 12 }}>THE MILLIONAIRE MORNING</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                🌅 <strong style={{ color: 'var(--text)' }}>5:00 AM</strong> — Wake up before the world<br/>
                🙏 <strong style={{ color: 'var(--text)' }}>5:15 AM</strong> — Gratitude + meditation (10 min)<br/>
                📖 <strong style={{ color: 'var(--text)' }}>5:30 AM</strong> — Read for 30 minutes<br/>
                💪 <strong style={{ color: 'var(--text)' }}>6:00 AM</strong> — Exercise / movement<br/>
                ✍️ <strong style={{ color: 'var(--text)' }}>7:00 AM</strong> — Journal your goals (write in present tense)<br/>
                🎯 <strong style={{ color: 'var(--text)' }}>7:30 AM</strong> — Review your top 3 priorities for the day<br/>
                ⚡ <strong style={{ color: 'var(--text)' }}>8:00 AM</strong> — Start your most important task FIRST
              </div>
            </div>
            <div className="card" style={{ background: 'linear-gradient(135deg, #0a0a0a, #0f0a00)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 8 }}>HUSTLE RULE #1</div>
              <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic' }}>
                "Your calendar is the proof of your priorities. If it's not scheduled, it's not serious."
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>— THE HUSTLE CODE</div>
            </div>
            <div className="card">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.05em', color: 'var(--text)', marginBottom: 12 }}>LEGEND</div>
              {[['var(--gold)', 'Hustle tasks — income generating'], ['var(--blue)', 'Admin — operations & upkeep'], ['var(--green)', 'Personal — growth & balance']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
