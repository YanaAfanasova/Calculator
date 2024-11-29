// Получаем элементы
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const history = document.querySelector('.history');

// Переменные для хранения текущего состояния
let currentInput = '';      // Текущее число или операция
let previousInput = '';     // Предыдущее число
let operation = null;       // Выбранная операция
let isResultDisplayed = false; // Флаг, отображается ли результат

// Функция для формирования выражения
function getExpression() {
  return `${previousInput} ${operation || ''} ${currentInput}`.trim();
}

// Функция для обновления дисплея
function updateDisplay() {
  display.textContent = getExpression() || '0';
}

// Функция для добавления записи в историю
function addToHistory(expression, result) {
  if (history) { // Убедимся, что элемент history существует
    const historyItem = document.createElement('div');
    historyItem.textContent = `${expression} = ${result}`;
    history.appendChild(historyItem);
  }
}

// Обработчик нажатий кнопок
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    // Обработка ввода чисел
    if (!isNaN(buttonValue)) {
      if (isResultDisplayed) {
        // Если результат отображается, сбросить текущий ввод
        currentInput = '';
        isResultDisplayed = false; // Сбрасываем флаг
      }
      currentInput += buttonValue; // Добавляем число
      updateDisplay();
      return;
    }

    // Обработка операций
    if (['+', '−', '×', '÷'].includes(buttonValue)) {
      if (currentInput !== '') {
        if (previousInput && operation) {
          // Выполняем предыдущую операцию, если продолжается ввод
          const num1 = parseFloat(previousInput);
          const num2 = parseFloat(currentInput);
          let result;

          switch (operation) {
            case '+':
              result = num1 + num2;
              break;
            case '−':
              result = num1 - num2;
              break;
            case '×':
              result = num1 * num2;
              break;
            case '÷':
              result = num2 !== 0 ? num1 / num2 : 'Ошибка';
              break;
          }

          previousInput = result.toString();
          currentInput = '';
          operation = buttonValue;
        } else {
          previousInput = currentInput;
          currentInput = '';
          operation = buttonValue;
        }
        isResultDisplayed = false; // Сбрасываем флаг результата
        updateDisplay();
      }
      return;
    }

    // Обработка кнопки "="
    if (buttonValue === '=') {
      if (previousInput !== '' && currentInput !== '' && operation) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;

        switch (operation) {
          case '+':
            result = num1 + num2;
            break;
          case '−':
            result = num1 - num2;
            break;
          case '×':
            result = num1 * num2;
            break;
          case '÷':
            result = num2 !== 0 ? num1 / num2 : 'Ошибка';
            break;
        }
        
        const expression = getExpression();
        addToHistory(expression, result); // Добавляем в историю

        currentInput = result.toString(); // Сохраняем результат как текущий ввод
        previousInput = '';
        operation = null;
        isResultDisplayed = true; // Устанавливаем флаг результата
        updateDisplay();
      }
      return;
    }

    // Обработка кнопки "C" (очистка)
    if (buttonValue === 'C') {
      currentInput = '';
      previousInput = '';
      operation = null;
      isResultDisplayed = false; // Сбрасываем флаг результата
      updateDisplay();
      return;
    }
  });
});
