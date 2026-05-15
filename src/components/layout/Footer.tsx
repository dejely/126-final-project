import {
  Bug,
  Download,
  Gamepad2,
  Mail,
  MessageCircle,
  Music2,
  Send,
  Star,
  Trophy,
} from 'lucide-react';

const footerGroups = [
  {
    title: 'Game',
    links: [
      { href: '/game-modes', label: 'Game Modes' },
      { href: '/how-to-play', label: 'How to Play' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/leaderboard', label: 'Leaderboard' },
      { href: '/achievements', label: 'Achievements' },
      { href: '/community', label: 'Discord' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/download', label: 'Download' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/bug-report', label: 'Report Bug' },
    ],
  },
];

const socialLinks = [
  { href: '/community', label: 'Community', icon: MessageCircle },
  { href: '/updates', label: 'Updates', icon: Send },
  { href: '/videos', label: 'Videos', icon: Gamepad2 },
  { href: '/clips', label: 'Clips', icon: Music2 },
];

export default function Footer() {
  return (
    <footer id="footer" className="siteFooter">
      <div className="siteFooter__brand">
        <a className="brand brand--footer" href="/" aria-label="Aniguess home">
          <span className="brand__mark" aria-hidden="true">
            A
          </span>
          <span className="brand__name">Aniguess</span>
        </a>
        <div>
          <p>
            The ultimate anime guessing game. Challenge yourself, beat the
            leaderboard, and become a legend.
          </p>
        </div>
      </div>

      <div className="siteFooter__links" aria-label="Footer navigation">
        {footerGroups.map((group) => (
          <div className="siteFooter__group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="siteFooter__follow">
        <h2>Follow Us</h2>
        <div className="socialLinks">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a key={href} href={href} aria-label={label}>
              <Icon aria-hidden="true" size={19} strokeWidth={2.2} />
            </a>
          ))}
        </div>
        <div className="siteFooter__quickActions" aria-label="Quick links">
          <a href="/download">
            <Download aria-hidden="true" size={16} />
            Download
          </a>
          <a href="/leaderboard">
            <Trophy aria-hidden="true" size={16} />
            Leaderboard
          </a>
          <a href="/achievements">
            <Star aria-hidden="true" size={16} />
            Achievements
          </a>
          <a href="/contact">
            <Mail aria-hidden="true" size={16} />
            Contact
          </a>
          <a href="/bug-report">
            <Bug aria-hidden="true" size={16} />
            Bug Report
          </a>
        </div>
        <p>© 2026 Aniguess. All rights reserved.</p>
      </div>
    </footer>
  );
}
