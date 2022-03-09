const mysteryWordForm = document.getElementById('mystery-word-form')
const mysteryWordInput = document.getElementById('mystery-word-input')
const snowmanImage = document.getElementById('snowman-image')
const incorrectGuessTracker = document.getElementById('incorrect-guess-tracker')
const wordInProgressWrapper = document.querySelector('.wip-wrapper')
const alphaButtonsWrapper = document.querySelector('.alpha-btns-wrapper')
const gameStatusHeading = document.getElementById('game-status-heading')
const restartGameButton = document.getElementById('restart-game-btn')
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
let selectedLetters = []
let incorrectGuessCount = 0
const incorrectGuessCap = 9

const getIsLetterSelected = (letter) => {
  return selectedLetters.some((selectedLetter) => selectedLetter === letter)
}

const selectLetter = (clickedAlphaButton) => {
  clickedAlphaButton.classList.add('selected')
  selectedLetters.push(clickedAlphaButton.value)
}

const getIsLetterCorrect = (letter) => {
  return mysteryWord.includes(letter)
}

const spellWordInProgress = () => {
  wordInProgressChars = mysteryWord.split('').map((ltr) => {
    return selectedLetters.includes(ltr) ? ltr : '*'
  })
  const wordInProgressSpanStrings = wordInProgressChars.map((char) => {
    return `<span class="wip-part">${char}</span>`
  })
  wordInProgressWrapper.innerHTML = wordInProgressSpanStrings.join('')
}

const endGame = (victoriously = false) => {
  isGameOver = true
  if (victoriously) {
    gameStatusHeading.innerText = 'Victory! You saved the snowman from melting.'
  } else {
    gameStatusHeading.innerText = 'Declare defeat. The snowman has melted.'
  }
}

/**
 * Adjusts the spelling of the word-in-progress to incorporate the correctly guessed letter.
 * Verifies a victory if the mysteryWord matches the word-in-progress and
 * delegates to a helper to end the game victoriously.
 */
const handleLetterInclusion = () => {
  spellWordInProgress()
  if (mysteryWord === wordInProgressChars.join('')) {
    endGame(true)
  }
}

const incrementIncorrectGuessCount = () => {
  incorrectGuessCount += 1
  incorrectGuessTracker.innerText = incorrectGuessCount
}

const setSnowmanSketch = () => {
  snowmanImage.setAttribute('src', `images/snowman${incorrectGuessCount}.png`)
  snowmanImage.setAttribute(
    'alt',
    `${incorrectGuessCount}/${incorrectGuessCap} thawed`
  )
}

const handleLetterExclusion = () => {
  incrementIncorrectGuessCount()
  setSnowmanSketch()
  // If the incorrectGuessCount equals the incorrectGuessCap, the user has lost, so end the game accordingly.
  if (incorrectGuessCount === incorrectGuessCap) {
    endGame()
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
  if (getIsLetterCorrect(letter)) {
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

// Clears the mystery word and displays the empty form for mystery word submission
const resetMysteryWord = () => {
  mysteryWord = ''
  mysteryWordForm.classList.remove('hidden')
  mysteryWordForm.classList.add('visible')
}

// Erases the record of incorrect guesses
const resetIncorrectRecord = () => {
  incorrectGuessCount = 0
  incorrectGuessTracker.innerText = incorrectGuessCount
}

// Removes alphabet button nodes, which are generated on mystery word form submission
const removeAlphaButtons = () => {
  document
    .querySelectorAll('.alpha-btn')
    .forEach((alphaButtonNode) => alphaButtonNode.remove())
}

const resetDefaults = () => {
  isGameOver = false
  gameStatusHeading.innerText = ''
  resetMysteryWord()
  resetIncorrectRecord()
  setSnowmanSketch()
  selectedLetters = []
  spellWordInProgress()
  removeAlphaButtons()
}

mysteryWordForm.addEventListener('submit', handleFormSubmission)
restartGameButton.addEventListener('click', resetDefaults)
