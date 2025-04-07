'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/context/UserContext';

interface RestrictWrapperProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RestrictWrapper = ({ allowedRoles, children }: RestrictWrapperProps) => {
  const { user, loading } = useAuth();

  // While loading, you can optionally render a spinner
  if (loading) return <div>Loading...</div>;

  // If no user is logged in or user's role is not allowed, display a warning
  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        You are not authorized to access this content.
      </div>
    );
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default RestrictWrapper;
