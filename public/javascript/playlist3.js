$("#add-playlist").on("click", function(event) {
        event.preventDefault();

        var playList = $("#playlist-input").val().trim();
     

        $("#playlist-input").val("");

        var queryURL = "https://api.spotify.com/v1/users/j9666mzsgqihayq587nmztuzr/playlists";

        $.ajax({
           url: queryURL,
           headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
                },
           method: "POST",

           data: JSON.stringify({name: playList, public: true}),

            success: function(response) {
            console.log(response)
		   		}
			});

      })


 




           
 







 