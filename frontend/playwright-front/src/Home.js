import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineRocketLaunch,
  HiOutlineCommandLine,
  HiOutlineEye,
  HiOutlineArrowRight,
  HiOutlinePlay,
  HiOutlineSparkles,
  HiOutlineBeaker,
  HiOutlineTableCells,
} from "react-icons/hi2";
import "./Home.css";

const features = [
  {
    icon: <HiOutlineCpuChip />,
    title: "AI-Powered Steps",
    desc: "Write tests in plain English. ZeroStep AI interprets your intent and finds elements automatically.",
    gradient: "linear-gradient(135deg, #00d4ff, #0088cc)",
  },
  {
    icon: <HiOutlineCommandLine />,
    title: "BDD with Cucumber",
    desc: "Behavior-driven development with Gherkin syntax. Given-When-Then scenarios that everyone understands.",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
  },
  {
    icon: <HiOutlineBolt />,
    title: "Playwright Engine",
    desc: "Lightning-fast browser automation with auto-wait, network interception, and multi-browser support.",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: "Bulletproof Tests",
    desc: "No flaky selectors. AI adapts to UI changes. Tests stay green even as your app evolves.",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    icon: <HiOutlineEye />,
    title: "Visual Reports",
    desc: "Rich HTML reports with screenshots, video traces, and step-by-step failure analysis.",
    gradient: "linear-gradient(135deg, #ec4899, #be185d)",
  },
  {
    icon: <HiOutlineRocketLaunch />,
    title: "CI/CD Ready",
    desc: "Runs headless in any pipeline. Parallel execution, automatic retries, and built-in sharding.",
    gradient: "linear-gradient(135deg, #eab308, #ca8a04)",
  },
];

const stats = [
  { value: "10x", label: "Faster Test Creation", color: "var(--accent-cyan)" },
  { value: "0", label: "Selector Maintenance", color: "var(--accent-green)" },
  { value: "99%", label: "Test Stability", color: "var(--accent-purple)" },
  { value: "3", label: "Testing Approaches", color: "var(--accent-pink)" },
];

const codeSnippet = `Feature: User Authentication
  Scenario: Successful login
    Given I navigate to the login page
    When I type "user1" in the username field
    And I type "password1" in the password field
    And I click the login button
    Then I should see "Welcome, User One!"`;

export const Home = ({ loggedIn, username }) => (
  <div className="home-page">
    {/* Hero Section */}
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge animate-fade-in-up">
          <HiOutlineSparkles />
          AI-Powered Testing Framework
        </div>
        <h1 className="hero-title animate-fade-in-up animate-delay-1">
          Test Smarter,
          <br />
          <span className="gradient-text">Not Harder.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-up animate-delay-2">
          StageCraft combines Playwright's power with AI intelligence.
          Write tests in plain English, run them at lightning speed, and
          never worry about brittle selectors again.
        </p>

        {loggedIn ? (
          <div className="hero-welcome animate-fade-in-up animate-delay-3">
            <div className="welcome-card glass">
              <div className="welcome-avatar">
                {username.charAt(0)}
              </div>
              <div>
                <span className="welcome-label">Welcome back</span>
                <span className="welcome-name">{username}</span>
              </div>
              <Link to="/dashboard" className="btn-primary" style={{ marginLeft: 'auto' }}>
                Go to Dashboard <HiOutlineArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <div className="hero-actions animate-fade-in-up animate-delay-3">
            <Link to="/login" className="btn-primary btn-large">
              <HiOutlinePlay /> Get Started
            </Link>
            <Link to="/playground" className="btn-secondary btn-large">
              <HiOutlineBeaker /> Try Playground
            </Link>
          </div>
        )}
      </div>

      {/* Code Preview */}
      <div className="hero-code animate-fade-in-up animate-delay-4">
        <div className="code-window">
          <div className="code-header">
            <div className="code-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="code-filename">login.feature</span>
          </div>
          <pre className="code-body">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`stat-card glass animate-fade-in-up animate-delay-${i + 1}`}
          >
            <span className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Features */}
    <section className="features-section">
      <div className="section-header">
        <div className="section-badge">
          <HiOutlineBolt /> Capabilities
        </div>
        <h2>
          Everything you need for{" "}
          <span className="gradient-text">modern testing</span>
        </h2>
        <p>
          Three testing approaches unified in one powerful framework.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`feature-card glass animate-fade-in-up animate-delay-${(i % 3) + 1}`}
          >
            <div
              className="feature-icon"
              style={{ background: feature.gradient }}
            >
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section">
      <div className="cta-card glass">
        <h2>
          Ready to <span className="gradient-text-secondary">supercharge</span> your testing?
        </h2>
        <p>
          Explore the interactive playground or dive into the dashboard to see
          StageCraft in action.
        </p>
        <div className="cta-actions">
          <Link to="/playground" className="btn-primary btn-large">
            <HiOutlineBeaker /> Explore Playground
          </Link>
          <Link to="/data" className="btn-secondary btn-large">
            <HiOutlineTableCells /> View Data Table
          </Link>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="home-footer">
      <div className="footer-content">
        <span className="gradient-text" style={{ fontWeight: 700 }}>
          StageCraft
        </span>
        <span className="footer-sep">·</span>
        <span>Playwright + Cucumber + ZeroStep AI</span>
        <span className="footer-sep">·</span>
        <span>Built for modern testing teams</span>
      </div>
    </footer>
  </div>
);

