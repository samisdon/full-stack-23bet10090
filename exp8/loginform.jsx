import React, { useState } from "react";

function LoginForm() {
  // Step 1: Initialize state for username, password, and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Step 2: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    // Step 3: Basic validation
    if (!username || !password) {
      setError("Both fields are required!");
    } else {
      setError(""); // clear error
      console.log("Username:", username);
      console.log("Password:", password);
      alert("Login successful! Check console for details.");
    }
  };

  return (
    <div
      style={{
        width: "300px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // update username
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // update password
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
