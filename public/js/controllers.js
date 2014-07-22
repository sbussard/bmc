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

function makeController(cname, name, icon) {
	var controller = function($scope) {
		$scope.name = name;
		$scope.icon = icon;
		$scope.list = [];
		$scope.addNew = addNew($scope);
		$scope.deleteItem = deleteItem($scope);
	};
	bmcControllers.controller(cname, controller);
}

// controllers 

makeController('KeyPartnersC', 'Key Partners', 'link');
makeController('KeyActivitiesC', 'Key Activities', 'cogs');
makeController('KeyResourcesC', 'Key Resources', 'space-shuttle');
makeController('ValuePropositionsC', 'Value Propositions', 'trophy');
makeController('CustomerRelationshipsC', 'Customer Relationships', 'heart');
makeController('ChannelsC', 'Channels', 'truck');
makeController('CustomerSegmentsC', 'Customer Segments', 'group');
makeController('CostStructureC', 'Cost Structure', 'tags');
makeController('RevenueStreamsC', 'Revenue Streams', 'dollar');