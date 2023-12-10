import React, { useEffect, useState } from "react"
import "./Login.css"

// function setToken(userToken: string) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString ?? '{}');
//   return userToken?.token 
// }

function Login() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    fetch("/auth/user", { credentials: "include" }).then((res) => {
      res.ok ? setIsLogged(true) : setIsLogged(false)
    })
  }, [])
  
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