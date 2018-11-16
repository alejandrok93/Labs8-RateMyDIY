// DEPENDENCIES
const express = require('express');

const server = express();

const db = require('./config/dbConfig');

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
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
		html: '<strong>Thank you for subscribing to Rate My DIY mail service.</strong>',
	};
	if (!req.body.to) {
		return res.status(422).json({ error: 'Email cannot be empty.' });
	} else {
		// pulls api key from .env file
		sgMail.setApiKey(process.env.SENDGRID_API_KEY)
		// sends email based on message object set above.
		sgMail.send(msg).then(() => {
			res.status(200).json({ message: `Email successfully sent to ${recipient}` }).end();
		}).catch(err => {
			console.error(err.toString());
			res.status(500).end();
		});
	}
});

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

server.use('/', authRoutes);
server.use('/api/projects', projectRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/users', userRoutes);

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// // Error handlers
// // Catch 404 and forward to error handler
// server.use(function(req, res, next) {
// 	const err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);

// });

// // Development error handler
// // Will print stacktrace

// if (server.get('env') === 'development') {
// 	server.use(function(err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.json({
// 			message: err.message,
// 			error: err
// 		});
// 	});

// }

// // Production error handler
// // No stacktraces leaked to user
// server.use(function(err, req, res, next) {

// 	res.status(err.status || 500);
// 	res.json({
// 		message: err.message,
// 		error: {}
// 	});

// });

module.exports = server;
