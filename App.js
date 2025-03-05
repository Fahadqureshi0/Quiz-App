const Questions = [
    {
        question: "What is the Capital of France?",
        answers: [
            { text: "Paris", correct: true }, 
            { text: "London", correct: false },
            { text: "New-York", correct: false },
            { text: "Tokyo", correct: false },
        ]
    },
    {
        question: "Which programming language is used for web development?",
        answers: [  
            { text: "JavaScript", correct: true }, 
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "Swift", correct: false },
        ]
    },
    {
        question: "Which of the following is an example of an Operating System?",
        answers: [
            { text: "Windows", correct: true }, 
            { text: "JavaScript", correct: false },
            { text: "Compiler", correct: false },
            { text: "MySQL", correct: false },  
        ]
    },
    {
        question: "Who wrote the Theory of Relativity?",
        answers: [
            { text: "Albert Einstein", correct: true }, 
            { text: "Nikola Tesla", correct: false },
            { text: "Galileo Galilei", correct: false },
            { text: "Isaac Newton", correct: false },
        ]
    },
    {
        question: "What is 🕳️ Black Hole?",
        answers: [
            { text: "A region in space where gravity is so strong that nothing can escape", correct: true }, 
            { text: "A star that emits extreme light", correct: false },
            { text: "A region in space with no gravity", correct: false },
            { text: "A large asteroid belt", correct: false },
        ]
    },
];

const questionEL = document.getElementById("question");
const answerButtons = document.getElementById("Answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEL.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.onclick = () => checkAnswer(answer.correct);
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });

    nextButton.style.display = "none"; 
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < Questions.length) {
        nextButton.style.display = "block"; 
        nextButton.onclick = showQuestion;
    } else {
        showResult();
    }
}


function showResult() {
    questionEL.innerHTML = `Quiz Completed! 🎉<br>Your Score: ${score} / ${Questions.length}`;
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
}

function resetState() {

    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");

    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block"; // Show Next button after selection
}

// Add event listener to Next button


startQuiz();
