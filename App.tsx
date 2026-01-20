
import React, { useState, useEffect, useCallback } from 'react';
import { fetchMyIPInfo } from './services/ipService';
import { saveRecord, getRecords, clearRecords } from './services/db';
import { AccessRecord, IPInfoResponse } from './types';

const IMGS = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
];

const App: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(true);
  const [cur, setCur] = useState<IPInfoResponse | null>(null);
  const [logs, setLogs] = useState<AccessRecord[]>([]);
  const [idx, setIdx] = useState(0);

  const track = useCallback(async () => {
    setLoading(true);
    const info = await fetchMyIPInfo();
    setCur(info);
    saveRecord({ id: crypto.randomUUID(), ip: info.ip, country: info.country, city: info.city, isp: info.org, timestamp: new Date().toISOString() });
    setLogs(getRecords());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (auth) track();
    const t = setInterval(() => setIdx(i => (i + 1) % IMGS.length), 4000);
    return () => clearInterval(t);
  }, [auth, track]);

  if (!auth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <form onSubmit={e => { e.preventDefault(); if(pass === "admin") setAuth(true); }} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border text-center">
        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4"><i className="fa-solid fa-shield"></i></div>
        <h2 className="text-xl font-bold mb-2">IP-Track Login</h2>
        <input type="password" placeholder="Pass: admin" className="w-full p-2 border rounded mb-4 outline-none focus:ring-1 ring-indigo-500" onChange={e => setPass(e.target.value)} />
        <button className="w-full bg-indigo-600 text-white py-2 rounded font-medium hover:bg-indigo-700">Enter</button>
      </form>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 font-sans pb-12">
      <header className="flex justify-between items-center py-2 border-b">
        <h1 className="font-bold flex items-center gap-2"><i className="fa-solid fa-broadcast-tower text-indigo-600"></i> Dashboard</h1>
        <div className="flex gap-2 text-xs">
          <button onClick={track} disabled={loading} className="bg-indigo-600 text-white px-3 py-1.5 rounded disabled:opacity-50 italic">
            {loading ? 'Tracking...' : 'Refresh'}
          </button>
          <button onClick={() => setAuth(false)} className="bg-slate-200 px-3 py-1.5 rounded">Logout</button>
        </div>
      </header>

      <div className="relative h-32 rounded-xl overflow-hidden bg-slate-200">
        <img src={IMGS[idx]} className="w-full h-full object-cover transition-all duration-700" alt="banner" />
        <div className="absolute inset-0 bg-black/40 flex items-center px-6"><p className="text-white font-bold italic">Network Guard Active</p></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: 'IP', v: cur?.ip, c: 'text-blue-600' },
          { l: 'City', v: cur?.city, c: 'text-emerald-600' },
          { l: 'ISP', v: cur?.org, c: 'text-orange-600' },
          { l: 'Logs', v: logs.length, c: 'text-purple-600' }
        ].map(s => (
          <div key={s.l} className="bg-white p-3 border rounded-lg shadow-sm">
            <p className="text-[10px] uppercase font-bold text-slate-400">{s.l}</p>
            <p className={`text-sm font-bold truncate ${s.c}`}>{s.v || '...'}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-3 bg-slate-50 border-b flex justify-between text-xs font-bold uppercase text-slate-500">
          <span>Recent Access Logs</span>
          <button onClick={() => { clearRecords(); setLogs([]); }} className="text-red-400 hover:text-red-600">Flush</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y">
              {logs.map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-indigo-500">{r.ip}</td>
                  <td className="p-3">{r.city}, {r.country}</td>
                  <td className="p-3 text-slate-400 italic hidden sm:table-cell">{r.isp}</td>
                  <td className="p-3 text-right text-slate-400">{new Date(r.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="pt-40 text-center text-slate-400">
        <div className="text-xs font-medium uppercase tracking-widest mb-1">Developed By</div>
        <div className="text-indigo-600 font-bold text-lg">Muhammad Rashid</div>
        <div className="text-xs text-slate-500 font-semibold mt-1">MNS Agriculture University Multan</div>
      </footer>
    </div>
  );
};

export default App;
