// Global variables that store DOM nodes
const mysteryWordForm = document.getElementById('mystery-word-form')
const mysteryWordInput = document.getElementById('mystery-word-input')
const alphaButtonsWrapper = document.querySelector('.alpha-btns-wrapper')
const wordInProgressWrapper = document.querySelector('.wip-wrapper')
const gameStatusHeading = document.getElementById('game-status-heading')
// Global variables that describe game state
const alphabetArray = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]
let mysteryWord = ''
let wordInProgressChars = []
let isGameOver = false
const selectedLetters = []

const getIsLetterSelected = (letter) => {
  return selectedLetters.some((selectedLetter) => selectedLetter === letter)
}

const selectLetter = (clickedAlphaButton) => {
  clickedAlphaButton.classList.add('selected')
  selectedLetters.push(clickedAlphaButton.value)
}

const getIsCorrectLetter = (letter) => {
  return mysteryWord.includes(letter)
}

const spellWordInProgress = () => {
  wordInProgressChars = mysteryWord.split('').map((ltr) => {
    return selectedLetters.includes(ltr) ? ltr : '*'
  })
  const wordInProgressStringSpans = wordInProgressChars.map((char) => {
    return `<span class="wip-part">${char}</span>`
  })
  wordInProgressWrapper.innerHTML = wordInProgressStringSpans.join('')
}

const endGame = (victoriously = false) => {
  isGameOver = true
  if (victoriously) {
    gameStatusHeading.innerText = 'Victory! You saved the snowman from melting.'
  } else {
    gameStatusHeading.innerText = 'Declare defeat. The snowman has melted.'
  }
}

const handleLetterInclusion = (letter) => {
  // Adjust the spelling of the word-in-progress to incorporate the correctly guessed letter.
  spellWordInProgress()
  // If the mysteryWord matches the word-in-progress, I've verified a victory, so end the game victoriously.
  if (mysteryWord === wordInProgressChars.join('')) {
    endGame(true)
  }
}

const handleLetterSelection = (event) => {
  const clickedAlphaButton = event.target
  const letter = clickedAlphaButton.value
  if (isGameOver) {
    return
  }
  if (getIsLetterSelected(letter)) {
    alert('You have already guessed that letter! Please try again.')
    return
  }
  selectLetter(clickedAlphaButton)
  if (getIsCorrectLetter(letter)) {
    handleLetterInclusion()
  } else {
    handleLetterExclusion()
  }
}

const buildAlphaButtons = () => {
  const buttonStringsArray = []
  for (let i = 0; i < alphabetArray.length; i++) {
    const buttonString = `<button class="alpha-btn" value=${alphabetArray[i]}>${alphabetArray[i]}</button>`
    buttonStringsArray.push(buttonString)
  }
  alphaButtonsWrapper.innerHTML = buttonStringsArray.join('')
  document.querySelectorAll('.alpha-btn').forEach((alphaButtonNode) => {
    alphaButtonNode.addEventListener('click', handleLetterSelection)
  })
}

const handleFormSubmission = (event) => {
  event.preventDefault()
  // Prevent the user from entering an empty string
  if (!mysteryWordInput.value.trim().length) {
    alert('The mystery word cannot be blank!')
    return
  }
  // Store a sanitized mysteryWord that's uppercased and stripped of whitespace
  mysteryWord = mysteryWordInput.value.trim().replace(/\s/g, '').toUpperCase()
  // Clear the textfield
  mysteryWordInput.value = ''
  // Display the mystery word as a series of asterisks
  spellWordInProgress()
  // Hide the form
  mysteryWordForm.classList.add('hidden')
  // Generate the alphabet buttons
  buildAlphaButtons()
}

mysteryWordForm.addEventListener('submit', handleFormSubmission)
