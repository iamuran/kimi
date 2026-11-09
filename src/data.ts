import {
  Smartphone,
  Landmark,
  BusFront,
  Tv,
  BookOpen,
  Scale,
  Flower2,
  Coins,
  Wifi,
  GraduationCap,
  HeartPulse,
  Banknote,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  providers: string[];
}

export const categories: Category[] = [
  { id: 'mobile', label: 'Mobile Phones', icon: Smartphone, providers: ['Beeline KZ', 'Tele2 Kazakhstan', 'Kcell', 'Altel', 'Activ'] },
  { id: 'utility', label: 'Utility Bills', icon: Landmark, providers: ['AlmatyEnergoSbyt', 'Kazakhtelecom', 'Almaty Su', 'AlmaGaz', 'Astana ZhilkomService'] },
  { id: 'transport', label: 'Transport', icon: BusFront, providers: ['Onay Travel Card', 'Astana LRT', 'Camellia Parking', 'CityBus Shymkent'] },
  { id: 'internet', label: 'Internet and TV', icon: Tv, providers: ['Kazakhtelecom TV', '2Day Telecom', 'ICON', 'AlmaTV'] },
  { id: 'education', label: 'Education', icon: BookOpen, providers: ['KazNU Tuition', 'Narxoz University', 'Bilim School', 'IU International'] },
  { id: 'taxes', label: 'Taxes', icon: Scale, providers: ['KGD Tax Payments', 'State Duty', 'Vehicle Tax', 'Land Tax'] },
  { id: 'beauty', label: 'Beauty and health', icon: Flower2, providers: ['Beauty Loft', 'Vitaminka Pharmacy', 'CityCare Clinic', 'Smile Dental'] },
  { id: 'finance', label: 'Financial services', icon: Coins, providers: ['Halyk Bank Loan', 'Kaspi Gold Repayment', 'Forte Credit', 'Eurasia Insurance'] },
];

export interface HistoryEntry {
  id: number;
  provider: string;
  category: string;
  amount: string;
  date: string;
}

export const seedHistory: HistoryEntry[] = [
  { id: 1, provider: 'Beeline KZ', category: 'Mobile Phones', amount: '4 990', date: '02.11.2026' },
  { id: 2, provider: 'AlmatyEnergoSbyt', category: 'Utility Bills', amount: '12 430', date: '28.10.2026' },
  { id: 3, provider: 'Onay Travel Card', category: 'Transport', amount: '6 000', date: '21.10.2026' },
];

export interface FrequentPayee {
  provider: string;
  category: string;
  icon: LucideIcon;
}

export const frequentPayees: FrequentPayee[] = [
  { provider: 'Beeline KZ', category: 'Mobile Phones', icon: Smartphone },
  { provider: 'AlmatyEnergoSbyt', category: 'Utility Bills', icon: Landmark },
  { provider: 'Onay Travel Card', category: 'Transport', icon: BusFront },
  { provider: 'Kazakhtelecom TV', category: 'Internet and TV', icon: Tv },
];

export interface Message {
  id: number;
  title: string;
  body: string;
  time: string;
  icon: LucideIcon;
}

export const messages: Message[] = [
  { id: 1, title: 'Bill Payments', body: 'Your payment of 4 990 to Beeline KZ was successful. Thank you for using our services.', time: '09:12', icon: Smartphone },
  { id: 2, title: 'Digital ID', body: 'Your Digital ID has been verified. You can now use it to confirm your identity at partner service points.', time: 'Yesterday', icon: GraduationCap },
  { id: 3, title: 'Utilities reminder', body: 'A new invoice from AlmatyEnergoSbyt is available. Pay before 15 November to avoid late fees.', time: 'Yesterday', icon: Wifi },
  { id: 4, title: 'Security', body: 'A new device signed in to your account. If this was not you, contact support immediately.', time: '05.11.2026', icon: HeartPulse },
  { id: 5, title: 'Cashback', body: 'You received 1 250 cashback for paying utility bills in October. The amount is credited to your bonus account.', time: '01.11.2026', icon: Banknote },
];

export const formatMoney = (v: string) => v.replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
