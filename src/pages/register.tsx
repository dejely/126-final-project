import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { registerWithEmail } from '../features/auth/api/authApi';

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const result = await registerWithEmail({ email, password });

      if (result.session) {
        navigate('/');
        return;
      }

      setStatus('Account created. Check your email to confirm your registration.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-panel">
        <h1>Create Account</h1>
        <p className="auth-helper">Register with Supabase Auth to save your AniGuess account.</p>

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
              minLength={6}
              autoComplete="new-password"
            />
          </label>

          <label className="auth-field">
            <span>Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {status && <p className="auth-status">{status}</p>}

          <Button className="button auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
