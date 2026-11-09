export interface Profile {
  firstName: string;
  lastName: string;
  docNumber: string;
  dob: string;
  issued: string;
  expires: string;
}

export const defaultProfile: Profile = {
  firstName: 'Aigerim',
  lastName: 'Bekova',
  docNumber: '042517386',
  dob: '14.03.1995',
  issued: '22.06.2021',
  expires: '22.06.2031',
};

const KEY = 'didw-profile-v1';

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultProfile;
}

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}
