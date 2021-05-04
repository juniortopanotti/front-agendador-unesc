export interface Hydrometers {
  id: number;
  document: string;
  addres: string;
  lat: number;
  long: number;
  ccid: string;
  user_id?: string;
}

export interface HydrometersList {
  rows: Hydrometers[];
  count: number;
}
