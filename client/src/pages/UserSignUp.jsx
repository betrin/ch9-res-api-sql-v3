import { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/apiHelper";

import UserContext from "../context/UserContext";
import ErrorsDisplay from "../components/ErrorsDisplay";

const UserSignUp = () => {
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const password = useRef(null);

  const [errors, setErrors] = useState([]);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      username: username.current.value,
      password: password.current.value,
    }

    try {
      const response = await api('/users', 'POST', user);
      // console.log(response);
      if (response.status === 201) {
        // const user = await response.json();
        console.log('user created ', user);
        await signIn(user);
        navigate('/authenticated');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/error');
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }


  return (
    <main>
      <div className="form--centered">
          <h2>Sign Up</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" ref={firstName} />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" ref={lastName} />
            <label htmlFor="username">Email Address</label>
            <input id="username" name="username" type="email" ref={username} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" ref={password} />
            <button className="button" type="submit">Sign Up</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignUp;