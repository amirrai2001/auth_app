import { Metadata } from 'next';
import Layout from '../../layout/layout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Auth Dashboard',
    description: '',
    robots: { index: false, follow: false },
};

export default function AppLayout({ children }: AppLayoutProps) {
    
    return(
        <>
        <ProtectedRoute>
        <Layout>
        {children}
        </Layout>
        </ProtectedRoute>
        </>

    )
}
