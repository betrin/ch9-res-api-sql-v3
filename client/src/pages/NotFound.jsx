import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <div className="wrap">
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
        <Link to="/" className="button">
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;