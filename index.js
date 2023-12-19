const api_key = "6OkFy2q6jXj4sYmgKl9ZfB09sKgyvEwy";
const apiUrl = `https://api.giphy.com/v1/clips/search?api_key=${api_key}&q=dhoni&limit=1&offset=0&country_code=india&rating=g&lang=en`;

const dogsNames = [
  "demon",
  "anihilator",
  "destroyer",
  "bull",
  "tommy",
  "mieky",
];
let currentDogname = [];
let removedLetter = [];
let removeLetterPosition = [];
let chance;

const formElm = document.querySelector("#formval");
const inputval = document.querySelector("#inputval");
const btn = document.querySelector("#btn");
const wrong = document.querySelector("#wrong");
const chanceElm = document.querySelector("#chance");
const overElm = document.querySelector("#over");
const guessNamePara = document.querySelector("#guessName");

function generateRandomUniqueNumber(lengthVal) {
  let usedNumbers = [];
  function getRandomNumber() {
    return Math.floor(Math.random() * lengthVal);
  }
  function isNumberUsed(number) {
    return usedNumbers.includes(number);
  }
  function generateUniqueNumber() {
    let randomNumber = getRandomNumber();
    while (isNumberUsed(randomNumber)) {
      randomNumber = getRandomNumber();
    }
    usedNumbers.push(randomNumber);
    return randomNumber;
  }
  return generateUniqueNumber();
}

function removeRandomLetter(nameArray) {
  removedLetter = [];
  removeLetterPosition = [];
  for (let index = 0; index < 3; index++) {
    let randomUniqueNumber = generateRandomUniqueNumber(nameArray.length);
    removedLetter.push(nameArray[randomUniqueNumber]);
    removeLetterPosition.push(randomUniqueNumber);
    nameArray[randomUniqueNumber] = "_";
  }
  return nameArray;
}

function startGame() {
  chance = 5
  chanceElm.innerText = chance
  let randomUniqueNumber = generateRandomUniqueNumber(dogsNames.length);
  const oneDogName = dogsNames[randomUniqueNumber];
  currentDogname.shift();
  currentDogname.push(oneDogName);
  const nameArray = oneDogName.split("");
  let removedRandom = removeRandomLetter(nameArray);

  guessNamePara.innerHTML = "";
  removedRandom.forEach((e) => {
    let spanElm = document.createElement("span");
    spanElm.classList.add('letter')
    spanElm.innerText = e;
    guessNamePara.appendChild(spanElm);
  });
}

setInterval(()=>{
  wrong.innerText = ''
  overElm.innerText = ''
}, 3000)

formElm.addEventListener("submit", (e) => {
  e.preventDefault();
  let spansElm = document.querySelectorAll(".letter");
  let value = inputval.value;
  if (removedLetter.includes(value)) {
    removedLetter.forEach((e, idx) => {
      if (e === value) {
        const rightPosition = removeLetterPosition[idx];
        spansElm[rightPosition].innerText = e;
      }
    });
  } else {
    wrong.innerText = 'wrong'
    if(chance==0){
      startGame()
      overElm.innerText = 'Game over'
    }
    chance--
    chanceElm.innerText = chance
  }
  inputval.value = "";
});

btn.addEventListener("click", (e) => {
  startGame();
});

startGame();
