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

function makeController(block) {
	var controller = function($scope, $rootScope) {
		$scope.name = block.name;
		$scope.icon = block.icon;
		$scope.desc = block.desc;
		$scope.list = [];
		$scope.addNew = addNew($scope, $rootScope);
		$scope.deleteItem = deleteItem($scope, $rootScope);
		$scope.showDesc = showDesc($scope);
		$scope.update = function() {
			$scope.list = $rootScope.canvas_data[$scope.name];
		};
		$rootScope.observer_functions.push($scope.update);
	};
	bmcControllers.controller(block.cname, controller);
}

// controllers 

bmcControllers.controller('ioC', function($scope, $rootScope) {
	$scope.saveBMC = function() {
		var canvas_data = JSON.stringify($rootScope.canvas_data);
		var dlObj = document.createElement('a');
	  dlObj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(canvas_data));
	  dlObj.setAttribute('download', 'untitled_canvas.json');
	  dlObj.click();
	}

	$scope.loadBMC = function() {
		if(confirm('Would you like to load a canvas?\n\nyour current canvas will be gone forever if it\'s not saved')) {
			var data = {"Key Partnerships":["stephen this is the latest update"],"Key Activities":["ka","lol"],"Key Resources":["kr"],"Value Propositions":[],"Customer Relationships":[],"Channels":[],"Customer Segments":[],"Cost Structure":[],"Revenue Streams":["rs1"]};
			$rootScope.canvas_data = data;
			$rootScope.update_canvas();
		}
	}

	$scope.clearBMC = function() {
		if(confirm('Do you want to clear this canvas?')) {
			$rootScope.clear_canvas();
		}
	}
});

makeController({ cname: 'KeyPartnershipsC', name: 'Key Partnerships', icon: 'link', desc: 'the network of suppliers and partners that make the business model work'});
makeController({ cname: 'KeyActivitiesC', name: 'Key Activities', icon: 'cogs', desc: 'the most important things a company must do to make a business model work'});
makeController({ cname: 'KeyResourcesC', name: 'Key Resources', icon: 'space-shuttle', desc: 'the most important asset required to make a business model work'});
makeController({ cname: 'ValuePropositionsC', name: 'Value Propositions', icon: 'trophy', desc: 'bundle of products and services that cerate value for a customer segment'});
makeController({ cname: 'CustomerRelationshipsC', name: 'Customer Relationships', icon: 'heart', desc: 'the types of relationships a company establishes with specific customer segments'});
makeController({ cname: 'ChannelsC', name: 'Channels', icon: 'truck', desc: 'how a company communicates with and reaches its customer segments to deliver a value proposition'});
makeController({ cname: 'CustomerSegmentsC', name: 'Customer Segments', icon: 'group', desc: 'defines different groups of people an organization aims to reach'});
makeController({ cname: 'CostStructureC', name: 'Cost Structure', icon: 'tags', desc: 'describes all costs incurred to operate a business model'});
makeController({ cname: 'RevenueStreamsC', name: 'Revenue Streams', icon: 'dollar', desc: 'the cash a company generates from each customer segment'});