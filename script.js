"use strict";

const questions = [
    {
        question: "A message says your account will close in 10 minutes. What should you do?",
        options: [
            "Click the link immediately",
            "Reply with your password",
            "Verify the message through the official website or app",
            "Forward it to all your contacts"
        ],
        correct: 2,
        explanation: "Correct! Urgent threats are a common phishing tactic. Verify unexpected messages through official channels."
    },
    {
        question: "You receive an unexpected email attachment. What is the safest action?",
        options: [
            "Open it to see what's inside",
            "Verify the sender and the attachment before opening it",
            "Download it on every device",
            "Forward it to a friend"
        ],
        correct: 1,
        explanation: "Correct! Unexpected attachments can contain malicious files. Verify the sender through a trusted channel first."
    },
    {
        question: "A website asks for your password and OTP after you click an unexpected message link. What should you do?",
        options: [
            "Enter both details",
            "Enter only the OTP",
            "Share them if the page looks professional",
            "Do not enter them; leave the page and use the official app or website"
        ],
        correct: 3,
        explanation: "Correct! Never share an OTP or password through an unverified page. Use the official service directly."
    },
    {
        question: "How should you check a suspicious website link?",
        options: [
            "Click it to test whether it works",
            "Trust it if it has a company logo",
            "Carefully inspect the domain and visit the official site directly if unsure",
            "Trust every shortened URL"
        ],
        correct: 2,
        explanation: "Correct! A logo does not prove a website is genuine. Check the domain without opening suspicious links."
    },
    {
        question: "What should you do if you think you have clicked a phishing link and entered your password?",
        options: [
            "Ignore it",
            "Change the password using the official site, secure the account, and contact the service if needed",
            "Send your password to the sender to confirm it",
            "Delete the browser"
        ],
        correct: 1,
        explanation: "Correct! Change the exposed password through the official service, enable MFA, and review account activity."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizResult = document.getElementById("quiz-result");

function loadQuestion() {
    answered = false;

    const item = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    progressPercent.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    questionText.textContent = item.question;
    feedback.textContent = "";
    answerOptions.replaceChildren();

    quizResult.hidden = true;
    questionText.hidden = false;
    answerOptions.hidden = false;
    nextButton.hidden = false;
    nextButton.disabled = true;

    item.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-option";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => selectAnswer(index));

        answerOptions.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "View Results →"
            : "Next Question →";
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];
    const buttons = answerOptions.querySelectorAll("button");
    const isCorrect = selectedIndex === item.correct;

    if (isCorrect) {
        score++;
        feedback.textContent = `✓ Correct! ${item.explanation}`;
    } else {
        feedback.textContent =
            `Not quite. ${item.explanation}`;
    }

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === item.correct) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
    });

    nextButton.disabled = false;
}

function showResults() {
    questionNumber.textContent = "TRAINING COMPLETE";
    progressPercent.textContent = "100%";
    progressFill.style.width = "100%";

    questionText.hidden = true;
    answerOptions.hidden = true;
    feedback.textContent = "";
    nextButton.hidden = true;
    quizResult.hidden = false;

    const percentage = Math.round((score / questions.length) * 100);

    let message;

    if (score === questions.length) {
        message = "Excellent! You spotted every warning sign.";
    } else if (score >= 3) {
        message = "Good work! Review the explanations to strengthen your skills.";
    } else {
        message = "Keep learning! Review the warning signs and try again.";
    }

    const heading = document.createElement("h3");
    heading.textContent = `${score} / ${questions.length} Correct`;

    const description = document.createElement("p");
    description.textContent =
        `${percentage}% — ${message}`;

    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "primary-button";
    retryButton.textContent = "Try Again ↻";

    retryButton.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    });

    quizResult.replaceChildren(heading, description, retryButton);
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
});

loadQuestion();