(function() {
	var bmcControllers = angular.module('bmcControllers', []);

	// helpers

	function addNew($scope, $rootScope) {
		var func = function() {
			var itemname = prompt('New item name');
			if(itemname) {
				$rootScope.canvas_data[$scope.name].push(itemname);
				$scope.list = $rootScope.canvas_data[$scope.name];
				console.log(JSON.stringify($rootScope.canvas_data));
			}
		}
		return func;
	}

	function deleteItem($scope, $rootScope) {
		var func = function($index) {
			if(confirm('Delete ' + $scope.list[$index] + '?')) {
				$rootScope.canvas_data[$scope.name].splice($index, 1);
				$scope.list = $rootScope.canvas_data[$scope.name];
				console.log(JSON.stringify($rootScope.canvas_data));
			}
		}
		return func;
	}

	function showDesc($scope) {
		var func = function() {
			var msg = new SpeechSynthesisUtterance($scope.desc);
			window.speechSynthesis.speak(msg);
		}
		return func;
	}

	// controllers 

	bmcControllers.controller('IOController', function($scope, $rootScope) {
		$scope.saveBMC = function() {
			var canvas_data = JSON.stringify($rootScope.canvas_data);
			var dlObj = document.createElement('a');
		  dlObj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(canvas_data));
		  dlObj.setAttribute('download', 'untitled_canvas.json');
		  dlObj.click();
		}

		$scope.loadBMC = function() {
			alert('To open a canvas, drop a saved file from your desktop anywhere on the canvas');
		}

		$scope.clearBMC = function() {
			if(confirm('Do you want to clear this canvas?')) {
				$rootScope.clear_canvas();
			}
		}
	});

	bmcControllers.controller('CanvasController', function($scope, $rootScope) {
		$scope.KeyPartnerships = { 
			name: 'Key Partnerships', 
			icon: 'link', 
			section: 8,
			items: [], 
			desc: 'the network of suppliers and partners that make the business model work'
		};
		$scope.KeyActivities = { 
			name: 'Key Activities', 
			icon: 'cogs', 
			section: 7,
			items: [], 
			desc: 'the most important things a company must do to make a business model work'
		};
		$scope.KeyResources = { 
			name: 'Key Resources', 
			icon: 'space-shuttle', 
			section: 6,
			items: [], 
			desc: 'the most important asset required to make a business model work'
		};
		$scope.ValuePropositions = { 
			name: 'Value Propositions', 
			icon: 'trophy', 
			section: 2,
			items: [], 
			desc: 'bundle of products and services that cerate value for a customer segment'
		};
		$scope.CustomerRelationships = { 
			name: 'Customer Relationships', 
			icon: 'heart', 
			section: 4,
			items: [], 
			desc: 'the types of relationships a company establishes with specific customer segments'
		};
		$scope.Channels = { 
			name: 'Channels', 
			icon: 'truck', 
			section: 3,
			items: [], 
			desc: 'how a company communicates with and reaches its customer segments to deliver a value proposition'
		};
		$scope.CustomerSegments = { 
			name: 'Customer Segments', 
			icon: 'group', 
			section: 1,
			items: [], 
			desc: 'defines different groups of people an organization aims to reach'
		};
		$scope.CostStructure = { 
			name: 'Cost Structure', 
			icon: 'tags', 
			section: 9,
			items: [], 
			desc: 'describes all costs incurred to operate a business model'
		};
		$scope.RevenueStreams = { 
			name: 'Revenue Streams', 
			icon: 'dollar', 
			section: 5,
			items: [], 
			desc: 'the cash a company generates from each customer segment'
		};

		// $scope.addNew = addNew($scope, $rootScope);
		// $scope.deleteItem = deleteItem($scope, $rootScope);
		// $scope.showDesc = showDesc($scope);

		// $scope.update = function() {
		// 	$scope.list = $rootScope.canvas_data[$scope.name];
		// };

		// $rootScope.observer_functions.push($scope.update);
	});

}());