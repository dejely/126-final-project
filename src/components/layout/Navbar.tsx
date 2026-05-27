import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

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
  links = defaultLinks,
  actions,
  className,
  brandClassName,
  linksClassName,
  actionsClassName,
}: NavbarProps) => {
  return (
    <nav className={joinClassNames('navbar', className)} aria-label="Main navigation">
      <NavLink to="/" className={joinClassNames('navbar__brand', brandClassName)}>
        <img src="/aniguess_logo.png" alt="Aniguess_Logo" className="navbar-logo"/>
      </NavLink>

      <div className={joinClassNames('navbar__links', linksClassName)}>
        {links.map((link) => (
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

      {actions && (
        <div className={joinClassNames('navbar__actions', actionsClassName)}>
          {actions}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
