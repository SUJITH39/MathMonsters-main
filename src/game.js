const playerImage = document.getElementById('player-monster')
const botImage1 = document.getElementById('bot-monster1')
const botImage2 = document.getElementById('bot-monster2')

const problemText = document.getElementById('problem-text')
const answerField = document.getElementById('answer-input')
const endDialog = document.getElementById('end-modal')
const resultText = document.getElementById('result-text')
const closeButton = document.getElementById('btn-close')

const monsterList = ['alex', 'anna', 'joey', 'lily']

const NUM_QUESTIONS_TO_FINISH = 10
const DISTANCE_PER_QUESTION = window.innerWidth / NUM_QUESTIONS_TO_FINISH

function setupGraphics() {
    const playerMonster = sessionStorage.getItem("monster_base")
    const playerVariant = sessionStorage.getItem("monster_variant")

    playerImage.src = `images/monsters/${playerMonster}/${playerVariant}.png`

    const botMonsterBase1 = monsterList[getRandomInt(0, 3)]
    const botMonsterVariant1 = getRandomInt(0, 2)

    botImage1.src = `images/monsters/${botMonsterBase1}/${botMonsterVariant1}.png`

    const botMonsterBase2 = monsterList[getRandomInt(0, 3)]
    const botMonsterVariant2 = getRandomInt(0, 2)

    botImage2.src = `images/monsters/${botMonsterBase2}/${botMonsterVariant2}.png`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let bot1CorrectAnswers = 0
let bot2CorrectAnswers = 0

function startGame() {
    // bot 1
    let currentDistance1 = 0

    setInterval(() => {
        currentDistance1 += DISTANCE_PER_QUESTION
        botImage1.style.left = currentDistance1 + 'px'
        bot1CorrectAnswers++
    }, 3000)

    // bot 2
    let currentDistance2 = 0

    setInterval(() => {
        currentDistance2 += DISTANCE_PER_QUESTION
        botImage2.style.left = currentDistance2 + 'px'
        bot2CorrectAnswers++
    }, 4000)

    // player
    let playerDistance = 0
    answerField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const input = answerField.value
            if (input !== '') {
                if (input === `${answer}`) {
                    playerDistance += DISTANCE_PER_QUESTION
                    playerImage.style.left = playerDistance + 'px'
                    correctAnswers++
                    console.log(correctAnswers)
                }

                if (correctAnswers >= 10) {
                    endGame()
                }

                generateNewProblem()
                answerField.value = ""
            }
        }
    })
}

function determineOperationAndAnswer(num1, num2, operationNumber, difficulty) {
    if (difficulty === "1") {
        if (operationNumber === 0) {
            answer = num1 + num2
            return "+"
        }

        else {
            answer = num1 - num2
            return "-"
        }
    }

    else if (difficulty === "2") {
        if (operationNumber === 0) {
            answer = num1 * num2
            return "x"
        }

        else {
            answer = num1 / num2
            return "/"
        }
    }
}

let answer = 0
let correctAnswers = 0
let place = 1

function generateNewProblem() {
    let isGoodProblem = false
    let repeatDivision = false

    while (!isGoodProblem) {
        console.log("asdf")
        let num1 = getRandomInt(1, 9)
        let num2 = getRandomInt(1, 9)

        const operation = repeatDivision ? 1 : getRandomInt(0, 1)
        const difficulty = sessionStorage.getItem("difficulty")

        if (operation === 1 && num1 < num2) {
            const temp = num1
            num1 = num2
            num2 = temp
        }

        console.log(difficulty === "1")
        console.log(operation === "1")
        console.log(num1 % num2 === 0)

        if (difficulty === "1" && operation === 1) {
            if (num1 % num2 === 0) {
                problemText.innerText = `${num1} ${determineOperationAndAnswer(num1, num2, operation, difficulty)} ${num2} = ?`
                isGoodProblem = true
            }

            else {
                repeatDivision = true
            }
        }

        else {
            problemText.innerText = `${num1} ${determineOperationAndAnswer(num1, num2, operation, difficulty)} ${num2} = ?`
            isGoodProblem = true
        }
    }
}

function endGame() {
    if (bot1CorrectAnswers >= 10) {
        place++
    }

    if (bot2CorrectAnswers >= 10) {
        place++
    }

    if (place === 1) {
        resultText.innerText = '1st Place'
    }

    else if (place === 2) {
        resultText.innerText = '2nd Place'
    }

    else if (place === 3) {
        resultText.innerText = '3rd Place'
    }

    endDialog.style.display = 'flex'
}

closeButton.addEventListener('click', (e) => {
    window.location.href = "customize.html";
})

endDialog.style.display = 'none'

setupGraphics()
startGame()
generateNewProblem()