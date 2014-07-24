(function() {
	var bmcControllers = angular.module('bmcControllers', []);

	// controllers 

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

		var blocks =[
			'KeyPartnerships',
			'KeyActivities',
			'KeyResources',
			'ValuePropositions',
			'CustomerRelationships',
			'Channels',
			'CustomerSegments',
			'CostStructure',
			'RevenueStreams'
		];

		//

		$scope.saveBMC = function() {
			var canvasData = JSON.stringify($rootScope.canvasData);
			var dlObj = document.createElement('a');
		  dlObj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(canvasData));
		  dlObj.setAttribute('download', 'untitled-canvas.json');
		  dlObj.click();
		}

		$scope.cacheCanvasDataForBlock = function(block) {
			$rootScope.canvasData[block] = $scope[block].items;
			// console.log(JSON.stringify($rootScope.canvasData));
		}

		$scope.clearBMC = function(noconfirm) {
			if(noconfirm || confirm('Would you like to clear the canvas?\n\nyour current canvas will be gone forever if it\'s not saved!')) {
				for(var i = 0, block; block = blocks[i++];) {
					$scope[block].items = [];
					$scope.cacheCanvasDataForBlock(block);
				}	
			}
		};
		$scope.clearBMC(1);

		$scope.describeHowToOpenCanvas = function() {
			alert('To open a canvas file, please drag and drop the file from your desktop onto the canvas.');
		};

		$scope.loadBMC = function(data) {
			// TODO: check for corrupted/etc
			if(confirm('Would you like to load this canvas?\n\nyour current canvas will be gone forever if it\'s not saved!')) {

				for(var i = 0, block; block = Object.keys(data)[i++];) {
					$scope[block].items = data[block];
					$scope.cacheCanvasDataForBlock(block);
				}

				$scope.$apply();
			}
		}
	});

}());