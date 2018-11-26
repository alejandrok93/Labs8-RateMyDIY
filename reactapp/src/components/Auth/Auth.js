import React from 'react'; // removed { component } from import

const Auth = () => {
	return (
		<div>
			<a
				href={
					(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`
				}
			>
				Sign Up or Sign In
			</a>
		</div>
	);
};

export default Auth;
