(function() {
	var bmcApp = angular.module('bmcApp', ['bmcControllers']);

	bmcApp.run(function($rootScope) {
		$rootScope.canvasData = {};
	});

	// directives 

	// allows dropzone element to load files
	bmcApp.directive('dropzone', function() {
		var data = {
			restrict: 'A',
			link: function($scope, $elem, $attrs) {
				var dh = document.getElementById('dropHover');

				function onDragEnter(e) {
					e.stopPropagation();
					e.preventDefault();
					dh.style.display = 'block';
				}

				function onDragOver(e) {
					e.stopPropagation();
					e.preventDefault();
				}

				function onDragLeave(e) {
					e.stopPropagation();
					e.preventDefault();
					if(e.clientX == 0 && e.clientY == 0) {
						dh.style.display = 'none';
					}
				}

				function onDropFile(e) {
					e.stopPropagation();
					e.preventDefault();
					dh.style.display = 'none';

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