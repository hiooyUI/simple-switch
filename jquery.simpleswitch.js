(function ($) {
//simpleSwitch jQuery plugein by Nelson Kuang 2016.3.30
    $.fn.extend({
        switchReset: function () {
            return this.prop('checked', false).parent().removeClass('checked').addClass('unchecked');
        },
        switchToggle: function($state) {
           return $state ? this.prop('checked', $state).parent().removeClass('unchecked').addClass('checked') : this.prop('checked', $state).parent().removeClass('checked').addClass('unchecked');
        },
        simpleSwitch: function () {
            //replace all the checkboxes with simple switches
            this.each(function () {
                var This = $(this);
                This.addClass("simple-switch");
                This.wrap( "<label class='simple-switch-outter'></label>" );
                This.parent().append($("<span class=\"simple-switch-circle\"></span>"));
            });
            //initialization
            $(".simple-switch").each(function () {
                var This = $(this);
                _switch(This);
                //bind click event
                This.click(function () {
                    _switch($(this));
                });
                //bind swipe events
                var startPos = { x: 0, y: 0 },
                    currentPos = { x: 0, y: 0 };
                var el = This.parent().find(".simple-switch-circle").get(0);
                el.addEventListener('touchstart', function (event) {
                    startPos = { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY };
                }, false);
                el.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                    currentPos = { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY };
                }, false);
                el.addEventListener('touchend', function (event) {
                    currentPos = { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY };
                    if (currentPos.x != startPos.x) {
                        This.trigger("click");
                    }
                    startPos = { x: 0, y: 0 },
                        currentPos = { x: 0, y: 0 };
                }, false);
            });
            //switch
            function _switch($obj) {
                var This = $obj,
                    isChecked = This.prop("checked");
                if (isChecked) {
                    This.attr("data-switch", true);
                    This.parent().removeClass("unchecked").addClass("checked");
                } else {
                    This.attr("data-switch", false);
                    This.parent().removeClass("checked").addClass("unchecked");
                }
            }
        }
    });
})(jQuery);
