import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    // Save credentials if remember me is checked
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      // Clear saved credentials if remember me is unchecked
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }

    // simulate login
    window.location.href = "https://www.google.com";
  };

  function App() {
    return (
      <div className="app-container">
        <h1>عکس از public</h1>
        <img
          src="/images/public-Login.png"
          alt="عکس عمومی"
          style={{ width: "100%", maxWidth: "300px" }}
        />
      </div>
    );
  }

  return (
    <div className="formbox">
      {showNotification && (
        <div className="notification">
          لطفا نام کاربری و رمز عبور خود را وارد کنید
        </div>
      )}
      <h1>Login</h1>
      <div className="b1">
        <h2>نام کاربری:</h2>
      </div>
      <div className="input-box">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="b1">
        <h2>رمز عبور:</h2>
      </div>
      <div className="password">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={showPassword ? "eye.png" : "hide.png"}
          alt="Toggle Password"
          id="togglePassword"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <div className="b2">
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          به خاطر بسپار
        </label>
      </div>
      <button type="submit" className="b3" onClick={handleSubmit}>
        <span className="b31">
          <strong>ورود</strong>
        </span>
      </button>
    </div>
  );
};

export default Login;
