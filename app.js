"use strict";

/*
========================================================
POM - PRINCIPLES OF MANAGEMENT
60 MCQ EXAMINATION
========================================================
*/

// ------------------------------------------------------
// EXAM SETTINGS
// ------------------------------------------------------

const EXAM_TIME_MINUTES = 60;

// ------------------------------------------------------
// SUPABASE CONNECTION
// ------------------------------------------------------
// Replace these two values with your Supabase Project URL
// and Publishable/Anon key. Never use the service_role key
// in this frontend file.

const SUPABASE_URL = "https://mdwyjofrnvevsdqigljt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kd3lqb2ZybnZldnNkcWlnbGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNTU5ODQsImV4cCI6MjEwNTgzMTk4NH0.n5iMfqjbdMR4v46cRTeIjzxQ2uE_5-ZFcOECLglXDiQ";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Backend-controlled MCQ attempt. The browser keeps only the session
// credentials returned by start-mcq; the final score is calculated by
// Supabase from the answer key stored in mcq_questions.
let mcqSession = null;

const SESSION_STORAGE_KEY = "mcq_exam_session_v1";

function getStoredSession() {
    try {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.warn("Could not read stored MCQ session:", error);
        return null;
    }
}

function storeSession(session) {
    mcqSession = session;
    try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
        console.warn("Could not store MCQ session:", error);
    }
}

function clearStoredSession() {
    mcqSession = null;
    try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
        console.warn("Could not clear MCQ session:", error);
    }
}

async function callMcqFunction(name, body) {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY
        },
        body: JSON.stringify(body)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data || data.ok === false) {
        const message =
            data?.message ||
            data?.error ||
            `Backend request failed (${response.status}).`;
        const error = new Error(message);
        error.code = data?.error || "server_error";
        throw error;
    }

    return data;
}




// ------------------------------------------------------
// 60 POM MCQ QUESTIONS
// Correct answers are stored privately in Supabase; they are not shipped to the browser.
// ------------------------------------------------------

const questions = [

    // 1
    {
        question: "Who is known as the Father of Scientific Management?",
        options: [
            "Henry Fayol",
            "F.W. Taylor",
            "Elton Mayo",
            "Peter Drucker"
        ]
    },

    // 2
    {
        question: "Who is known as the Father of Administrative Management?",
        options: [
            "F.W. Taylor",
            "Henry Fayol",
            "Elton Mayo",
            "Max Weber"
        ]
    },

    // 3
    {
        question: "How many principles of management were given by Henry Fayol?",
        options: [
            "10",
            "12",
            "14",
            "16"
        ]
    },

    // 4
    {
        question: "Which principle of Fayol states that an employee should receive orders from only one superior?",
        options: [
            "Unity of Direction",
            "Unity of Command",
            "Discipline",
            "Equity"
        ]
    },

    // 5
    {
        question: "Which Fayol principle states that similar activities should have one plan and one head?",
        options: [
            "Unity of Command",
            "Unity of Direction",
            "Centralization",
            "Scalar Chain"
        ]
    },

    // 6
    {
        question: "Which principle refers to specialization of work?",
        options: [
            "Division of Work",
            "Authority",
            "Equity",
            "Order"
        ]
    },

    // 7
    {
        question: "Which management principle emphasizes obedience and respect for rules?",
        options: [
            "Discipline",
            "Equity",
            "Initiative",
            "Order"
        ]
    },

    // 8
    {
        question: "Which principle emphasizes fair and equal treatment of employees?",
        options: [
            "Equity",
            "Discipline",
            "Order",
            "Centralization"
        ]
    },

    // 9
    {
        question: "Which principle states that organizational interest should come before individual interest?",
        options: [
            "Unity of Command",
            "Subordination of Individual Interest to General Interest",
            "Equity",
            "Order"
        ]
    },

    // 10
    {
        question: "Which principle deals with fair payment to employees?",
        options: [
            "Remuneration",
            "Equity",
            "Discipline",
            "Stability"
        ]
    },

    // 11
    {
        question: "The scalar chain refers to:",
        options: [
            "Flow of materials",
            "Line of authority from top to bottom",
            "Employee motivation",
            "Division of labour"
        ]
    },

    // 12
    {
        question: "Esprit de Corps means:",
        options: [
            "Team spirit",
            "Individual responsibility",
            "Authority",
            "Centralization"
        ]
    },

    // 13
    {
        question: "Which principle encourages employees to show creativity and take initiative?",
        options: [
            "Initiative",
            "Discipline",
            "Order",
            "Centralization"
        ]
    },

    // 14
    {
        question: "Which management function involves deciding in advance what is to be done?",
        options: [
            "Organizing",
            "Planning",
            "Staffing",
            "Controlling"
        ]
    },

    // 15
    {
        question: "Which management function involves arranging resources and activities?",
        options: [
            "Planning",
            "Organizing",
            "Directing",
            "Controlling"
        ]
    },

    // 16
    {
        question: "Recruitment, selection and training are mainly related to:",
        options: [
            "Planning",
            "Staffing",
            "Controlling",
            "Directing"
        ]
    },

    // 17
    {
        question: "Which function involves guiding, motivating and leading employees?",
        options: [
            "Planning",
            "Organizing",
            "Directing",
            "Controlling"
        ]
    },

    // 18
    {
        question: "Which function compares actual performance with planned performance?",
        options: [
            "Planning",
            "Organizing",
            "Directing",
            "Controlling"
        ]
    },

    // 19
    {
        question: "Management is best described as:",
        options: [
            "Making profits only",
            "Getting work done through and with people",
            "Supervising workers only",
            "Controlling finances only"
        ]
    },

    // 20
    {
        question: "Which of the following is NOT a basic function of management?",
        options: [
            "Planning",
            "Organizing",
            "Directing",
            "Manufacturing"
        ]
    },

    // 21
    {
        question: "Which level of management is mainly responsible for policy formulation?",
        options: [
            "Lower-level management",
            "Middle-level management",
            "Top-level management",
            "Supervisory management"
        ]
    },

    // 22
    {
        question: "Middle-level managers mainly:",
        options: [
            "Formulate all policies",
            "Implement policies and coordinate departments",
            "Perform only clerical work",
            "Operate machinery"
        ]
    },

    // 23
    {
        question: "Lower-level management is also known as:",
        options: [
            "Top management",
            "Middle management",
            "Supervisory management",
            "Strategic management"
        ]
    },

    // 24
    {
        question: "Which skill is especially important for top-level managers?",
        options: [
            "Technical skill",
            "Conceptual skill",
            "Mechanical skill",
            "Clerical skill"
        ]
    },

    // 25
    {
        question: "Which skill is particularly important for lower-level managers?",
        options: [
            "Technical skill",
            "Conceptual skill",
            "Political skill",
            "Financial skill"
        ]
    },

    // 26
    {
        question: "Human relations skill refers to the ability to:",
        options: [
            "Operate machines",
            "Work effectively with people",
            "Prepare accounts",
            "Design products"
        ]
    },

    // 27
    {
        question: "Scientific Management was developed mainly to improve:",
        options: [
            "Employee welfare only",
            "Efficiency and productivity",
            "Government policy",
            "Marketing activities"
        ]
    },

    // 28
    {
        question: "Which technique of Taylor determines the time required to complete a task?",
        options: [
            "Motion Study",
            "Time Study",
            "Fatigue Study",
            "Method Study"
        ]
    },

    // 29
    {
        question: "Motion Study is mainly concerned with:",
        options: [
            "Determining salaries",
            "Eliminating unnecessary movements",
            "Recruiting employees",
            "Preparing budgets"
        ]
    },

    // 30
    {
        question: "Fatigue Study helps determine:",
        options: [
            "Salary structure",
            "Suitable rest intervals",
            "Marketing strategy",
            "Production cost"
        ]
    },

    // 31
    {
        question: "Differential Piece Rate System was introduced by:",
        options: [
            "Henry Fayol",
            "F.W. Taylor",
            "Elton Mayo",
            "Peter Drucker"
        ]
    },

    // 32
    {
        question: "Taylor's approach emphasized:",
        options: [
            "Rule of thumb",
            "Scientific methods",
            "Informal communication",
            "Employee ownership"
        ]
    },

    // 33
    {
        question: "The Hawthorne Experiments are associated with:",
        options: [
            "F.W. Taylor",
            "Elton Mayo",
            "Henry Fayol",
            "Max Weber"
        ]
    },

    // 34
    {
        question: "The Hawthorne studies highlighted the importance of:",
        options: [
            "Machines only",
            "Human and social factors",
            "Capital only",
            "Technology only"
        ]
    },

    // 35
    {
        question: "The Human Relations approach emphasizes:",
        options: [
            "Machines and methods",
            "People and social relationships",
            "Strict rules only",
            "Financial accounting"
        ]
    },

    // 36
    {
        question: "Max Weber is associated with the concept of:",
        options: [
            "Scientific Management",
            "Bureaucracy",
            "Human Relations",
            "Systems Theory"
        ]
    },

    // 37
    {
        question: "A formal organization is characterized by:",
        options: [
            "Personal friendships only",
            "Deliberately established relationships",
            "No rules",
            "No authority"
        ]
    },

    // 38
    {
        question: "An informal organization develops mainly through:",
        options: [
            "Official rules",
            "Social interactions",
            "Government orders",
            "Written procedures"
        ]
    },

    // 39
    {
        question: "Authority means:",
        options: [
            "Obligation to perform a task",
            "Right to give orders and make decisions",
            "Personal friendship",
            "Informal communication"
        ]
    },

    // 40
    {
        question: "Responsibility means:",
        options: [
            "Right to punish",
            "Obligation to perform assigned duties",
            "Right to delegate",
            "Power to control finances"
        ]
    },

    // 41
    {
        question: "Accountability refers to:",
        options: [
            "Being answerable for results",
            "Delegating authority",
            "Giving orders",
            "Recruiting employees"
        ]
    },

    // 42
    {
        question: "Delegation means:",
        options: [
            "Giving up all authority permanently",
            "Assigning authority and responsibility to subordinates",
            "Removing employees",
            "Centralizing all decisions"
        ]
    },

    // 43
    {
        question: "Centralization means:",
        options: [
            "Decision-making concentrated at higher levels",
            "All employees make decisions",
            "No authority exists",
            "Authority is completely delegated"
        ]
    },

    // 44
    {
        question: "Decentralization means:",
        options: [
            "Concentration of authority",
            "Dispersal of decision-making authority",
            "Removal of management",
            "Reduction of employees"
        ]
    },

    // 45
    {
        question: "Span of Control refers to:",
        options: [
            "Number of departments",
            "Number of subordinates directly supervised by a manager",
            "Number of working hours",
            "Number of products"
        ]
    },

    // 46
    {
        question: "Motivation is the process of:",
        options: [
            "Forcing employees to work",
            "Stimulating people to achieve goals",
            "Reducing salaries",
            "Increasing working hours"
        ]
    },

    // 47
    {
        question: "Maslow's Hierarchy of Needs contains:",
        options: [
            "3 levels",
            "4 levels",
            "5 levels",
            "6 levels"
        ]
    },

    // 48
    {
        question: "According to Maslow, the lowest level of needs is:",
        options: [
            "Social needs",
            "Safety needs",
            "Physiological needs",
            "Esteem needs"
        ]
    },

    // 49
    {
        question: "Which of the following is a safety need?",
        options: [
            "Food",
            "Job security",
            "Friendship",
            "Recognition"
        ]
    },

    // 50
    {
        question: "Need for friendship and belonging is classified as:",
        options: [
            "Physiological need",
            "Safety need",
            "Social need",
            "Self-actualization need"
        ]
    },

    // 51
    {
        question: "Need for recognition, status and respect is called:",
        options: [
            "Social need",
            "Esteem need",
            "Safety need",
            "Physiological need"
        ]
    },

    // 52
    {
        question: "The highest level in Maslow's Hierarchy is:",
        options: [
            "Esteem",
            "Social",
            "Safety",
            "Self-actualization"
        ]
    },

    // 53
    {
        question: "Leadership is primarily concerned with:",
        options: [
            "Influencing people toward organizational goals",
            "Preparing invoices",
            "Maintaining machines",
            "Reducing production"
        ]
    },

    // 54
    {
        question: "Which leadership style allows subordinates considerable freedom?",
        options: [
            "Autocratic",
            "Democratic",
            "Laissez-faire",
            "Bureaucratic"
        ]
    },

    // 55
    {
        question: "Which leadership style involves centralized decision-making by the leader?",
        options: [
            "Democratic",
            "Laissez-faire",
            "Autocratic",
            "Participative"
        ]
    },

    // 56
    {
        question: "Democratic leadership emphasizes:",
        options: [
            "Employee participation",
            "Complete leader control",
            "No communication",
            "No decision-making"
        ]
    },

    // 57
    {
        question: "Communication is the process of:",
        options: [
            "Only speaking",
            "Exchange of information and understanding",
            "Only writing",
            "Giving orders only"
        ]
    },

    // 58
    {
        question: "Which is an example of downward communication?",
        options: [
            "Employee to manager",
            "Manager to employee",
            "Employee to employee",
            "Customer to employee"
        ]
    },

    // 59
    {
        question: "Which is an example of upward communication?",
        options: [
            "Manager to worker",
            "Worker to manager",
            "Manager to manager",
            "Company to customer"
        ]
    },

    // 60
    {
        question: "Which statement best describes effective management?",
        options: [
            "Doing everything alone",
            "Achieving organizational goals efficiently and effectively",
            "Avoiding delegation",
            "Using authority without responsibility"
        ]
    }

];


// ------------------------------------------------------
// CHECK QUESTION COUNT
// ------------------------------------------------------

if (questions.length !== 60) {

    console.error(
        `ERROR: There are ${questions.length} questions. Exactly 60 questions are required.`
    );

}


// ------------------------------------------------------
// APPLICATION STATE
// ------------------------------------------------------

let studentUsername = "";

let studentRegisterNumber = "";

let answers =
    new Array(questions.length).fill(null);

let currentQuestion = 0;

let timeRemaining =
    EXAM_TIME_MINUTES * 60;

let timerInterval = null;

let examSubmitted = false;


// ------------------------------------------------------
// GET HTML ELEMENTS
// ------------------------------------------------------

const loginSection =
    document.getElementById("loginSection");

const examSection =
    document.getElementById("examSection");

const resultSection =
    document.getElementById("resultSection");

const usernameInput =
    document.getElementById("username");

const registerNumberInput =
    document.getElementById("registerNumber");

const loginError =
    document.getElementById("loginError");

const startButton =
    document.getElementById("startButton");

const studentDisplay =
    document.getElementById("studentDisplay");

const timerElement =
    document.getElementById("timer");

const questionNumberElement =
    document.getElementById("questionNumber");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const questionTextElement =
    document.getElementById("questionText");

const optionsElement =
    document.getElementById("options");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const submitButton =
    document.getElementById("submitButton");

const progressBar =
    document.getElementById("progressBar");

const questionGrid =
    document.getElementById("questionGrid");

const resultStudent =
    document.getElementById("resultStudent");

const resultScore =
    document.getElementById("resultScore");

const resultTotal =
    document.getElementById("resultTotal");

const resultPercentage =
    document.getElementById("resultPercentage");

const resultMessage =
    document.getElementById("resultMessage");

const restartButton =
    document.getElementById("restartButton");


// ------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------

mcqSession = getStoredSession();

totalQuestionsElement.textContent =
    questions.length;

resultTotal.textContent =
    questions.length;


// ------------------------------------------------------
// BUTTON EVENTS
// ------------------------------------------------------

startButton.addEventListener(
    "click",
    startExam
);

previousButton.addEventListener(
    "click",
    previousQuestion
);

nextButton.addEventListener(
    "click",
    nextQuestion
);

submitButton.addEventListener(
    "click",
    () => submitExam(false)
);

restartButton.addEventListener(
    "click",
    restartExam
);


// ------------------------------------------------------
// ENTER KEY
// ------------------------------------------------------

usernameInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            startExam();
        }

    }
);


registerNumberInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            startExam();
        }

    }
);


// ------------------------------------------------------
// START EXAM
// ------------------------------------------------------

async function startExam() {

    loginError.textContent = "";

    studentUsername = usernameInput.value.trim();
    studentRegisterNumber = registerNumberInput.value.trim();

    if (studentUsername === "") {
        loginError.textContent = "Please enter your name.";
        usernameInput.focus();
        return;
    }

    if (studentRegisterNumber === "") {
        loginError.textContent = "Please enter your register number.";
        registerNumberInput.focus();
        return;
    }

    startButton.disabled = true;
    startButton.textContent = "Starting...";

    try {
        const data = await callMcqFunction("start-mcq", {
            name: studentUsername,
            register_number: studentRegisterNumber,
            duration_minutes: EXAM_TIME_MINUTES
        });

        storeSession({
            attempt_id: data.attempt_id,
            token: data.token,
            status: data.status,
            started_at: data.started_at,
            expires_at: data.expires_at,
            student_name: data.student_name,
            register_number: data.register_number,
            total_questions: data.total_questions
        });

        if (data.status !== "active") {
            loginError.textContent = "This register number has already completed the examination.";
            return;
        }

        answers = new Array(questions.length).fill(null);
        currentQuestion = 0;
        timeRemaining = EXAM_TIME_MINUTES * 60;
        examSubmitted = false;

        studentDisplay.textContent = `${studentUsername} - ${studentRegisterNumber}`;

        loginSection.classList.add("hidden");
        examSection.classList.remove("hidden");
        resultSection.classList.add("hidden");

        updateTimerDisplay();
        createQuestionGrid();
        showQuestion();
        startTimer();

    } catch (error) {
        console.error("START EXAM ERROR:", error);
        if (error.code === "name_mismatch") {
            loginError.textContent = "This register number is already used with a different name.";
        } else if (error.code === "not_configured") {
            loginError.textContent = "The MCQ backend is not configured yet.";
        } else {
            loginError.textContent = error.message || "Could not start the examination. Please try again.";
        }
    } finally {
        startButton.disabled = false;
        startButton.textContent = "Start Examination";
    }
}


// ------------------------------------------------------
// SHOW QUESTION
// ------------------------------------------------------

function showQuestion() {

    const question =
        questions[currentQuestion];


    if (!question) {
        return;
    }


    // Question number

    questionNumberElement.textContent =
        currentQuestion + 1;


    // Question text

    questionTextElement.textContent =
        question.question;


    // Clear options

    optionsElement.innerHTML = "";


    // Create options

    question.options.forEach(
        function(option, index) {

            const optionElement =
                document.createElement("div");


            optionElement.className =
                "option";


            // Selected state

            if (
                answers[currentQuestion] ===
                index
            ) {

                optionElement.classList.add(
                    "selected"
                );

            }


            // Radio button

            const radio =
                document.createElement("input");


            radio.type = "radio";

            radio.name = "answer";

            radio.value = index;


            radio.checked =
                answers[currentQuestion] ===
                index;


            // Text

            const label =
                document.createElement("span");


            label.textContent =
                `${String.fromCharCode(65 + index)}. ${option}`;


            // Add elements

            optionElement.appendChild(
                radio
            );

            optionElement.appendChild(
                label
            );


            // Click event

            optionElement.addEventListener(
                "click",
                function() {

                    answers[currentQuestion] =
                        index;

                    showQuestion();

                }
            );


            // Add to page

            optionsElement.appendChild(
                optionElement
            );

        }
    );


    // Previous button

    if (currentQuestion === 0) {

        previousButton.style.display =
            "none";

    } else {

        previousButton.style.display =
            "inline-block";

    }


    // Next button

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.style.display =
            "none";

    } else {

        nextButton.style.display =
            "inline-block";

    }


    // Update progress

    updateProgress();


    // Update question navigator

    updateQuestionGrid();

}


// ------------------------------------------------------
// NEXT QUESTION
// ------------------------------------------------------

function nextQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    }

}


// ------------------------------------------------------
// PREVIOUS QUESTION
// ------------------------------------------------------

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}


// ------------------------------------------------------
// CREATE QUESTION GRID
// ------------------------------------------------------

function createQuestionGrid() {

    questionGrid.innerHTML = "";


    questions.forEach(
        function(_, index) {

            const button =
                document.createElement("button");


            button.type = "button";


            button.textContent =
                index + 1;


            button.addEventListener(
                "click",
                function() {

                    currentQuestion =
                        index;

                    showQuestion();

                }
            );


            questionGrid.appendChild(
                button
            );

        }
    );

}


// ------------------------------------------------------
// UPDATE QUESTION GRID
// ------------------------------------------------------

function updateQuestionGrid() {

    const buttons =
        questionGrid.querySelectorAll(
            "button"
        );


    buttons.forEach(
        function(button, index) {

            button.classList.remove(
                "answered"
            );

            button.classList.remove(
                "current"
            );


            // Answered

            if (
                answers[index] !== null
            ) {

                button.classList.add(
                    "answered"
                );

            }


            // Current

            if (
                index === currentQuestion
            ) {

                button.classList.add(
                    "current"
                );

            }

        }
    );

}


// ------------------------------------------------------
// UPDATE PROGRESS
// ------------------------------------------------------

function updateProgress() {

    const answered =
        answers.filter(
            function(answer) {

                return answer !== null;

            }
        ).length;


    const percentage =
        questions.length === 0
            ? 0
            : (
                answered /
                questions.length
            ) * 100;


    progressBar.style.width =
        `${percentage}%`;

}


// ------------------------------------------------------
// START TIMER
// ------------------------------------------------------

function startTimer() {

    clearInterval(
        timerInterval
    );


    updateTimerDisplay();


    timerInterval =
        setInterval(
            function() {

                if (examSubmitted) {

                    clearInterval(
                        timerInterval
                    );

                    return;

                }


                if (
                    timeRemaining <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    submitExam(true);

                    return;

                }


                timeRemaining--;

                updateTimerDisplay();

            },
            1000
        );

}


// ------------------------------------------------------
// UPDATE TIMER
// ------------------------------------------------------

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timeRemaining / 60
        );


    const seconds =
        timeRemaining % 60;


    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    if (
        timeRemaining <= 60
    ) {

        timerElement.classList.add(
            "danger"
        );

    } else {

        timerElement.classList.remove(
            "danger"
        );

    }

}



// ------------------------------------------------------
// FINISH EXAM THROUGH SUPABASE BACKEND
// ------------------------------------------------------

async function finishExamOnBackend() {

    if (!mcqSession || !mcqSession.attempt_id || !mcqSession.token) {
        throw new Error("Your examination session was not found. Please restart the examination.");
    }

    return callMcqFunction("finish-mcq", {
        attempt_id: mcqSession.attempt_id,
        token: mcqSession.token,
        answers: answers.map((answer) => answer === null ? null : Number(answer))
    });
}

// ------------------------------------------------------
// SUBMIT EXAM
// ------------------------------------------------------

async function submitExam(autoSubmit = false) {

    if (examSubmitted) return;

    const unanswered = answers.filter((answer) => answer === null).length;

    if (!autoSubmit && unanswered > 0) {
        const confirmSubmit = window.confirm(
            `You have ${unanswered} unanswered question(s).\n\nDo you want to submit the examination?`
        );

        if (!confirmSubmit) return;
    }

    examSubmitted = true;
    clearInterval(timerInterval);
    submitButton.disabled = true;

    try {
        // Send answers only. The backend owns the answer key, score,
        // percentage and final submitted_at timestamp.
        const result = await finishExamOnBackend();

        examSection.classList.add("hidden");
        resultSection.classList.remove("hidden");

        resultStudent.textContent = `${result.student_name} (${result.register_number})`;
        resultScore.textContent = result.score;
        resultTotal.textContent = result.total_questions;
        resultPercentage.textContent = `${Number(result.percentage).toFixed(2)}%`;

        if (result.status === "expired" || autoSubmit) {
            resultMessage.textContent = "Time expired. Your examination was submitted automatically.";
        } else {
            resultMessage.textContent = "Your examination has been submitted successfully.";
        }

        clearStoredSession();

    } catch (error) {
        console.error("FINISH EXAM ERROR:", error);
        examSubmitted = false;
        submitButton.disabled = false;

        alert(
            "Your result could not be saved to the backend.\n\n" +
            (error.message || "Please check your Supabase Edge Functions and try again.")
        );
    }
}


// ------------------------------------------------------
// RESTART
// ------------------------------------------------------

function restartExam() {

    clearStoredSession();

    clearInterval(
        timerInterval
    );


    studentUsername = "";

    studentRegisterNumber = "";


    answers =
        new Array(
            questions.length
        ).fill(null);


    currentQuestion = 0;


    timeRemaining =
        EXAM_TIME_MINUTES * 60;


    examSubmitted = false;


    usernameInput.value = "";

    registerNumberInput.value = "";


    loginError.textContent = "";


    resultSection.classList.add(
        "hidden"
    );


    examSection.classList.add(
        "hidden"
    );


    loginSection.classList.remove(
        "hidden"
    );


    submitButton.disabled = false;


    updateTimerDisplay();


    usernameInput.focus();

}


// ------------------------------------------------------
// PREVENT ACCIDENTAL PAGE REFRESH / CLOSE
// ------------------------------------------------------

window.addEventListener(
    "beforeunload",
    function(event) {

        if (
            !examSection.classList.contains(
                "hidden"
            ) &&
            !examSubmitted
        ) {

            event.preventDefault();

            event.returnValue = "";

        }

    }
);