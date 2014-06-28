$(document).ready(function() {

    var bootstrapSize = function() {
        /*this just writes to the top of the doc the width of the
          window, and the bootstrap layout that is currently active.
          more details here: http://getbootstrap.com/css/#grid
        */
        var bsLayout;
        var width = window.innerWidth;
        if (width < 768) {
            bsLayout = "width: " + width + " - Extra small devices (Phones) - Using xs";
        } else if (width >= 768 && width < 992) {
            bsLayout = "width: " + width + " - Small devices (Tablets) - Using sm";
        } else if (width >= 992 && width < 1200) {
            bsLayout = "width: " + width + " - Medium devices (Desktops) - Using md";
        } else if (width >= 1200) {
            bsLayout = "width: " + width + " - Large devices (Desktops) - Using lg";
        } else {
            bsLayout = "width: " + width + " - Something is very wrong!!";
        }
        return bsLayout;
    }
    $(".page-info").html(bootstrapSize());

    window.onresize = function(event) {
        $(".page-info").html(bootstrapSize());
    };

});
