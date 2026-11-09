import { useCallback, useEffect, useRef, useState } from 'react';
import { loadProfile, saveProfile, type Profile } from './lib/profile';
import { seedHistory, type HistoryEntry } from './data';
import { StatusBar, TabBar, type Nav, type SubScreen, type TabId } from './components/ui-bits';
import { MainScreen } from './screens/MainScreen';
import { BillPaymentsScreen } from './screens/BillPaymentsScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { DigitalIdScreen } from './screens/DigitalIdScreen';
import { EditProfileScreen } from './screens/EditProfileScreen';
import { QrScreen } from './screens/QrScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { PaymentSheet } from './screens/PaymentSheet';
import { categories } from './data';
import './App.css';

export default function App() {
  const [tab, setTab] = useState<TabId>('services'); // start on the screen from the reference
  const [stack, setStack] = useState<SubScreen[]>([]);
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [history, setHistory] = useState<HistoryEntry[]>(seedHistory);
  const [toast, setToast] = useState<string | null>(null);
  const [pay, setPay] = useState<{ categoryId: string; provider: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const nav: Nav = {
    tab,
    stack,
    goTab: (t) => {
      setTab(t);
      setStack([]);
    },
    push: (s) => setStack((st) => [...st, s]),
    pop: () => setStack((st) => st.slice(0, -1)),
  };

  // Android-style back gesture support for the in-app back affordance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stack.length > 0) setStack((st) => st.slice(0, -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stack.length]);

  const top = stack[stack.length - 1];

  const screenKey = `${tab}:${stack.map((s) => s.name).join('/')}`;

  return (
    <div className="min-h-100dvh w-full grid place-items-center bg-[#E9E9EE] md:py-8">
      {/* phone frame */}
      <div className="phone relative w-full h-100dvh md:w-[400px] md:h-[844px] md:rounded-[54px] md:border-[11px] md:border-black bg-white overflow-hidden md:shadow-[0_30px_80px_rgba(0,0,0,0.35)] flex flex-col">
        <StatusBar />

        <main className="relative flex-1 min-h-0 flex flex-col">
          <div key={screenKey} className="flex-1 min-h-0 flex flex-col animate-screen">
            {tab === 'main' && (top?.name === 'digitalId' ? (
              <DigitalIdScreen nav={nav} profile={profile} notify={notify} />
            ) : top?.name === 'editProfile' ? (
              <EditProfileScreen nav={nav} profile={profile} onSave={(p) => { setProfile(p); saveProfile(p); notify('ID details saved'); }} />
            ) : (
              <MainScreen nav={nav} profile={profile} />
            ))}

            {tab === 'services' && (top?.name === 'category' || top?.name === 'provider' ? (
              <CategoryScreen nav={nav} categoryId={top.categoryId} onSelectProvider={(provider) => setPay({ categoryId: top.categoryId, provider })} />
            ) : (
              <BillPaymentsScreen nav={nav} history={history} />
            ))}

            {tab === 'qr' && <QrScreen profile={profile} />}

            {tab === 'messages' && <MessagesScreen nav={nav} openId={top?.name === 'message' ? top.messageId : null} />}
          </div>
        </main>

        <TabBar nav={nav} />

        {pay && (
          <PaymentSheet
            provider={pay.provider}
            categoryLabel={categories.find((c) => c.id === pay.categoryId)?.label ?? ''}
            onClose={() => setPay(null)}
            onDone={(amount) => {
              setHistory((h) => [{ provider: pay.provider, category: categories.find((c) => c.id === pay.categoryId)?.label ?? '', amount, id: Date.now(), date: new Date().toLocaleDateString('ru-RU') }, ...h]);
              notify(`Paid ${amount} ₸ to ${pay.provider}`);
              setPay(null);
            }}
          />
        )}

        {/* toast */}
        {toast && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-24 z-50 px-5 py-2.5 rounded-full bg-neutral-900/90 text-white text-[13.5px] whitespace-nowrap animate-pop">
            {toast}
          </div>
        )}

        {/* home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-neutral-900/80 z-40 pointer-events-none" />
      </div>
    </div>
  );
}
