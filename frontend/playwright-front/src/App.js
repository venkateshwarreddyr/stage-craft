import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Dashboard } from "./Dashboard";
import { Playground } from "./Playground";
import { DataTable } from "./DataTable";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineBeaker,
  HiOutlineTableCells,
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

const users = [
  { username: "user1", password: "password1", name: "User One", role: "Admin" },
  { username: "user2", password: "password2", name: "User Two", role: "Tester" },
];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username: inputUsername, password } = e.target.elements;

    const user = users.find(
      (u) => u.username === inputUsername.value && u.password === password.value
    );

    if (user) {
      setLoggedIn(true);
      setUsername(user.name);
      setUserRole(user.role);
      setError("");
      showToast(`Welcome back, ${user.name}!`);
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setUserRole("");
    showToast("Successfully logged out", "success");
  };

  const navItems = [
    { path: "/", label: "Home", icon: <HiOutlineHome /> },
    { path: "/dashboard", label: "Dashboard", icon: <HiOutlineChartBar /> },
    { path: "/playground", label: "Playground", icon: <HiOutlineBeaker /> },
    { path: "/data", label: "Data", icon: <HiOutlineTableCells /> },
  ];

  return (
    <div className="app-container">
      <div className="bg-mesh" />

      {/* Navigation */}
      <nav className={`nav-container ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="gradient-text">StageCraft</span>
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-user-section">
          {loggedIn ? (
            <>
              <div className="nav-user-badge">
                <span className="dot" />
                {username} · {userRole}
              </div>
              <Link
                to="/logout"
                onClick={handleLogout}
                className="nav-auth-btn logout"
              >
                <HiOutlineArrowRightOnRectangle />
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="nav-auth-btn login">
              <HiOutlineArrowLeftOnRectangle />
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Routes */}
      <main className="page-content">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home loggedIn={loggedIn} username={username} />}
          />
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} error={error} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/dashboard"
            element={<Dashboard loggedIn={loggedIn} username={username} />}
          />
          <Route path="/playground" element={<Playground />} />
          <Route path="/data" element={<DataTable />} />
        </Routes>
      </main>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}
    </div>
  );
};

export default App;
