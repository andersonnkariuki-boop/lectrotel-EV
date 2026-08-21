export interface Station {
  charging_station_id: number;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  total_pillars?: number;
  available_pillars?: number;
  address?: string;
  city?: string;
}

export interface StationResponse {
  items: Station[];
  total?: number;
}

export interface StationPillars {
  charging_station_id: number;
  name: string;
  pillars?: Pillar[];
}

import { Pillar } from "./pillar.model";
