// _app.tsx
import { useRouter } from 'next/router';
import { AuthProvider } from './authContext'; // Import your AuthProvider
import type { AppProps } from 'next/app';

const PROTECTED_ROUTES = ['/community', '/dashboard']; 

function MyApp({ children}) {
  const router = useRouter();

  const isProtectedRoute = PROTECTED_ROUTES.includes(router.pathname);

  return (
    <>
      {isProtectedRoute ? (
        <AuthProvider initialAuthData={{ user: null, token: null }}>
         {children}
        </AuthProvider>
      ) : (
        {children}
      )}
    </>
  );
}

export default MyApp;
