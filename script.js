// Получаем элементы
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// Переменные для хранения текущего состояния
let currentInput = '';  // Текущее число или операция
let previousInput = ''; // Предыдущее число
let operation = null;   // Выбранная операция

// Функция для обновления дисплея
function updateDisplay(value) {
  display.textContent = value;
}

// Обработчик нажатий кнопок
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    // Обработка ввода чисел
    if (!isNaN(buttonValue)) {
      currentInput += buttonValue;
      updateDisplay(currentInput);
    }

    // Обработка операций
    if (['+', '−', '×', '÷'].includes(buttonValue)) {
      if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
      }
      operation = buttonValue;
    }

    // Обработка кнопки "="
    if (buttonValue === '=') {
      if (previousInput !== '' && currentInput !== '' && operation) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;

        // Выполняем выбранную операцию
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
      }
    }

    // Обработка кнопки "C" (очистка)
    if (buttonValue === 'C') {
      currentInput = '';
      previousInput = '';
      operation = null;
      updateDisplay('0');
    }
  });
});
