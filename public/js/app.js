(function() {
	var bmcApp = angular.module('bmcApp', ['bmcControllers']);

	bmcApp.run(function($rootScope) {
		$rootScope.canvasData = {};
	});

	// directives 

	// allows main element to load files
	bmcApp.directive('main', function() {
		var data = {
			restrict: 'E',
			link: function($scope, $elem, $attrs) {

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

					var file = e.dataTransfer.files[0];
					var reader = new FileReader();

					reader.readAsText(file);

					reader.onload = function(event) {
						content = JSON.parse(event.target.result);
						$scope.loadBMC(content);
					};
				}

				$elem.bind('dragenter', onDragEnter);
				$elem.bind('dragover', onDragOver);
				$elem.bind('dragleave', onDragLeave);
				$elem.bind('drop', onDropFile);

				return $elem;
			}
		};

		return data;
	});

	bmcApp.directive('canvasBlock', function() {
		var data = {
			restrict: 'A',
			transclude: true,
			scope: {
				block: '=info'
			},
			link: function($scope, $elem, $attrs, $ctrl) {
				$scope.addItem = function() {
					var itemname = prompt('New item name');
					if(itemname) {
						$scope.block.items.push(itemname);
						$scope.$parent.cacheCanvasDataForBlock($attrs.info);
					}
				}

				$scope.delItem = function($index) {
					if(confirm('Delete ' + $scope.block.items[$index] + '?')) {
						$scope.block.items.splice($index, 1);
						$scope.$parent.cacheCanvasDataForBlock($attrs.info);
					}
				}

				$scope.showDesc = function() {
					var msg = new SpeechSynthesisUtterance($scope.block.desc);
					window.speechSynthesis.speak(msg);
				}
			},
			templateUrl: 'public/partials/block.html'
		};
		
		return data;
	});


}());