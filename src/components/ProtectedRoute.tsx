// src/components/ProtectedRoute.tsx
"use client"; // Add this directive

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      router.push('/login');
    }
  }, [auth, router]);

  if (!auth?.user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
