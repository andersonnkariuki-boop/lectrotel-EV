export interface Pillar {
  charging_pillar_id: number;
  charging_station_id?: number;
  model?: string;
  energy_reading?: number;
  is_charging?: number | boolean;
  is_suspended?: number | boolean;
  is_deactivated?: number | boolean;
  relay_status?: number | boolean;
  location?: string;
  station_name?: string;
  owner_name?: string;
}

export interface PillarStatus {
  label: 'ACTIVE' | 'AVAILABLE' | 'FAULT' | 'SUSPENDED' | 'OFFLINE';
  color: 'green' | 'blue' | 'red' | 'yellow' | 'orange';
}

export function getPillarStatus(pillar: Pillar): PillarStatus {
  const isCharging = pillar.is_charging == 1 || pillar.is_charging === true;
  const relayOn = pillar.relay_status == 1 || pillar.relay_status === true;
  const isSuspended = pillar.is_suspended == 1 || pillar.is_suspended === true;
  const isDeactivated = pillar.is_deactivated == 1 || pillar.is_deactivated === true;

  if (isDeactivated) {
    return { label: 'OFFLINE', color: 'red' };
  }
  if (isSuspended) {
    return { label: 'SUSPENDED', color: 'yellow' };
  }
  if (isCharging) {
    return { label: 'ACTIVE', color: 'green' };
  }
  if (relayOn) {
    return { label: 'FAULT', color: 'orange' };
  }
  return { label: 'AVAILABLE', color: 'blue' };
}

export function isPillarAvailable(pillar: Pillar): boolean {
  return getPillarStatus(pillar).label === 'AVAILABLE';
}
