import { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import CryptoPaymentPage from './pages/CryptoPaymentPage';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Partnerstvo from './pages/Partnerstvo';
import OnSitePaymentPage from './pages/OnSitePayment';
import { detectLang, setLang } from './utils/lang';

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');

  const navigate = (to) => {
    const current = window.location.pathname + window.location.hash;
    if (to !== current) {
      window.history.pushState({}, '', to);
      // Path should be based on pathname to keep routing simple
      setPath(window.location.pathname);
      const hash = to.split('#')[1];
      if (hash) {
        // Scroll after render
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const headerOffset = 80; // keep target visible below fixed header
            const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: y > 0 ? y : 0, behavior: 'smooth' });
          }
        }, 0);
      }
    }
  };

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    // Set html data-lang for CSS/clients
    try {
      const initialLang = detectLang();
      setLang(initialLang);
    } catch (err) {
      console.error('Failed to set data-lang', err);
    }
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleAuthSuccess = (data) => {
    console.log('handleAuthSuccess called with:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('user');
    navigate('/');
  };

  let page = null;

  if (path === '/') {
    page = <Landing navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/pricing') {
    page = <Pricing navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/about') {
    page = <About navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/partnerstvo') {
    page = <Partnerstvo navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/contact') {
    page = <Contact navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/login') {
    page = <Login navigate={navigate} onLogin={handleAuthSuccess} onLogout={handleLogout} />;
  } else if (path === '/register') {
    page = <Register navigate={navigate} onRegister={handleAuthSuccess} onLogout={handleLogout} />;
  } else if (path === '/dashboard') {
    page = (
      <Dashboard
        navigate={navigate}
        token={token}
        onLogout={handleLogout}
      />
    );
  } else if (path === '/admin') {
    if (!token || role !== 'admin') {
      navigate('/dashboard');
      page = null;
    } else {
      page = <Admin navigate={navigate} token={token} onLogout={handleLogout} />;
    }
  } else if (path.startsWith('/success')) {
    page = <Success navigate={navigate} onLogout={handleLogout} />;
  } else if (path === '/cancel') {
    page = <Cancel navigate={navigate} onLogout={handleLogout} />;
  } else if (path.startsWith('/pay-crypto/')) {
    const parts = path.split('/');
    const planId = parts[2];
    page = (
      <CryptoPaymentPage
        navigate={navigate}
        token={token}
        planId={planId}
        onLogout={handleLogout}
      />
    );
  } else if (path.startsWith('/pay-card/')) {
    const parts = path.split('/');
    const planId = parts[2];
    page = (
      <OnSitePaymentPage
        navigate={navigate}
        token={token}
        planId={planId}
        onLogout={handleLogout}
      />
    );
  } else {
    page = <Landing navigate={navigate} token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen">
      {page}
    </div>
  );
};

export default App;
