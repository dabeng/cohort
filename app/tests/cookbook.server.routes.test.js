'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Cookbook = mongoose.model('Cookbook'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, cookbook;

/**
 * Cookbook routes tests
 */
describe('Cookbook CRUD tests', function() {
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

		// Save a user to the test db and create new Cookbook
		user.save(function() {
			cookbook = {
				name: 'Cookbook Name'
			};

			done();
		});
	});

	it('should be able to save Cookbook instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cookbook
				agent.post('/cookbooks')
					.send(cookbook)
					.expect(200)
					.end(function(cookbookSaveErr, cookbookSaveRes) {
						// Handle Cookbook save error
						if (cookbookSaveErr) done(cookbookSaveErr);

						// Get a list of Cookbooks
						agent.get('/cookbooks')
							.end(function(cookbooksGetErr, cookbooksGetRes) {
								// Handle Cookbook save error
								if (cookbooksGetErr) done(cookbooksGetErr);

								// Get Cookbooks list
								var cookbooks = cookbooksGetRes.body;

								// Set assertions
								(cookbooks[0].user._id).should.equal(userId);
								(cookbooks[0].name).should.match('Cookbook Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Cookbook instance if not logged in', function(done) {
		agent.post('/cookbooks')
			.send(cookbook)
			.expect(401)
			.end(function(cookbookSaveErr, cookbookSaveRes) {
				// Call the assertion callback
				done(cookbookSaveErr);
			});
	});

	it('should not be able to save Cookbook instance if no name is provided', function(done) {
		// Invalidate name field
		cookbook.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cookbook
				agent.post('/cookbooks')
					.send(cookbook)
					.expect(400)
					.end(function(cookbookSaveErr, cookbookSaveRes) {
						// Set message assertion
						(cookbookSaveRes.body.message).should.match('Please fill Cookbook name');
						
						// Handle Cookbook save error
						done(cookbookSaveErr);
					});
			});
	});

	it('should be able to update Cookbook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cookbook
				agent.post('/cookbooks')
					.send(cookbook)
					.expect(200)
					.end(function(cookbookSaveErr, cookbookSaveRes) {
						// Handle Cookbook save error
						if (cookbookSaveErr) done(cookbookSaveErr);

						// Update Cookbook name
						cookbook.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Cookbook
						agent.put('/cookbooks/' + cookbookSaveRes.body._id)
							.send(cookbook)
							.expect(200)
							.end(function(cookbookUpdateErr, cookbookUpdateRes) {
								// Handle Cookbook update error
								if (cookbookUpdateErr) done(cookbookUpdateErr);

								// Set assertions
								(cookbookUpdateRes.body._id).should.equal(cookbookSaveRes.body._id);
								(cookbookUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Cookbooks if not signed in', function(done) {
		// Create new Cookbook model instance
		var cookbookObj = new Cookbook(cookbook);

		// Save the Cookbook
		cookbookObj.save(function() {
			// Request Cookbooks
			request(app).get('/cookbooks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Cookbook if not signed in', function(done) {
		// Create new Cookbook model instance
		var cookbookObj = new Cookbook(cookbook);

		// Save the Cookbook
		cookbookObj.save(function() {
			request(app).get('/cookbooks/' + cookbookObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', cookbook.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Cookbook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cookbook
				agent.post('/cookbooks')
					.send(cookbook)
					.expect(200)
					.end(function(cookbookSaveErr, cookbookSaveRes) {
						// Handle Cookbook save error
						if (cookbookSaveErr) done(cookbookSaveErr);

						// Delete existing Cookbook
						agent.delete('/cookbooks/' + cookbookSaveRes.body._id)
							.send(cookbook)
							.expect(200)
							.end(function(cookbookDeleteErr, cookbookDeleteRes) {
								// Handle Cookbook error error
								if (cookbookDeleteErr) done(cookbookDeleteErr);

								// Set assertions
								(cookbookDeleteRes.body._id).should.equal(cookbookSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Cookbook instance if not signed in', function(done) {
		// Set Cookbook user 
		cookbook.user = user;

		// Create new Cookbook model instance
		var cookbookObj = new Cookbook(cookbook);

		// Save the Cookbook
		cookbookObj.save(function() {
			// Try deleting Cookbook
			request(app).delete('/cookbooks/' + cookbookObj._id)
			.expect(401)
			.end(function(cookbookDeleteErr, cookbookDeleteRes) {
				// Set message assertion
				(cookbookDeleteRes.body.message).should.match('User is not logged in');

				// Handle Cookbook error error
				done(cookbookDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Cookbook.remove().exec();
		done();
	});
});