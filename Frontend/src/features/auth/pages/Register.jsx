import { Link, useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister(
      formData.username,
      formData.email,
      formData.password,
    );
    if (result) navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Register</h1>
      <div className="auth-form">
        <form onSubmit={handleOnSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              placeholder="Enter username"
              name="username"
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter email address"
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter password"
              name="password"
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
