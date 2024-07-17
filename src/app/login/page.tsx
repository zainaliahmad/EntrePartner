// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (auth?.login) {
        await auth.login(email, password);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignup = async () => {
    try {
      if (auth?.signup) {
        await auth.signup(email, password);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default LoginPage;
