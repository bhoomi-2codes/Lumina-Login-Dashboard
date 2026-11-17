
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  const [page, setPage] = useState("login");
  const [theme, setTheme] = useState("light");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must have at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || "Registration failed.");
      }

      alert("Account created successfully! Please log in.");
      setPage("login");
      setPassword("");
      setName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || "Invalid credentials.");
      }

      const userData = JSON.parse(result);

      setUser(userData);
      setPage("dashboard");
    } catch (err) {
      setError(err.message || "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page !== "dashboard") return;

    fetch(`${API}/dashboard`, {
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Session expired. Please log in again.");
        }
        return response.json();
      })
      .then((data) => setDashboard(data))
      .catch((err) => {
        setError(err.message);
        setPage("login");
      });
  }, [page]);

  const handleLogout = async () => {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      setDashboard(null);
      setEmail("");
      setPassword("");
      setPage("login");
      setError("");
    }
  };

  const switchTheme = () => {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  };

  const togglePage = (nextPage) => {
    setPage(nextPage);
    setError("");
    setPassword("");
  };

  const ThemeButton = () => (
    <button
      className="theme-toggle"
      onClick={switchTheme}
      type="button"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "☾ Dark mode" : "☀ Light mode"}
    </button>
  );

  if (page === "dashboard") {
    return (
      <div className={`app ${theme}`}>
        <div className="dashboard-layout">

          <aside className="sidebar">
            <h2 className="brand">
              Lumina<span>.</span>
            </h2>

            <p className="menu-label">WORKSPACE</p>

            <button className="nav-item active">
              ◈ &nbsp; Overview
            </button>

            <button className="nav-item">
              ◷ &nbsp; Activity
            </button>

            <button className="nav-item">
              ♙ &nbsp; Profile
            </button>

            <button className="nav-item">
              ⚙ &nbsp; Settings
            </button>

            <div className="sidebar-bottom">
              <ThemeButton />
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                ↪ &nbsp; Logout
              </button>
            </div>
          </aside>

          <main className="dashboard-main">
            <header className="topbar">
              <span>Overview</span>
              <span className="user-label">
                {user?.name} &nbsp; ●
              </span>
            </header>

            <section className="welcome-section">
              <p className="eyebrow">YOUR WORKSPACE</p>
              <h1>Dashboard</h1>
              <p>
                Welcome back, {user?.name}! Here's your account overview.
              </p>
            </section>

            {!dashboard ? (
              <p className="loading">Loading dashboard...</p>
            ) : (
              <section className="stats-grid">

                <div className="stat-card">
                  <span className="stat-icon">♙</span>
                  <p>Total Users</p>
                  <h2>{dashboard.totalUsers}</h2>
                  <small>Registered users</small>
                </div>

                <div className="stat-card">
                  <span className="stat-icon">◷</span>
                  <p>Active Sessions</p>
                  <h2>{dashboard.activeSessions}</h2>
                  <small>Currently active</small>
                </div>

                <div className="stat-card">
                  <span className="stat-icon">♧</span>
                  <p>Notifications</p>
                  <h2>{dashboard.notifications}</h2>
                  <small>Unread notifications</small>
                </div>

                <div className="stat-card">
                  <span className="stat-icon">✓</span>
                  <p>Account Status</p>
                  <h2>{dashboard.accountStatus}</h2>
                  <small>Your account is active</small>
                </div>

              </section>
            )}

            <section className="profile-card">
              <div>
                <p className="eyebrow">ACCOUNT DETAILS</p>
                <h3>{dashboard?.name}</h3>
                <p>{dashboard?.email}</p>
              </div>
              <span className="status-pill">● Active</span>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${theme}`}>
      <div className="auth-header">
        <h2 className="brand">
          Lumina<span>.</span>
        </h2>
        <ThemeButton />
      </div>

      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-decoration">
            <span>✦</span>
          </div>

          <p className="eyebrow">
            {page === "login" ? "WELCOME TO LUMINA" : "JOIN LUMINA"}
          </p>

          <h1>
            {page === "login" ? "Welcome back!" : "Create account"}
          </h1>

          <p className="auth-subtitle">
            {page === "login"
              ? "Enter your details to access your account."
              : "Create your account and get started."}
          </p>

          <form onSubmit={page === "login" ? handleLogin : handleRegister}>

            {page === "register" && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            {error && (
              <p className="error-message">{error}</p>
            )}

            <button
              className="submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : page === "login"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          <p className="switch-page">
            {page === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() =>
                togglePage(page === "login" ? "register" : "login")
              }
            >
              {page === "login" ? " Sign Up" : " Log In"}
            </button>
          </p>

          <p className="footer-text">
            © 2026 Lumina. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
