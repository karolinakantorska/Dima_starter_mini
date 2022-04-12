import { ReactNode } from 'react';
// components
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: 'main' | 'dashboard' | 'logoOnly';
};

export default function Layout({ variant = 'dashboard', children }: Props) {
  if (variant === 'logoOnly') {
    //<LogoOnlyLayout> bei fehler site
    return <LogoOnlyLayout> LogoOnlyLayout {children} </LogoOnlyLayout>;
  }

  return <DashboardLayout> {children} </DashboardLayout>;
}
