import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  });

  return <>{user ? children : null}</>;
};
