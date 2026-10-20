
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const result = login(email.trim(), password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = location.state?.from || "/dashboard";
    navigate(destination);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo" aria-label="CareerNest home">
          Career<span>Nest</span>
        </Link>

        <span className="hero-tag">WELCOME BACK</span>

        <h1 id="login-heading">Sign in to CareerNest</h1>

        <p className="auth-description">
          Access your applications, saved jobs and career opportunities.
        </p>

        {error && (
          <div
            className="auth-error"
            id="login-error"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-labelledby="login-heading"
          noValidate
        >
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="email"
            aria-describedby={error ? "login-error" : undefined}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            aria-describedby={error ? "login-error" : undefined}
          />

          <Button type="submit" className="auth-submit">
            Login →
          </Button>
        </form>

        <p className="auth-switch">
          New to CareerNest?{" "}
          <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
