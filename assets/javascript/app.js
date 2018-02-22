$(document).ready(function () {

	// Listed questions, answers, and linked images
	var options = [
		{
			question: "Where on Tatooine did Padme' first meet Anakin?",
			choice: ["Mos Eisley", "Watto's Junk Shop", "Ben's Home", "Mos Espa Grand Arena"],
			answer: 1,
			photo: "assets/images/watto_shop.jpg"
		},
		{
			question: "What did Yoda say that Luke had to do in order for his training to be complete?",
			choice: ["Confront Vader", "Destroy the Death Star", "Go to Hoth", "Assemble a team of Jedi"],
			answer: 0,
			photo: "assets/images/Luke_vs_Vader.jpg"
		},
		{
			question: "What was the order given to call for the execution of the members of the Jedi Order?",
			choice: ["Order 37", "Order 151", "Order 66", "Order 12"],
			answer: 2,
			photo: "assets/images/star_wars_order_66.jpg"
		},
		{
			question: "Who ordered the destruction of Alderaan?",
			choice: ["Darth Vader", "Count Dooku", "General Grand Moff Tarkin", "Darth Sidious"],
			answer: 2,
			photo: "assets/images/general_tarkin.jpg"
		},
		{
			question: "What is the name of Boba Fett’s Ship?",
			choice: ["Snowspeeder", "UCS Sandcrawler", "Tantive IV", "Slave 1"],
			answer: 3,
			photo: "assets/images/slave_1.jpeg"
		},
		{
			question: "How did the Millenium Falcon escape detection when after detaching from the Star Destroyer?",
			choice: ["Lightspeed", "Floated away with the garbage", "Cloaking device", "An asteroid"],
			answer: 1,
			photo: "assets/images/space_garbage.jpeg"
		},
		{
			question: "What system did Luke tell R2D2 they were going to instead of “meeting up with the others?",
			choice: ["Hoth", "Degobah", "Tatooine", "Bespin"],
			answer: 1,
			photo: "assets/images/Dagobah.jpeg"
		},
		{
			question: "Who was the first to notice that the attack on the Death Star was 'A Trap' ",
			choice: ["Lando Calrissian", "Admiral Ackbar", "Luke Skywalker", "Han Solo"],
			answer: 0,
			photo: "assets/images/lando_cal.jpg"
		}];

	var correctCount = 0;
	var wrongCount = 0;
	var unanswerCount = 0;
	var timer = 20;
	var intervalId;
	var userGuess = "";
	var running = false;
	var qCount = options.length;
	var pick;
	var index;
	var newArray = [];
	var holder = [];

	$("#reset").hide();
	// Start button to start game
	$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for (var i = 0; i < options.length; i++) {
			holder.push(options[i]);
		}
	})
	// Start timer function
	function runTimer() {
		if (!running) {
			intervalId = setInterval(decrement, 1000);
			running = true;
		}
	}
	// Display Timer
	function decrement() {
		$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
		timer--;

		// Stop timer when it reaches 0
		if (timer === -1) {
			unanswerCount++;
			stop();
			$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
			hidepicture();
		}
	}

	// Time stop
	function stop() {
		running = false;
		clearInterval(intervalId);
	}
	
	// Display questions
	function displayQuestion() {
	// Randomize questions
		index = Math.floor(Math.random() * options.length);
		pick = options[index];


		// Iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for (var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);

		}



		// Click function to select answer and outcomes
		$(".answerchoice").on("click", function () {
			// Grab array position from userGuess
			userGuess = parseInt($(this).attr("data-guessvalue"));

			// Correct and wrong guess outcomes
			if (userGuess === pick.answer) {
				stop();
				correctCount++;
				userGuess = "";
				$("#answerblock").html("<p>Correct!</p>");
				hidepicture();

			} else {
				stop();
				wrongCount++;
				userGuess = "";
				$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
				hidepicture();
			}
		})
	}


	function hidepicture() {
		$("#answerblock").append("<img src=" + pick.photo + ">");
		newArray.push(pick);
		options.splice(index, 1);

		var hidpic = setTimeout(function () {
			$("#answerblock").empty();
			timer = 20;

			// Run the score screen if all questions are answered
			if ((wrongCount + correctCount + unanswerCount) === qCount) {
				$("#questionblock").empty();
				$("#questionblock").html("<h3>Game Over! </h3>");
				$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
				$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
				$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
				$("#reset").show();
				correctCount = 0;
				wrongCount = 0;
				unanswerCount = 0;

			} else {
				runTimer();
				displayQuestion();

			}
		}, 3000);


	}
 // Reset 
	$("#reset").on("click", function () {
		$("#reset").hide();
		$("#answerblock").empty();
		$("#questionblock").empty();
		for (var i = 0; i < holder.length; i++) {
			options.push(holder[i]);
		}
		runTimer();
		displayQuestion();

	})

})