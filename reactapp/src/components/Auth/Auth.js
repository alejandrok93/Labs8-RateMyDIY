import React from 'react'; // removed { component } from import

const Auth = () => {
	return (
		<div>
			<a
				href={(process.env.BACKEND_URL || `http://localhost:5000`) + `/signin`}
			>
				Sign Up or Sign In
			</a>
		</div>
	);
};

export default Auth;
