// Получаем элементы
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// Переменные для хранения текущего состояния
let currentInput = '';  // Текущее число или операция
let previousInput = ''; // Предыдущее число
let operation = null;   // Выбранная операция

// Функция для формирования выражения
function getExpression() {
  return `${previousInput} ${operation || ''} ${currentInput}`.trim();
}

// Функция для обновления дисплея
function updateDisplay() {
  display.textContent = getExpression() || '0';
}

// Обработчик нажатий кнопок
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    // Обработка ввода чисел
    if (!isNaN(buttonValue)) {
      currentInput += buttonValue;
      updateDisplay();
    }

    // Обработка операций
    if (['+', '−', '×', '÷'].includes(buttonValue)) {
      if (currentInput !== '') {
        if (previousInput && operation) {
          // Выполнить предыдущую операцию, если продолжается ввод
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
        updateDisplay();
      }
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

        updateDisplay(result);
        currentInput = result.toString();
        previousInput = '';
        operation = null;
        display.textContent = result; // Отображаем только результат
      }
    }

    // Обработка кнопки "C" (очистка)
    if (buttonValue === 'C') {
      currentInput = '';
      previousInput = '';
      operation = null;
      updateDisplay();
    }
  });
});
