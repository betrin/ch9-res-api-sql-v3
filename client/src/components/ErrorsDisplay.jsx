const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
        </ul>
    </div>
    );
  }

  return errorsDisplay;
};

export default ErrorsDisplay;
