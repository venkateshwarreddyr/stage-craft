import React, { useState } from "react";
import {
  HiOutlineBeaker,
  HiOutlineBell,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineStar,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi2";
import "./Playground.css";

export const Playground = () => {
  const [toggles, setToggles] = useState({ notifications: true, darkMode: true, autoSave: false });
  const [sliderVal, setSliderVal] = useState(65);
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: "Write login test scenarios", done: true },
    { id: 2, text: "Add API integration tests", done: false },
    { id: 3, text: "Configure CI pipeline", done: false },
    { id: 4, text: "Review test coverage report", done: true },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [rating, setRating] = useState(3);
  const [selectedTags, setSelectedTags] = useState(["Playwright"]);
  const [accordion, setAccordion] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [counter, setCounter] = useState(0);

  const tags = ["Playwright", "Cucumber", "ZeroStep", "AI", "BDD", "E2E", "API", "Visual"];

  const tabContent = [
    {
      label: "Overview",
      content: "StageCraft unifies three testing paradigms into one cohesive framework. Write tests using Playwright's engine, Cucumber's BDD syntax, or ZeroStep's AI-powered natural language steps.",
    },
    {
      label: "Setup",
      content: "Install with npm install playwright @cucumber/cucumber zerostep. Configure your playwright.config.ts and start writing .feature files with step definitions.",
    },
    {
      label: "Usage",
      content: "Run tests with npm test for Playwright specs or npm run test:cucumber for BDD scenarios. Use --headed flag for visual debugging during development.",
    },
  ];

  const accordionItems = [
    { q: "What makes StageCraft different?", a: "StageCraft combines three testing approaches (Playwright, Cucumber BDD, and ZeroStep AI) in a single framework, so you can pick the right tool for each test scenario." },
    { q: "Do I need to maintain selectors?", a: "With ZeroStep AI integration, you can write tests in plain English. The AI identifies elements automatically, eliminating the need for brittle CSS/XPath selectors." },
    { q: "Can it run in CI/CD pipelines?", a: "Absolutely. StageCraft is CI-ready out of the box with headless mode, parallel execution, automatic retries, and built-in HTML reporting." },
  ];

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo("");
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="playground-page page-wrapper">
      <div className="playground-header">
        <div className="section-badge">
          <HiOutlineBeaker /> Interactive Playground
        </div>
        <h1>Component Playground</h1>
        <p className="playground-subtitle">
          Interactive UI elements — perfect targets for E2E testing
        </p>
      </div>

      <div className="playground-grid">
        {/* Toggle Switches */}
        <div className="pg-card glass animate-fade-in-up animate-delay-1">
          <h3>Toggle Switches</h3>
          {Object.entries(toggles).map(([key, val]) => (
            <div key={key} className="toggle-row">
              <span className="toggle-label">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
              </span>
              <button
                className={`toggle-switch ${val ? "active" : ""}`}
                onClick={() => setToggles({ ...toggles, [key]: !val })}
                aria-label={`Toggle ${key}`}
              >
                <span className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="pg-card glass animate-fade-in-up animate-delay-2">
          <h3>Counter</h3>
          <div className="counter-display">
            <button className="counter-btn" onClick={() => setCounter(counter - 1)}>−</button>
            <span className="counter-value">{counter}</span>
            <button className="counter-btn" onClick={() => setCounter(counter + 1)}>+</button>
          </div>
          <button className="btn-secondary counter-reset" onClick={() => setCounter(0)}>
            Reset
          </button>
        </div>

        {/* Range Slider */}
        <div className="pg-card glass animate-fade-in-up animate-delay-3">
          <h3>Range Slider</h3>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="range-slider"
            />
            <div className="slider-labels">
              <span>0</span>
              <span className="slider-current" style={{ color: sliderVal > 80 ? 'var(--accent-green)' : sliderVal > 40 ? 'var(--accent-cyan)' : 'var(--accent-red)' }}>
                {sliderVal}%
              </span>
              <span>100</span>
            </div>
            <div className="slider-bar-visual">
              <div className="slider-fill" style={{ width: `${sliderVal}%` }} />
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="pg-card glass animate-fade-in-up animate-delay-1">
          <h3>Star Rating</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-btn ${star <= rating ? "active" : ""}`}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} stars`}
              >
                <HiOutlineStar />
              </button>
            ))}
          </div>
          <span className="rating-label">{rating} of 5 stars</span>
        </div>

        {/* Tags / Chips */}
        <div className="pg-card glass animate-fade-in-up animate-delay-2">
          <h3>Tag Selection</h3>
          <div className="tags-grid">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`tag-chip ${selectedTags.includes(tag) ? "active" : ""}`}
                onClick={() => toggleTag(tag)}
              >
                {selectedTags.includes(tag) && <HiOutlineCheck />}
                {tag}
              </button>
            ))}
          </div>
          <span className="tags-count">{selectedTags.length} selected</span>
        </div>

        {/* Search */}
        <div className="pg-card glass animate-fade-in-up animate-delay-3">
          <h3>Live Search</h3>
          <div className="search-wrapper">
            <HiOutlineMagnifyingGlass className="search-icon" />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search components..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            {searchVal && (
              <button className="search-clear" onClick={() => setSearchVal("")}>
                <HiOutlineXMark />
              </button>
            )}
          </div>
          <div className="search-results">
            {["Toggle Switch", "Counter", "Slider", "Rating", "Tags", "Modal", "Tabs", "Accordion"]
              .filter((item) => item.toLowerCase().includes(searchVal.toLowerCase()))
              .map((item) => (
                <div key={item} className="search-result-item">{item}</div>
              ))}
          </div>
        </div>

        {/* Tabs - Full Width */}
        <div className="pg-card glass pg-card-wide animate-fade-in-up animate-delay-1">
          <h3>Tabs</h3>
          <div className="tab-bar">
            {tabContent.map((tab, i) => (
              <button
                key={i}
                className={`tab-btn ${activeTab === i ? "active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            <p>{tabContent[activeTab].content}</p>
          </div>
        </div>

        {/* Todo List */}
        <div className="pg-card glass pg-card-wide animate-fade-in-up animate-delay-2">
          <h3>Todo List</h3>
          <div className="todo-input-row">
            <input
              type="text"
              className="form-input"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <button className="btn-primary todo-add-btn" onClick={addTodo}>
              <HiOutlinePlus />
            </button>
          </div>
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
                <button
                  className={`todo-check ${todo.done ? "checked" : ""}`}
                  onClick={() =>
                    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)))
                  }
                >
                  {todo.done && <HiOutlineCheck />}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button
                  className="todo-delete"
                  onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="todo-stats">
            {todos.filter((t) => t.done).length} of {todos.length} completed
          </div>
        </div>

        {/* Accordion */}
        <div className="pg-card glass pg-card-wide animate-fade-in-up animate-delay-3">
          <h3>FAQ Accordion</h3>
          {accordionItems.map((item, i) => (
            <div key={i} className={`accordion-item ${accordion === i ? "open" : ""}`}>
              <button className="accordion-header" onClick={() => setAccordion(accordion === i ? -1 : i)}>
                <span>{item.q}</span>
                {accordion === i ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
              </button>
              {accordion === i && (
                <div className="accordion-body">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Trigger */}
        <div className="pg-card glass animate-fade-in-up animate-delay-1">
          <h3>Modal Dialog</h3>
          <p className="pg-card-desc">Trigger a modal overlay with confirm/cancel actions.</p>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            <HiOutlineBell /> Open Modal
          </button>
        </div>

        {/* Notification Preview */}
        <div className="pg-card glass animate-fade-in-up animate-delay-2">
          <h3>Progress Indicators</h3>
          <div className="progress-items">
            {[
              { label: "Unit Tests", pct: 100, color: "var(--accent-green)" },
              { label: "Integration", pct: 78, color: "var(--accent-cyan)" },
              { label: "E2E Tests", pct: 45, color: "var(--accent-orange)" },
            ].map((p, i) => (
              <div key={i} className="progress-row">
                <div className="progress-info">
                  <span>{p.label}</span>
                  <span style={{ color: p.color }}>{p.pct}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Action</h3>
            <p>Are you sure you want to proceed with this test execution? This will run all test suites in the queue.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => setModalOpen(false)}>
                <HiOutlineCheck /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
