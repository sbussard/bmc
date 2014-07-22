var bmcControllers = angular.module('bmcControllers', []);

// helpers

function addNew($scope) {
	var func = function() {
		$scope.list.push(prompt('Name:'));
	}
	return func;
}

function makeController(name, icon) {
	var controller = function($scope) {
		$scope.name = name;
		$scope.icon = icon;
		$scope.list = [];
		$scope.addNew = addNew($scope);
	};
	return controller;
}

// controllers 

bmcControllers.controller('KeyPartnersC', makeController("Key Partners", "link"));
bmcControllers.controller('KeyActivitiesC', makeController("Key Activities", "cogs"));
bmcControllers.controller('KeyResourcesC', makeController("Key Resources", "space-shuttle"));
bmcControllers.controller('ValuePropositionsC', makeController("Value Propositions", "trophy"));
bmcControllers.controller('CustomerRelationshipsC', makeController("Customer Relationships", "heart"));
bmcControllers.controller('ChannelsC', makeController("Channels", "truck"));
bmcControllers.controller('CustomerSegmentsC', makeController("Customer Segments", "group"));
bmcControllers.controller('CostStructureC', makeController("Cost Structure", "tags"));
bmcControllers.controller('RevenueStreamsC', makeController("Revenue Streams", "dollar"))