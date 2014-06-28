$(document).ready(function() {

    var processInputs = function() {
        console.log($("#messageBox").val());
        console.log($("#messageBox").val().length);
        console.log($("#addressBox").val());
        console.log($("#addressBox").val().length);

        var tidyMessage = $("#messageBox").val().replace(/(\r\n|\n|\r)/gm, "~|");
        var tidyAddress = $("#addressBox").val().replace(/(\r\n|\n|\r)/gm, "~|");

        var messageChunks1 = tidyMessage.slice(0, 200);
        var messageChunks2 = tidyMessage.slice(200, 400);
        var messageChunks3 = tidyMessage.slice(400, 600);
        var messageChunks4 = tidyMessage.slice(600, 800);

        var addressChunks1 = tidyAddress.slice(0, 200);
        var addressChunks2 = tidyAddress.slice(200, 400);
        console.log([messageChunks1, messageChunks2,
            messageChunks3, messageChunks4,
            addressChunks1, addressChunks2
        ]);

        $("#m1").val(messageChunks1);
        $("#m2").val(messageChunks2);
        $("#m3").val(messageChunks3);
        $("#m4").val(messageChunks4);
        $("#a1").val(addressChunks1);
        $("#a2").val(addressChunks2);

    };

    $("#testButton").click(processInputs);
    $("#realButton").click(processInputs);

});