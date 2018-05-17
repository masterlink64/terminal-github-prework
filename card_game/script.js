// wait for DOM to load
document.addEventListener("DOMContentLoaded", function(){
    // keeping score variables
    // get element by id is easiest because will grab only one unique element
    var startbutton = document.getElementById("startbutton");
    var flippedCards;
    var matchedCards = 0;
    var highDisplayed = document.getElementById("highDisplayed");
    var highScore = localStorage.getItem("highScore"); // document.getElementById("highScore");
    highDisplayed.innerHTML = highScore;
    var score = document.getElementById("score");
    // class name will grab an arraay like element will all the elements in the class, need to specify which index
    var endContainer = document.getElementsByClassName("endMenu")[0];
    // query selector will select the first element from the element.  in this case the replay class
    var replayButton = document.querySelector(".replay");
    //var currentScore = document.getElementById("yourScore");
    // using fisher yates shuffle method to shuffle deck
    function shuffle(arr) {
        for (var i = arr.length-1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    // function to deal deck randomly and create the game area
    function dealDeck() {
        // grab all cards by class name
        var card = document.getElementsByClassName("card");
        // "deck" of cards
        // what is the best way to duplicate?
        var gif = ["url('img/kenneth.gif')", "url('img/curry.gif')", "url('img/walt.gif')", "url('img/avengers.gif')", "url('img/dog.gif')", "url('img/panda.gif')", "url('img/b99.gif')", "url('img/mario.gif')"];
        // in order to copy array easily
        var gif2 = gif.concat(gif); 

        // need to reset board when clicking replay
        flippedCards = [];
        winner.style.display = "none";
        endContainer.style.display = "none";
        //matchedCards = 0;
        score.innerHTML = 0;

        shuffle(gif2);
        // use for loop to change MULTIPLE elements
        for (var i = 0; i < card.length; i++) {
            // conditional to check if the class is flipped, if so then
            // toggle will switch between classes, this will reset all flipped cards
            if(card[i].classList.contains("flipped")) {
                card[i].classList.toggle("flipped");
            }
            // adding to each card a diff background and an event listener that will use a flip function
            // in order to flip the cards
            card[i].querySelector(".back").style.backgroundImage = gif2[i];
            card[i].addEventListener("click", flip);
        }
        window.location.hash = "board";
    }

    function flip() {
        // if the class of the card does NOT contain flipped AND flipped cards length is < 2 toggle flipped class
        if (!this.classList.contains("flipped") && flippedCards.length < 2) {
            this.classList.toggle("flipped");
        }
        // push element into flipped Cards so that you can keep track of how many cards are flipped
        flippedCards.push(this);
        // remove event listener for flipped cards for now
        // add it back on later when checking for matched cards
        for (var i = 0; i < flippedCards.length; i++) {
            flippedCards[i].removeEventListener("click", flip);
        }
        // if 2 cards are flipped check if they are matching!  use another function to check
        if (flippedCards.length === 2) {
            checkMatch();
        }
        // each click adds to score
        score.innerHTML++;
    }
    // check match function should match the background image of the cards
    // if they match then reassign flipped cards to an empty array else flip the card back in your chose of seconds.
    function checkMatch() {
        if (flippedCards[0].querySelector('.back').style.backgroundImage === flippedCards[1].querySelector('.back').style.backgroundImage) {
            flippedCards = [];
            // keep track of how many pairs are matched;
            matchedCards++;
            
          } else {
                //add event listener back before flipping cards back
                for (var i = 0; i < flippedCards.length; i++) {
                    flippedCards[i].addEventListener("click", flip);
                }
                setTimeout(flipBack, 1000);
          }
        // if all cards are matched then finish game!
        // can create seperate popup for it?
        if (matchedCards === 8) {
            // how to save score in localStorage????
            if (highScore !== null) {
                if (score.innerHTML < highScore) {
                    localStorage.setItem("highScore", score.innerHTML);
                }
            } else {
                localStorage.setItem("highScore", score.innerHTML);
            }
            winner.style.display = "flex";
            endContainer.style.display = "flex";
            yourScore.innerText = "Your score: " + score.innerHTML;
            // in order to close popup
            var close = document.querySelector(".closePopup");
            close.addEventListener("click", function() {
                winner.style.display = "none";
                endContainer.style.display = "none";
            })
            // how to save score in localStorage????

            // if (score.innerHTML < highScore.innerHTML) {
            //     highScore.innerHTML = score.innerHTML;
            //     localStorage.setItem("storedHighScore", highScore.innerHTML); 
            
        }
            // console.log(score);
            // console.log(score.innerHTML);
    
    }
    // make a function in order to flip the card back
    function flipBack() {
        flippedCards[0].classList.toggle("flipped");
        flippedCards[1].classList.toggle("flipped");
        flippedCards = [];
    }
    startbutton.addEventListener("click", dealDeck);
    // add listener for replay
    // just redealing deck will NOT work, I chose to reload page using laction reload with true to load form server
    replayButton.addEventListener("click", function() {
        location.reload(true)
    });
});
