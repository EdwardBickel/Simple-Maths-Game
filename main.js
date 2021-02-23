const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")

// Step 3. Create variable to store generated problem in memory
let state = {
  score: 0,
  wrongAnswers: 0
}

// Step 4. Want to update the problem when the page loads, when a user gets an answer right/worng and restarting the game.
function updateProblem() {
  state.currentProblem = generateProblem()
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProblem()

// Step 1: generate randon number
function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

// Step 2: generate a new problem each time
function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

// Step 5. Add a text input field for user
ourForm.addEventListener("submit", handleSubmit)

// Step 6. Calculate correct answer 
function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer;
  const p = state.currentProblem;
  if (p.operator === "+") {
    correctAnswer = p.numberOne + p.numberTwo;
  }
  if (p.operator === "-") {
    correctAnswer = p.numberOne - p.numberTwo;
  }
  if (p.operator === "x") {
    correctAnswer = p.numberOne * p.numberTwo;
  }
  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score // textContent rather than innerHTML since we are just displaying text.
    updateProblem()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    // Step 11: animate for wrong answer
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451) // since animation lasts for 450ms, remove 1 sec later
  }
  checkLogic()
}

// Step 7. Limits no. of points to 10 and no. of mistakes to 2
function checkLogic() {
  // if you won
  if (state.score === 10) {
    endMessage.textContent = "Congrats! You won."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 331) /*overlay takes 330ms to animate into view so focus the button 1 sec after. focus() will also enable the user to simply press the enter key to start a new game*/
  }

  // if you lost
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry! You lost."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 331) /*overlay takes 330ms to animate into view so focus the button 1 sec after. focus() will also enable the user to simply press the enter key to start a new game*/
  }
}

// Step 10: Clicking overlay button resets the game
resetButton.addEventListener("click", resetGame)

// Step 8. A function that resets the game
function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

// Step 9. Set up progress bar
function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}