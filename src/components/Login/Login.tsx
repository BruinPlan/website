import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import React, { useState } from "react";
import "./Login.css";

function Login() {
    const [isLogged, setIsLogged] = useState(false);
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await fetch(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                const data = await res.json();
                console.log(data);
                setIsLogged(true);
            } catch (err) {
                console.log(err);
            }
        },
    });

    const logout = () => {
        googleLogout();
        setIsLogged(false);
        console.log("Logged out");
    };

    return (
        <div>
            {isLogged ? (
                <button
                    className="logout"
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </button>
            ) : (
                <button
                    className="login"
                    onClick={() => {
                        login();
                    }}
                >
                    Login
                </button>
            )}
        </div>
    );
}

export default Login;
