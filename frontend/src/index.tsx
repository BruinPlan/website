import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="664712804310-jqok8vvq8as7l3o8o7r5nesehc7cknvs.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
);