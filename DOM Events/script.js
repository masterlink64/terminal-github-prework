// PART 1
// 1) add event listener fr DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {

});
/* or window.onload = function(){

} */

// 2) changing text
// need to grab element and then assign variable and then use innerText or inner HTML
document.addEventListener("DOMContentLoaded", function() {
    var changeHeading = document.getElementById("change_heading");
    changeHeading.innerText = "Hello World!";
// 3) When a user hovers over one of the colored boxes change the text to display the color that is being hovered over.
    var coloredBoxes = document.querySelector("section");
    coloredBoxes.addEventListener("mouseover", function(event) {
        var hoverColor = document.querySelector(".selected");
        hoverColor.innerText = event.target.className;
    })
// 4) Create a new div element.
    var newDiv = document.createElement("div");
// 5) Give your new div a class of purple and style it so that it has a background color of purple.
    newDiv.classList.add("purple");
    newDiv.style.backgroundColor = "purple";
// 6) Append your new div to the page to the section tag.
    coloredBoxes.appendChild(newDiv);    

// PART 2 
/* Create a racing game with the two cars. 
When the race button is pressed, the two cars should move across the screen until 
one of them is at the end of the screen. When one of the blocks reaches the end - you should alert "winner!" */

// add event listener for when the button is pressed
// when button is pressed have the two cars move until end of the screen
// add event listener for when race ends and should alert winner!
    var start = document.querySelector("button");
    var car1 = document.querySelector(".car1");
    var car2 = document.querySelcetor(".car2");
// in order to reset race!
    function reset(car1, car2){
        clearTimeout(car1.timer);
        clearTimeout(car2.timer);
        car1.style.marginLeft = 0;
        car2.style.marginLeft = 0;
        button.disabled = false;
    }

    start.addEventListener("click", function(event){
        // make car move
        // once a car reaches other end of screen alert winner and reset all settings/timer
        // need to use setInterval
        // disabled the ability to click on button while race is in progress
        start.disabled = true;
        car1.timer = setInterval(function() {
            car1.style.marginLeft = parseInt(car1.style.marginLeft) + Math.random()*60 + 'px';
            if(parseInt(car1.style.marginLeft) > window.innerWidth){
                alert("Car 1 wins!");
                reset(car1,car2);
            }
        },60)

        car2.timer = setInterval(function(){
            car2.style.marginLeft = parseInt(car2.style.marginLeft) + Math.random()*60 + 'px';
            if(parseInt(car2.style.marginLeft) > window.innerWidth){
                alert("Car 2 wins!");
                reset(car1,car2);
            }
        },60)
    })

}) 


