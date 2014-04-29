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

        var change_page = function(direction) {
            var url, numFiche, numFicheIsNum, nameFiche;
            url = window.location.pathname;
            url = url.split('/');
            numFiche = url[url.length-1];
            numFiche = numFiche.split('-');
            nameFiche = numFiche[0].trim();
            numFiche = numFiche[1] || 1;
            numFicheIsNum = $.isNumeric(numFiche);

            if(direction == 'next') {
                if( numFicheIsNum && (numFiche > 0) && (nameFiche == 'fiche') ) {
                    window.location.href = './fiche-' + (++numFiche);
                }
            }

            if(direction == 'prev') {
                if( numFicheIsNum && (numFiche <= 12) && (nameFiche == 'fiche') ) {
                    window.location.href = './fiche-' + (--numFiche);
                }
            }
        };

        // gestion clavier
        $(window).on('keyup', function(event) {
            switch(event.which) {
                case 80 : // touch p
                    change_page('prev');
                    break;
                case 83 : // touch s
                    change_page('next');
                    break;
                case 72 : // touch H
                    window.location.href = './fiche-13';
                    break;
                case 82 : // touch R
                    window.location.href = './fiche-13';
                    break;
            }
        });

    })();
});
