import { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import type { Profile } from '../lib/profile';
import { DeerMark, KASPI, Segmented } from '../components/ui-bits';

type Mode = 'MY QR' | 'SCAN';

export function QrScreen({ profile }: { profile: Profile }) {
  const [mode, setMode] = useState<Mode>('MY QR');
  const [camState, setCamState] = useState<'idle' | 'on' | 'denied'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      setCamState('on');
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setCamState('denied');
    }
  };

  const payload = `kaspi://pay/${profile.firstName.toLowerCase()}${profile.lastName.toLowerCase()}?src=qr`;

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <header className="flex items-center justify-center h-12 bg-white shrink-0">
        <span className="font-semibold text-[17px] text-neutral-900">QR Pay</span>
      </header>
      <div className="pt-3 bg-white shadow-[0_1px_0_#E5E5EA] pb-3">
        <Segmented options={['MY QR', 'SCAN'] as const} value={mode} onChange={setMode} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        {mode === 'MY QR' ? (
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center border border-neutral-100">
            <DeerMark size={44} />
            <p className="text-[15px] text-neutral-400 mt-2">{profile.firstName} {profile.lastName}</p>
            <div className="p-3 rounded-2xl border border-neutral-200 mt-4 bg-white">
              <QRCode value={payload} size={200} fgColor="#1C1C1E" bgColor="#FFFFFF" />
            </div>
            <p className="text-[13px] text-neutral-400 mt-4 text-center">Show this code to receive payments<br />or confirm your identity</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 flex flex-col items-center">
            <div className="relative w-[240px] h-[240px] rounded-3xl overflow-hidden bg-neutral-900">
              {camState === 'on' ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover hidden" />
                  <QrPlaceholder />
                </div>
              )}
              {/* viewfinder corners */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 240" aria-hidden="true">
                {[
                  'M20 44 V28 a8 8 0 0 1 8-8 H44',
                  'M196 20 H212 a8 8 0 0 1 8 8 V44',
                  'M220 196 V212 a8 8 0 0 1 -8 8 H196',
                  'M44 220 H28 a8 8 0 0 1 -8-8 V196',
                ].map((d) => (
                  <path key={d} d={d} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                ))}
              </svg>
            </div>

            {camState === 'denied' ? (
              <p className="text-[14px] text-neutral-500 text-center mt-5 leading-relaxed">
                Camera access was denied.<br />Allow camera permission in your browser settings to scan codes.
              </p>
            ) : camState === 'idle' ? (
              <p className="text-[14px] text-neutral-400 text-center mt-5 leading-relaxed">
                Point the camera at a Kaspi QR code.<br />Camera works on a phone with permission.
              </p>
            ) : (
              <p className="text-[14px] text-neutral-500 text-center mt-5">Scanning… align the code inside the frame</p>
            )}

            {camState !== 'on' && (
              <button
                onClick={startCamera}
                className="mt-5 h-12 px-8 rounded-full text-white text-[16px] font-semibold active:opacity-80 transition-opacity"
                style={{ background: KASPI }}
              >
                Enable camera
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function QrPlaceholder() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="30" height="30" rx="4" stroke="#555" strokeWidth="4" />
      <rect x="58" y="2" width="30" height="30" rx="4" stroke="#555" strokeWidth="4" />
      <rect x="2" y="58" width="30" height="30" rx="4" stroke="#555" strokeWidth="4" />
      <rect x="42" y="42" width="10" height="10" fill="#F14635" />
      <rect x="56" y="44" width="8" height="8" fill="#555" />
      <rect x="42" y="58" width="8" height="8" fill="#555" />
      <rect x="58" y="60" width="10" height="10" fill="#555" />
      <rect x="72" y="44" width="8" height="8" fill="#555" />
      <rect x="44" y="74" width="8" height="8" fill="#555" />
    </svg>
  );
}
