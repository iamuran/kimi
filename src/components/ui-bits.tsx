import type { ReactNode } from 'react';
import { ChevronLeft, House, QrCode, MessageSquare, Rows3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import deerUrl from '../assets/deer.png';

export const KASPI = '#F14635';

/** Deer brand mark (generated icon). */
export function DeerMark({ size = 28 }: { size?: number }) {
  return (
    <img
      src={deerUrl}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className="rounded-[27%] inline-block"
      draggable={false}
    />
  );
}

/** Plain red hairline icon, like the category rows in the reference UI. */
export function RedIcon({ icon: Icon, box = 44 }: { icon: LucideIcon; box?: number }) {
  return (
    <span className="grid place-items-center shrink-0" style={{ width: box, height: box }}>
      <Icon size={box * 0.62} strokeWidth={1.5} color={KASPI} />
    </span>
  );
}

export type SubScreen =
  | { name: 'category'; categoryId: string }
  | { name: 'provider'; categoryId: string; provider: string }
  | { name: 'digitalId' }
  | { name: 'editProfile' }
  | { name: 'message'; messageId: number };

export type TabId = 'main' | 'qr' | 'messages' | 'services';

export interface Nav {
  tab: TabId;
  stack: SubScreen[];
  goTab: (t: TabId) => void;
  push: (s: SubScreen) => void;
  pop: () => void;
}

/** iOS-style centred title header with a red back chevron. */
export function SubHeader({ title, right, onBack }: { title: ReactNode; right?: ReactNode; onBack: () => void }) {
  return (
    <header className="relative flex items-center h-12 px-3 bg-white shrink-0">
      <button
        onClick={onBack}
        aria-label="Back"
        className="absolute left-1 p-2 -my-2 rounded-md active:opacity-50 transition-opacity"
      >
        <ChevronLeft size={26} strokeWidth={2.4} color={KASPI} />
      </button>
      <div className="mx-auto flex items-center gap-2 font-semibold text-[17px] text-neutral-900">{title}</div>
      <div className="absolute right-2">{right}</div>
    </header>
  );
}

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'main', label: 'Main', icon: House },
  { id: 'qr', label: 'QR Pay', icon: QrCode },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'services', label: 'Services', icon: Rows3 },
];

export function TabBar({ nav }: { nav: Nav }) {
  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-neutral-200 pb-[max(env(safe-area-inset-bottom),16px)] pt-1.5">
      <div className="grid grid-cols-4">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = nav.tab === id && nav.stack.length === 0;
          return (
            <button
              key={id}
              onClick={() => nav.goTab(id)}
              aria-current={active ? 'page' : undefined}
              className="flex flex-col items-center gap-0.5 py-1 min-h-[44px] justify-center active:opacity-60 transition-opacity"
            >
              <Icon size={25} strokeWidth={active ? 2.2 : 1.7} color={active ? KASPI : '#9CA3AF'} />
              <span className={`text-[10.5px] leading-none ${active ? 'font-semibold' : 'font-normal'}`} style={{ color: active ? KASPI : '#9CA3AF' }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Segmented control — red outline, active segment filled red. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mx-4 rounded-lg border-[1.5px] flex overflow-hidden" style={{ borderColor: KASPI }}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 h-11 text-[15px] tracking-wide transition-colors duration-200 ${
              active ? 'text-white font-medium' : 'font-normal'
            }`}
            style={{ background: active ? KASPI : '#fff', color: active ? '#fff' : KASPI }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Fake iOS status bar clock that shows real time. */
export function StatusBar() {
  const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M\.?/i, '');
  return (
    <div className="relative flex items-center justify-between px-7 pt-3.5 pb-1 bg-white shrink-0 z-20">
      <span className="text-[15px] font-semibold text-neutral-900 w-14">{time}</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[110px] h-[30px] bg-black rounded-full" />
      <div className="flex items-center gap-1.5 text-neutral-900">
        {/* signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
          {[3, 6, 9, 12].map((h, i) => (
            <rect key={i} x={i * 4.5} y={12 - h} width="3" height={h} rx="0.8" fill="currentColor" />
          ))}
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <path d="M1.5 4.2a10.4 10.4 0 0 1 14 0M4 6.9a6.8 6.8 0 0 1 9 0M6.6 9.4a3.2 3.2 0 0 1 3.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8.5" cy="10.8" r="1.2" fill="currentColor" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" fill="none" opacity="0.4" />
          <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
          <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
