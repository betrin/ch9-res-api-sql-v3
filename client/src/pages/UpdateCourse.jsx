import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";

import UserContext from "../context/UserContext";
import ErrorsDisplay from "../components/ErrorsDisplay";

const UpdateCourse = () => {
  const { authUser, sessionCredentials } = useContext(UserContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    api(`/courses/${id}`).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        // if 404, redirect to NotFound page
        navigate('/notfound');
        return null;
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }).then((data) => {
      if (authUser.id !== data.userId ) {
        navigate('/forbidden');
      }
      setCourse(data);
      // Populate form fields with existing course data
      if (data) {
        title.current.value = data.title || '';
        description.current.value = data.description || '';
        estimatedTime.current.value = data.estimatedTime || '';
        materialsNeeded.current.value = data.materialsNeeded || '';
      }
    }).catch((err) => {
      setErrors([err.message]);
      navigate('/error');
    });
  }, [authUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // create the updated course object
    const updatedCourse = {
      userId: authUser.id,
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    // update the course
    try {
      const response = await api(`/courses/${id}`, 'PUT', updatedCourse, sessionCredentials);
      if (response.status === 204) {
        console.log("course updated")
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/error');
    }
  };

  // handle the cancel button
  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/courses/${id}`);
  };

  return (
    <main>
      <div className="wrap">
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
              <div className="main--flex">
                  <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" ref={title} />
                      <p>By {course?.User?.firstName} {course?.User?.lastName}</p>

                      <label htmlFor="courseDescription">Course Description</label>
                      <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                  </div>
                  <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                  </div>
              </div>
              <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </form>
      </div>
  </main>
  );
};

export default UpdateCourse;