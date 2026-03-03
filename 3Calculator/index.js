const display = document.getElementById('display');

function clearDisplay() {
    display.value = '';
}
function appendToDisplay(value) {
    display.value += value;
}
function calculate() {
    try {
        const result = eval(display.value); // zapamti eval funkciju
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}