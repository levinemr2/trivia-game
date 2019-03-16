$(document).ready(function() {

	//GLOBAL VAR
	var currentQ;		//Used for Displaying Currently being used Info

	var correctAnswer;	// ------------------
	var wrongAnswer;	//Score Count
	var unanswered;		// ------------------

	var answered; 		//Used as Boolean
	
						//=============
	var seconds;		//TIMER
	var time;			//=============
	
	var userChoice;		// User Input

	var text = {
		correct: "Fab",
		incorrect: "Better Luck Next Time",
		noTime: "Sorry, time's up",
		done: "All Done!",
	};

	var triviaQuestions = [
		{	
			question: "Who was the original drummer for The Beatles",
			choices: ["Ringo Starr", "Peter Best", "Mick Jagger", "Stuart Suttcliffe", "John Lennon"],
			correct: 1,
			image: "images/giphy.gif",
			answerText: "The Beatles replaced Peter Best with Ringo Starr after seeing Starr perform in Hamburg",
		},

		{
			question: "What were the Beatles awarded with, as a group, by Queen Elizabeth?",
			choices: ["Knighthoods", "O.M.Bs", "M.B.Es", "L.M.Ns", "State Dinners"],
			correct: 2,
			image: "images/giphy2.gif",
			answerText: "The Beatles were made Members of the British Empire by Queen Elizabeth",
		},

		{
			question: "How many days will The Beatles love you?",
			choices: ["8", "7", "every other day", "only weekends", "on days that end with day"],
			correct: 0,
			image: "images/giphy3.gif",
			answerText: "Eight Days a Week I LOooOOooOOve you!",
		},

		{
			question: "The Beatles made their American debut on what TV show?",
			choices: ["David Letterman", "The Today Show", "The Ed Sullivan Show", "Koo Koo Kangaroo", "Last Week Tonight"],
			correct: 2,
			image: "images/giphy4.gif",
			answerText: "This is where we first heard the iconic phrase, 'Ladies and gentlemen... The Beatles!'",
		},
		{
			question: "Where are all four of the Beatles originally from?",
			choices: ["London", "Doblin", "Minsk", "Bath", "Liverpool"],
			correct: 4,
			image: "images/giphy5.gif",
			answerText: 'Part of the Beatles appeal was their image of being "from the wrong part of town"',
		},
		{
			question: "What was John Lennon's middle name",
			choices: ["George", "Michael", "Winston", "Eric", "Matthew"],
			correct: 2,
			image: "images/giphy6.gif",
			answerText: 'John was named after Winston Churchill'
		},
		{
			question: "What was the last album The Beatles released while still a group?",
			choices: ["Let it Be", "Sgt. Pepper", "Abbey Road", "Rubber Soul", "The White Album"],
			correct: 0,
			image: "images/giphy7.gif",
			answerText: "Let it Be was released directly before the band broke up"
		},
	];

	// Hides Content at Start Up
	$("#gameArea").hide();

	// Start Button Click and Hide
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	// ======================================================
	//Function to Start Game After Initial Click
	// ======================================================
	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}
	// ==================
	// Displays Question
	// ==================
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
		answered = true;
		// Prints Question from Array
		$(".question").html(triviaQuestions[currentQ].question);

		// -----------------------------------------
		//Loops through possible choices and appends
		// -----------------------------------------
		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

		//Calls Timer
		countdown();

		// USERCLICK
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// ==================
	// TIMER COUNTDOWN
	// ==================
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		//Delay of 1 sec before timer goes off
		time = setInterval(countDownSho, 1000);
	}

	// ==================
	// SHOWS TIMER
	// ==================
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	// ====================================
	// DISPLAYS ANSWER DIV
	// ====================================
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		//GIF IMG
		var gifLink = triviaQuestions[currentQ].image;
		var Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
		// GIF TEXT
		var gifText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(gifText);
			newCap.addClass("gifCap");
			$("#gifText").html(newCap);


		// DISPLAYS AND COUNTS USER ANSWERS/ UnANSWERS
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 4000);
		} else {
			currentQ++;
			setTimeout(questions, 4000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});
