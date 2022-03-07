const alphaButtonsWrapper = document.querySelector('.alpha-btns-wrapper')
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

const handleLetterSelection = (event) => {
  alert(`clicked ${event.target.value}!`)
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

buildAlphaButtons()
