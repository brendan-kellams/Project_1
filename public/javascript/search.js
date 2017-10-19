$(".search-form").submit((event) => {
	event.preventDefault();
	// var input = parseSong($("#search").val());
	var input = $('#search').val();
	$("#search").val("");
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
	}).error((response) => {console.log(response)});
});

/* Function call to query the current song */
$("#contact").on("click", (event) => {
	$.ajax({
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		},
		url: "https://api.spotify.com/v1/me/player/currently-playing",
		method: "GET",
		data: {
		},
		error: (response) => {
			console.log(response);
		}
	}).done((response) => {
		console.log(response);
	});
});

/* Function call to query the current song */
$("#about").on("click", (event) => {
	$.ajax({
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		},
		url: "https://api.spotify.com/v1/users/1298427285/playlists/6J2UwWFWSTzT5yg0BxLpOp/tracks",
		method: "GET",
		data: {
		},
		error: (response) => {
			console.log(response);
		}
	}).done((response) => {
		console.log(response);
	});
});



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
		}, 1000);
		

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

/* Function using regex to remove emojix, special characters, and limit of 25 characters for song */
function parseSong (string) {
  // var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	var regex_2 = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{0,25}$/g;

  return string.replace(regex_2, '');
}



//Parsing cookie
$(document).ready(() => {
	var token = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var name = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	console.log(token);
	localStorage.setItem('token', token);
	localStorage.setItem('name', name);

	//Dynamically add songs
	$(document).on('click', '.song-button', addSong);


	//Testing iframes
	$(document).on('click', '.track-row-info', function() {
		console.log($(this));
	})
});