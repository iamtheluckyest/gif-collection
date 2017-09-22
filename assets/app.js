var animals = ["cats", "dogs", "chickens", "cows"];


//display animals as buttons
function displayButtons() {
	$("#buttons-col").empty();
	for (i = 0; i<animals.length; i++) {
		var animalCaps = animals[i].charAt(0).toUpperCase() + animals[i].slice(1);
		var nextButton = $("<div>").addClass("searchTerm").attr("data-name", animals[i]).html(animalCaps);
		$("#buttons-col").append(nextButton);
	}
}

displayButtons();

$(document).ready(function() {
	$("#new-item").on("focus", function() {
		$(this).val("");
	});

	$("#submit-item").on("click", function(event) {
		event.preventDefault();
		animals.push($("#new-item").val());
		displayButtons();
		$("#new-item").val("New item");
	});

	//on button click, retrieve from api
	$(document).on("click", ".searchTerm", function() {
		$("#header").html("<h1>" + $(this).html() + "</h1><h2>Click on an image to animate it.</h2>");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&api_key=59beb29549684997b07b2da6b6abb8f1&limit=15";
		$.ajax({ url : queryURL, method:"GET"})
		.done( function(response){
			$("#offset-container").empty();
			console.log(response.data)

			for(i=0; i < response.data.length; i++) {
				var gifContainer = $("<div>").addClass("gif-container");
				var gifImg = $("<img>");
				gifImg.attr("src", response.data[i].images.fixed_height_small_still.url).attr("data-moving-url", response.data[i].images.fixed_height_small.url).attr("data-still-url", response.data[i].images.fixed_height_small_still.url).attr("data-state", "still");
				var gifRating = $("<p>");
				gifRating.html("Rating: " + response.data[i].rating);
				gifContainer.append(gifImg).append(gifRating);
				
				if (gifRating.html() === "Rating: g"| gifRating.html() === "Rating: pg") {
					$("#offset-container").append(gifContainer);
				}
				
			};
		}); //end $.ajax
	}); //end for $(document).on("click, ".searchTerm"...)

	$(document).on("click", ".gif-container img", function() {
		if ($(this).attr("data-state") === "still") {
			$(this).attr("data-state", "moving");
			$(this).attr("src", $(this).attr("data-moving-url"))
		}
		else if ($(this).attr("data-state") === "moving") {
			$(this).attr("data-state", "still");
			$(this).attr("src", $(this).attr("data-still-url"))
		};
	});
});

