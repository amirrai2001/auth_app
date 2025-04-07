import React, { ReactNode } from 'react';
import RestrictWrapper from '@/components/RestrictWrapper';

interface AdminLayoutProps {
  children: ReactNode;
}

const ManagerLayout = ({ children }: AdminLayoutProps) => {
  return (
    <RestrictWrapper allowedRoles={['manager']}>
      {children}
    </RestrictWrapper>
  );
};

export default ManagerLayout ;
