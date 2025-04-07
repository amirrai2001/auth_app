import React, { ReactNode } from 'react';
import RestrictWrapper from '@/components/RestrictWrapper';

interface AdminLayoutProps {
  children: ReactNode;
}

const ProductsLayout = ({ children }: AdminLayoutProps) => {
  return (
    <RestrictWrapper allowedRoles={['admin', 'manager']}>
      {children}
    </RestrictWrapper>
  );
};

export default ProductsLayout;
