(function($) {
    $.fn.tooltip = function(params) {
        var $self = $(this);
        var tpl_overlay = '<div class="overlay"></div>';
        var tpl_endTooltip = '</div></div></div>';
        var tpl_btnScrolltop = '<div class="btn-scrolltop-tooltip"><p><span class="glyphicon glyphicon-chevron-up"></span></p></div>';
        var $body = $('body');
        var $overlay, $contTooltip, $animateContainer, $btnClose, $container_btnScrolltop, $btnScrollTop;

        var defaults = {
            'width' : 1000,
            'tpl' : '',
            'posTop' : 80,
            'posLeft' : '',
            'btnClose' : null,
            'callbackBeforeAnim' : null,
            'callbackAfterAnim' : null
        }

        params = $.extend({}, defaults, params);

        var tpl_tooltip = '<div class="containers-tooltip"><div class="container-tooltip"><div>';
        tpl_tooltip += params.tpl + tpl_endTooltip;

        $body.append(tpl_overlay);
        $body.append(tpl_tooltip);
        $body.append(tpl_btnScrolltop);

        $overlay = $(".overlay");
        $contTooltip = $(".containers-tooltip");
        $animateContainer = $(".container-tooltip");
        $container_btnScrolltop = $('.btn-scrolltop-tooltip');
        $btnScrollTop = $('.btn-scrolltop-tooltip > p');

        if(params.btnClose) $btnClose = $(".btn-closeTooltip");
        var window_center = ($(window).width() / 2) - (params.width / 2);

        if(params.callbackBeforeAnim) params.callbackBeforeAnim();

        $contTooltip.css( { "left" : window_center + 'px', 'display' : 'block', "width" : params.width + 'px', 'top' : params.posTop + 'px' } );
        $overlay.stop().animate({ 'opacity' : .8 }, 300, 'linear');
        $animateContainer.stop().animate( { 'top' : 0 + 'px' }, 1000, 'easeOutCirc', function() {
            if(params.callbackAfterAnim) params.callbackAfterAnim();
        });

        if(params.btnClose) {
            $btnClose.click(function(event) {
                event.preventDefault();
                $animateContainer.slideUp('fast', function() {
                    $overlay.fadeOut('fast', function() {
                        $btnScrollTop.parent().remove();
                        $contTooltip.remove();
                        $overlay.remove();
                    });
                });
            });
        }

        $overlay.click(function(event) {
            event.preventDefault();
            $animateContainer.slideUp('fast', function() {
                $overlay.fadeOut('fast', function() {
                    $btnScrollTop.parent().remove();
                    $contTooltip.remove();
                    $overlay.remove();
                });
            });
        });

        $btnScrollTop.click(function(event) {
//            event.preventDefault();
            event.stopImmediatePropagation();
            $("body, html").stop().animate( { 'scrollTop' : 0 }, 800, 'easeOutQuart' );
        });

        $container_btnScrolltop.click(function(event) {
            event.preventDefault();
            var $contTooltipFind = $(".containers-tooltipFind");
            var $containerTooltipFind = $(".container-tooltipFind");
            var $overlayTooltipFind = $(".overlay-tooltipFind");
            // si tooltip find exist
            // supprimer uniquement tooltip find
            // si tooltip find n'exist pas
            // supprimer normalement
            if($containerTooltipFind[0]) {
                $("html, body").stop().animate( { 'scrollTop' : 0 }, 800, 'easeOutCirc').dequeue();
                $containerTooltipFind.slideUp('fast', function() {
                    $overlayTooltipFind.fadeOut('fast', function() {
                        $contTooltipFind.remove();
                        $overlayTooltipFind.remove();
                    });
                });
            } else {
                $animateContainer.slideUp('fast', function() {
                    $overlay.fadeOut('fast', function() {
                        $btnScrollTop.parent().remove();
                        $contTooltip.remove();
                        $overlay.remove();
                    });
                });
            }
        });

        return this;

    }
})(jQuery);
