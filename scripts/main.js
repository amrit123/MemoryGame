

let cardsArr = [ //this is the Array that consist of objects with static images
    {
        name: "aceOfDiamond",
        image: "img/aceOfDiamond.jpg"
    },
    {
        name: "eightOfSpade",
        image: "img/eightOfSpade.jpg"
    },
    {
        name: "fiveOfHeart",
        image: "img/fiveOfHeart.jpg"
    },
    {
        name: "fourOfDiamond",
        image: "img/fourOfDiamond.jpg"
    },
    {
        name: "nineOfClub",
        image: "img/nineOfClub.jpg"
    },
    {
        name: "sevenOfDiamond",
        image: "img/sevenOfDiamond.jpg"
    },
    {
        name: "sixOfDiamond",
        image: "img/sixOfDiamond.jpg"
    },
    {
        name: "tenOfHeart",
        image: "img/tenOfHeart.jpg"
    },
    {
        name: "threeOfClub",
        image: "img/threeOfClub.jpg"
    },
    {
        name: "twoOfClub",
        image: "img/twoOfClub.jpg"
    },

]




const wrapper = document.getElementById('wrapper'); //get the section element by id
cardsArr = cardsArr.concat(cardsArr).sort(() => 0.5 - Math.random()); //concat the array so that we will have 2 pair of each cards and then sort it randomly


//this contains some initializers
let count = 0;
let firstClicked = "";
let secondClicked = "";
let previouslyClicked = null;
let currentPlayer=1; //set the current player to 1. 
let totalScore=[0,0]; //store total for each player.
const currentTurn=document.getElementById("current-turn");
currentTurn.textContent=`player ${currentPlayer}`;

startgameAgain=function(){
    location.reload();  //this function will reload the game
}
startgame=function(){
    
    cardsArr.forEach((item) => { //loop through each cards in the array
        //for each cards create a new Divand apply divclass to it.assign the data value 
        const card = document.createElement("div");
        card.classList.add('card');
        card.dataset.name = item.name;
    
        //create another div for front face of the image which is shown at the start and apply front-face class to it
        const frontFace=document.createElement("div");
        frontFace.classList.add("front-face");
    
        //create another div for back face which will have the image of the cards and assign the back-face class and set its background image to the image url.
        const backFace=document.createElement("div");
        backFace.classList.add("back-face");
        backFace.style.backgroundImage = `url(${item.image})`;
        backFace.style.backgroundSize= "100px 140px";
    
        // Append the div to the  section element 
        wrapper.appendChild(card);
        card.appendChild(frontFace);
        card.appendChild(backFace)
    
        //this is how the elements will look like in html
       /*  <section class="wrapper">
       <div class="card">
       <div class="front-face"></div>
      <div class="back-face"></div>
       </div>
      
      </section> */
    
    })
    //remove the diaplay of welcome  messege
    document.querySelector(".welcome").style.display = "none";
    //make game on text visible
    document.querySelector(".game-on").style.visibility = "visible";
     //make horizontal line visible
    document.querySelector(".hr").style.visibility = "visible";
    //make players cornor visible
    document.querySelector(".players").style.visibility = "visible";
    
}

//const allMatched = document.querySelectorAll(".match");





    wrapper.addEventListener("click", (event) => { //add click event to he wrapper sice it the parent element and the child eøement can be acessed y event.target
        let clicked = event.target; //get the target element
    
        // Do not allow the wrapper section itself to be selected; only select divs inside the wrapper and do not allow the click to already matched element or selected element
        if (clicked.nodeName === "SECTION" || previouslyClicked === clicked || clicked.parentNode.classList.contains("selected") || clicked.parentNode.classList.contains("match")) { 
            return;
         }   
        if (count < 2) { //this will allow only to be clicked two cards
            count++;
            if (count === 1) { //first card is selected and add selected to its parent element that is card class
                clicked.parentNode.classList.add('selected');
                firstClicked = clicked.parentNode.dataset.name;
            }
            else {
                clicked.parentNode.classList.add('selected');
                secondClicked = clicked.parentNode.dataset.name;
            }
    
            if (firstClicked !== "" && secondClicked != "") {
                if (firstClicked === secondClicked) { 
                   
                    setTimeout(() => { applyMatch();
                        setScore(currentPlayer); //this function will calculate the current sscore and add to the global score
                    checkWinner(); //check if game is over and there is a winner
                }, 1000);  //call apply match function if both cards are same.
                    setTimeout(() => { resetGuessIfNotMatched(); }, 1000); //reset guess so that other cards can be selected again
                }
                 else {   
                    if (currentPlayer === 1) {
                        currentPlayer = 2;
                    } else if (currentPlayer === 2) {
                        currentPlayer = 1;
                    }
                    setTimeout(() => { resetGuessIfNotMatched(); 
                        currentTurn.textContent=`player ${currentPlayer}`; //update the current turn value
                    }, 1000);
                } 
            }
    
        }
    
        previouslyClicked = clicked; //this flag is set here to make  sure the same card is not clicked twice
    })




applyMatch = () => { //apply match class if both cards are same

    const allSelectedcards = document.querySelectorAll(".selected");
   
    allSelectedcards.forEach((item) => {
        item.classList.add("match");
    })
  
}
checkWinner=function(){
//this function will calculate the winner
    const allmatchcards = document.querySelectorAll(".match");
    const totalCards=cardsArr.length;
    if(allmatchcards.length===totalCards){ //check if total match cards are equal to total no of cards available in the array
        
        if(totalScore[0]>totalScore[1]){ //if yes evaluate the score
           // alert("player 1 wins")
            currentTurn.textContent=`player 1 wins`;
            document.querySelector(".game-over").style.visibility = "visible";
            document.querySelector(".game-over").textContent = "Game Over.Player 1 Wins"
            document.querySelector(".game-on").style.visibility = "hidden";
            document.querySelector(".button-start").style.visibility = "visible";
            d
        }
        else if(totalScore[0]<totalScore[1]){
           // alert("player 2 wins");
            currentTurn.textContent=`player 2 wins`;
            document.querySelector(".game-over").style.visibility = "visible";
            document.querySelector(".game-over").textContent = "Game Over.Player 2 Wins"
            document.querySelector(".game-on").style.visibility = "hidden";
            document.querySelector(".button-start").style.visibility = "visible";
        }
        else if(totalScore[0]===totalScore[1]){
            //alert("player 2 wins");
            currentTurn.textContent=`Its Draw`;
            document.querySelector(".game-over").style.visibility = "visible";
            document.querySelector(".game-over").textContent = "Game Over.Its Draw"
            document.querySelector(".game-on").style.visibility = "hidden";
            document.querySelector(".button-start").style.visibility = "visible";
           
        }
        
    }
    
   
}

resetGuessIfNotMatched = () => { //reset the initail values after match or non match state so that we can select another cards
    count = 0;
    firstClicked = "";
    secondClicked = "";
    previouslyClicked=null;

    const allSelectedcards = document.querySelectorAll(".selected"); //remove the selected class from the cards that are selected
    allSelectedcards.forEach((item) => {
        item.classList.remove("selected");
    })
}

setScore=function(currentPlayer){ //set the score in totalscore array if the card matches and update the score in UI
    if(currentPlayer===1){
                  
        totalScore[currentPlayer-1]=totalScore[currentPlayer-1]+2;
        console.log("current player is: "+ currentPlayer + "the total score is:" + totalScore[currentPlayer-1] );
    }
    else if(currentPlayer===2){
        
        totalScore[currentPlayer-1]=totalScore[currentPlayer-1]+2;
        console.log("current player is: "+ currentPlayer + "the total score is:" + totalScore[currentPlayer-1] );

    }
    //update the player score in the UI
    document.getElementById(`score-${currentPlayer}`).textContent=totalScore[currentPlayer-1]; 
}
