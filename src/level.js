const monsterButtons = document.querySelectorAll('button')

monsterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        sessionStorage.setItem("difficulty", button.name)
        window.location.href = "game.html";
    })
})