"use client";

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  FaUsers, FaUserTie, FaBoxes, FaFileInvoiceDollar, FaProjectDiagram, FaShoppingCart,
  FaChartLine, FaIndustry, FaHeadset, FaStore, FaFileAlt, FaChartBar, FaBullhorn, FaShieldAlt, FaSignOutAlt
} from 'react-icons/fa';

const modules = [
  { name: 'CRM', path: '/crm', icon: <FaUsers />, subFeatures: ['Contact Management', 'Lead Management', 'Opportunity Management'] },
  { name: 'HR', path: '/hr', icon: <FaUserTie />, subFeatures: ['Employee Records', 'Payroll Management', 'Attendance Tracking'] },
  { name: 'Inventory', path: '/inventory', icon: <FaBoxes />, subFeatures: ['Inventory Tracking', 'Warehouse Management', 'Purchase Order Management'] },
  { name: 'Accounting', path: '/accounting', icon: <FaFileInvoiceDollar />, subFeatures: ['General Ledger', 'Accounts Payable', 'Accounts Receivable'] },
  { name: 'Project Management', path: '/project-management', icon: <FaProjectDiagram />, subFeatures: ['Project Planning', 'Task Management', 'Resource Management'] },
  { name: 'Procurement', path: '/procurement', icon: <FaShoppingCart />, subFeatures: ['Supplier Management', 'Purchase Order Management', 'Requisition Management'] },
  { name: 'Sales', path: '/sales', icon: <FaChartLine />, subFeatures: ['Sales Order Processing', 'Quotation Management', 'Customer Management'] },
  { name: 'Production', path: '/production', icon: <FaIndustry />, subFeatures: ['Bill of Materials', 'Work Order Management', 'Production Scheduling'] },
  { name: 'Support', path: '/support', icon: <FaHeadset />, subFeatures: ['Ticket Management', 'Knowledge Base', 'Customer Communication'] },
  { name: 'E-commerce', path: '/ecommerce', icon: <FaStore />, subFeatures: ['Platform Integration', 'Order Management', 'Inventory Management'] },
  { name: 'Documents', path: '/documents', icon: <FaFileAlt />, subFeatures: ['Document Storage', 'Document Sharing', 'Document Search'] },
  { name: 'Reporting', path: '/reporting', icon: <FaChartBar />, subFeatures: ['Customizable Dashboards', 'Financial Reports', 'Sales Analytics'] },
  { name: 'Marketing', path: '/marketing', icon: <FaBullhorn />, subFeatures: ['Email Marketing', 'Campaign Management', 'Social Media Integration'] },
  { name: 'Compliance', path: '/compliance', icon: <FaShieldAlt />, subFeatures: ['Regulatory Compliance Tracking', 'Audit Trails', 'Risk Management'] }
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const router = useRouter();

  const toggleModule = (moduleName: string) => {
    if (expandedModule === moduleName) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleName);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="bg-gray-800 text-white fixed top-0 left-0 h-screen p-6 w-64 flex flex-col">
      <div className="flex flex-col items-center mb-8 cursor-pointer" onClick={() => router.push('/dashboard')}>
        <h1 className="text-2xl font-bold mb-4">EntrePartner</h1>
        {user && (
          <>
            <img src={user.photoURL || '/default-profile.png'} alt="User Profile" className="w-24 h-24 rounded-full mb-2" />
            <h2 className="text-xl">Hello, {user.displayName}!</h2>
          </>
        )}
      </div>
      <nav className="flex flex-col space-y-2 flex-1 overflow-y-auto">
        {modules.map((module) => (
          <div key={module.name}>
            <div onClick={() => toggleModule(module.name)} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <span className="text-lg">{module.icon}</span>
              <span>{module.name}</span>
            </div>
            {expandedModule === module.name && (
              <div className="ml-8 mt-2">
                {module.subFeatures.map((subFeature) => (
                  <div key={subFeature} className="text-sm p-1 hover:bg-gray-600 rounded cursor-pointer">
                    {subFeature}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded w-full text-left">
          <FaSignOutAlt className="text-lg" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
