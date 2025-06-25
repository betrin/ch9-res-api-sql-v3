import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useContext } from "react";
import { api } from "../utils/apiHelper";
import { useState } from "react";
import Markdown from "react-markdown";
import UserContext from "../context/UserContext";

const Course = () => {
  const navigate = useNavigate();
  const { sessionCredentials, authUser } = useContext(UserContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);

  
  // get the course for the page
  useEffect(() => {
    api(`/courses/${id}`).then((res) => {
      console.log('Response status:', res.status);
      if (res.status === 404) {
        // Course not found, redirect to NotFound page
        navigate('/notfound');
        return null;
      } else if (res.ok) {
        return res.json();
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }).then((data) => {
      if (data) {
        setCourse(data);
      }
    }).catch((err) => {
      console.error('Error fetching course:', err);
      setErrors([err.message]);
    });
  }, [id, navigate]);

  if (errors.length > 0) {
    return (
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    );
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await api(`/courses/${id}`, 'DELETE', course, sessionCredentials);
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error(`ERROR - HTTP status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      navigate('/error');
    }
  };

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
          {authUser && authUser.id === course.userId && (
            <>
              <a className="button" href={`/courses/${id}/update`}>
                Update Course
              </a>
              <a className="button" onClick={handleDelete}>
                Delete Course
              </a>
            </>
          )}
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
