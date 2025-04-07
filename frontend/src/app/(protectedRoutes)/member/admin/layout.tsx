import React, { ReactNode } from 'react';
import RestrictWrapper from '@/components/RestrictWrapper';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <RestrictWrapper allowedRoles={['admin']}>
      {children}
    </RestrictWrapper>
  );
};

export default AdminLayout;
