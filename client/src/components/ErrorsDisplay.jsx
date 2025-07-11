const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors && errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
};

export default ErrorsDisplay;
