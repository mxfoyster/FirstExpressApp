let filmName = ""; //what they must guess
let filmHint = ""; //the hint if they need it
let toReload = false;// our re-load flag
let guessSoFar = ""; //the guessing string

imgNo=1; //our image index global

var selectedDiff="hard"; //declare our radiobuttons difference here to make global

function runWordGame(){
	filmName = loadMovieNames(); //get our random movie and hint from xlm file
	//let's get our handles
	const charBtn = document.querySelector('input[name="tryChar"]'); //our 'TRY MY LUCK' button (guess a letter)   
	const myCharTry = document.getElementById("myTry"); //the 'TRY MY LUCK' text box
	const fullGuessBtn = document.querySelector('input[name="tryFullButton"]'); //our 'WILL I WIN' button (full guess)     
	const guessedLetters = document.getElementById("guessedLetters"); //fieled for letters guessed
	const pImg = document.getElementById("pBits"); //our penguin image / images 
	const hintBtn = document.querySelector('input[name="getHint"]'); //our 'HINT' button
	const alertBtn = document.querySelector('input[name="getAlertOK"]'); //our 'OK' button for custom alert box
	const modeIndicator = document.getElementById("modeIndicator");

	
	//*************************** TRY MY LUCK button handler ********************************** 
	charBtn.addEventListener("click", () => { //listen to our 'submit' (choose a char in our case)
			// we can put our guesses here
			checkGuess (myCharTry.value);
			output2.innerText = guessSoFar;
			myCharTry.value=""; //empty the box
			document.getElementById("myTry").focus(); //re-focus to char guess box
		});

	//**************************** Handle return on char box ***********************************
	myCharTry.addEventListener("keypress", function(event) {
			// If the user presses the "Enter" key on the keyboard
			if (event.key === "Enter") {
				charBtn.click();
				event.preventDefault();
			}
		});
	//**************************** HINT button handler *****************************************
	hintBtn.addEventListener("click", () =>{
			//if we have more than 2 goes spare regardless of difficulty
			if ((imgNo < 7 && selectedDiff == "easy") || (imgNo < 5 && selectedDiff == "hard")){
				CallCustomAlert (filmHint, false);
				imgNo += 1;
				changeImage(imgNo);
			}
			else{
				CallCustomAlert ("Not enough goes left ", false);
			}	
			document.getElementById("myTry").focus(); //re-focus to char guess box		
		});	

	//*********************Custom alert box OK button handler *****************************************
	alertBtn.addEventListener("click", () =>{
			document.getElementById("ourAlertBoxCNT").style.visibility="hidden"; //close the box (hide it actually)
			if (toReload) document.location.reload(true); //reload page for another go
		});
		
	//Start the game with instructions
	displayInstructions(true);
		
	//Our function to change the image src
	//it will change it according to the integer value we pass to it..
	
	
	
}

function changeImage (thisImgNo){
	imgNo = thisImgNo; //change our global image index
	imgSource = "wordgame/images/p" + imgNo + ".svg"; //build our filename
	if (selectedDiff == "hard" && imgNo == 5) imgNo = 6;//skip one for hard mode
	if (selectedDiff == "hard" && imgNo == 7) imgNo = 8;//skip one for hard mode
	
	if (imgNo < 9) {	//bounds check, we don't want to load something that doesn't exist
		imgSource = "wordgame/images/p" + imgNo + ".svg"; //build our filename
		pBits.src = imgSource; //change the source
	}
	else { 	//and if we're on the last one we lose anyway
		output2.innerText = filmName;
		pBits.src = imgSource; //change the source			
		CallCustomAlert ("You lose!!!", true); //if failed, it's all over
	}
}

function initGuessSoFar(){
	for (var i = 0; i < filmName.length; i++) {	//count through the filmName string
		thisChar =filmName.charAt(i); //character at current index
		if (thisChar != " ") guessSoFar +="?"; //dash if it's not a space
		else guessSoFar += " ";//but space if it is			
	}
}

function checkGuess (thisChar){
	matchesFound = 0; //count the matches
	var i;
	for (i = 0; i < filmName.length; i++){ 	//count through the filmName string
		thisTry = myTry.value.toUpperCase();
		if( (thisTry == filmName.charAt(i)) && thisTry != " ") {	//if it's a match
			matchesFound++; 
			guessSoFar = guessSoFar.substring(0, i) + filmName.charAt(i) + guessSoFar.substring(i + 1);
		}				
	}
	
	if (matchesFound == 0){ 	//if no matches
		changeImage (imgNo); //change the image
		imgNo++;// index our image +1
		guessedLetters.innerHTML += thisChar.toUpperCase() + " ";
	}	
	//let's check for a complete match while we're here.
	if (guessSoFar == filmName){
		output2.innerText = filmName;
		CallCustomAlert ("Congratulations, you won!!!", true);
	}
}

function CallCustomAlert (message, refreshAfter, size = "small"){
		const thisAlertBox = document.getElementById("ourAlertBoxCNT");
		if (size == "big"){
			thisAlertBox.style.width = "85%";
			thisAlertBox.style.height = "85%";
		}
		else{
			thisAlertBox.style.width = "250px";
			thisAlertBox.style.height = "150px";
		}
		
		thisAlertBox.style.visibility="visible";
		document.getElementById("alertText").innerHTML = message;	
		if (refreshAfter) toReload=true;
}

function loadMovieNames() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		getA_Movie(xhttp);
		}
	}
xhttp.open("GET", "wordgame/movies.xml", true);
xhttp.send();
}

//called by the LoadMovieNames() function above to extract the data once the xml is all loaded
//we will use it to store a randomly chosen movie and corresponding hint in our globals
function getA_Movie(xml) {
	const xmlDoc = xml.responseXML; //our handle to the file contents
	const moviesXml = xmlDoc.getElementsByTagName("movie"); //our handle to the movies tags
	
	//let's get a random movie and it's hint
	movieIndexToChoose = Math.floor(Math.random() * moviesXml.length); //get our random number
	filmName = moviesXml[movieIndexToChoose].getElementsByTagName("name")[0].childNodes[0].nodeValue;
	filmHint = moviesXml[movieIndexToChoose].getElementsByTagName("hint")[0].childNodes[0].nodeValue;
	
	//we should be able to initialise now
	initGuessSoFar();//initialise the guessing string
	//myFullGuessTry.maxLength = filmName.length; // limit the full guest box size to our film name
	output2.innerText = guessSoFar; // display our guessing string before we start
	document.getElementById("myTry").focus(); //focus on the character box at startup
}

function displayInstructions(first = false){
		fetch("wordgame/alerthtml/instructions.html", {
					
		}).then(function(response) {
			return response.text();
		}).then(function(response) {  
			CallCustomAlert (response, false, "big"); //if failed, it's all over
			if (first) document.getElementById("hard").checked = true;
			else{
				if (selectedDiff == "easy") document.getElementById("easy").checked = true;
				else document.getElementById("hard").checked = true;	
			} 

		}).catch (function (error){
			console.log(error);  
			//noData();
		});
		
}

function guessMovie(){
		fetch("wordgame/alerthtml/guessmovie.html", {
					
		}).then(function(response) {
			return response.text();
		}).then(function(response) {  
			CallCustomAlert (response, false, "small"); //if failed, it's all over

		}).catch (function (error){
			console.log(error);  
			//noData();
		});
}

function checkFullGuess(){
		const myFullGuessTry = document.getElementById("tryFullGuess"); //the 'WILL I WIN text box'
		if (myFullGuessTry.value.toUpperCase()== filmName){
			output2.innerText = filmName;
			CallCustomAlert ("Congratulations, you won!!!", true);
		}
		else{
			output2.innerText = filmName;
			imgNo = 9; //change image index
			changeImage(imgNo);
			CallCustomAlert ("You lose!!!", true); //if failed, it's all over;
		}
		myFullGuessTry.value = ""; //empty the box
		document.getElementById("myTry").focus(); //re-focus to char guess box
}

function changeDifficulty(){
		const radioButtons = document.querySelectorAll('input[name="difficulty"]'); // our radio buttons
		if (radioButtons[0].checked == false) {
			selectedDiff="hard";
			modeIndicator.style.color = "red";
		}
		else {
			selectedDiff="easy"; 
			modeIndicator.style.color = "green";
		}
		modeIndicator.innerHTML = selectedDiff.toUpperCase();
}