export const environment = {
  production: true,
  apiUrl: 'https://test.lectrotel.com/api/v1.0/',
  qrConfig: {
    format: 'pillar_id:{id}|model:{model}|station:{station}|owner:{owner}',
    fields: ['pillar_id', 'model', 'station', 'owner']
  }
};
