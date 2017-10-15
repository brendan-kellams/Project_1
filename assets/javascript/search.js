
$(".search-form").submit((event) => {
	event.preventDefault();
	var input = $("#search").val();
	console.log(input);
	console.log(localStorage.getItem("token"));
	$.ajax({
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		},
		url: "https://api.spotify.com/v1/search",
		method: "GET",
		data: {
			q : input,
			type: "track"
		},

	}).done((response) => {
		$(".playlist").hide();
		var list = $('<ul>').addClass('song-list media-list');

		console.log(response);
		response.tracks.items.forEach((value, index, array) => {
			var song = $('<li>').addClass('media');
			var img_div = $('<div>').addClass('media-left');
			var img = $('<img>').addClass('media-object').attr('alt', 'Generic placeholder image');
			img_div.append(img);
			var body = $('<div>').addClass('song-body media-body');
			var title = $('<h5>').addClass('mt-0 mb-1 media-heading');
			img.attr('src', value.album.images[2].url);
			title.text(value.name);
			body.text(value.artists[0].name);
			body.append(title);
			song.append(img_div, body);
			list.append(song);
			// $("#media").append($("<div>").text(value.name));
		});
		$("#media").append(list);
	});
});

// $("#contact").on("click", (event) => {
// 	console.log(localStorage.getItem("token"));
// 	$.ajax({
// 		headers: {
// 			Authorization: "Bearer " + localStorage.getItem("token")
// 		},
// 		url: "https://api.spotify.com/v1/me/playlists",
// 		method: "GET",
// 		data: {
// 		},

// 	}).done((response) => {
// 		console.log(response);
// 	});
// });