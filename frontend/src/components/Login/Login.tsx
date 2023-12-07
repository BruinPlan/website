import React, { useEffect, useState } from "react"
import "./Login.css"

function Login() {
    const [isLogged, setIsLogged] = useState(false)
    
    // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
    function oauthSignIn(): void {
      // Google's OAuth 2.0 endpoint for requesting an access token
      const oauth2Endpoint: string = 'https://accounts.google.com/o/oauth2/v2/auth';
    
      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      const form: HTMLFormElement = document.createElement('form');
      form.setAttribute('method', 'GET'); // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint);
    
      // Parameters to pass to OAuth 2.0 endpoint.
      const params: Record<string, string> = {
        'client_id': '664712804310-jqok8vvq8as7l3o8o7r5nesehc7cknvs.apps.googleusercontent.com',
        'redirect_uri': 'http://127.0.0.1:3000/auth/google/callback',
        'response_type': 'code',
        'scope': 'profile email',
        'prompt': 'select_account', // Needed to re-prompt user to select account, otherwise it will use `account-chooser` param instead
      };
    
      // Add form parameters as hidden input values.
      for (const p in params) {
        if (Object.prototype.hasOwnProperty.call(params, p)) {
          const input: HTMLInputElement = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', p);
          input.setAttribute('value', params[p as keyof typeof params]); // Type assertion for value assignment
          form.appendChild(input);
        }
      }
    
      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form);
      form.submit();
    }

    
  const checkAuthenticationStatus = async () => {
    try {
      const res = await fetch("/auth/user", { credentials: "include" });
      if (res.ok) {
        const user = await res.json();
        setIsLogged(true);
        console.log("User is logged in", user);
      } else {
        setIsLogged(false);
        console.log("User is not logged in");
      }
    } catch (err) {
      console.error(err);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);
    
  const handleLogin = () => {
      oauthSignIn()
  }
  
  const handleLogout = async () => {
    console.log("Logging out");
      try {
        const res = await fetch("http://127.0.0.1:3000/auth/logout", { credentials: "include" });
        console.log(res)
        if (res.ok) {
          setIsLogged(false);
        } else {
          // Handle logout failure
          console.error("Logout failed");
        }
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      {isLogged ? (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="login" onClick={handleLogin}>
          Login
        </button>
      )}
    </>
  );
}

export default Login