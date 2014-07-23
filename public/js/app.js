(function() {
	var bmcApp = angular.module('bmcApp', ['bmcControllers']);

	bmcApp.run(function($rootScope) {
			$rootScope.clear_canvas = function() {
				$rootScope.canvas_data = {
					'KeyPartnerships': [],
					'KeyActivities': [],
					'KeyResources': [],
					'ValuePropositions': [],
					'CustomerRelationships': [],
					'Channels': [],
					'CustomerSegments': [],
					'CostStructure': [],
					'RevenueStreams': []
				};

				$rootScope.update_canvas();
			};

			$rootScope.observer_functions = [];

			$rootScope.update_canvas = function() {
				console.log('update_canvas' + JSON.stringify($rootScope.observer_functions));
				for(var i in $rootScope.observer_functions) {
					$rootScope.observer_functions[i]();
				}
			};

			$rootScope.load_canvas_data = function(data) {
				$rootScope.canvas_data = data;
				$rootScope.update_canvas();
			};

			$rootScope.clear_canvas();
	});

	// directives 

	// allows main element to load files
	bmcApp.directive('main', function($rootScope) {
		var data = {
			restrict: 'E',
			scope: {},
			link: function($scope, element, attrs) {

				function onDragEnter(e) {
					e.stopPropagation();
					e.preventDefault();
				}

				function onDragOver(e) {
					e.stopPropagation();
					e.preventDefault();
				}

				function onDragLeave(e) {
					e.stopPropagation();
					e.preventDefault();
				}

				function onDropFile(e) {
					e.stopPropagation();
					e.preventDefault();

					// if(confirm('Would you like to load this canvas?\n\nyour current canvas will be gone forever if it\'s not saved!')) {
						var file = e.dataTransfer.files[0];
						var reader = new FileReader();

						reader.readAsText(file);

						reader.onload = function(event) {
							content = JSON.parse(event.target.result);
							$rootScope.load_canvas_data(content);
						};
					// }
				}

				element.bind('dragenter', onDragEnter);
				element.bind('dragover', onDragOver);
				element.bind('dragleave', onDragLeave);
				element.bind('drop', onDropFile);

				return element;
			}
		};

		return data;
	});

	bmcApp.directive('block', function() {
		var data = {
			restrict: 'E',
			scope: {
				block: '=info'
			},
			link: function($scope, element, attrs) {
				element.addClass(attrs.info);
			},
			templateUrl: 'public/partials/block.html'
		};
		
		return data;
	});


}());