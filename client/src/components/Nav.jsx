import { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import UserContext from '../context/UserContext';

const Nav = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <nav>
     <ul className="header--signedout">
        {authUser ? (
          <>
            <li>Welcome, {authUser.firstName}!</li>
            <li><Link className="authenticated" to="/authenticated">My Profile</Link></li>
            <li><Link className="signout" to="/signout">Sign out</Link></li>
          </>
        ) : (
          <>
            <li><Link className="signup" to="/signup">Sign up</Link></li>
            {/* pass the current pathname to the signin page */}
            <li><Link className="signin" to="/signin" state={{ from: location.pathname }}>Sign in</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
