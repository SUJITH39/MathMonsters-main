const playButton = document.getElementById('btn-play')
const instructionsButton = document.getElementById('btn-instructions')

playButton.addEventListener('click', () => {
    window.location.href = "select.html";
})

instructionsButton.addEventListener('click', () => {
    window.location.href = "instructions.html";
})