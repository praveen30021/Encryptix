const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = Array.from(document.getElementsByClassName('button'));
let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

document.addEventListener('keyup', handleKeyUp);

function handleButtonClick(e) {
  const buttonValue = e.target.innerText;
  switch (buttonValue) {
    case 'C':
      clearDisplay();
      break;
    case '=':
      evaluateExpression();
      break;
    case 'CE':
      clearLastEntry();
      break;
    case '%':
      applyPercentage();
      break;
    case 'sqrt':
      applySquareRoot();
      break;
    case 'sin':
    case 'cos':
    case 'tan':
      applyTrigonometricFunction(buttonValue);
      break;
    case 'pi':
      appendToDisplay(Math.PI.toFixed(4)); // Fix to 4 decimal places
      break;
    default:
      appendToDisplay(buttonValue);
  }
}

function handleKeyUp(e) {
  const key = e.key;
  if (isNumeric(key) || isOperator(key) || key === '.') {
    appendToDisplay(key);
  } else if (isEnterKey(e)) {
    evaluateExpression();
  } else if (isBackspaceKey(e)) {
    clearLastEntry();
  } else if (isDeleteKey(e)) {
    clearDisplay();
  }
}

function isNumeric(char) {
  return /[0-9]/.test(char);
}

function isOperator(char) {
  return /[\+\-\*\/]/.test(char);
}

function isEnterKey(e) {
  return e.key === 'Enter';
}

function isBackspaceKey(e) {
  return e.key === 'Backspace';
}

function isDeleteKey(e) {
  return e.key === 'Delete';
}

function appendToDisplay(char) {
  display.innerText += char;
  expression += char;
}

function clearDisplay() {
  display.innerText = '';
  expression = '';
}

function clearLastEntry() {
  display.innerText = display.innerText.slice(0, -1);
  expression = expression.slice(0, -1);
}

function evaluateExpression() {
  let result;
  try {
    result = parseFloat(eval(expression).toFixed(4)); // Fix to 4 decimal places
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
  appendToHistory(expression + ' = ' + (result || 'Error'));
  expression = ''; // Clear expression after evaluation
}

function applyPercentage() {
  try {
    const result = parseFloat(display.innerText) / 100;
    display.innerText = result;
    appendToHistory(result);
  } catch {
    display.innerText = "Error";
  }
}

function applySquareRoot() {
  try {
    const result = Math.sqrt(parseFloat(display.innerText));
    display.innerText = result;
    appendToHistory('sqrt(' + display.innerText + ') = ' + result);
  } catch {
    display.innerText = "Error";
  }
}

function applyTrigonometricFunction(func) {
  try {
    const result = Math[func](parseFloat(display.innerText));
    display.innerText = result;
    appendToHistory(func + '(' + display.innerText + ') = ' + result);
  } catch {
    display.innerText = "Error";
  }
}

function appendToHistory(entry) {
  history.innerText = entry + '\n';
}

