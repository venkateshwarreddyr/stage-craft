import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineBolt,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineChartBar,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import "./Dashboard.css";

const statsCards = [
  {
    label: "Tests Passed",
    value: "847",
    change: "+12.5%",
    trend: "up",
    icon: <HiOutlineCheckCircle />,
    color: "var(--accent-green)",
    bg: "rgba(34, 197, 94, 0.1)",
  },
  {
    label: "Tests Failed",
    value: "23",
    change: "-8.2%",
    trend: "down",
    icon: <HiOutlineXCircle />,
    color: "var(--accent-red)",
    bg: "rgba(239, 68, 68, 0.1)",
  },
  {
    label: "Avg Duration",
    value: "1.4s",
    change: "-15%",
    trend: "down",
    icon: <HiOutlineClock />,
    color: "var(--accent-cyan)",
    bg: "rgba(0, 212, 255, 0.1)",
  },
  {
    label: "Test Coverage",
    value: "94.2%",
    change: "+3.1%",
    trend: "up",
    icon: <HiOutlineChartBar />,
    color: "var(--accent-purple)",
    bg: "rgba(168, 85, 247, 0.1)",
  },
];

const recentRuns = [
  { id: "RUN-2847", suite: "Login Flow", tests: 12, passed: 12, failed: 0, duration: "14.2s", status: "passed", time: "2 min ago" },
  { id: "RUN-2846", suite: "Dashboard API", tests: 28, passed: 26, failed: 2, duration: "45.8s", status: "failed", time: "15 min ago" },
  { id: "RUN-2845", suite: "E2E Checkout", tests: 8, passed: 8, failed: 0, duration: "32.1s", status: "passed", time: "1 hr ago" },
  { id: "RUN-2844", suite: "User Registration", tests: 15, passed: 15, failed: 0, duration: "21.4s", status: "passed", time: "2 hrs ago" },
  { id: "RUN-2843", suite: "Search & Filter", tests: 20, passed: 18, failed: 2, duration: "38.9s", status: "failed", time: "3 hrs ago" },
  { id: "RUN-2842", suite: "Payment Flow", tests: 10, passed: 10, failed: 0, duration: "28.3s", status: "passed", time: "4 hrs ago" },
];

const barData = [
  { label: "Mon", passed: 85, failed: 5 },
  { label: "Tue", passed: 92, failed: 3 },
  { label: "Wed", passed: 78, failed: 12 },
  { label: "Thu", passed: 95, failed: 2 },
  { label: "Fri", passed: 88, failed: 7 },
  { label: "Sat", passed: 70, failed: 1 },
  { label: "Sun", passed: 90, failed: 4 },
];

const maxBar = Math.max(...barData.map((d) => d.passed + d.failed));

export const Dashboard = ({ loggedIn, username }) => (
  <div className="dashboard-page page-wrapper">
    <div className="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">
          {loggedIn
            ? `Hey ${username}, here's your testing overview`
            : "Real-time testing analytics & insights"}
        </p>
      </div>
      <div className="dashboard-header-actions">
        <div className="live-indicator">
          <span className="live-dot" />
          Live
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="dashboard-stats">
      {statsCards.map((card, i) => (
        <div
          key={i}
          className={`dash-stat-card glass animate-fade-in-up animate-delay-${i + 1}`}
        >
          <div className="dash-stat-icon" style={{ background: card.bg, color: card.color }}>
            {card.icon}
          </div>
          <div className="dash-stat-info">
            <span className="dash-stat-label">{card.label}</span>
            <span className="dash-stat-value">{card.value}</span>
          </div>
          <div className={`dash-stat-change ${card.trend}`}>
            {card.trend === "up" ? <HiOutlineArrowTrendingUp /> : <HiOutlineArrowTrendingDown />}
            {card.change}
          </div>
        </div>
      ))}
    </div>

    <div className="dashboard-grid">
      {/* Chart Section */}
      <div className="dash-chart-card glass animate-fade-in-up animate-delay-2">
        <div className="dash-card-header">
          <h3>Weekly Test Results</h3>
          <span className="dash-card-badge">Last 7 days</span>
        </div>
        <div className="bar-chart">
          {barData.map((d, i) => (
            <div key={i} className="bar-column">
              <div className="bar-stack" style={{ height: `${((d.passed + d.failed) / maxBar) * 100}%` }}>
                <div
                  className="bar-segment passed"
                  style={{ height: `${(d.passed / (d.passed + d.failed)) * 100}%` }}
                  title={`Passed: ${d.passed}`}
                />
                <div
                  className="bar-segment failed"
                  style={{ height: `${(d.failed / (d.passed + d.failed)) * 100}%` }}
                  title={`Failed: ${d.failed}`}
                />
              </div>
              <span className="bar-label">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "var(--accent-green)" }} />
            Passed
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "var(--accent-red)" }} />
            Failed
          </div>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="dash-runs-card glass animate-fade-in-up animate-delay-3">
        <div className="dash-card-header">
          <h3>Recent Test Runs</h3>
          <span className="dash-card-badge">{recentRuns.length} runs</span>
        </div>
        <div className="runs-list">
          {recentRuns.map((run) => (
            <div key={run.id} className="run-item">
              <div className="run-status-icon">
                {run.status === "passed" ? (
                  <HiOutlineCheckCircle style={{ color: "var(--accent-green)" }} />
                ) : (
                  <HiOutlineExclamationTriangle style={{ color: "var(--accent-red)" }} />
                )}
              </div>
              <div className="run-info">
                <span className="run-suite">{run.suite}</span>
                <span className="run-meta">
                  {run.id} · {run.tests} tests · {run.duration}
                </span>
              </div>
              <div className="run-results">
                <span className="run-passed">{run.passed} ✓</span>
                {run.failed > 0 && <span className="run-failed">{run.failed} ✕</span>}
              </div>
              <span className="run-time">{run.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Coverage Breakdown */}
    <div className="coverage-section glass animate-fade-in-up animate-delay-4">
      <div className="dash-card-header">
        <h3>Coverage Breakdown</h3>
        <span className="dash-card-badge">By module</span>
      </div>
      <div className="coverage-bars">
        {[
          { module: "Authentication", coverage: 98, color: "var(--accent-green)" },
          { module: "Dashboard", coverage: 94, color: "var(--accent-cyan)" },
          { module: "User Management", coverage: 87, color: "var(--accent-purple)" },
          { module: "Search & Filter", coverage: 82, color: "var(--accent-orange)" },
          { module: "Payment Flow", coverage: 96, color: "var(--accent-green)" },
          { module: "Notifications", coverage: 74, color: "var(--accent-yellow)" },
        ].map((item, i) => (
          <div key={i} className="coverage-row">
            <div className="coverage-label">
              <span>{item.module}</span>
              <span style={{ color: item.color }}>{item.coverage}%</span>
            </div>
            <div className="coverage-track">
              <div
                className="coverage-fill"
                style={{
                  width: `${item.coverage}%`,
                  background: item.color,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
