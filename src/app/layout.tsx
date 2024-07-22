"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import { AuthProvider } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css'; // Ensure this path is correct

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Use usePathname to get the current path
  const showSidebar = pathname !== '/' && pathname !== '/login'; // Conditionally render the sidebar

  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex">
          {showSidebar && <Sidebar />}
          <div className={`flex-1 flex flex-col items-center justify-center ${showSidebar ? 'ml-64' : ''}`}> {/* Adjust margin to account for sidebar width */}
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
