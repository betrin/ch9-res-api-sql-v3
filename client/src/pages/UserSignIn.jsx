import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "../components/ErrorsDisplay";

const UserSignIn = () => {
  const { signIn, authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);
  // state to track if the user is signing in
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Clear any problematic state when component mounts
  useEffect(() => {
    // If user is already authenticated 
    if (authUser && !isSigningIn) {
      navigate('/authenticated', { replace: true });
    }
  }, [authUser, navigate, isSigningIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);
    
    let from = '/authenticated';
    
    // check if the user is coming from a specific page
    if (location.state && location.state.from) {
      const fromPath = location.state.from;
      // console.log('From path:', fromPath);
      // dont allow to return to signup or signin as that would be a loop
      if (fromPath !== '/signin' && fromPath !== '/signup') {
        from = fromPath;
      }
    }


    // create the credentials object
    const credentials = {
      username: username.current.value,
      password: password.current.value
    }

    try {
      const user = await signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(['Sign in was unsuccessful']);
        setIsSigningIn(false);
      }
    } catch (error) {
      console.log('Error during sign in: ', error);
      setErrors(['An error occurred during sign in']);
      setIsSigningIn(false);
      navigate('/error');
    }
  }

  const handleCancel = () => {
    navigate('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email Address</label>
            <input id="username" name="username" type="email" ref={username} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" ref={password} />
            <button className="button" type="submit">Sign In</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignIn;