import React, { useEffect, useState } from "react"
import "./Login.css"

function Login() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const checkAuthenticationStatus = () => {
      fetch("/auth/user", { credentials: "include" }).then((res) => {
        if (res.ok) {
          const user = res.json();
          setIsLogged(true);
          console.log("User is logged in", user);
        } else {
          setIsLogged(false);
          console.log("User is not logged in");
        }
      });
    };
    checkAuthenticationStatus();
  }, []);
  
  const handleLogin = () => {
      window.open("http://127.0.0.1:3000/auth/google", "_self");
  }
  
  const handleLogout = () => {
    window.open("http://127.0.0.1:3000/auth/logout", "_self");
}

  return (
    <>
      {isLogged ? (
        <button className="logout" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="login" onClick={handleLogin}>Login</button>
      )}
    </>
  );
}

export default Login