import { Link, useLocation } from 'react-router-dom';
import { paths } from './utils/paths'

// eslint-disable-next-line react/prop-types
function Nav() {
  const location = useLocation();
  const { pathname } = location;


  const isPathActive = (path) => {
    return pathname === path || pathname.startsWith(path) ? 'activeLink' : '';
  };

  const generateLinks = (pathsArray) => 
    pathsArray
      .map((path) => (
        <Link key={path.label} to={path.path} className={isPathActive(path.path)}>
          {path.label}
        </Link>
      ));

  return (
    <div className="buttonLinks">
      <div className="navbar">
        <div className="topNavbar">
          <div className="centeredLink">
            {/* <Link to="/" className={isPathActive('/')}>
              Home
            </Link> */}
          </div>
        </div>
        <div className="mainNavbar">
          <Link to="/" className={isPathActive('/')}>
            Configuration Manager
          </Link>
          {generateLinks(paths)}
        </div>
      </div>
    </div>
  );
}

export default Nav;
