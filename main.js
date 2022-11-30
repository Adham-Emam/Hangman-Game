// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = [...letters];

let letterContainer = document.querySelector(".the-letters");

// Generate Letters

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.classList.add("letter-box");

  span.append(letter);
  letterContainer.appendChild(span);
});

// Object of Words + Categories

let words = {
  programing: [
    "html",
    "css",
    "javascript",
    "php",
    "python",
    "ruby",
    "swift",
    "kotlin",
    "java",
    "sass",
    "typescript",
    "c",
    "mysql",
    "flutter",
    "go",
  ],
  movies: [
    "parsite",
    "sutter island",
    "kingkong",
    "interstellar",
    "wiplash",
    "coco",
    "up",
    "prestige",
    "inception",
    "titanic",
  ],
  series: [
    "breaking bad",
    "peaky blinders",
    "prison break",
    "game of thrones",
    "the walking dead",
    "better call saul",
    "lubin",
    "the flash",
  ],
  countries: [
    "egypt",
    "italy",
    "morroco",
    "algeria",
    "qatar",
    "russia",
    "china",
    "japan",
    "german",
    "england",
    "poland",
    "baly",
    "mexico",
    "canada",
    "france",
  ],
  anime: [
    "one piece",
    "naruto",
    "bleach",
    "parasite",
    "fullmetal alcemist",
    "one punch man",
    "gintama",
    "fire force",
    "the promise never land",
    "chainsaw man",
    "dragon ball",
    "hunter x hunter",
    "jojo",
    "demon slayer",
    "baki",
    "attack on titan",
    "black clover",
    "death note",
    "steins gate",
  ],
};

// Generate Random Property

let allKeys = Object.keys(words);

let randomPropNum = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNum];
let randomPropValue = words[randomPropName];

let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNum];

// Set Category info
document.querySelector(".game-info span").innerHTML = randomPropName;

// Generate letters Guess
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen word to Array
let lettersToArray = [...randomValue];

// Create Spans Depend on Words
lettersToArray.forEach((letter) => {
  let guessSpan = document.createElement("span");
  // If letter is space
  if (letter === " ") {
    guessSpan.classList.add("space");
  }

  letterGuessContainer.appendChild(guessSpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select the Draw Element
let theDraw = document.querySelector(".hangman-draw");
// Handle clicking on Letters
document.addEventListener("click", (e) => {
  // Set the chose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    lettersToArray.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        // Set Status to Correct
        theStatus = true;

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // If the Letter is Wrong
    if (!theStatus) {
      //increase wrong attempts
      wrongAttempts++;

      // Add Class Wrong on the Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("wrong").play();

      if (wrongAttempts == 8) {
        endGame();

        document.getElementById("finish").play();

        letterContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup
  let div = document.createElement("div");
  div.classList.add("game-over");
  let h2 = document.createElement("h2");
  h2.innerHTML = `Game Over`;
  let p = document.createElement("p");
  p.innerHTML = `The Word is ${randomValue}`;
  let btn = document.createElement("button");
  btn.onclick = () => window.location.reload();
  btn.innerHTML = "Try Again";
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(btn);
  document.body.append(div);
}
