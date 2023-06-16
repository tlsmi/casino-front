import React from 'react';
import '../static/css/error_page.css';
const ErrorPage = () => {
  return (
    <div className='error'>
      <h1 id='errorh1'>Error 404: Page not found :(</h1>
      <p id='errorText'>Sorry, the page you are looking for is not available.</p>
    </div>
  );
};

export default ErrorPage;