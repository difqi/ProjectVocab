let vocab = []

let current

let correctCount = 0

let wrongCount = 0

let answering = false

let soundOn = true

const correctSound = new Audio("audio/correct.wav")

const wrongSound = new Audio("audio/wrong.mp3")

async function loadData() {

    const res = await fetch("Oxford_Full_Data_New.json")

    vocab = await res.json()

    nextQuestion()

}

function nextQuestion() {

    answering = false

    const choicesDiv = document.getElementById("choices")

    choicesDiv.innerHTML = ""

    current = vocab[Math.floor(Math.random() * vocab.length)]

    const mode = document.getElementById("mode").value

    let questionText

    let correctAnswer

    if (mode === "en-id") {

        questionText = current.word

        correctAnswer = current.meaning[0]

    } else {

        questionText = current.meaning[0]

        correctAnswer = current.word

    }

    document.getElementById("question").innerText = questionText

    let options = [correctAnswer]

    while (options.length < 4) {

        let random = vocab[Math.floor(Math.random() * vocab.length)]

        let value = mode === "en-id" ? random.meaning[0] : random.word

        if (!options.includes(value)) {

            options.push(value)

        }

    }

    options.sort(() => Math.random() - 0.5)

    options.forEach(option => {

        const btn = document.createElement("button")

        btn.className = "choice"

        btn.innerText = option

        btn.onclick = () => handleAnswer(btn, option, correctAnswer)

        choicesDiv.appendChild(btn)

    })

}

function handleAnswer(button, selected, correct) {

    if (answering) return

    answering = true

    const buttons = document.querySelectorAll(".choice")

    buttons.forEach(b => b.disabled = true)

    if (selected === correct) {

        button.classList.add("correct")

        if (soundOn) correctSound.play()

        correctCount++

        document.getElementById("correct").innerText = correctCount

    } else {

        button.classList.add("wrong")

        if (soundOn) wrongSound.play()

        buttons.forEach(b => {

            if (b.innerText === correct) {

                b.classList.add("correct")

            }

        })

        wrongCount++

        document.getElementById("wrong").innerText = wrongCount

    }

    /* DELAY 1 DETIK */

    setTimeout(nextQuestion, 1000)

}

document.getElementById("soundBtn").onclick = () => {

    soundOn = !soundOn

}

loadData()