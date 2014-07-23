(function() {
	var bmcControllers = angular.module('bmcControllers', []);

	// controllers 

	bmcControllers.controller('IOController', function($scope, $rootScope) {
		$scope.saveBMC = function() {
			var canvas_data = JSON.stringify($rootScope.canvas_data);
			var dlObj = document.createElement('a');
		  dlObj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(canvas_data));
		  dlObj.setAttribute('download', 'untitled_canvas.json');
		  dlObj.click();
		}

		$scope.loadBMC = function() {};
		$scope.clearBMC = function() {};
	});

	bmcControllers.controller('CanvasController', function($scope, $rootScope) {
		$scope.KeyPartnerships = { 
			name: 'Key Partnerships', 
			icon: 'link', 
			items: [], 
			desc: 'the network of suppliers and partners that make the business model work'
		};
		$scope.KeyActivities = { 
			name: 'Key Activities', 
			icon: 'cogs', 
			items: [], 
			desc: 'the most important things a company must do to make a business model work'
		};
		$scope.KeyResources = { 
			name: 'Key Resources', 
			icon: 'space-shuttle', 
			items: [], 
			desc: 'the most important asset required to make a business model work'
		};
		$scope.ValuePropositions = { 
			name: 'Value Propositions', 
			icon: 'trophy', 
			items: [], 
			desc: 'bundle of products and services that cerate value for a customer segment'
		};
		$scope.CustomerRelationships = { 
			name: 'Customer Relationships', 
			icon: 'heart', 
			items: [], 
			desc: 'the types of relationships a company establishes with specific customer segments'
		};
		$scope.Channels = { 
			name: 'Channels', 
			icon: 'truck', 
			items: [], 
			desc: 'how a company communicates with and reaches its customer segments to deliver a value proposition'
		};
		$scope.CustomerSegments = { 
			name: 'Customer Segments', 
			icon: 'group', 
			items: [], 
			desc: 'defines different groups of people an organization aims to reach'
		};
		$scope.CostStructure = { 
			name: 'Cost Structure', 
			icon: 'tags', 
			items: [], 
			desc: 'describes all costs incurred to operate a business model'
		};
		$scope.RevenueStreams = { 
			name: 'Revenue Streams', 
			icon: 'dollar', 
			items: [], 
			desc: 'the cash a company generates from each customer segment'
		};

		$scope.loadBMC = function(data) {
			console.log(data);

			for(var i = 0, block; block = Object.keys(data)[i++];) {
				$scope[block].items = data[block];
			}

			$scope.$apply();
		}
	});

}());