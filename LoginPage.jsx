import React, { createContext, useContext, useState } from 'react';
import { login } from './Service'; 

const LoginContext = createContext();

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (login(username, password)) {
      alert('Login Successful ✅');
      setIsLoggedIn(true);
    } else {
      alert('Invalid username & password ❌');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br /><br />
      <button type="submit">Login</button>
    </form>
  );
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contextValue = { isLoggedIn, setIsLoggedIn };

  return (
    <LoginContext.Provider value={contextValue}>
      {isLoggedIn ? (
        <h2>Welcome! You are logged in </h2>
      ) : (
        <LoginForm />
      )}
    </LoginContext.Provider>
  );
};

export default LoginPage;
