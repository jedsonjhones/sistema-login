import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";
import "./Welcome.css";
import perfilImg from "../assets/perfil.svg";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      <div className="headWelcome">
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>
      <div className="infos">
        <div className="containerWelcomer">
          <div className="formWelcomer">
            <span className="tituloWelcome">Profile picture</span>
            <img src={perfilImg} alt="Workflow" className="perfilImg" />
            <div className="inputContainerWelcomer">
              <span className="spanFirst">Your <span className="spanSecond">Name</span></span>
              <input placeholder="Christine James" />
              <span className="spanFirst">Your <span className="spanSecond">E-mail</span></span>
              <input placeholder="christinejames@gmail.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
