import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithoutAuth = (WrappedComponent) => {
  const WithoutAuth = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        // Check if the token is expired
        if (decodedToken && !isTokenExpired(decodedToken.exp)) {
          // If token is valid and not expired, redirect to dashboard
          navigate('/admin/dashboard');
        } else {
          // If token is invalid or expired, allow access to the wrapped component
          setIsLoading(false);
        }
      } else {
        // No token found, allow access to the wrapped component
        setIsLoading(false);
      }
    }, [navigate]);

    // Decode JWT token
    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        // Return null if the token cannot be decoded
        return null;
      }
    };

    // Check if token is expired
    const isTokenExpired = (exp) => {
      const currentTime = Date.now() / 1000;
      return currentTime > exp;
    };

    // Render the wrapped component if not loading
    return isLoading ? null : <WrappedComponent {...props} />;
  };

  return WithoutAuth;
};

export default WithoutAuth;
