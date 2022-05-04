import { ReactNode } from 'react';
// guards
//import AuthGuard from '../guards/AuthGuard';
// components
import MainLayout from './main';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: 'main' | 'dashboard';
};
export default function Layout({ variant = 'dashboard', children }: Props) {

  return <MainLayout> {children} </MainLayout>;
}
/*
<AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    </AuthGuard>
    */
