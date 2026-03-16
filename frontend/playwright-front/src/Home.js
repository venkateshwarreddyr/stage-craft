
export const Home = ({ loggedIn, username }) => (
    <div className="content">
      <h1>Welcome to the AI Testing Automation Demo</h1>
      {loggedIn ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </div>
  );