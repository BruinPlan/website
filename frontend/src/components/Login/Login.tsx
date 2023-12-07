// import { useGoogleLogin } from "@react-oauth/google"
// import { googleLogout } from "@react-oauth/google"
import React, { useEffect, useState } from "react"
import "./Login.css"

function Login() {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        // Check if the user is already logged in on the backend
        fetch("/user", { credentials: "include" })
          .then((res) => {
            if (res.ok) {
              setIsLogged(true);
              console.log("User is logged in");
            }
          })
          .catch((err) => console.error(err));
      }, []);
    

    const handleLogin = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3000/auth/google")
            if (res.ok) {
                setIsLogged(true)
            } else {
                console.log("Login failed")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleLogout = async () => {
        try {
          const res = await fetch("http://127.0.0.1:3000/auth/logout", { credentials: "include" });
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

    // const logout = () => {
    //     googleLogout()
    //     setIsLogged(false)
    //     console.log("Logged out")
    // }

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