import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function Register({ onRegister, disabled, selectedCampusId }) {
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCampusId) {
      return;
    }

    await onRegister(form);
    setForm((current) => ({ ...current, password: "" }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          placeholder="Aarav Sharma"
          value={form.name}
        />
      </div>
      <div className="field">
        <label htmlFor="register-email">Campus email</label>
        <input
          id="register-email"
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="student@medicaps.ac.in"
          type="email"
          value={form.email}
        />
      </div>
      <div className="field">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Create a password"
          type="password"
          value={form.password}
        />
      </div>
      <button className="primary-button" disabled={disabled} type="submit">
        {disabled ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}
