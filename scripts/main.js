
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
          
            console.log("first clicked is " + firstClicked);
        }
        else {
            clicked.parentNode.classList.add('selected');
            secondClicked = clicked.parentNode.dataset.name;
            console.log("second clicked is " + secondClicked);
        }

        if (firstClicked !== "" && secondClicked != "") {
            if (firstClicked === secondClicked) { 
                setTimeout(() => { applyMatch(); }, 1000);  //call apply match function if both cards are same.
                setTimeout(() => { resetGuessIfNotMatched(); }, 1000); //reset guess so that other cards can be selected again
            }
             else {
                setTimeout(() => { resetGuessIfNotMatched(); }, 1000);
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