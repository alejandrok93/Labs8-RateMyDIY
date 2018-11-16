import React from "react"; // removed { component } from import

const Auth = () => {
  const port = 5000;
  return (
    <div>
      <a href={`${process.env.API_URL || `http://localhost:${port}`}/signin`}>
        Sign Up or Sign In
      </a>
    </div>
  );
};

export default Auth;
