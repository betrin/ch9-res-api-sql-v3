import { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';

const Nav = () => {
  const { authUser } = useContext(UserContext);

  return (
    <nav>
     <ul className="header--signedout">
        {authUser ? (
          <>
            <li>Welcome, {authUser.firstName}!</li>
            <li><Link className="authenticated" to="/authenticated">Authenticated</Link></li>
            <li><Link className="signout" to="/signout">Sign out</Link></li>
          </>
        ) : (
          <>
            <li><Link className="signup" to="/signup">Sign up</Link></li>
            <li><Link className="signin" to="/signin">Sign in</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
