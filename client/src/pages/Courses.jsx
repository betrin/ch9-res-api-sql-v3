import { api } from "../utils/apiHelper";
import { useState, useEffect, useContext } from "react";
import ErrorsDisplay from '../components/ErrorsDisplay';
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState([]);
  const { authUser } = useContext(UserContext);

  // get the courses for the page
  useEffect(() => {
    api("/courses")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      })
      // set the courses data for page
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        setErrors([err.message]);
        navigate('/error');
      });
  }, []);
  
  return (
    <main>      
      <div className="wrap main--grid">
        <ErrorsDisplay errors={errors} />
        {courses.map((course) => (
          <a className="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </a>
        ))}
        <a className="course--module course--add--module" href="/courses/create">
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            {authUser ? 'New Course' : 'Sign In to Create a Course'}
          </span>
        </a>
      </div>
    </main>
  );
}

export default Courses;