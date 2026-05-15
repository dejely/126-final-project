import { Download, Gamepad2, Home, Star, Trophy, type LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home, active: true },
  { href: '/game-modes', label: 'Game Modes', icon: Gamepad2 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/achievements', label: 'Achievements', icon: Star },
  { href: '/download', label: 'Download', icon: Download },
];

function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      {navItems.map(({ href, label, icon: Icon, active }) => (
        <a
          key={href}
          className={`navbar__link${active ? ' is-active' : ''}`}
          href={href}
          aria-current={active ? 'page' : undefined}
        >
          <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

export default Navbar;
