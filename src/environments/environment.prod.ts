export const environment = {
  production: true,
  apiUrl: 'https://api.lectrotel.co.ke/api/', // Replace with your actual API URL
  qrConfig: {
    format: 'pillar_id:{id}|model:{model}|station:{station}|owner:{owner}',
    fields: ['pillar_id', 'model', 'station', 'owner']
  }
};
