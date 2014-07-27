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

    var t_c_checked = $("input[type='checkbox']").is(':checked');

    var tidyMessage = $("#messageBox").val().replace(/(\r\n|\n|\r)/gm, "~|");
    var tidyAddress = $("#addressBox").val().replace(/(\r\n|\n|\r)/gm, "~|");

    var messageChunks1 = tidyMessage.slice(0  , 200);
    var messageChunks2 = tidyMessage.slice(200, 400);
    var messageChunks3 = tidyMessage.slice(400, 600);
    var messageChunks4 = tidyMessage.slice(600, 800);

    var addressChunks1 = tidyAddress.slice(0  , 200);
    var addressChunks2 = tidyAddress.slice(200, 400);

    var messageWritten = true;
    var addressWritten = true;
    var tancTicked     = true;

    $("#m1").val(messageChunks1);
    $("#m2").val(messageChunks2);
    $("#m3").val(messageChunks3);
    $("#m4").val(messageChunks4);

    $("#a1").val(addressChunks1);
    $("#a2").val(addressChunks2 + "agreed:" + t_c_checked);

    if (tidyMessage.length != 0 &&
        tidyAddress.length != 0 &&
        t_c_checked) {
        // If there is an address and a message then
        // display the waiting box, and send data to paypal
        $(".paypal-wait-words").html("Hold on a tick, PayPal will take it from here.");
        $(".paypal-wait-box").addClass("visible");
        ga('send', 'event', 'success', 'click', 'all filled in!');
        return true;
    } else {
        // if somethign is wrong then go through these options
        if (tidyMessage.length === 0) {
            $("#messageBox").addClass("textarea-error");
            $(".card-error-message").html("You haven't written anything!");
            $(".card-error-message").addClass("visible");
            messageWritten = false;
        }
        if (tidyAddress.length === 0) {
            $("#addressBox").addClass("textarea-error");
            $(".envelope-error-message").html("Where should we send it?");
            $(".envelope-error-message").addClass("visible");
            addressWritten = false;
        }
        if (t_c_checked === false) {
            $(".t-and-c-error").html("If you don't tick to say that you agree then we can't write your letter!");
            $(".t-and-c-error").addClass("visible");
            tancTicked = false;
        }
        ga('send', 'event', 'error', 'click',
            "messageWritten:"+messageWritten+"addressWritten:"+addressWritten+"tancTicked:"+tancTicked );
        return false;
    }
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
                    'subject':   theirName + ' Just signed up for postednotes',
                    'html':      theirAddress
                }
            }
        }).done(function(response) {
            console.log(response); // if you're into that sorta thing
        });
        $(".message").html('<div class="alert alert-success" role="alert">Thanks! We&rsquo;ll be in touch.</div>');
        ga('send', 'event', 'success', 'click', 'email sign up');
    } else {
        $(".message").html('<div class="alert alert-warning" role="alert">Fill it in <em>before</em> you press send!</div>');
        ga('send', 'event', 'error', 'click', 'email sign up error');
    }
    return false;
};

var clearErrorMessages = function() {
    $("#messageBox").removeClass("textarea-error");
    $("#addressBox").removeClass("textarea-error");
    $(".card-error-message").removeClass("visible");
    $(".envelope-error-message").removeClass("visible");
    $(".t-and-c-error").removeClass("visible");
};

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

var giveMessageFocus = function() {
    console.log("giving focus to message");
    setTimeout(function() {
        $("#messageBox").focus();
    }, 0);
};

var doThisOnKeyup = function(event) {
    var selector  = event.data.selector;
    var magicWord = event.data.magicWord;
    var warnChars = event.data.warnChars;
    var maxChars  = event.data.maxChars;

    clearErrorMessages(); //this feels a bit ineficient

    var count = $(selector).val().length;

    var propertyName = "haswrittenSome_" + magicWord;
    if (document.postedNotesOneOffEventFlags[propertyName] == false && count > 0) {
        //the count is there to stop the keyup from a tab being the thing that triggers this event.
        ga('send', 'event', 'write', 'start', magicWord);
        console.log(propertyName);
        document.postedNotesOneOffEventFlags[propertyName] = true;
    }

    var numberAreaSelector  = "#char-count-number-"+ magicWord;
    var messageAreaSelector = "#char-count-" + magicWord
    if (count < warnChars) {
        $(numberAreaSelector ).html("<span class='text-success'>" + count + "</span>");
        $(messageAreaSelector).html("<span class='glyphicon glyphicon-thumbs-up'></span>");
    } else if (count <= maxChars) {
        $(numberAreaSelector ).html("<span class='text-warning'>" + count + "</span>");
        $(messageAreaSelector).html("<span class='text-warning'>Time to start winding it up</span>");
    } else if (count > maxChars) {
        $(numberAreaSelector ).html("<span class='text-danger'>" + count + "</span>");
        $(messageAreaSelector).html("<span class='text-danger'>Too many characters, you need to trim a little.</span>");
    } else {
        console.log(["the bogey man commeth", count, target]);
    }

};



$(window).resize(function() {
    fixBorder();
    // console.log("resize");
});

$(document).ready(function() {
    //declare things for analytics
    document.postedNotesOneOffEventFlags = new Object();
    document.postedNotesOneOffEventFlags.hasScrolled = false;
    document.postedNotesOneOffEventFlags.haswrittenSome_message = false;
    document.postedNotesOneOffEventFlags.haswrittenSome_address = false;

    //fix the border of the blue section - this makes me sad
    fixBorder();

    //register events
    $('#messageBox').keyup({selector: '#messageBox', magicWord: 'message', warnChars: 500, maxChars: 800}, doThisOnKeyup );
    $('#addressBox').keyup({selector: '#addressBox', magicWord: 'address', warnChars: 250, maxChars: 400}, doThisOnKeyup );

    $("input[type='checkbox']").click(clearErrorMessages);

    $("#realButton").click(processInputs);

    var toggleProTips = function() {
        $(".pro-tips").toggleClass("pro-tips-active");
        ga('send', 'event', 'thing', 'click', 'pro tips');
    }

    $(".pro-tips").click(toggleProTips);
    $(".pro-tips").keypress(function(e) {
        if(e.which == 13) {  toggleProTips(); }
        ga('send', 'event', 'thing', 'click', 'pro tips KB');
    });

    var browser = get_browser();
    var browser_version = parseInt(get_browser_version(), 10);
    console.log(["we're reading your browser as:", browser, browser_version]);
    if (browser === "Chrome" && browser_version >= 37) {
        console.log("You've got pretty placeholder text");
        $(".card textarea").attr("placeholder", letter);
        $(".envelope textarea").attr("placeholder", address);
        ga('send', 'event', 'thing', 'start', 'pretty placeholder served');
    } else {
        console.log("Sorry, you don't have pretty placeholder text");
    }

    // scroll to the writing box
    $('.btn-ghost').click(function() {
        ga('send', 'event', 'thing', 'click', 'jumped straight to writing');

        var offset = $("#note").offset().top;
        console.log("offset: " + offset);
        $(document.body).stop().animate({
                'scrollTop': offset
            },
            600,
            "swing",
            giveMessageFocus
        );
        return false;
    });

    $("body").scroll(function() {
        //captures if the user scrolls first or clicks the 'start writing now' button first
        //as that button triggers a scroll there will be a pair of events click, then scroll.
        //is they scroll first it'll be scroll, do other things.
        if(document.postedNotesOneOffEventFlags.hasScrolled==false){
            console.log("did a scrolly");
            ga('send', 'event', 'scrolled');
            document.postedNotesOneOffEventFlags.hasScrolled = true;
        }
    });

    $(window).bind("beforeunload", function() {
        //I have no idea if this is working!
        ga('send', 'event', 'close', JSON.stringify(document.postedNotesOneOffEventFlags));
    });

    $(document).focus();
});
