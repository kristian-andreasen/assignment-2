const apiKey = process.env.REACT_APP_API_KEY;

export function createHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  };
}
