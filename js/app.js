jQuery(function($){

	//global variables
	var socket = io.connect();
	var $sendForm = $("#send-images");
	var $nick = $("#nick");
	var $image = $("#select-image").on("change", function(){
		var value = $(this).val();
		$image = value;
	});
	if ($.type($image) === "string") // if change select
		$image = $image;
	else
		$image = $("#select-image :selected").val(); //then get the first one
	var $images = $("#images");

	//send to socket server
	$sendForm.submit(function(e){
		e.preventDefault();
		socket.emit("client message", {nick : $nick.val(), image: $image});
		$nick.val("");
	});

	//receive from socket server
	socket.on("server message", function(data){
		nick = data.nick;
		image = data.image;
		$images.append("<li><img src='img/"+image+".jpg'><strong>"+nick+"</strong></li>");
	});

});