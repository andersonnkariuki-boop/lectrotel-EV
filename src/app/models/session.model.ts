export interface Session {
  charging_session_id: number;
  user_id: number;
  charging_pillar_id: number;
  start_time: string;
  end_time?: string;
  status: 'active' | 'completed' | 'cancelled';
  units_consumed?: number;
  energy_consumed?: number;
  cut_off_point?: number;
  start_balance?: number;
  end_balance?: number;
  amount?: number;
  station_name?: string;
  pillar_model?: string;
}

export interface SessionResponse {
  items: Session[];
  total?: number;
  page?: number;
  limit?: number;
}

export function formatSessionDuration(session: Session): string {
  const start = new Date(session.start_time);
  const end = session.end_time ? new Date(session.end_time) : new Date();
  const diffMs = end.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) {
    const mins = diffMins;
    return mins + ' min';
  }
  const hours = Math.floor(diffMins / 60);
  return hours + 'h';
}
