var bmcApp = angular.module('bmcApp', ['bmcControllers']);

bmcApp.run(function($rootScope) {
		$rootScope.clear_canvas = function() {
			$rootScope.canvas_data = {
				'Key Partnerships': [],
				'Key Activities': [],
				'Key Resources': [],
				'Value Propositions': [],
				'Customer Relationships': [],
				'Channels': [],
				'Customer Segments': [],
				'Cost Structure': [],
				'Revenue Streams': []
			};

			$rootScope.update_canvas();
		};

		$rootScope.observer_functions = [];

		$rootScope.update_canvas = function() {
			for(var i in $rootScope.observer_functions) {
				$rootScope.observer_functions[i]();
			}
		};

		$rootScope.clear_canvas();
});