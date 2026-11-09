import { useState } from 'react';
import type { Profile } from '../lib/profile';
import { KASPI, SubHeader, type Nav } from '../components/ui-bits';

function Input({ label, value, onChange, numeric }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  numeric?: boolean;
}) {
  return (
    <label className="block px-4 py-3 bg-white border-b border-neutral-100">
      <span className="block text-[12px] text-neutral-400 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(numeric ? e.target.value.replace(/[^\d.]/g, '') : e.target.value)}
        className="w-full bg-transparent outline-none text-[16px] text-neutral-900"
      />
    </label>
  );
}

export function EditProfileScreen({ nav, profile, onSave }: {
  nav: Nav;
  profile: Profile;
  onSave: (p: Profile) => void;
}) {
  const [form, setForm] = useState<Profile>(profile);
  const set = (k: keyof Profile) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.firstName.trim() && form.lastName.trim() && form.docNumber.trim();

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      <SubHeader title="Edit ID details" onBack={nav.pop} />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <p className="px-4 pt-4 pb-2 text-[13px] text-neutral-400">These details appear on your Digital ID card.</p>
        <div className="bg-white border-t border-b border-neutral-100">
          <Input label="First name" value={form.firstName} onChange={set('firstName')} />
          <Input label="Last name" value={form.lastName} onChange={set('lastName')} />
          <Input label="Document number" value={form.docNumber} onChange={set('docNumber')} numeric />
          <Input label="Date of birth" value={form.dob} onChange={set('dob')} numeric />
          <Input label="Issued" value={form.issued} onChange={set('issued')} numeric />
          <Input label="Expires" value={form.expires} onChange={set('expires')} numeric />
        </div>
        <div className="px-4 mt-6">
          <button
            disabled={!valid}
            onClick={() => {
              onSave(form);
              nav.pop();
            }}
            className="w-full h-[52px] rounded-full text-white text-[17px] font-semibold active:opacity-80 transition-all disabled:opacity-30"
            style={{ background: KASPI }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
