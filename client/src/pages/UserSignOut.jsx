import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const UserSignOut = () => {
  const { signOut } = useContext(UserContext);

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <Navigate to="/" replace />;
}

export default UserSignOut