import { Link } from 'react-router-dom';

export default function AdminHome() {
  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the RemoteTrybe Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage affiliates, payouts, and more from this dashboard. Use the navigation to access different modules.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          to="/admin/affiliates"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Go to Affiliates
        </Link>
        {/* Add more quick links as you add modules */}
      </div>
    </div>
  );
} 