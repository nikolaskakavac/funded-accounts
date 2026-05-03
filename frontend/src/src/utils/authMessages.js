export const authMessage = (message, fallback = 'Something went wrong. Please try again.') => {
  const text = String(message || '').trim();
  const normalized = text.toLowerCase();

  if (!text) return fallback;

  if (
    normalized.includes('neispravan') ||
    normalized.includes('invalid email or password')
  ) {
    return 'Invalid email or password';
  }

  if (
    normalized.includes('email adresa') ||
    normalized.includes('already exists')
  ) {
    return 'Email address already exists';
  }

  if (normalized.includes('registracija') || normalized.includes('register')) {
    return 'Registration failed. Please try again.';
  }

  if (normalized.includes('prijava') || normalized.includes('login')) {
    return 'Login failed. Please try again.';
  }

  return text;
};
