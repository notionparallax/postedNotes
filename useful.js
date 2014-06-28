var fixBorder = function() {
    var pushBy = ($("body").width() - $(".where-row").width() )/2;
    $(".where-row").css("margin-left"  , -pushBy);
    $(".where-row").css("margin-right" , -pushBy);
    $(".where-row").css("padding-left" , pushBy  );
    $(".where-row").css("padding-right", pushBy  );
    console.log([pushBy, pushBy * -1]);
};

var processInputs = function() {

    console.log("processing these inputs");

    var tidyMessage = $("#messageBox").val().replace(/(\r\n|\n|\r)/gm, "~|");
    var tidyAddress = $("#addressBox").val().replace(/(\r\n|\n|\r)/gm, "~|");

    var messageChunks1 = tidyMessage.slice(0  , 200);
    var messageChunks2 = tidyMessage.slice(200, 400);
    var messageChunks3 = tidyMessage.slice(400, 600);
    var messageChunks4 = tidyMessage.slice(600, 800);

    var addressChunks1 = tidyAddress.slice(0  , 200);
    var addressChunks2 = tidyAddress.slice(200, 400);

    $("#m1").val(messageChunks1);
    $("#m2").val(messageChunks2);
    $("#m3").val(messageChunks3);
    $("#m4").val(messageChunks4);

    $("#a1").val(addressChunks1);
    $("#a2").val(addressChunks2);

    return true;
};

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 300);
        return false;
      }
    }
  });
});

$(document).ready(function() {

    fixBorder();

    $("#testButton").click(processInputs);
    $("#realButton").click(processInputs);

});

$( window ).resize( function(){
    fixBorder();
    console.log("resize");
});

$('#messageBox').keyup(function () {
    var count= $('#messageBox').val().length;
    if (count<600){
        $("#char-count"        ).html("<span class='text-success'>"+count+"</span>");
        $("#char-count-message").html("<span class='glyphicon glyphicon-thumbs-up'></span>");
    }else if(count<700){
        $("#char-count"        ).html("<span class='text-warning'>"+count+"</span>");
        $("#char-count-message").html("<span class='text-warning'>Time to start winding it up</span>");
    }else if(count>900){
        $("#char-count"        ).html("<span class='text-danger'>"+count+"</span>");
        $("#char-count-message").html("<span class='text-danger'>Too many characters, you need to trim a little.</span>");
    }
});