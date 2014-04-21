(function($) {
    $.fn.tooltipClone = function(params) {

        var defaults = {
            'width' : 540,
            'decalageTop' : 50
        }

        params = $.extend({}, defaults, params);

        var $wrapperTooltip, $clone;
        var tpl_overlay = '<div class="overlay-clone-fiche"></div>';
        var $overlay;
        var $body = $('body');

        var $self = $(this);

        // window
        var $window = $(window);
        var window_width = $window.width();
        var window_scrollTop = $window.scrollTop();

        // append template overlay
        $body.append(tpl_overlay);
        $overlay = $('.overlay-clone-fiche');

        // position template wrapper
        var posLeft_tplWrapper = (window_width / 2) - (params.width / 2);
        var posTop_tplWrapper = window_scrollTop + params.decalageTop;

        var tpl_wrapper = '<div class="wrapper-clone-fiche" style="position: absolute; top: ' + posTop_tplWrapper + 'px; left: ' + posLeft_tplWrapper + 'px;"></div>';
        $body.append(tpl_wrapper);
        $wrapperTooltip = $('.wrapper-clone-fiche');

        $self.clone().addClass('fiche-oral-clone').appendTo($wrapperTooltip);
        var posLeft_target = $self.offset().left - posLeft_tplWrapper;
        var posTop_target = ($self.offset().top) - posTop_tplWrapper;

        $clone = $('.fiche-oral-clone');

        $clone.css( { 'border' : '1px solid #A0A0A0', 'box-shadow' : '0 0 26px #272727' , 'background' : '#ffffff', 'top' :  posTop_target + 'px', 'left' : posLeft_target + 'px'} );
        $clone.stop().animate( { 'top' : 0, 'left' : 0, 'opacity' : 1}, 1100, 'easeOutQuart');

        $overlay.click(function(event) {
            event.preventDefault();
            $clone.fadeOut('fast', function() {
                $overlay.fadeOut('fast', function() {
                    $overlay.remove();
                    $wrapperTooltip.remove();
                });
            });
        });

       return this;
    };
})(jQuery);