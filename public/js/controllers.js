var bmcControllers = angular.module('bmcControllers', []);

// helpers

function addNew($scope) {
	var func = function() {
		var itemname = prompt('New item name');
		if(itemname) {
			$scope.list.push(itemname);
		}
	}
	return func;
}

function deleteItem($scope) {
	var func = function($index) {
		if(confirm('Delete ' + $scope.list[$index] + '?')) {
			$scope.list.splice($index, 1);
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
	var controller = function($scope) {
		$scope.name = block.name;
		$scope.icon = block.icon;
		$scope.desc = block.desc;
		$scope.list = [];
		$scope.addNew = addNew($scope);
		$scope.deleteItem = deleteItem($scope);
		$scope.showDesc = showDesc($scope);
	};
	bmcControllers.controller(block.cname, controller);
}

// controllers 

makeController({ cname: 'KeyPartnershipsC', name: 'Key Partnerships', icon: 'link', desc: 'the network of suppliers and partners that make the business model work'});
makeController({ cname: 'KeyActivitiesC', name: 'Key Activities', icon: 'cogs', desc: 'the most important things a company must do to make a business model work'});
makeController({ cname: 'KeyResourcesC', name: 'Key Resources', icon: 'space-shuttle', desc: 'the most important asset required to make a business model work'});
makeController({ cname: 'ValuePropositionsC', name: 'Value Propositions', icon: 'trophy', desc: 'bundle of products and services that cerate value for a customer segment'});
makeController({ cname: 'CustomerRelationshipsC', name: 'Customer Relationships', icon: 'heart', desc: 'the types of relationships a company establishes with specific customer segments'});
makeController({ cname: 'ChannelsC', name: 'Channels', icon: 'truck', desc: 'how a company communicates with and reaches its customer segments to deliver a value proposition'});
makeController({ cname: 'CustomerSegmentsC', name: 'Customer Segments', icon: 'group', desc: 'defines different groups of people an organization aims to reach'});
makeController({ cname: 'CostStructureC', name: 'Cost Structure', icon: 'tags', desc: 'describes all costs incurred to operate a business model'});
makeController({ cname: 'RevenueStreamsC', name: 'Revenue Streams', icon: 'dollar', desc: 'the cash a company generates from each customer segment'});