import { ChevronRight } from 'lucide-react';
import { categories } from '../data';
import { KASPI, RedIcon, SubHeader, type Nav } from '../components/ui-bits';

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

export function CategoryScreen({ nav, categoryId, onSelectProvider }: {
  nav: Nav;
  categoryId: string;
  onSelectProvider: (provider: string) => void;
}) {
  const cat = categories.find((c) => c.id === categoryId)!;

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <SubHeader
        title={
          <span className="flex items-center gap-2">
            <RedIcon icon={cat.icon} box={30} />
            {cat.label}
          </span>
        }
        onBack={nav.pop}
      />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <p className="px-5 pt-4 pb-2 text-[13px] text-neutral-400 uppercase tracking-wide">Select a provider</p>
        <div className="bg-white rounded-2xl overflow-hidden">
          {cat.providers.map((p, i) => (
            <button
              key={p}
              onClick={() => onSelectProvider(p)}
              className={`w-full flex items-center gap-4 px-5 h-[64px] text-left active:bg-neutral-50 transition-colors ${
                i > 0 ? 'border-t border-neutral-100' : ''
              }`}
            >
              <span className="w-11 h-11 rounded-full grid place-items-center text-[14px] font-semibold text-white shrink-0" style={{ background: KASPI }}>
                {initials(p)}
              </span>
              <span className="flex-1 text-[17px] text-neutral-800">{p}</span>
              <ChevronRight size={20} strokeWidth={2} color="#C7C7CC" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
