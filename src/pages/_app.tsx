import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/hooks/useProtectRoute';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/Navbar';
import { ModalContextProvider } from '@/hooks/useModal';
import { SearchContextProvider } from '@/hooks/useSearch';

const noAuthRequired = ['/login', '/register'];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const pathname = usePathname();

  return (
    <SearchContextProvider>
      <ModalContextProvider>
        <AuthContextProvider>
          {pathname && noAuthRequired.includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <NavBar />
              <div className="h-screen">
                <Component {...pageProps} />
              </div>
            </ProtectedRoute>
          )}
        </AuthContextProvider>
      </ModalContextProvider>
    </SearchContextProvider>
  );
}
