import { Auth0Lock } from 'auth0-lock';
import logo from '../../assets/images/qraft-logo.png';

//process.env.REACT_APP_AUTH_CLIENT_ID
//process.env.REACT_APP_AUTH_DOMAIN_URL
const options = {
	theme: {
		logo: logo
	},
	socialButtonStyle: 'small',
	auth: {
		sso: false,
		redirectUrl:
			process.env.REACT_APP_REDIRECT_URL || 'http://localhost:3000/callback'
	}
};

export default class Auth0 {
	lock = new Auth0Lock(
		process.env.REACT_APP_AUTH_CLIENT_ID,
		process.env.REACT_APP_AUTH_DOMAIN_URL,
		options
	);

	login = () => {
		this.lock.show({ initialScreen: 'login' });
	};

	signUp = () => {
		this.lock.show({ initialScreen: 'signUp' });
	};
}
