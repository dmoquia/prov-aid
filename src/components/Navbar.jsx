import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper blue-grey darken-4">
        <a href="/" className="brand-logo">
          Parser<span className="amber accent-4">Mate</span>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/comcast">Comcast</Link>
          </li>
          <li>
            <Link to="/att">AT&T</Link>
          </li>
          <li>
            <Link to="/spectrum">Spectrum</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
