import { Bell, Receipt, ArrowLeftRight, QrCode, IdCard, ChevronRight } from 'lucide-react';
import type { Profile } from '../lib/profile';
import { DeerMark, KASPI, type Nav } from '../components/ui-bits';

const actions = [
  { label: 'Payments', icon: Receipt, tab: 'services' as const },
  { label: 'Transfers', icon: ArrowLeftRight, tab: 'services' as const },
  { label: 'QR Pay', icon: QrCode, tab: 'qr' as const },
  { label: 'Digital ID', icon: IdCard, screen: 'digitalId' as const, highlight: true },
];

export function MainScreen({ nav, profile }: { nav: Nav; profile: Profile }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] overflow-y-auto no-scrollbar">
      {/* header */}
      <header className="flex items-center justify-between px-4 pt-1 pb-3 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => nav.push({ name: 'digitalId' })}
            aria-label="Open Digital ID"
            className="w-11 h-11 rounded-full grid place-items-center text-white text-[16px] font-bold active:opacity-80 transition-opacity"
            style={{ background: KASPI }}
          >
            {profile.firstName[0]}{profile.lastName[0]}
          </button>
          <div>
            <p className="text-[12.5px] text-neutral-400 leading-tight">{greeting},</p>
            <p className="text-[16px] font-semibold text-neutral-900 leading-tight">{profile.firstName} {profile.lastName}</p>
          </div>
        </div>
        <button
          onClick={() => nav.goTab('messages')}
          aria-label="Notifications"
          className="relative p-2 active:opacity-50 transition-opacity"
        >
          <Bell size={23} strokeWidth={1.8} color="#3A3A3C" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: KASPI }} />
        </button>
      </header>

      {/* balance card */}
      <div className="px-4 pt-1">
        <div className="relative overflow-hidden rounded-2xl p-5 text-white shadow-[0_10px_30px_rgba(241,70,53,0.35)]" style={{ background: `linear-gradient(135deg, ${KASPI} 0%, #C9331F 100%)` }}>
          <div className="absolute -right-8 -top-10 opacity-15">
            <DeerMark size={150} />
          </div>
          <p className="text-[13px] text-white/75">Kaspi Gold · balance</p>
          <p className="text-[32px] font-bold tracking-tight mt-0.5 tabular-nums">1 250 430 <span className="text-[20px] font-medium">₸</span></p>
          <p className="text-[13px] text-white/70 mt-3 tabular-nums tracking-widest">•••• 4821</p>
        </div>
      </div>

      {/* quick actions */}
      <div className="grid grid-cols-4 gap-2 px-4 mt-4">
        {actions.map(({ label, icon: Icon, tab, screen, highlight }) => (
          <button
            key={label}
            onClick={() => (screen ? nav.push({ name: screen }) : nav.goTab(tab!))}
            className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-white border border-neutral-100 active:bg-neutral-50 transition-colors"
          >
            <span
              className="w-12 h-12 rounded-2xl grid place-items-center"
              style={{ background: highlight ? KASPI : 'rgba(241,70,53,0.09)' }}
            >
              <Icon size={24} strokeWidth={1.7} color={highlight ? '#fff' : KASPI} />
            </span>
            <span className={`text-[11.5px] ${highlight ? 'font-semibold' : 'text-neutral-600'}`} style={highlight ? { color: KASPI } : undefined}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Digital ID banner */}
      <button
        onClick={() => nav.push({ name: 'digitalId' })}
        className="mx-4 mt-4 flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-neutral-100 text-left active:bg-neutral-50 transition-colors"
      >
        <span className="w-12 h-12 rounded-2xl grid place-items-center shrink-0" style={{ background: 'rgba(241,70,53,0.09)' }}>
          <IdCard size={26} strokeWidth={1.6} color={KASPI} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[15.5px] font-semibold text-neutral-900">Your Digital ID</span>
          <span className="block text-[13px] text-neutral-400 mt-0.5">Show the QR code to verify your identity</span>
        </span>
        <ChevronRight size={19} color="#C7C7CC" />
      </button>

      <p className="text-center text-[11.5px] text-neutral-300 mt-6 pb-4">Demo app — data stays in this browser</p>
    </div>
  );
}
