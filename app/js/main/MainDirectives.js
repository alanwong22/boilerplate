
function misc (MainService) {
  return {
    restrict:'EA',
    link: function (scope,element,attrs) {

    }
  };
}

angular
  .module('BoilerPlate')
  .directive('misc', misc);
  