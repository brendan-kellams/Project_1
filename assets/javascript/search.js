$(".search-form").submit((event) => {
	event.preventDefault();
	var input = $("#search").val();
	console.log(input);
	console.log(localStorage.getItem("token"));
	$.ajax({
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		},
		url: "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj",
		method: "GET",
		data: {
		},

	}).done((response) => {
		console.log(response);
	});
});