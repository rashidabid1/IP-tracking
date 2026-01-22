import { IPInfoResponse } from '../types';

export async function fetchMyIPInfo(): Promise<IPInfoResponse> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return {
      ip: data.ip || '',
      country: data.country_name || data.country || '',
      city: data.city || '',
      org: data.org || ''
    };
  } catch (e) {
    return { ip: '', country: '', city: '', org: '' };
  }
}
