
export interface AccessRecord {
  id: string;
  ip: string;
  country: string;
  city: string;
  isp: string;
  timestamp: string;
}

export interface IPInfoResponse {
  ip: string;
  country: string;
  city: string;
  org: string; // Used as ISP
}
