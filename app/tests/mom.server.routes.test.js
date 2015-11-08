'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mom = mongoose.model('Mom'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mom;

/**
 * Mom routes tests
 */
describe('Mom CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Mom
		user.save(function() {
			mom = {
				name: 'Mom Name'
			};

			done();
		});
	});

	it('should be able to save Mom instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mom
				agent.post('/moms')
					.send(mom)
					.expect(200)
					.end(function(momSaveErr, momSaveRes) {
						// Handle Mom save error
						if (momSaveErr) done(momSaveErr);

						// Get a list of Moms
						agent.get('/moms')
							.end(function(momsGetErr, momsGetRes) {
								// Handle Mom save error
								if (momsGetErr) done(momsGetErr);

								// Get Moms list
								var moms = momsGetRes.body;

								// Set assertions
								(moms[0].user._id).should.equal(userId);
								(moms[0].name).should.match('Mom Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mom instance if not logged in', function(done) {
		agent.post('/moms')
			.send(mom)
			.expect(401)
			.end(function(momSaveErr, momSaveRes) {
				// Call the assertion callback
				done(momSaveErr);
			});
	});

	it('should not be able to save Mom instance if no name is provided', function(done) {
		// Invalidate name field
		mom.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mom
				agent.post('/moms')
					.send(mom)
					.expect(400)
					.end(function(momSaveErr, momSaveRes) {
						// Set message assertion
						(momSaveRes.body.message).should.match('Please fill Mom name');
						
						// Handle Mom save error
						done(momSaveErr);
					});
			});
	});

	it('should be able to update Mom instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mom
				agent.post('/moms')
					.send(mom)
					.expect(200)
					.end(function(momSaveErr, momSaveRes) {
						// Handle Mom save error
						if (momSaveErr) done(momSaveErr);

						// Update Mom name
						mom.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mom
						agent.put('/moms/' + momSaveRes.body._id)
							.send(mom)
							.expect(200)
							.end(function(momUpdateErr, momUpdateRes) {
								// Handle Mom update error
								if (momUpdateErr) done(momUpdateErr);

								// Set assertions
								(momUpdateRes.body._id).should.equal(momSaveRes.body._id);
								(momUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Moms if not signed in', function(done) {
		// Create new Mom model instance
		var momObj = new Mom(mom);

		// Save the Mom
		momObj.save(function() {
			// Request Moms
			request(app).get('/moms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mom if not signed in', function(done) {
		// Create new Mom model instance
		var momObj = new Mom(mom);

		// Save the Mom
		momObj.save(function() {
			request(app).get('/moms/' + momObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mom.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mom instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mom
				agent.post('/moms')
					.send(mom)
					.expect(200)
					.end(function(momSaveErr, momSaveRes) {
						// Handle Mom save error
						if (momSaveErr) done(momSaveErr);

						// Delete existing Mom
						agent.delete('/moms/' + momSaveRes.body._id)
							.send(mom)
							.expect(200)
							.end(function(momDeleteErr, momDeleteRes) {
								// Handle Mom error error
								if (momDeleteErr) done(momDeleteErr);

								// Set assertions
								(momDeleteRes.body._id).should.equal(momSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mom instance if not signed in', function(done) {
		// Set Mom user 
		mom.user = user;

		// Create new Mom model instance
		var momObj = new Mom(mom);

		// Save the Mom
		momObj.save(function() {
			// Try deleting Mom
			request(app).delete('/moms/' + momObj._id)
			.expect(401)
			.end(function(momDeleteErr, momDeleteRes) {
				// Set message assertion
				(momDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mom error error
				done(momDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Mom.remove().exec();
		done();
	});
});