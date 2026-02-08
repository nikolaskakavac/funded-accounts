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
import Instruments from './pages/Instruments';
import Partnerstvo from './pages/Partnerstvo';
import OnSitePaymentPage from './pages/OnSitePayment';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AML from './pages/AML';
import Cookies from './pages/Cookies';
import Risk from './pages/Risk';
import Refund from './pages/Refund';
import Regulatory from './pages/Regulatory';
import LanguageModal from './components/LanguageModal';
import { detectLang, setLang, onLangChange } from './utils/lang';

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');
  const [, setLangTick] = useState(0);

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
    const unsub = onLangChange(() => {
      setLangTick((n) => n + 1);
    });
    return () => {
      window.removeEventListener('popstate', onPopState);
      unsub();
    };
  }, []);

  const handleAuthSuccess = (data) => {
    console.log('handleAuthSuccess called with:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    setToken(data.token);
    setRole(data.user.role);
    navigate('/dashboard');
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
  } else if (path === '/instruments') {
    page = <Instruments navigate={navigate} token={token} onLogout={handleLogout} />;
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
  } else if (path === '/terms') {
    page = <Terms navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/privacy') {
    page = <Privacy navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/aml') {
    page = <AML navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/cookies') {
    page = <Cookies navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/risk') {
    page = <Risk navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/refund') {
    page = <Refund navigate={navigate} token={token} onLogout={handleLogout} />;
  } else if (path === '/regulatory') {
    page = <Regulatory navigate={navigate} token={token} onLogout={handleLogout} />;
  } else {
    page = <Landing navigate={navigate} token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen">
      <LanguageModal onLanguageSelected={() => {}} />
      {page}
    </div>
  );
};

export default App;
