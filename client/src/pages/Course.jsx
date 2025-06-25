import { useParams } from "react-router-dom"; 
import { useEffect } from "react";
import { api } from "../utils/apiHelper";
import { useState } from "react";
import Markdown from "react-markdown";

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    api(`/courses/${id}`).then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }).then((data) => {
      setCourse(data);
    }).catch((err) => {
      setErrors([err.message]);
    });
  }, [id]);
  if (errors.length > 0) {
    return (
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    );
  }
  if (!course) {
    return (
      <div className="wrap">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href={`/courses/${id}/update`}>
            Update Course
          </a>
          <a className="button" href={`/courses/${id}/delete`}>
            Delete Course
          </a>
          <a className="button button-secondary" href="/">
            Return to List
          </a>  
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User.firstName} {course.User.lastName}</p>
              {course.description ? (
                <Markdown>{course.description}</Markdown>
              ) : (
                <p>No description provided</p>
              )}
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {course.materialsNeeded ? (
                  <Markdown>{course.materialsNeeded}</Markdown>
                ) : (
                  <p>No materials needed</p>
                )}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Course;
