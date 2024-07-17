// src/app/layout.tsx
import { ReactNode } from 'react';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css'; // Adjust the path to your global styles if needed

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
