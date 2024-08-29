const monsterButtons = document.querySelectorAll('button')
const monsterImages = document.querySelectorAll('img')

monsterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        sessionStorage.setItem("monster_variant", button.name)
        window.location.href = "level.html";
    })
})

const monsterName = sessionStorage.getItem("monster_base")

let imageNum = 0

monsterImages.forEach(image => {
    console.log(imageNum)
    image.src = `images/monsters/${monsterName}/${imageNum}.png`
    imageNum++
})