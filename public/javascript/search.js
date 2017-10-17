
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
		var array = response.tracks.items.slice(0,10);
		array.forEach((value, index, array) => {
			var song = $('<li>').addClass('media background-color');
			var img_div = $('<div>').addClass('media-left');
			var clickable = $('<a>').attr('href', '#').data('id', value.id).addClass('song-button');
			var img = $('<img>').addClass('media-object img-circle').attr('alt', 'Generic placeholder image');
			img_div.append(clickable.append(img));
			var body = $('<div>').addClass('song-body media-body');
			var title = $('<h4>').addClass('media-heading');
			img.attr('src', value.album.images[2].url);
			title.text(value.name);
			body.text(value.artists[0].name);
			body.append(title);
			song.append(img_div, body);
			list.append(song);
			// $("#media").append($("<div>").text(value.name));
		});
		$(".song-list").remove();
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

function addSong() {
	console.log('Song added');
	var id = $(this).data('id');
	$('.song-list').remove();
	$('.playlist').show();
	var url = "https://api.spotify.com/v1/users/" + localStorage.getItem('user_id') + "/playlists/" + localStorage.getItem('playlist_id')
	+ "/tracks?position=0&";
	var track = "uris=spotify:track:" + id;
	url += track;
	$.ajax({
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		url: url,
		method: "POST",
		data: {
		},
		error: function (request, status, error) {
        console.log(request.responseText);
    }


	}).done((response) => {
		//Force reload after 30 seconds
		setTimeout(() => {
			$('.playlist').attr('src', $('.playlist').attr('src'));
		}, 15000);
		

	});
}

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

$(document).on('click', '.song-button', addSong);