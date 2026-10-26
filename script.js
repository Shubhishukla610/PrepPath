

const navLinks = document.querySelectorAll(".nav-link");
const learningItems = document.querySelectorAll(".learning-item");

const pageTitle = document.getElementById("page-title");
const welcomeTitle = document.getElementById("welcome-title");
const nextDescription = document.getElementById("next-description");

const startButton = document.getElementById("start-btn");
const exploreButton = document.getElementById("explore-btn");

const aptitudePage = document.getElementById("aptitude-page");
const codingPage = document.getElementById("coding-page");

const dashboardSections = [
    document.querySelector(".welcome"),
    document.querySelector(".section"),
    document.querySelector(".content-grid"),
    document.querySelector(".next-panel")
];

const pages = {
    Dashboard: {
        description: "Choose a section and start preparing for placements."
    },
    Aptitude: {
        description: "Practice quantitative aptitude, reasoning and verbal ability."
    },
    Coding: {
        description: "Prepare for DSA interviews with coding problems."
    },
    Interviews: {
        description: "Revise technical concepts and prepare for placement interviews."
    },
    Placements: {
        description: "Organize your company applications and interview deadlines."
    }
};

// Navigate between pages

function openPage(page) {
    if (!pages[page]) return;

    navLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    pageTitle.textContent = page;
    nextDescription.textContent = pages[page].description;

    const existingPlaceholder =
        document.getElementById("page-placeholder");

    if (existingPlaceholder) {
        existingPlaceholder.hidden = true;
    }

    // Dashboard
    if (page === "Dashboard") {
        dashboardSections.forEach(section => {
            if (section) section.hidden = false;
        });

        aptitudePage.hidden = true;
        codingPage.hidden = true;

        const interviewPage =
            document.getElementById("interview-page");

        if (interviewPage) {
            interviewPage.hidden = true;
        }

        welcomeTitle.textContent = "Hey, future developer! 👋";

        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    // Hide dashboard sections
    dashboardSections.forEach(section => {
        if (section) section.hidden = true;
    });

    aptitudePage.hidden = page !== "Aptitude";
    codingPage.hidden = page !== "Coding";

    const interviewPage =
        document.getElementById("interview-page");

    if (interviewPage) {
        interviewPage.hidden = page !== "Interviews";
    }

    welcomeTitle.textContent = "Let's prepare for placements!";

    // Aptitude Practice
    if (page === "Aptitude") {
        renderQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    // Coding Practice
    if (page === "Coding") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    // Interview Preparation
    if (page === "Interviews") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    // Placeholder for other modules
    let pagePlaceholder =
        document.getElementById("page-placeholder");

    if (!pagePlaceholder) {
        pagePlaceholder = document.createElement("section");
        pagePlaceholder.id = "page-placeholder";
        pagePlaceholder.className = "panel";

        document.querySelector(".topbar").after(pagePlaceholder);
    }

    const descriptions = {
        Placements:
            "Here you'll be able to add companies, deadlines and application statuses."
    };

    const heading = document.createElement("h2");
    heading.textContent = page;

    const description = document.createElement("p");
    description.style.marginTop = "10px";
    description.textContent =
        descriptions[page] || "More features coming soon!";

    const note = document.createElement("p");
    note.style.marginTop = "18px";
    note.textContent = "🚧 This section is under development.";

    const backButton = document.createElement("button");
    backButton.className = "primary-btn quiz-button";
    backButton.style.marginTop = "18px";
    backButton.textContent = "← Back to Dashboard";

    backButton.addEventListener("click", () => {
        openPage("Dashboard");
    });

    pagePlaceholder.replaceChildren(
        heading,
        description,
        note,
        backButton
    );

    pagePlaceholder.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

 // Navigation events
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        openPage(link.dataset.page);
    });
});

learningItems.forEach(item => {
    item.addEventListener("click", () => {
        openPage(item.dataset.page);
    });
});

startButton.addEventListener("click", () => {
    openPage("Aptitude");
});


exploreButton.addEventListener("click", () => {
    document.querySelector(".content-grid").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// =====================================
// APTITUDE QUIZ QUESTIONS
// =====================================

const questions = [
    {
        question:
            "A number is increased by 20% and becomes 120. What was the original number?",
        options: ["80", "90", "100", "110"],
        answer: 2,
        explanation:
            "Original number × 1.2 = 120. Therefore, 120 ÷ 1.2 = 100."
    },
    {
        question: "Find the next number in the series: 2, 4, 8, 16, __",
        options: ["20", "24", "30", "32"],
        answer: 3,
        explanation:
            "Each number is multiplied by 2. Therefore, 16 × 2 = 32."
    },
    {
        question: "A car travels 150 km in 3 hours. What is its average speed?",
        options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
        answer: 2,
        explanation:
            "Average speed = Distance ÷ Time = 150 ÷ 3 = 50 km/h."
    },
    {
        question:
            "If 5 workers complete a task in 10 days, how many days would 10 workers take at the same rate?",
        options: ["2 days", "5 days", "10 days", "20 days"],
        answer: 1,
        explanation:
            "Total work = 5 × 10 = 50 worker-days. With 10 workers, 50 ÷ 10 = 5 days."
    },
    {
        question: "The average of 10, 20 and 30 is:",
        options: ["15", "20", "25", "30"],
        answer: 1,
        explanation:
            "Average = (10 + 20 + 30) ÷ 3 = 20."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let hasAnswered = false;
let completed = false;

// Quiz elements
const questionCounter =
    document.getElementById("question-counter");
const currentScore =
    document.getElementById("current-score");
const quizProgress =
    document.getElementById("quiz-progress");
const questionText =
    document.getElementById("question-text");
const answerOptions =
    document.getElementById("answer-options");
const answerFeedback =
    document.getElementById("answer-feedback");

const checkButton =
    document.getElementById("check-answer");
const nextButton =
    document.getElementById("next-question");

const quizContent =
    document.getElementById("quiz-content");
const quizResult =
    document.getElementById("quiz-result");
const finalScore =
    document.getElementById("final-score");
const finalMessage =
    document.getElementById("final-message");

const goalCount =
    document.getElementById("goal-count");
const goalProgress =
    document.getElementById("goal-progress");
const goalMessage =
    document.getElementById("goal-message");

// Display a question
function renderQuestion() {
    const q = questions[currentQuestion];

    selectedAnswer = null;
    hasAnswered = false;
    completed = false;

    quizContent.hidden = false;
    quizResult.hidden = true;

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    currentScore.textContent = `Score: ${score}`;

    quizProgress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionText.textContent = q.question;
    answerOptions.replaceChildren();
    answerFeedback.textContent = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => {
            if (hasAnswered) return;

            selectedAnswer = index;

            document.querySelectorAll(".answer-option").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
            answerFeedback.textContent = "";
        });

        answerOptions.appendChild(button);
    });

    checkButton.hidden = false;
    checkButton.disabled = false;
    nextButton.hidden = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "View Results →"
            : "Next Question →";
}

// Check the selected answer
function checkAnswer() {
    if (selectedAnswer === null || hasAnswered) {
        if (selectedAnswer === null) {
            answerFeedback.textContent =
                "Please select an answer first.";
        }
        return;
    }

    hasAnswered = true;
// Save the number of aptitude questions attempted
let attemptedQuestions = Number(
    localStorage.getItem("preppathAptitudeQuestionsAttempted") || 0
);

attemptedQuestions++;

localStorage.setItem(
    "preppathAptitudeQuestionsAttempted",
    attemptedQuestions
);
    const q = questions[currentQuestion];
    const options = document.querySelectorAll(".answer-option");

    options.forEach((button, index) => {
        button.disabled = true;

        if (index === q.answer) {
            button.classList.add("correct");
        } else if (index === selectedAnswer) {
            button.classList.add("incorrect");
        }
    });

    if (selectedAnswer === q.answer) {
        score++;

        answerFeedback.textContent =
            `Correct! 🎉 ${q.explanation}`;
    } else {
        answerFeedback.textContent =
            `Not quite. The correct answer is ${q.options[q.answer]}. ${q.explanation}`;
    }

    currentScore.textContent = `Score: ${score}`;

    checkButton.hidden = true;
    nextButton.hidden = false;
}

// Show final quiz results

function showResults() {
    completed = true;

    quizContent.hidden = true;
    quizResult.hidden = false;

    quizProgress.style.width = "100%";
    questionCounter.textContent = "Quiz completed";
    currentScore.textContent = `Score: ${score}`;

    finalScore.textContent =
        `You scored ${score} out of ${questions.length}.`;

    const percentage = (score / questions.length) * 100;

    // Save the latest quiz score in localStorage
    localStorage.setItem("preppathLatestAptitudeScore", score);
    localStorage.setItem(
        "preppathLatestAptitudeTotal",
        questions.length
    );

    // Save quiz score to the Flask + SQLite backend
    fetch("/save-quiz-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            score: score,
            total: questions.length
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to save quiz score");
        }
        return response.json();
    })
    .then(data => {
        console.log("Quiz score saved:", data);
    })
    .catch(error => {
        console.error("Error saving quiz score:", error);
    });

    if (percentage === 100) {
        finalMessage.textContent =
            "Excellent work! You answered every question correctly.";
    } else if (percentage >= 60) {
        finalMessage.textContent =
            "Good effort! Review the explanations and keep practicing.";
    } else {
        finalMessage.textContent =
            "Keep going! Review the solutions and try again.";
    }

    // Save completed quiz attempts
    const activities = Number(
        localStorage.getItem("preppathActivities") || 0
    );

    const updatedActivities = Math.min(10, activities + 1);

    localStorage.setItem(
        "preppathActivities",
        updatedActivities
    );

    updateDashboardProgress();
}

// Update dashboard activity progress

function updateDashboardProgress() {
    const activities = Number(
        localStorage.getItem("preppathActivities") || 0
    );

    // Update weekly goal
    if (goalCount) {
        goalCount.textContent = activities;
    }

    if (goalProgress) {
        goalProgress.style.width = `${Math.min(activities, 10) * 10}%`;
    }

    if (goalMessage) {
        goalMessage.textContent = activities >= 10
            ? "Weekly goal completed! Great work! 🎉"
            : `${10 - activities} more quiz ${
                10 - activities === 1 ? "attempt" : "attempts"
            } to reach your weekly goal.`;
    }

    // Update aptitude questions attempted
    const attemptedQuestions = Number(
        localStorage.getItem("preppathAptitudeQuestionsAttempted") || 0
    );

    const aptitudeCount = document.getElementById("aptitude-count");

    if (aptitudeCount) {
        aptitudeCount.textContent = attemptedQuestions;
    }

    // Update latest aptitude quiz score
    const latestScore = localStorage.getItem("preppathLatestAptitudeScore");
    const totalQuestions = Number(
        localStorage.getItem("preppathLatestAptitudeTotal") || 0
    );

    const scoreLabel = document.getElementById("aptitude-score-label");
    const scoreProgress = document.getElementById("aptitude-score-progress");

    if (scoreLabel && scoreProgress) {
        if (latestScore !== null && totalQuestions > 0) {
            const percentage = Math.round(
                (Number(latestScore) / totalQuestions) * 100
            );

            scoreLabel.textContent =
                `${latestScore}/${totalQuestions} correct (${percentage}%)`;

            scoreProgress.style.width = `${percentage}%`;
        } else {
            scoreLabel.textContent = "No quiz completed yet";
            scoreProgress.style.width = "0%";
        }
    }

    // Update coding practice progress
    const solvedCoding = JSON.parse(
        localStorage.getItem("preppathSolvedCoding") || "[]"
    );

    const codingCount = document.getElementById("coding-count");
    const codingProgressLabel = document.getElementById(
        "dashboard-coding-progress-label"
    );
    const codingProgress = document.getElementById(
        "dashboard-coding-progress"
    );

    const totalCodingProblems = 6;
    const solvedTotal = Math.min(solvedCoding.length, totalCodingProblems);
    const codingPercentage = Math.round(
        (solvedTotal / totalCodingProblems) * 100
    );

    if (codingCount) {
        codingCount.textContent = solvedTotal;
    }

    if (codingProgressLabel) {
        codingProgressLabel.textContent =
            `${solvedTotal} of ${totalCodingProblems} solved`;
    }

    if (codingProgress) {
        codingProgress.style.width = `${codingPercentage}%`;
    }
}

// Quiz button events
checkButton.addEventListener("click", checkAnswer);

nextButton.addEventListener("click", () => {
    if (!hasAnswered || completed) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
});

// Restart quiz
document.getElementById("restart-quiz").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
});

// Return to dashboard from aptitude
document.getElementById("back-dashboard").addEventListener("click", () => {
    openPage("Dashboard");
});

// =====================================
// CODING PRACTICE MODULE
// =====================================

const codingSearch =
    document.getElementById("coding-search");
const codingDifficulty =
    document.getElementById("coding-difficulty");

const totalProblems =
    document.getElementById("total-problems");
const solvedProblems =
    document.getElementById("solved-problems");
const remainingProblems =
    document.getElementById("remaining-problems");
const noCodingResults =
    document.getElementById("no-coding-results");

const codingBackButton =
    document.getElementById("coding-back-dashboard");

// Get all coding problem cards
const codingCards = document.querySelectorAll("#coding-list .coding-problem");
// Restore solved problems saved in this browser
let solvedCodingProblems = [];

try {
    solvedCodingProblems = JSON.parse(
        localStorage.getItem("preppathSolvedCoding") || "[]"
    );

    if (!Array.isArray(solvedCodingProblems)) {
        solvedCodingProblems = [];
    }
} catch (error) {
    solvedCodingProblems = [];
}

// Update solved buttons and progress numbers
function updateCodingProgress() {
    let solvedCount = 0;

    codingCards.forEach(card => {
        const title = card.querySelector("h3").textContent;
        const button = card.querySelector(".solve-toggle");
        const isSolved = solvedCodingProblems.includes(title);

        button.classList.toggle("solved", isSolved);
        card.classList.toggle("is-solved", isSolved);

        button.textContent = isSolved ? "✓ Solved" : "Mark Solved";
        button.setAttribute("aria-pressed", String(isSolved));

        if (isSolved) {
            solvedCount++;
        }
    });

    totalProblems.textContent = codingCards.length;
    solvedProblems.textContent = solvedCount;
    remainingProblems.textContent =
        codingCards.length - solvedCount;
}

// Toggle a problem between solved and unsolved
codingCards.forEach(card => {
    const button = card.querySelector(".solve-toggle");
    const title = card.querySelector("h3").textContent;

    button.addEventListener("click", () => {
        if (solvedCodingProblems.includes(title)) {
            solvedCodingProblems = solvedCodingProblems.filter(
                problem => problem !== title
            );
        } else {
            solvedCodingProblems.push(title);
        }

        localStorage.setItem(
            "preppathSolvedCoding",
            JSON.stringify(solvedCodingProblems)
        );

        updateCodingProgress();
        filterCodingProblems();
    });
});

// Search and difficulty filters

 // Search and difficulty filters
function filterCodingProblems() {
    const searchText = codingSearch.value.toLowerCase().trim();
    const selectedDifficulty = codingDifficulty.value.trim().toLowerCase();

    let visibleCount = 0;

    codingCards.forEach(card => {
        const title =
            card.querySelector("h3").textContent.toLowerCase();

        const description =
            card.querySelector("p").textContent.toLowerCase();

        const difficulty =
            card.querySelector(".difficulty").textContent.trim().toLowerCase();

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesDifficulty =
            selectedDifficulty === "all" ||
            difficulty === selectedDifficulty;

        const shouldShow = matchesSearch && matchesDifficulty;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    noCodingResults.hidden = visibleCount !== 0;
}



// Listen for search and filter changes
codingSearch.addEventListener("input", filterCodingProblems);

codingDifficulty.addEventListener("change", filterCodingProblems);

// Return to dashboard from coding
codingBackButton.addEventListener("click", () => {
    openPage("Dashboard");
});

// Initialize PrepPath
updateDashboardProgress();
updateCodingProgress();
filterCodingProblems();
openPage("Dashboard");

console.log("PrepPath dashboard, aptitude quiz and coding practice loaded!");

/* ================================
   INTERVIEW PREPARATION MODULE
================================ */

const interviewList = document.getElementById("interview-list");

if (interviewList) {
    const interviewSearch = document.getElementById("interview-search");
    const interviewCategory = document.getElementById("interview-category");
    const noInterviewResults = document.getElementById("no-interview-results");

    const totalInterviewQuestions = document.getElementById("total-interview-questions");
    const practicedInterviewQuestions = document.getElementById("practiced-interview-questions");
    const remainingInterviewQuestions = document.getElementById("remaining-interview-questions");

    const interviewCards = Array.from(
        interviewList.querySelectorAll(".coding-problem")
    );

    const interviewStorageKey = "preppath-practiced-interviews";

    let practicedInterviews = [];

    try {
        practicedInterviews = JSON.parse(
            localStorage.getItem(interviewStorageKey) || "[]"
        );

        if (!Array.isArray(practicedInterviews)) {
            practicedInterviews = [];
        }
    } catch (error) {
        practicedInterviews = [];
    }

    // Update total, practiced, and remaining statistics

    function updateInterviewStats() {
        const practicedCount = interviewCards.filter(card =>
            practicedInterviews.includes(
                card.querySelector("h3").textContent.trim()
            )
        ).length;

        totalInterviewQuestions.textContent = interviewCards.length;
        practicedInterviewQuestions.textContent = practicedCount;
        remainingInterviewQuestions.textContent =
            interviewCards.length - practicedCount;
    }

    // Update the Mark Practiced buttons
    function updateInterviewButtons() {
        interviewCards.forEach(card => {
            const question = card.querySelector("h3").textContent.trim();
            const button = card.querySelector(".interview-toggle");
            const isPracticed = practicedInterviews.includes(question);

            button.textContent = isPracticed
                ? "Practiced ✓"
                : "Mark Practiced";

            button.classList.toggle("practiced", isPracticed);
            button.setAttribute("aria-pressed", String(isPracticed));
        });
    }

    // Search questions and filter by category
   
function filterInterviewQuestions(){
    

    const searchText = interviewSearch.value.toLowerCase().trim();
    const selectedCategory = interviewCategory.value.trim().toLowerCase();

    let visibleCount = 0;

    interviewCards.forEach(card => {
        const questionText = card.textContent.toLowerCase();
        const category = (card.dataset.category || "").trim().toLowerCase();

        const matchesSearch = questionText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        // Explicitly control card visibility
       card.hidden = !shouldShow;
card.style.display = shouldShow ? (shouldShow ? "flex" : "none") : "none";

        if (shouldShow) {
            visibleCount++;
        }
    });

    noInterviewResults.hidden = visibleCount !== 0;
}




    // Save practice status when a button is clicked
    interviewCards.forEach(card => {
        const button = card.querySelector(".interview-toggle");
        const question = card.querySelector("h3").textContent.trim();

        button.addEventListener("click", () => {
            if (practicedInterviews.includes(question)) {
                practicedInterviews = practicedInterviews.filter(
                    item => item !== question
                );
            } else {
                practicedInterviews.push(question);
            }

            localStorage.setItem(
                interviewStorageKey,
                JSON.stringify(practicedInterviews)
            );

            updateInterviewButtons();
            updateInterviewStats();
        });
    });

    // Listen for search and category changes
    interviewSearch.addEventListener("input", filterInterviewQuestions);
    interviewCategory.addEventListener("change", filterInterviewQuestions);

    // Back to Dashboard
    const interviewBackButton = document.getElementById(
        "interview-back-dashboard"
    );

    if (interviewBackButton) {
        interviewBackButton.addEventListener("click", () => {
            const dashboardButton = document.querySelector(
                '[data-page="dashboard"], [data-section="dashboard"], #dashboard-btn'
            );

            if (dashboardButton) {
                dashboardButton.click();
            } else {
                // Fallback: use the existing sidebar navigation
                const sidebarLinks = document.querySelectorAll(
                    "nav a, nav button, .sidebar a, .sidebar button"
                );

                const dashboardLink = Array.from(sidebarLinks).find(link =>
                    link.textContent.trim().toLowerCase() === "dashboard"
                );

                if (dashboardLink) {
                    dashboardLink.click();
                }
            }
        });
    }

    // Initialize the module
    updateInterviewButtons();
    updateInterviewStats();
    filterInterviewQuestions();
}

/* PrepPath - Quiz History */
document.addEventListener("DOMContentLoaded", function () {
    const historyList = document.getElementById("quiz-history-list");

    if (!historyList) return;

    async function loadQuizHistory() {
        try {
            const response = await fetch("/quiz-history");

            if (!response.ok) {
                throw new Error("Could not load quiz history");
            }

            const history = await response.json();

            historyList.replaceChildren();

            if (history.length === 0) {
                const message = document.createElement("p");
                message.className = "quiz-history-message";
                message.textContent =
                    "No quiz attempts yet. Complete an aptitude quiz to see your scores here.";
                historyList.appendChild(message);
                return;
            }

            history.forEach(function (attempt) {
                const card = document.createElement("article");
                card.className = "quiz-history-card";

                const title = document.createElement("h3");
                title.textContent = "Aptitude Quiz";

                const percentage = document.createElement("p");
                percentage.className = "quiz-percentage";
                percentage.textContent = `${attempt.percentage}%`;

                const score = document.createElement("p");
                score.textContent =
                    `Score: ${attempt.score} out of ${attempt.total}`;

                const date = document.createElement("p");
                date.textContent = `Date: ${attempt.date}`;

                card.append(title, percentage, score, date);
                historyList.appendChild(card);
            });
        } catch (error) {
            historyList.replaceChildren();

            const message = document.createElement("p");
            message.className = "quiz-history-message";
            message.textContent =
                "Quiz history could not load. Please check that the Flask server is running.";

            historyList.appendChild(message);
            console.error("Quiz history error:", error);
        }
    }

    loadQuizHistory();
});
