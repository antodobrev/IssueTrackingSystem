angular.module('IssueTruck.common.datepicker', [])
    .directive('datePicker', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var minDate = attrs['minDate'] || '-1s';
                var maxDate = attrs['maxDate'] || '+1Y';

                element.datepicker({
                    minDate: parseInt(minDate),
                    maxDate: maxDate,
                    dateFormat: 'yy-mm-dd'
                });
            }
        }
    }]);