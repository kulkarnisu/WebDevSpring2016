/**
 * Created by sudeep on 3/17/16.
 */

"use strict";

(function () {

    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);
    
    function fieldSortable() {

        function link(scope, element) {

            var start = null;
            var end   = null;

            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.fieldSortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                fieldSortableCallback: '&'
            },
            link: link
        };
    }
})();