import { useMemo, useState } from 'react';
import { Search, ChevronRight, MapPin } from 'lucide-react';
import { categories, frequentPayees, type HistoryEntry } from '../data';
import { DeerMark, KASPI, RedIcon, Segmented, type Nav } from '../components/ui-bits';

type Seg = 'ALL' | 'FREQUENT' | 'HISTORY';

export function BillPaymentsScreen({ nav, history }: { nav: Nav; history: HistoryEntry[] }) {
  const [seg, setSeg] = useState<Seg>('ALL');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      {/* header */}
      <header className="relative flex items-center h-12 px-3 bg-white shrink-0">
        <button onClick={() => nav.goTab('main')} aria-label="Back to Main" className="p-2 -my-2 -ml-1 active:opacity-50 transition-opacity">
          <svg width="13" height="22" viewBox="0 0 13 22" aria-hidden="true">
            <path d="M11 2 2.5 10.4a1.2 1.2 0 0 0 0 1.7L11 20.5" fill="none" stroke={KASPI} strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <div className="mx-auto flex items-center gap-2">
          <DeerMark size={26} />
          <span className="font-semibold text-[17px] text-neutral-900">Bill Payments</span>
        </div>
        <button
          onClick={() => alert('Nearest payment points:\n\nDostyk Plaza, 3rd floor kiosk\nMega Alma-Ata, information desk\nAbay Ave 143, partner terminal')}
          aria-label="Payment points nearby"
          className="p-2 -my-2 -mr-1 active:opacity-50 transition-opacity"
        >
          <MapPin size={26} strokeWidth={1.6} color={KASPI} />
        </button>
      </header>

      <div className="pt-3 pb-1.5 space-y-3 bg-white shadow-[0_1px_0_#E5E5EA]">
        <Segmented options={['ALL', 'FREQUENT', 'HISTORY'] as const} value={seg} onChange={setSeg} />
        {/* search */}
        <label className="mx-4 mb-2 flex items-center gap-2.5 h-12 px-3.5 bg-white rounded-lg border border-[#E5E5EA] focus-within:border-[#F14635] transition-colors">
          <Search size={20} strokeWidth={2.2} color={KASPI} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to pay?"
            className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-neutral-400 text-neutral-900 min-w-0"
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {seg === 'ALL' && (
          <div className="mt-3 mb-6 bg-white rounded-2xl mx-0 overflow-hidden">
            {filtered.length === 0 ? (
              <p className="text-center text-neutral-400 text-[14px] py-10">No categories found for “{query}”</p>
            ) : (
              filtered.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => nav.push({ name: 'category', categoryId: c.id })}
                  className={`w-full flex items-center gap-4 px-5 h-[68px] text-left active:bg-neutral-50 transition-colors ${
                    i > 0 ? 'border-t border-neutral-100' : ''
                  }`}
                >
                  <RedIcon icon={c.icon} />
                  <span className="flex-1 text-[17px] text-neutral-800">{c.label}</span>
                  <ChevronRight size={20} strokeWidth={2} color="#C7C7CC" />
                </button>
              ))
            )}
          </div>
        )}

        {seg === 'FREQUENT' && (
          <div className="mt-3 mb-6 bg-white rounded-2xl overflow-hidden">
            {frequentPayees.map((f, i) => {
              const cat = categories.find((c) => c.label === f.category)!;
              return (
                <button
                  key={f.provider}
                  onClick={() => nav.push({ name: 'provider', categoryId: cat.id, provider: f.provider })}
                  className={`w-full flex items-center gap-4 px-5 h-[68px] text-left active:bg-neutral-50 transition-colors ${
                    i > 0 ? 'border-t border-neutral-100' : ''
                  }`}
                >
                  <RedIcon icon={f.icon} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[17px] text-neutral-800 truncate">{f.provider}</span>
                    <span className="block text-[13px] text-neutral-400">{f.category}</span>
                  </span>
                  <ChevronRight size={20} strokeWidth={2} color="#C7C7CC" />
                </button>
              );
            })}
          </div>
        )}

        {seg === 'HISTORY' && (
          <div className="mt-3 mb-6 bg-white rounded-2xl overflow-hidden">
            {history.length === 0 ? (
              <p className="text-center text-neutral-400 text-[14px] py-10">No payments yet — pay your first bill</p>
            ) : (
              history.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => {
                    const cat = categories.find((c) => c.label === h.category);
                    if (cat) nav.push({ name: 'provider', categoryId: cat.id, provider: h.provider });
                  }}
                  className={`w-full flex items-center gap-4 px-5 h-[68px] text-left active:bg-neutral-50 transition-colors ${
                    i > 0 ? 'border-t border-neutral-100' : ''
                  }`}
                >
                  <span className="w-11 h-11 rounded-full grid place-items-center bg-neutral-100 text-[13px] font-semibold text-neutral-500 shrink-0">
                    {h.provider.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[16px] text-neutral-800 truncate">{h.provider}</span>
                    <span className="block text-[13px] text-neutral-400">{h.date} · {h.category}</span>
                  </span>
                  <span className="text-[15px] font-medium text-neutral-700 tabular-nums">−{h.amount} ₸</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
