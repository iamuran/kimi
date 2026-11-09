import { useState } from 'react';
import { Pencil, ShieldCheck, Share, ChevronRight } from 'lucide-react';
import QRCode from 'react-qr-code';
import type { Profile } from '../lib/profile';
import { DeerMark, KASPI, SubHeader, type Nav } from '../components/ui-bits';

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[10.5px] uppercase tracking-[0.08em] text-neutral-400">{label}</p>
      <p className={`text-[15px] text-neutral-900 truncate ${mono ? 'tabular-nums tracking-wide' : 'font-medium'}`}>{value}</p>
    </div>
  );
}

export function DigitalIdScreen({ nav, profile, notify }: { nav: Nav; profile: Profile; notify: (msg: string) => void }) {
  const [flipped, setFlipped] = useState(false);

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const qrPayload = JSON.stringify({ type: 'digital-id', name: fullName, doc: profile.docNumber, issued: profile.issued, expires: profile.expires });

  const share = async () => {
    const text = `Digital ID — ${fullName}\nDocument No: ${profile.docNumber}\nValid: ${profile.issued} – ${profile.expires}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Digital ID', text });
        return;
      }
      throw new Error('no share');
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        notify('ID details copied to clipboard');
      } catch {
        notify('Sharing is not available here');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <SubHeader
        title={
          <span className="flex items-center gap-2">
            <ShieldCheck size={20} strokeWidth={2} color={KASPI} />
            Digital ID
          </span>
        }
        right={
          <button onClick={() => nav.push({ name: 'editProfile' })} aria-label="Edit ID details" className="p-2 -my-2 active:opacity-50 transition-opacity">
            <Pencil size={20} strokeWidth={1.8} color={KASPI} />
          </button>
        }
        onBack={nav.pop}
      />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-8">
        {/* flip card */}
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Show front of ID card' : 'Show QR on back of ID card'}
          className="block w-full text-left [perspective:1200px] focus-visible:outline-none"
        >
          <div
            className="relative w-full aspect-[1.586] transition-transform duration-500 [transform-style:preserve-3d]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* front */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-neutral-100">
              <div className="h-[54px] px-4 flex items-center justify-between" style={{ background: KASPI }}>
                <span className="text-white text-[15px] font-bold tracking-[0.14em]">DIGITAL ID</span>
                <span className="flex items-center gap-1.5 ml-auto mr-2.5">
                  <ShieldCheck size={14} color="#fff" />
                  <span className="text-[11px] font-medium text-white">Verified</span>
                </span>
                <DeerMark size={24} />
              </div>
              <div className="flex gap-4 p-4">
                {/* photo */}
                <div className="w-[86px] h-[108px] rounded-xl bg-neutral-100 border border-neutral-200 grid place-items-center shrink-0 overflow-hidden">
                  <span className="text-[30px] font-bold" style={{ color: KASPI }}>
                    {profile.firstName[0]}{profile.lastName[0]}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 content-start flex-1 min-w-0">
                  <div className="col-span-2">
                    <Field label="Name" value={fullName} />
                  </div>
                  <Field label="Document No" value={profile.docNumber} mono />
                  <Field label="Date of birth" value={profile.dob} mono />
                  <Field label="Issued" value={profile.issued} mono />
                  <Field label="Expires" value={profile.expires} mono />
                </div>
              </div>
            </div>

            {/* back */}
            <div
              className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-neutral-100 flex flex-col items-center justify-center gap-2 p-4"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="bg-white p-2.5 rounded-xl border border-neutral-200">
                <QRCode value={qrPayload} size={132} fgColor="#1C1C1E" bgColor="#FFFFFF" />
              </div>
              <p className="text-[12.5px] text-neutral-400">Scan to verify identity</p>
              <p className="text-[11px] text-neutral-300 tabular-nums tracking-wider">ID-{profile.docNumber}</p>
            </div>
          </div>
        </button>

        <p className="text-center text-[12.5px] text-neutral-400 mt-2.5">Tap the card to {flipped ? 'see the front' : 'show your verification QR'}</p>

        {/* status + actions */}
        <div className="mt-5 bg-white rounded-2xl overflow-hidden border border-neutral-100">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-[14.5px] text-neutral-700 flex-1">Document is active and valid</p>
          </div>
          <button
            onClick={share}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-t border-neutral-100 text-left active:bg-neutral-50 transition-colors"
          >
            <Share size={19} strokeWidth={1.8} color={KASPI} />
            <span className="text-[16px] text-neutral-800 flex-1">Share ID details</span>
            <ChevronRight size={18} color="#C7C7CC" />
          </button>
          <button
            onClick={() => nav.push({ name: 'editProfile' })}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-t border-neutral-100 text-left active:bg-neutral-50 transition-colors"
          >
            <Pencil size={19} strokeWidth={1.8} color={KASPI} />
            <span className="text-[16px] text-neutral-800 flex-1">Edit name or document details</span>
            <ChevronRight size={18} color="#C7C7CC" />
          </button>
        </div>

        <p className="text-[12px] text-neutral-400 leading-relaxed mt-5 px-1">
          This is a demo digital identity card. Details are stored only in this browser and never leave your device.
        </p>
      </div>
    </div>
  );
}
