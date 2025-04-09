const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const sound = document.getElementById('click-sound');
const themeToggle = document.getElementById('toggleTheme');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    sound.play();

    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
      if (expression === '0' && value !== '.') {
        expression = value;
      } else {
        const last = expression.slice(-1);
        if (isOperator(last) && isOperator(value)) return;
        expression += value;
      }
    }

    if (action === 'clear') {
      expression = '';
    }

    if (action === 'delete') {
      expression = expression.slice(0, -1);
    }

    if (action === 'calculate') {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = 'Error';
      }
    }

    display.innerText = expression || '0';
  });
});

function isOperator(char) {
  return ['+', '-', '*', '/', '.'].includes(char);
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.'].includes(key)) {
    expression += key;
  } else if (key === 'Enter') {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = 'Error';
    }
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (key === 'Escape') {
    expression = '';
  }
  display.innerText = expression || '0';
});

// Theme Toggle
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light');
});
