const TOKEN_URL = 'https://keycloak.linguineo.com/auth/realms/moodle/protocol/openid-connect/token';
const AUTHORIZATION_URL = 'https://keycloak.linguineo.com/auth/realms/moodle/protocol/openid-connect/auth';
const CLIENT_ID = 'moodle';
const REDIRECT_URI = window.location.origin;

let refreshToken = null;

export async function authorize() {
    const url = `${AUTHORIZATION_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid`;
    window.location.href = url;
}

export async function exchangeCodeForToken(code) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
    })
  });

  if (!res.ok) throw new Error('Failed to exchange code');
  const data = await res.json();
  refreshToken = data.refresh_token;
  return data;
}

export async function refreshAccessToken() {
  if (!refreshToken) return null;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    })
  });

  if (!res.ok) throw new Error('Failed to refresh token');
  const data = await res.json();
  return data;
}