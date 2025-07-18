import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const {authUser } = useContext(UserContext);
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  if (authUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  };
};

export default PrivateRoute;