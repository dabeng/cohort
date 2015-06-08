'use strict';

(function() {
	// Cookbooks Controller Spec
	describe('Cookbooks Controller Tests', function() {
		// Initialize global variables
		var CookbooksController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Cookbooks controller.
			CookbooksController = $controller('CookbooksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Cookbook object fetched from XHR', inject(function(Cookbooks) {
			// Create sample Cookbook using the Cookbooks service
			var sampleCookbook = new Cookbooks({
				name: 'New Cookbook'
			});

			// Create a sample Cookbooks array that includes the new Cookbook
			var sampleCookbooks = [sampleCookbook];

			// Set GET response
			$httpBackend.expectGET('cookbooks').respond(sampleCookbooks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cookbooks).toEqualData(sampleCookbooks);
		}));

		it('$scope.findOne() should create an array with one Cookbook object fetched from XHR using a cookbookId URL parameter', inject(function(Cookbooks) {
			// Define a sample Cookbook object
			var sampleCookbook = new Cookbooks({
				name: 'New Cookbook'
			});

			// Set the URL parameter
			$stateParams.cookbookId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/cookbooks\/([0-9a-fA-F]{24})$/).respond(sampleCookbook);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cookbook).toEqualData(sampleCookbook);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Cookbooks) {
			// Create a sample Cookbook object
			var sampleCookbookPostData = new Cookbooks({
				name: 'New Cookbook'
			});

			// Create a sample Cookbook response
			var sampleCookbookResponse = new Cookbooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Cookbook'
			});

			// Fixture mock form input values
			scope.name = 'New Cookbook';

			// Set POST response
			$httpBackend.expectPOST('cookbooks', sampleCookbookPostData).respond(sampleCookbookResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Cookbook was created
			expect($location.path()).toBe('/cookbooks/' + sampleCookbookResponse._id);
		}));

		it('$scope.update() should update a valid Cookbook', inject(function(Cookbooks) {
			// Define a sample Cookbook put data
			var sampleCookbookPutData = new Cookbooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Cookbook'
			});

			// Mock Cookbook in scope
			scope.cookbook = sampleCookbookPutData;

			// Set PUT response
			$httpBackend.expectPUT(/cookbooks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/cookbooks/' + sampleCookbookPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid cookbookId and remove the Cookbook from the scope', inject(function(Cookbooks) {
			// Create new Cookbook object
			var sampleCookbook = new Cookbooks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Cookbooks array and include the Cookbook
			scope.cookbooks = [sampleCookbook];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/cookbooks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCookbook);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cookbooks.length).toBe(0);
		}));
	});
}());