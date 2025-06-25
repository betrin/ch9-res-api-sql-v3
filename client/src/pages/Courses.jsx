import { api } from "../utils/apiHelper";
import { useState, useEffect } from "react";
import ErrorsDisplay from '../components/ErrorsDisplay';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    api("/courses")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      })
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        setErrors([err.message]);
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
            New Course
          </span>
        </a>
      </div>
    </main>
  );
}

export default Courses;