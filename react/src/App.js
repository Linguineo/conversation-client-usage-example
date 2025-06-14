import React, { useEffect, useState, useRef } from 'react';
import { authorize, exchangeCodeForToken, refreshAccessToken } from './OAuthService';
import LinguineoConversationWidget from './LinguineoConversationWidget';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(null);

  const refreshTimeout = useRef(null);

  const login = () => {
    authorize();
  };

  useEffect(() => {
    function processTokenResponse(tokens) {
      setAccessToken(tokens.access_token);
      setupTokenRefresh(tokens.expires_in);
    }

    function setupTokenRefresh(expiresIn) {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);

      refreshTimeout.current = setTimeout(async () => {
        refreshAccessToken()
          .then((response) => {
            processTokenResponse(response);
          })
      }, (expiresIn - 30) * 1000); // retrieve a new one before expiration
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      exchangeCodeForToken(code)
        .then(response => {
          processTokenResponse(response);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(err => alert('Login failed: ' + err.message));
    }
  }, []);

  return (
    <div className="app-container">
      {!accessToken 
        ? <div className="login-container"><button id="login" onClick={login}>Login with OAuth</button></div>
        : <LinguineoConversationWidget accessToken={accessToken} />
      }
    </div>
  );
}

export default App;