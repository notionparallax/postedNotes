// $(function() {
//   $('a[href*=#]:not([href=#])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: target.offset().top
//         }, 300);
//         return false;
//       }
//     }
//   });
// });

var fixBorder = function() {
    var pushBy = ($("body").width() - $(".where-row").width()) / 2;
    $(".where-row").css("margin-left", -pushBy);
    $(".where-row").css("margin-right", -pushBy);
    $(".where-row").css("padding-left", pushBy);
    $(".where-row").css("padding-right", pushBy);
    // console.log([pushBy, pushBy * -1]);
};

var processInputs = function() {

    console.log("processing these inputs");

    var tidyMessage = $("#messageBox").val().replace(/(\r\n|\n|\r)/gm, "~|");
    var tidyAddress = $("#addressBox").val().replace(/(\r\n|\n|\r)/gm, "~|");

    var messageChunks1 = tidyMessage.slice(0, 200);
    var messageChunks2 = tidyMessage.slice(200, 400);
    var messageChunks3 = tidyMessage.slice(400, 600);
    var messageChunks4 = tidyMessage.slice(600, 800);

    var addressChunks1 = tidyAddress.slice(0, 200);
    var addressChunks2 = tidyAddress.slice(200, 400);

    $("#m1").val(messageChunks1);
    $("#m2").val(messageChunks2);
    $("#m3").val(messageChunks3);
    $("#m4").val(messageChunks4);

    $("#a1").val(addressChunks1);
    $("#a2").val(addressChunks2);

    if (tidyMessage.length != 0 && tidyAddress.length != 0){
        $(".paypal-wait-box").addClass("paypal-wait-box-open");
        $(".paypal-wait-box").slideDown( 600 );
    }else{
        if(tidyMessage.length === 0 && tidyAddress.length === 0){
            $(".paypal-wait-box").html("There's something strange going on! (maybe you didn't write anything?)");
        }else if (tidyMessage.length === 0){
            $(".paypal-wait-box").html("There's no message body!");
        }else if(tidyAddress.length === 0){
            $(".paypal-wait-box").html("There's no address!");
        }
        else{
            $(".paypal-wait-box").html("There's something <em>really</em> strange going on! (maybe you didn't write anything?)");
        }
        $(".paypal-wait-box").addClass("paypal-wait-box-open");
        $(".paypal-wait-box").slideDown( 600 );
        return false;
    }


    return true;
};

var submit_email = function() {
    var myAddress = "ben+postednotes@notionparallax.co.uk";
    var theirAddress = $("#email").val();
    var theirName = $("#name").val();
    // console.log(["email button",   myAddress, theirAddress, theirName ]);
    if (theirAddress.length > 3 && theirName.length > 1) {
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': '92W7qrQShJKr0-pTYL10jQ',
                'message': {
                    'from_email': 'ben@notionparallax.co.uk',
                    'to': [{
                        'email': myAddress,
                        'name': 'RECIPIENT NAME (OPTIONAL)',
                        'type': 'to'
                    }],
                    'autotext': 'true',
                    'subject': theirName + ' Just signed up for postednotes',
                    'html': theirAddress
                }
            }
        }).done(function(response) {
            console.log(response); // if you're into that sorta thing
        });
        $(".message").html('<div class="alert alert-success" role="alert">Thanks! We&rsquo;ll be in touch.</div>');
    } else {
        $(".message").html('<div class="alert alert-warning" role="alert">Fill it in <em>before</em> you press send!</div>');
    }
    return false;
};

$('#messageBox').keyup(function() {
    var count = $('#messageBox').val().length;
    if (count < 500) {
        $("#char-count").html("<span class='text-success'>" + count + "</span>");
        $("#char-count-message").html("<span class='glyphicon glyphicon-thumbs-up'></span>");
    } else if (count <= 800) {
        $("#char-count").html("<span class='text-warning'>" + count + "</span>");
        $("#char-count-message").html("<span class='text-warning'>Time to start winding it up</span>");
    } else if (count > 800) {
        $("#char-count").html("<span class='text-danger'>" + count + "</span>");
        $("#char-count-message").html("<span class='text-danger'>Too many characters, you need to trim a little.</span>");
    } else {
        console.log(["the bogey man commeth", count]);
    }

});

$('#addressBox').keyup(function() {
    var count = $('#addressBox').val().length;
    if (count < 250) {
        $("#char-count-a").html("<span class='text-success'>" + count + "</span>");
        $("#char-count-message-a").html("<span class='glyphicon glyphicon-thumbs-up'></span>");
    } else if (count <= 400) {
        $("#char-count-a").html("<span class='text-warning'>" + count + "</span>");
        $("#char-count-message-a").html("<span class='text-warning'>Time to start winding it up</span>");
    } else if (count > 400) {
        $("#char-count-a").html("<span class='text-danger'>" + count + "</span>");
        $("#char-count-message-a").html("<span class='text-danger'>Too many characters, you need to trim a little.</span>");
    }
});

$(window).resize(function() {
    fixBorder();
    // console.log("resize");
});

function get_browser() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            return 'Opera ' + tem[1];
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0];
}

function get_browser_version() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            return 'Opera ' + tem[1];
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[1];
}

$(document).ready(function() {
    fixBorder();
    $("#realButton").click(processInputs);

    $(".pro-tips").click(function() {
        $(".pro-tips").toggleClass("pro-tips-active");
    });

    // $("#realButton").hover(function() {
    //     console.log("in");
    //     $(".paypal-wait-box").addClass("paypal-wait-box-open");
    //     $(".paypal-wait-box").slideDown( 0.5 );
    // }
    // ,
    // function() {
    //     console.log("out");
    //     $(".paypal-wait-box").removeClass("paypal-wait-box-open");
    //     $(".paypal-wait-box").slideUp( 0.5 );
    // }
    // );

    var browser = get_browser();
    var browser_version = parseInt(get_browser_version(), 10);
    console.log(["we're reading your browser as:",browser, browser_version]);
    if (browser === "Chrome" && browser_version >= 37) {
        console.log("You've got pretty placeholder text");
        $(".card textarea").attr("placeholder", letter);
        $(".envelope textarea").attr("placeholder", address);
    }else{
        console.log("Sorry, you don't have pretty placeholder text");
    }
});
