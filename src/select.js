const monsterButtons = document.querySelectorAll('button')

monsterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        sessionStorage.setItem("monster_base", button.name)
        window.location.href = "customize.html"
    })
})