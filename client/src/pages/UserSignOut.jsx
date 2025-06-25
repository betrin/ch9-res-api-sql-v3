import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const UserSignOut = () => {
  const { signOut, authUser } = useContext(UserContext);

  useEffect(() => {
    console.log('Signing out user:', authUser);
    signOut();
    console.log('Sign out completed');
  }, [signOut, authUser]);

  // Always redirect to home page after sign out
  return <Navigate to="/" replace />;
}

export default UserSignOut