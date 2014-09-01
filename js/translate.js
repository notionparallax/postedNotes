var translate = function(){
	var letter = $("textarea").val();

	//console.log(letter);

	var messdress = letter.split("`, address_part_1: ")
	var message   = messdress[0];
	var meta      = messdress[1].split("`");

	message = message.replace("Item Number 1", "");
	message = message.replace(/, message_part_\d: `/g, "");
	message = message.replace(/`/g, "");//this line is because I can't seem to get one or none working on the previous line
	message = message.replace(/\~\|/g, "<br>");
	//console.log(message);


	var address = meta[0]
	address = address.replace(/, address_part_\d: /g, "");
	address = address.replace(/\~\|/g, "<br>");
	//address = address.replace("agreed:true", "");
	//console.log(address);

	//console.log(meta);
	var goahead = meta[1] === "agreed:true";
	//console.log(goahead);

	var penType = meta[2].split(":")[1];
	//console.log(penType);


	$(".pp-response-message"   ).html(message);
	$(".pp-response-address"   ).html(address);
	$(".pp-response-authorised").html(goahead);
	$(".pp-response-pentype"   ).html(penType);

	$(".response").removeClass("hidden").addClass("visible");
}

$("#translate").click(translate);

/*
Item Number 1 , message_part_1: `Dear Sebastian,~|~|We haven't met, although I have heard a lot about you through my balding son, Ben Doherty, who I know you are friends with.~|~|In short, I miss Ben as he is somewhere in Australia`, message_part_2: ` pretending to be an architect, whilst in reality taking exercise classes and brewing kamchatka with his hipster girlfriend.~|~|I have watched you on facebook and in so many ways you remind me of Be`, message_part_3: `n atyour age: balding, paunchy, and pre-occupied with the internet.~|~|This letter is to suggest that you and I might spend a little time together, share stories about Ben, and if we both feel comfo`, message_part_4: `rtable, perhaps become physically intimate. ~|~|I know your hot mummy is also abroad, so perhaps like me you to have a hole in your life you'd like filling.~|~|Cuddles,~|~|Ben's Mum`, address_part_1: Sebastian Winnett~|2 West Park~|SE9 4RQ, address_part_2: `agreed:true`pen:black fountain pen
*/