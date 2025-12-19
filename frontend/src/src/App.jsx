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

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');

  const navigate = (to) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to);
      setPath(to);
    }
  };

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    setToken(data.token);
    setRole(data.user.role);
    navigate('/dashboard'); // posle login + register uvek na dashboard
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
    page = <Landing navigate={navigate} token={token} />;
  } else if (path === '/pricing') {
    page = <Pricing navigate={navigate} token={token} />;
  } else if (path === '/about') {
    page = <About navigate={navigate} token={token} />;
  } else if (path === '/contact') {
    page = <Contact navigate={navigate} token={token} />;
  } else if (path === '/login') {
    page = <Login navigate={navigate} onLogin={handleAuthSuccess} />;
  } else if (path === '/register') {
    page = <Register navigate={navigate} onRegister={handleAuthSuccess} />;
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
      page = <Admin navigate={navigate} token={token} />;
    }
  } else if (path.startsWith('/success')) {
    page = <Success navigate={navigate} />;
  } else if (path === '/cancel') {
    page = <Cancel navigate={navigate} />;
  } else if (path.startsWith('/pay-crypto/')) {
    const parts = path.split('/');
    const planId = parts[2];
    page = (
      <CryptoPaymentPage
        navigate={navigate}
        token={token}
        planId={planId}
      />
    );
  } else {
    page = <Landing navigate={navigate} token={token} />;
  }

  return (
    <div className="min-h-screen">
      {page}
    </div>
  );
};

export default App;
