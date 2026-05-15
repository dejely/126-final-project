import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';

function Header() {
  return (
    <header id="header" className="siteHeader">
      <a className="brand" href="/" aria-label="Aniguess home">
        <span className="brand__mark" aria-hidden="true">
          A
        </span>
        <span className="brand__name">Aniguess</span>
      </a>

      <Navbar />

      <a className="communityButton" href="/community">
        <MessageCircle aria-hidden="true" size={19} strokeWidth={2.3} />
        <span>Join Community</span>
      </a>
    </header>
  );
}

export default Header;
