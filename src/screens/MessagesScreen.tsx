import { ChevronRight } from 'lucide-react';
import { messages } from '../data';
import { KASPI, SubHeader, type Nav } from '../components/ui-bits';

export function MessagesScreen({ nav, openId }: { nav: Nav; openId: number | null }) {
  const open = openId != null ? messages.find((m) => m.id === openId) : null;

  if (open) {
    return (
      <div className="flex flex-col h-full bg-[#F5F5F5]">
        <SubHeader title={open.title} onBack={nav.pop} />
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <div className="bg-white rounded-2xl border border-neutral-100 p-4">
            <p className="text-[12.5px] text-neutral-400 mb-2">{open.time}</p>
            <p className="text-[16px] text-neutral-800 leading-relaxed">{open.body}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <header className="flex items-center justify-center h-12 bg-white shrink-0">
        <span className="font-semibold text-[17px] text-neutral-900">Messages</span>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          {messages.map((m, i) => (
            <button
              key={m.id}
              onClick={() => nav.push({ name: 'message', messageId: m.id })}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-neutral-50 transition-colors ${
                i > 0 ? 'border-t border-neutral-100' : ''
              }`}
            >
              <span className="w-11 h-11 rounded-full grid place-items-center shrink-0" style={{ background: 'rgba(241,70,53,0.09)' }}>
                <m.icon size={21} strokeWidth={1.7} color={KASPI} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-[15.5px] font-semibold text-neutral-900 truncate">{m.title}</span>
                  <span className="text-[12px] text-neutral-400 shrink-0">{m.time}</span>
                </span>
                <span className="block text-[13.5px] text-neutral-400 truncate mt-0.5">{m.body}</span>
              </span>
              <ChevronRight size={17} color="#C7C7CC" className="shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
