// Global variables that store DOM nodes
const mysteryWordForm = document.getElementById('mystery-word-form')
const mysteryWordInput = document.getElementById('mystery-word-input')
const alphaButtonsWrapper = document.querySelector('.alpha-btns-wrapper')
const wordInProgressWrapper = document.querySelector('.wip-wrapper')
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

const isLetterAlreadySelected = (clickedLetter) => {
  return selectedLetters.some((ltr) => ltr === clickedLetter)
}

const selectLetter = (clickedAlphaButton) => {
  clickedAlphaButton.classList.add('selected')
  selectedLetters.push(clickedAlphaButton.value)
}

const handleLetterSelection = (event) => {
  const clickedAlphaButton = event.target
  const letter = clickedAlphaButton.value
  if (isGameOver) {
    return
  }
  if (isLetterAlreadySelected(letter)) {
    alert('You have already guessed that letter! Please try again.')
    return
  }
  selectLetter(clickedAlphaButton)
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
  const asterisksArray = mysteryWord.split('').map((ltr) => '*')
  wordInProgressChars = asterisksArray
  const asteriskSpans = asterisksArray.map(
    (asterisk) => `<span class="wip-part">${asterisk}</span>`
  )
  wordInProgressWrapper.innerHTML = asteriskSpans.join('')
  // Hide the form
  mysteryWordForm.classList.add('hidden')
  // Generate the alphabet buttons
  buildAlphaButtons()
}

mysteryWordForm.addEventListener('submit', handleFormSubmission)
