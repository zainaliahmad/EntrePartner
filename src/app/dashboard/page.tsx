// src/app/dashboard/page.tsx
"use client";

import ProtectedRoute from '../../components/ProtectedRoute';

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
