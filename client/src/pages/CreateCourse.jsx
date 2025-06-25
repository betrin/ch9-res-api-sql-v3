import { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/apiHelper";

import UserContext from "../context/UserContext";
import ErrorsDisplay from "../components/ErrorsDisplay";

const CreateCourse = () => {
  const { authUser, sessionCredentials } = useContext(UserContext);
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // create the course object
    const course = {
      userId: authUser.id,
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };
    
    // create the course
    try {
      const response = await api('/courses', 'POST', course, sessionCredentials);
      if (response.status === 201) {
        // get the id of the course from the response
        console.log("course was successfully created!")
        navigate("/");
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

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <main>
      <div className="wrap">
          <h2>Create Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
              <div className="main--flex">
                  <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                      <p>By Joe Smith</p>

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
              <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </form>
      </div>
  </main>
  );
};

export default CreateCourse;