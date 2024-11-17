const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (value === 'C') {
      display.textContent = '0';
    } else if (value === '=') {
      if (value === '=') {
        try {
          display.textContent = eval(display.textContent);
        } catch {
          display.textContent = 'Error';
        }
      }
      
    } else {
      if (display.textContent === '0') {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
    }
  });
});
