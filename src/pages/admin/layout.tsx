import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminHome from './index';

const navItems = [
  { name: 'Affiliates', path: '/admin/affiliates' },
  // Future modules can be added here
];

export default function AdminLayout() {
  const location = useLocation();
  const isBaseAdmin = location.pathname === '/admin';
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">RemoteTrybe Admin</h1>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname.startsWith(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 text-xs text-gray-400">&copy; {new Date().getFullYear()} RemoteTrybe</div>
      </aside>
      <main className="flex-1 p-8">
        {isBaseAdmin ? <AdminHome /> : <Outlet />}
      </main>
    </div>
  );
} 