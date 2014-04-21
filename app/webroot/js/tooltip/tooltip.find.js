(function($) {
    $.fn.tooltipFind = function(params) {
        var $self = $(this);
        var tpl_overlay = '<div class="overlay-tooltipFind"></div>';
        var tpl_endTooltip = '</div></div></div>';

        var $body = $('body');
        var $overlay, $contTooltip, $animateContainer, $btnClose;

        var defaults = {
            'width' : 1000,
            'tpl' : '',
            'posTop' : 80,
            'posLeft' : '',
            'btnClose' : null,
            'callbackBeforeAnim' : null,
            'callbackAfterAnim' : null,
            'numCurrentChapitre' : 0
        }

        params = $.extend({}, defaults, params);

        var tpl_tooltip = '<div class="containers-tooltipFind"><div class="container-tooltipFind"><div>';
        tpl_tooltip += params.tpl + tpl_endTooltip;

        $body.append(tpl_overlay);
        $body.append(tpl_tooltip);

        $overlay = $(".overlay-tooltipFind");
        $contTooltip = $(".containers-tooltipFind");
        $animateContainer = $(".container-tooltipFind");
        $('.current-chapitre').html('Chapitre n ° ' + params.numCurrentChapitre);
        if(params.btnClose) $btnClose = $(".btn-closeTooltipFind");
        var window_center = ($(window).width() / 2) - (params.width / 2);

        if(params.callbackBeforeAnim) params.callbackBeforeAnim();

        $contTooltip.css( { "left" : window_center + 'px', 'display' : 'block', "width" : params.width + 'px', 'top' : params.posTop + 'px' } );
        $overlay.stop().animate({ 'opacity' : .8 }, 300, 'linear');
        $animateContainer.stop().animate( { 'top' : 0 + 'px' }, 600, 'easeOutCirc', function() {
            if(params.callbackAfterAnim) params.callbackAfterAnim();
        });

        if(params.btnClose) {
            $btnClose.click(function(event) {
                event.preventDefault();
                $("html, body").stop().animate( { 'scrollTop' : 0 }, 800, 'easeOutCirc').dequeue();
                $animateContainer.slideUp('fast', function() {
                    $overlay.fadeOut('fast', function() {
                        $contTooltip.remove();
                        $overlay.remove();
                    });
                });
            });
        }

        $overlay.click(function(event) {
            event.preventDefault();
            $("html, body").stop().animate( { 'scrollTop' : 0 }, 800, 'easeOutCirc').dequeue();
            $animateContainer.slideUp('fast', function() {
                $overlay.fadeOut('fast', function() {
                    $contTooltip.remove();
                    $overlay.remove();
                });
            });
        });

        return this;

    }
})(jQuery);
