import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function Login({ onLogin, disabled }) {
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onLogin(form);
    setForm((current) => ({ ...current, password: "" }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="student@medicaps.ac.in"
          type="email"
          value={form.email}
        />
      </div>
      <div className="field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Enter your password"
          type="password"
          value={form.password}
        />
      </div>
      <button className="primary-button" disabled={disabled} type="submit">
        {disabled ? "Signing in..." : "Log in"}
      </button>
    </form>
  );
}
