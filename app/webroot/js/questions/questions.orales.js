$(document).ready(function() {

    //=================================================================
    // Gestion hauteur main container
    //=================================================================
    (function() {
        var window_height = $(window).height();
        window_height += 5;
        $('#app-container').css( { 'min-height' : window_height + 'px' } );
    })();

    //=================================================================
    // Gestion des slide up and down
    //=================================================================
    (function() {

        var $h3 = $('.slide-jq-h3');
        $h3.addClass('secret-hidden');
        var $h4 = $('.slide-jq-h4');

        $h3.click(function(event) {
            event.preventDefault();
            var $self = $(this);
            var $target = $self.next();

            $target.slideToggle('slow');
        });

        $h4.click(function(event) {
            event.preventDefault();
            var $self = $(this);
            var $target = $self.next();

            $target.slideToggle('slow');
        });

    })();
});
