import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { api } from '../utils/apiHelper';
import ErrorsDisplay from '../components/ErrorsDisplay';

const Authenticated = () => {
  const { authUser, credentials } = useContext(UserContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState([]);
  
  // console.log('Authenticated component rendered');
  // console.log('authUser:', authUser);
  // console.log('credentials:', credentials);
  
  useEffect(() => {
    // console.log('useEffect triggered');
    // console.log('authUser in useEffect:', authUser);
    // console.log('credentials in useEffect:', credentials);
    
    if (authUser && credentials) {
      // console.log('Fetching courses for user:', authUser.emailAddress);
      // console.log('Using credentials:', credentials);
      
      api("/courses/me", 'GET', null, credentials)
        .then((res) => {
          // console.log('Response status:', res.status);
          // console.log('Response ok:', res.ok);
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        })
        .then((data) => {
          // console.log('Courses data received:', data);
          setCourses(data);
        })
        .catch((err) => {
          // console.error('Error fetching courses:', err);
          setErrors([err.message]);
        });
    } else {
      // console.log('Not fetching courses because:');
      // console.log('- authUser exist:', !!authUser);
      // console.log('- credentials exist:', !!credentials);
    }
  }, [authUser, credentials]);

  useEffect(() => {
    if (!authUser) {
      navigate('/error');
    }
  }, [authUser, navigate]);

  // Don't render anything if user is not authenticated
  if (!authUser) {
    return null;
  }

  return (
    <main>      
      <div className="wrap main--grid">
        <div className="bounds">
          <div className="grid-100">
            <h1>Welcome, {authUser.firstName} {authUser.lastName}!</h1>
            <p>Your email: {authUser.emailAddress}</p>
          </div>
        </div>
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
      <div className="wrap authorCoursesWrap">
        <ErrorsDisplay errors={errors} />
        <h2>Here are your courses:</h2>
        <div className="authorCourses">
          {courses.length === 0 ? (
            <div className="bounds">
              <div className="grid-100">
                <p>You haven't created any courses yet. Click "New Course" to get started!</p>
              </div>
            </div>
          ) : (
            courses.map((course) => (
              <a className="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
          </a>
            ))
          )}
        </div>
        
      </div>
    </main>
  );
}

export default Authenticated;