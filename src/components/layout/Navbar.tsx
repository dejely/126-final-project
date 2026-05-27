import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getSupabaseClient } from '../../lib/supabase/supabaseClient';
import { logout } from '../../features/auth/api/authApi';

interface NavbarLink {
  label: ReactNode;
  to: string;
  end?: boolean;
}

interface NavbarProps {
  brand?: ReactNode;
  links?: NavbarLink[];
  actions?: ReactNode;
  className?: string;
  brandClassName?: string;
  linksClassName?: string;
  actionsClassName?: string;
}

const defaultLinks: NavbarLink[] = [
  { label: 'Home', to: '/', end: true },
  { label: 'Series', to: '/SeriesGame' },
  { label: 'Popularity', to: '/PopularityGame' },
  { label: 'Characters', to: '/CharacterGame' },
  { label: 'Achievements', to: '/Achievements' },
  { label: 'Leaderboard', to: '/Leaderboard' },
];

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ');
}

const Navbar = ({
  links,
  actions,
  className,
  brandClassName,
  linksClassName,
  actionsClassName,
}: NavbarProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const supabase = getSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setIsLoggedIn(Boolean(data.session));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const navLinks = useMemo(
    () =>
      links ?? defaultLinks,
    [links],
  );

  const handleLogout = async () => {
    setLogoutError('');
    setLoggingOut(true);

    try {
      await logout();
      setIsLoggedIn(false);
      navigate('/Login');
    } catch (err) {
      setLogoutError(err instanceof Error ? err.message : 'Logout failed.');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className={joinClassNames('navbar', className)} aria-label="Main navigation">
      <NavLink to="/" className={joinClassNames('navbar__brand', brandClassName)}>
        <img src="/aniguess_logo.png" alt="Aniguess_Logo" className="navbar-logo"/>
      </NavLink>

      <div className={joinClassNames('navbar__links', linksClassName)}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              joinClassNames('navbar__link', isActive && 'navbar__link--active')
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className={joinClassNames('navbar__actions', actionsClassName)}>
        {actions}
        {logoutError && <span className="navbar__error">{logoutError}</span>}
        {isLoggedIn ? (
          <button
            type="button"
            className="navbar__button"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        ) : (
          <NavLink to="/Login" className="navbar__button">
            Login/Signup
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
