
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (
      !name ||
      !email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup(name, email, formData.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link
          to="/"
          className="auth-logo"
          aria-label="CareerNest home"
        >
          Career<span>Nest</span>
        </Link>

        <span className="hero-tag">JOIN CAREERNEST</span>

        <h1 id="signup-heading">Create your account</h1>

        <p className="auth-description">
          Create your CareerNest account and start discovering new
          career opportunities.
        </p>

        {error && (
          <div
            className="auth-error"
            id="signup-error"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-labelledby="signup-heading"
          noValidate
        >
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            autoComplete="name"
            aria-describedby={error ? "signup-error" : undefined}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
            aria-describedby={error ? "signup-error" : undefined}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            autoComplete="new-password"
            aria-describedby={error ? "signup-error" : undefined}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            aria-describedby={error ? "signup-error" : undefined}
          />

          <Button type="submit" className="auth-submit">
            Create Account →
          </Button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
