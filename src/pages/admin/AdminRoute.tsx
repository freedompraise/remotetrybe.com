import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) return <div>Loading authentication...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default AdminRoute; 