import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; 
import logoImg from "../assets/logo1.svg";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.access_token;
        localStorage.setItem("authToken", token);
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginFailed(true);
    }
  };

  const handleButtonClick = () => {
    const profileContainer = document.getElementById("profileContainer");
    if (profileContainer) {
      profileContainer.classList.add("hidden");
      profileContainer.classList.remove("show");
      profileContainer.style.transitionDuration = "0ms";
      setTimeout(() => {
        profileContainer.classList.remove("hidden");
        profileContainer.classList.add("show");
        profileContainer.style.transitionDuration = "300ms";
      }, 0);
    }
    handleLogin();
  };

  return (
    <div className="container">
      <div className="form">
        <header className="header">
          <img src={logoImg} alt="Workflow" className="logoImg" />
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="inputContainer">
            <span>E-mail</span>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <span>Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="****************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="button" onClick={handleButtonClick}>
            Sign In
          </button>
          {loginFailed && (
            <div id="profileContainer" className="show">
              <p>Error logging in. Please check your credentials!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
