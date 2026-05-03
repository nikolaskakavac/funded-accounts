import { useEffect, useRef, useState } from 'react';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
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
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { detectLang, setLang, onLangChange } from './utils/lang';
import { getMe } from './api';

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('user');
  const [authChecked, setAuthChecked] = useState(false);
  const [, setLangTick] = useState(0);
  const currentLocationRef = useRef(window.location.pathname + window.location.hash);
  const scrollPositionsRef = useRef({});
  const isRestoringScrollRef = useRef(false);

  const saveScrollPosition = () => {
    if (isRestoringScrollRef.current) return;
    scrollPositionsRef.current[currentLocationRef.current] = window.scrollY;
    scrollPositionsRef.current[currentLocationRef.current.split('#')[0]] = window.scrollY;
  };

  const restoreScrollPosition = (to) => {
    const [targetPath, hash] = to.split('#');
    if (hash) return;

    const savedY = scrollPositionsRef.current[to] ?? scrollPositionsRef.current[targetPath];
    if (typeof savedY === 'number') {
      isRestoringScrollRef.current = true;
      const restore = () => {
        window.scrollTo({ top: savedY, left: 0, behavior: 'auto' });
        setTimeout(() => {
          window.scrollTo({ top: savedY, left: 0, behavior: 'auto' });
          isRestoringScrollRef.current = false;
        }, 50);
      };

      requestAnimationFrame(() => requestAnimationFrame(restore));
    }
  };

  const scrollToHash = (hash) => {
    setTimeout(() => {
      if (hash === 'top') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        return;
      }

      const el = document.getElementById(hash);
      if (el) {
        const headerOffset = 80; // keep target visible below fixed header
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: y > 0 ? y : 0, behavior: 'smooth' });
      }
    }, 0);
  };

  const navigate = (to) => {
    const current = window.location.pathname + window.location.hash;
    const [targetPath, hash] = to.split('#');
    if (to === current) {
      if (hash) scrollToHash(hash);
      return;
    }

    saveScrollPosition();
    window.history.pushState({}, '', to);
    // Path should be based on pathname to keep routing simple
    setPath(window.location.pathname);
    currentLocationRef.current = window.location.pathname + window.location.hash;

    if (hash) {
      scrollToHash(hash);
    } else if (['/login', '/register', '/forgot-password', '/about'].includes(targetPath)) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    } else {
      restoreScrollPosition(to);
    }
  };

  useEffect(() => {
    const bootstrapAuth = async () => {
      const storedToken = localStorage.getItem('token') || '';
      const storedRole = localStorage.getItem('role') || 'user';

      if (!storedToken) {
        setAuthChecked(true);
        return;
      }

      try {
        const res = await getMe(storedToken);
        if (!res?.user?.id) {
          throw new Error('Invalid session');
        }

        setToken(storedToken);
        setRole(res.user.role || storedRole || 'user');
        localStorage.setItem('role', res.user.role || storedRole || 'user');
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken('');
        setRole('user');
      } finally {
        setAuthChecked(true);
      }
    };

    bootstrapAuth();
  }, []);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const ref = (url.searchParams.get('ref') || '').trim().toUpperCase();
      if (ref) {
        localStorage.setItem('affiliateReferralCode', ref);
        url.searchParams.delete('ref');
        window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
        setPath(window.location.pathname);
      }
    } catch (err) {
      console.error('Failed to capture affiliate referral code', err);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
      currentLocationRef.current = window.location.pathname + window.location.hash;
      restoreScrollPosition(currentLocationRef.current);
    };
    const onScroll = () => {
      saveScrollPosition();
    };

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.addEventListener('popstate', onPopState);
    window.addEventListener('scroll', onScroll, { passive: true });
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
      window.removeEventListener('scroll', onScroll);
      unsub();
    };
  }, []);

  const handleAuthSuccess = (data) => {
    console.log('handleAuthSuccess called with:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    setToken(data.token);
    setRole(data.user.role);

    const redirectTo = localStorage.getItem('authRedirectTo');
    const isSafeCheckoutRedirect =
      redirectTo?.startsWith('/pay-card/') || redirectTo?.startsWith('/pay-crypto/');

    if (isSafeCheckoutRedirect) {
      localStorage.removeItem('authRedirectTo');
      navigate(redirectTo);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('user');
    setAuthChecked(true);
    navigate('/');
  };

  if (!authChecked) {
    return <div className="min-h-screen bg-black" />;
  }

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
  } else if (path === '/forgot-password') {
    page = <ForgotPassword navigate={navigate} onLogout={handleLogout} />;
  } else if (path === '/verify-email') {
    page = <VerifyEmail navigate={navigate} onLogout={handleLogout} />;
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
      <WhatsAppFloatingButton />
    </div>
  );
};

export default App;
