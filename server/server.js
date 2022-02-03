const express = require('express');
const server = express();
const db = require('./config/dbConfig');
const sgMail = require('@sendgrid/mail');

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');
configureMiddleware(server);

// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');

// SANITY CHECK
server.get('/', (req, res) => {
	res.send(
		`Believe it or not, this is the first endpoint added to the great RateMyDIY project.`
	);
});

// sendgrid test implementation
server.post('/sendgrid/test', (req, res) => {
	const recipient = req.body.to;
	const msg = {
		to: recipient,
		from: 'ratemydyics@ratemydyi.com',
		subject: 'Welcome to RateMyDIY',
		text: `Thank you for subscribing to Rate My DIY mail service.`,
		html:
			'<strong>Thank you for subscribing to Rate My DIY mail service.</strong>'
	};
	if (!req.body.to) {
		return res.status(422).json({ error: 'Email cannot be empty.' });
	} else {
		// pulls api key from .env file
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		// sends email based on message object set above.
		sgMail
			.send(msg)
			.then(() => {
				res
					.status(200)
					.json({ message: `Email successfully sent to ${recipient}` })
					.end();
			})
			.catch(err => {
				console.error(err.toString());
				res.status(500).end();
			});
	}
});

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const postRoutes = require('./routes/postRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const landingPageRoutes = require('./routes/landingPageRoutes');
const searchRoutes = require('./routes/searchRoutes');
const filterRoutes = require('./routes/filterRoutes');

server.use('/', authRoutes);
server.use('/api/users', userRoutes);
server.use('/api/projects', projectRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/reviews', reviewRoutes);
server.use('/api/lp', landingPageRoutes);
server.use('/api/search', searchRoutes);
server.use('/api/filter', filterRoutes);

module.exports = server;
