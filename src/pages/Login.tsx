import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { loginWithEmail } from '../features/auth/api/authApi';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await loginWithEmail({ email, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-panel">
        <h1>Login</h1>
        <p className="auth-helper">Use your Supabase account to continue playing AniGuess.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <Button className="button auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Logging In...' : 'Login'}
          </Button>
        </form>

        <p className="auth-switch">
          Need an account? <Link to="/Register">Sign Up</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
