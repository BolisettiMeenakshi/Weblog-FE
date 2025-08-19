import React, { useState } from "react";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    alert(`${activeTab === "login" ? "Logging in" : "Registering"}...`);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            borderBottom: "2px solid #ddd",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: activeTab === "login" ? "#4a90e2" : "transparent",
              color: activeTab === "login" ? "#fff" : "#333",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: activeTab === "register" ? "#4a90e2" : "transparent",
              color: activeTab === "register" ? "#fff" : "#333",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
        {activeTab === "register" && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", margin: "10px 0", padding: "10px" }}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
        <button
          onClick={handleAuth}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          {activeTab === "login" ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
