"use client";

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaChartLine, FaDollarSign, FaUsers, FaBox, FaBell } from 'react-icons/fa'; // Import icons from react-icons

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-black">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <FaChartLine className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-black">Total Sales</h2>
            <p className="text-2xl font-bold text-black">1,234</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <FaDollarSign className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-black">Total Revenue</h2>
            <p className="text-2xl font-bold text-black">$123,456</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <FaUsers className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-black">Customers</h2>
            <p className="text-2xl font-bold text-black">567</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <FaUsers className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-black">Employees</h2>
            <p className="text-2xl font-bold text-black">89</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <FaBox className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-black">Inventory Status</h2>
            <p className="text-2xl font-bold text-black">Good</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <FaBell className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-black">Recent Transactions</h2>
            <p className="text-2xl font-bold text-black">34</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">Sales Performance</h2>
          {/* Placeholder for Sales Performance Chart */}
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">Revenue Over Time</h2>
          {/* Placeholder for Revenue Over Time Chart */}
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">Customer Growth</h2>
          {/* Placeholder for Customer Growth Chart */}
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">Inventory Levels</h2>
          {/* Placeholder for Inventory Levels Chart */}
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4 text-black">Recent Activities</h2>
        {/* Placeholder for Activity Feed */}
        <ul className="space-y-4">
          <li className="flex items-center">
            <FaBell className="text-lg text-purple-500 mr-2" />
            <span className="text-black">New order placed by John Doe</span>
          </li>
          <li className="flex items-center">
            <FaBell className="text-lg text-purple-500 mr-2" />
            <span className="text-black">Inventory updated for Product XYZ</span>
          </li>
          <li className="flex items-center">
            <FaBell className="text-lg text-purple-500 mr-2" />
            <span className="text-black">Performance review submitted by Jane Smith</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
