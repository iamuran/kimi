import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { formatMoney } from '../data';
import { KASPI } from '../components/ui-bits';

export function PaymentSheet({ provider, categoryLabel, onClose, onDone }: {
  provider: string;
  categoryLabel: string;
  onClose: () => void;
  onDone: (amount: string) => void;
}) {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const valid = amount.replace(/\D/g, '').length > 0;

  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-label={`Pay ${provider}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !success) onClose();
      }}
    >
      <div className="w-full bg-white rounded-t-3xl p-5 pb-6 animate-sheet max-h-full overflow-y-auto no-scrollbar">
        {!success ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[18px] font-semibold text-neutral-900">Payment</h2>
              <button onClick={onClose} aria-label="Close" className="p-1 -m-1 active:opacity-50">
                <X size={22} color="#8E8E93" />
              </button>
            </div>
            <p className="text-[14px] text-neutral-400 mb-5">
              {provider} · {categoryLabel}
            </p>
            <label className="flex items-baseline gap-2 h-14 px-4 rounded-xl bg-neutral-50 border border-neutral-200 focus-within:border-[#F14635] transition-colors">
              <input
                autoFocus
                inputMode="numeric"
                value={amount ? formatMoney(amount) : ''}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, '').slice(0, 9))}
                placeholder="0"
                className="flex-1 bg-transparent outline-none text-[30px] font-semibold text-neutral-900 placeholder:text-neutral-300 tabular-nums min-w-0"
              />
              <span className="text-[20px] text-neutral-400 font-medium">₸</span>
            </label>
            <div className="flex gap-2 mt-4">
              {['1 000', '2 000', '5 000', '10 000'].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v.replace(/\s/g, ''))}
                  className="flex-1 h-10 rounded-full bg-neutral-100 text-[14px] font-medium text-neutral-700 active:bg-neutral-200 transition-colors"
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              disabled={!valid}
              onClick={() => setSuccess(true)}
              className="w-full h-[52px] mt-4 rounded-full text-white text-[17px] font-semibold active:opacity-80 transition-all disabled:opacity-30"
              style={{ background: KASPI }}
            >
              Pay {amount ? `${formatMoney(amount)} ₸` : ''}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-8 animate-pop">
            <CheckCircle2 size={72} strokeWidth={1.4} color={KASPI} />
            <h2 className="text-[20px] font-semibold text-neutral-900 mt-4">Payment successful</h2>
            <p className="text-[15px] text-neutral-400 mt-1">{formatMoney(amount)} ₸ · {provider}</p>
            <button
              onClick={() => onDone(formatMoney(amount))}
              className="w-full h-[52px] mt-8 rounded-full text-white text-[17px] font-semibold active:opacity-80"
              style={{ background: KASPI }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
