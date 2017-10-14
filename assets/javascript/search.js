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
		console.log(response);
		response.tracks.items.forEach((value, index, array) => {

			$("#media").append($("<div>").text(value.name));
		});
	});
});