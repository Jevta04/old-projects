function changeColor(color) {
    if (color === 'random') {
        document.body.style.backgroundColor = getRandomRgbColor();
    }
    document.body.style.backgroundColor = color;
}

function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
