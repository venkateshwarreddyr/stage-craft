import React, { useState, useMemo } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineFunnel,
  HiOutlineTableCells,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import "./DataTable.css";

const testData = [
  { id: 1, name: "Login Authentication", suite: "Auth", type: "E2E", status: "passed", duration: "2.3s", browser: "Chromium", date: "2024-03-20" },
  { id: 2, name: "User Registration Flow", suite: "Auth", type: "E2E", status: "passed", duration: "4.1s", browser: "Firefox", date: "2024-03-20" },
  { id: 3, name: "Password Reset", suite: "Auth", type: "Integration", status: "failed", duration: "1.8s", browser: "Chromium", date: "2024-03-20" },
  { id: 4, name: "Dashboard Load Time", suite: "Performance", type: "E2E", status: "passed", duration: "0.9s", browser: "Chromium", date: "2024-03-19" },
  { id: 5, name: "API Response Validation", suite: "API", type: "Integration", status: "passed", duration: "0.5s", browser: "N/A", date: "2024-03-19" },
  { id: 6, name: "Search Functionality", suite: "Features", type: "E2E", status: "passed", duration: "3.2s", browser: "WebKit", date: "2024-03-19" },
  { id: 7, name: "Cart Add/Remove", suite: "E-Commerce", type: "E2E", status: "failed", duration: "5.6s", browser: "Chromium", date: "2024-03-18" },
  { id: 8, name: "Checkout Process", suite: "E-Commerce", type: "E2E", status: "passed", duration: "8.4s", browser: "Firefox", date: "2024-03-18" },
  { id: 9, name: "Profile Update", suite: "User", type: "Integration", status: "passed", duration: "1.2s", browser: "Chromium", date: "2024-03-18" },
  { id: 10, name: "Notification System", suite: "Features", type: "E2E", status: "skipped", duration: "0.0s", browser: "N/A", date: "2024-03-17" },
  { id: 11, name: "File Upload", suite: "Features", type: "E2E", status: "passed", duration: "2.7s", browser: "Chromium", date: "2024-03-17" },
  { id: 12, name: "Data Export CSV", suite: "Features", type: "Integration", status: "passed", duration: "1.5s", browser: "N/A", date: "2024-03-17" },
  { id: 13, name: "Multi-language Support", suite: "i18n", type: "E2E", status: "failed", duration: "3.9s", browser: "WebKit", date: "2024-03-16" },
  { id: 14, name: "Session Timeout", suite: "Auth", type: "E2E", status: "passed", duration: "12.1s", browser: "Chromium", date: "2024-03-16" },
  { id: 15, name: "Role Permissions", suite: "Auth", type: "Integration", status: "passed", duration: "0.8s", browser: "N/A", date: "2024-03-16" },
  { id: 16, name: "Real-time Updates", suite: "Features", type: "E2E", status: "passed", duration: "4.5s", browser: "Firefox", date: "2024-03-15" },
  { id: 17, name: "Form Validation", suite: "User", type: "E2E", status: "passed", duration: "1.9s", browser: "Chromium", date: "2024-03-15" },
  { id: 18, name: "Dark Mode Toggle", suite: "UI", type: "E2E", status: "passed", duration: "0.7s", browser: "Chromium", date: "2024-03-15" },
  { id: 19, name: "Responsive Layout", suite: "UI", type: "Visual", status: "passed", duration: "2.1s", browser: "WebKit", date: "2024-03-14" },
  { id: 20, name: "Accessibility Check", suite: "UI", type: "Visual", status: "failed", duration: "3.3s", browser: "Chromium", date: "2024-03-14" },
];

const PAGE_SIZE = 8;

export const DataTable = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...testData];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.suite.toLowerCase().includes(q) ||
          r.browser.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((r) => r.status === statusFilter);
    }

    if (typeFilter !== "all") {
      data = data.filter((r) => r.type === typeFilter);
    }

    data.sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === "id") {
        av = Number(av);
        bv = Number(bv);
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [search, sortKey, sortDir, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />;
  };

  const statusCounts = {
    all: testData.length,
    passed: testData.filter((r) => r.status === "passed").length,
    failed: testData.filter((r) => r.status === "failed").length,
    skipped: testData.filter((r) => r.status === "skipped").length,
  };

  return (
    <div className="datatable-page page-wrapper">
      <div className="datatable-header">
        <div className="section-badge">
          <HiOutlineTableCells /> Data Explorer
        </div>
        <h1>Test Results</h1>
        <p className="datatable-subtitle">
          Search, sort, and filter through test execution history
        </p>
      </div>

      {/* Summary Cards */}
      <div className="dt-summary">
        {[
          { label: "Total", value: statusCounts.all, color: "var(--accent-cyan)" },
          { label: "Passed", value: statusCounts.passed, color: "var(--accent-green)" },
          { label: "Failed", value: statusCounts.failed, color: "var(--accent-red)" },
          { label: "Skipped", value: statusCounts.skipped, color: "var(--accent-yellow)" },
        ].map((s, i) => (
          <div key={i} className="dt-summary-card glass">
            <span className="dt-summary-value" style={{ color: s.color }}>{s.value}</span>
            <span className="dt-summary-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="dt-controls glass">
        <div className="dt-search-wrapper">
          <HiOutlineMagnifyingGlass className="dt-search-icon" />
          <input
            type="text"
            className="form-input dt-search"
            placeholder="Search tests by name, suite, or browser..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <div className="dt-filters">
          <div className="dt-filter-group">
            <HiOutlineFunnel />
            <select
              className="dt-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              <option value="all">All Status</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="skipped">Skipped</option>
            </select>
          </div>

          <select
            className="dt-select"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Types</option>
            <option value="E2E">E2E</option>
            <option value="Integration">Integration</option>
            <option value="Visual">Visual</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="dt-table-wrapper glass">
        <table className="dt-table">
          <thead>
            <tr>
              {[
                { key: "id", label: "#" },
                { key: "name", label: "Test Name" },
                { key: "suite", label: "Suite" },
                { key: "type", label: "Type" },
                { key: "status", label: "Status" },
                { key: "duration", label: "Duration" },
                { key: "browser", label: "Browser" },
                { key: "date", label: "Date" },
              ].map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)} className="dt-th">
                  <span className="dt-th-content">
                    {col.label}
                    <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr key={row.id} className="dt-row">
                <td className="dt-td dt-id">{row.id}</td>
                <td className="dt-td dt-name">{row.name}</td>
                <td className="dt-td">
                  <span className="dt-suite-badge">{row.suite}</span>
                </td>
                <td className="dt-td">
                  <span className={`dt-type-badge ${row.type.toLowerCase()}`}>{row.type}</span>
                </td>
                <td className="dt-td">
                  <span className={`dt-status ${row.status}`}>
                    {row.status === "passed" && "✓ "}
                    {row.status === "failed" && "✕ "}
                    {row.status === "skipped" && "○ "}
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                </td>
                <td className="dt-td dt-duration">{row.duration}</td>
                <td className="dt-td dt-browser">{row.browser}</td>
                <td className="dt-td dt-date">{row.date}</td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan="8" className="dt-empty">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="dt-pagination">
        <span className="dt-page-info">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className="dt-page-controls">
          <button
            className="dt-page-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <HiOutlineChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`dt-page-btn ${page === p ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="dt-page-btn"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
