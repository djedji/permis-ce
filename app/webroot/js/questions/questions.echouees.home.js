$(document).ready(function() {
    var $window = $(window);
    var $app = $("#app-container");
    var windowHeight = $window.height();
    var appHeightOrig = $app.height();

    if(appHeightOrig <= windowHeight) {
        $app.css({ 'height' : windowHeight + "px" });
    }

    $window.resize(function() {
        windowHeight = $(this).height();
        if(appHeightOrig <= windowHeight) {
            $app.css({ 'height' : windowHeight + "px" });
        }
    });
});