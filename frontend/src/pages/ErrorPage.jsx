import React from 'react';
import '../components/NotFoundPage.css';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="ghost-animation">
        <div className="ghost">
          <div className="face">
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>
      
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-description">
        Oops! The page you're looking for has vanished into the void.
      </p>
      <Link to="/" className="home-button">Return to Safety</Link>
    </div>
  );
};

export default NotFoundPage;