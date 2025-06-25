import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Authenticated from './pages/Authenticated';
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import UpdateCourse from "./pages/UpdateCourse";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import UserSignOut from "./pages/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./pages/Error";
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="/authenticated" element={<Authenticated />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App