'use strict';

(function() {
	// Moms Controller Spec
	describe('Moms Controller Tests', function() {
		// Initialize global variables
		var MomsController,
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

			// Initialize the Moms controller.
			MomsController = $controller('MomsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mom object fetched from XHR', inject(function(Moms) {
			// Create sample Mom using the Moms service
			var sampleMom = new Moms({
				name: 'New Mom'
			});

			// Create a sample Moms array that includes the new Mom
			var sampleMoms = [sampleMom];

			// Set GET response
			$httpBackend.expectGET('moms').respond(sampleMoms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.moms).toEqualData(sampleMoms);
		}));

		it('$scope.findOne() should create an array with one Mom object fetched from XHR using a momId URL parameter', inject(function(Moms) {
			// Define a sample Mom object
			var sampleMom = new Moms({
				name: 'New Mom'
			});

			// Set the URL parameter
			$stateParams.momId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/moms\/([0-9a-fA-F]{24})$/).respond(sampleMom);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mom).toEqualData(sampleMom);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Moms) {
			// Create a sample Mom object
			var sampleMomPostData = new Moms({
				name: 'New Mom'
			});

			// Create a sample Mom response
			var sampleMomResponse = new Moms({
				_id: '525cf20451979dea2c000001',
				name: 'New Mom'
			});

			// Fixture mock form input values
			scope.name = 'New Mom';

			// Set POST response
			$httpBackend.expectPOST('moms', sampleMomPostData).respond(sampleMomResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mom was created
			expect($location.path()).toBe('/moms/' + sampleMomResponse._id);
		}));

		it('$scope.update() should update a valid Mom', inject(function(Moms) {
			// Define a sample Mom put data
			var sampleMomPutData = new Moms({
				_id: '525cf20451979dea2c000001',
				name: 'New Mom'
			});

			// Mock Mom in scope
			scope.mom = sampleMomPutData;

			// Set PUT response
			$httpBackend.expectPUT(/moms\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/moms/' + sampleMomPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid momId and remove the Mom from the scope', inject(function(Moms) {
			// Create new Mom object
			var sampleMom = new Moms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Moms array and include the Mom
			scope.moms = [sampleMom];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/moms\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMom);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.moms.length).toBe(0);
		}));
	});
}());