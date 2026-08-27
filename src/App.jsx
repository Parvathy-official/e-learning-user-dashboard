// =========================================================
//  App.jsx — Root: Providers + Router + Layout
// =========================================================

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                borderRadius: '10px',
                boxShadow: '0 10px 25px rgba(15,23,42,0.12)',
                border: '1px solid #E2E8F0',
              },
              success: {
                iconTheme: { primary: '#10B981', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#EF4444', secondary: '#fff' },
              },
            }}
          />

          <Navbar />

          {/* Page content — takes remaining height */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AppRoutes />
          </main>

          <Footer />
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
