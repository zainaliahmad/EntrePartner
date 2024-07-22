"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.user) {
      router.push('/dashboard');
    }
  }, [auth.user, router]);

  const handleAuthAction = async () => {
    setError(null); // Clear any previous errors
    try {
      if (isLogin && auth?.login) {
        const response = await auth.login(email, password);
        console.log('Login Response:', response);
        router.push('/dashboard');
      } else if (!isLogin && auth?.signup) {
        const response = await auth.signup(email, password);
        console.log('Sign Up Response:', response);
        router.push('/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error during ${isLogin ? 'login' : 'signup'}: ${err.message}`);
      } else {
        setError(`Error during ${isLogin ? 'login' : 'signup'}`);
      }
      console.error(`Error during ${isLogin ? 'login' : 'signup'}:`, err);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleAuthAction}
        className="w-full p-2 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded"
      >
        {isLogin ? 'Login' : 'Signup'}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full p-2 text-gray-600"
      >
        {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginPage;
