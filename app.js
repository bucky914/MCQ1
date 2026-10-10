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

    // UNIT IV - DIRECTING

    // 1
    {
        question: "Foundations of individual and group behaviour are concerned with:",
        options: [
            "Only product design",
            "How people behave individually and in groups at work",
            "Only inventory storage",
            "Only financial accounting"
        ]
    },

    // 2
    {
        question: "Which factor can influence individual behaviour at work?",
        options: [
            "Company logo only",
            "Office address only",
            "Personality and attitudes",
            "Product colour only"
        ]
    },

    // 3
    {
        question: "Group behaviour refers to:",
        options: [
            "One person's technical skill only",
            "The company's annual budget",
            "How people act and interact as members of a group",
            "The physical layout of a building"
        ]
    },

    // 4
    {
        question: "Motivation is the process of:",
        options: [
            "Encouraging people to work toward desired goals",
            "Preparing financial statements",
            "Reducing all communication",
            "Assigning job titles only"
        ]
    },

    // 5
    {
        question: "Which theory arranges human needs in levels?",
        options: [
            "Maslow's Need Hierarchy Theory",
            "Scalar Chain Theory",
            "Trait Theory",
            "Bureaucratic Theory"
        ]
    },

    // 6
    {
        question: "According to Maslow, the most basic needs are:",
        options: [
            "Physiological needs",
            "Social needs",
            "Esteem needs",
            "Self-actualization needs"
        ]
    },

    // 7
    {
        question: "Job security is an example of a:",
        options: [
            "Self-actualization need",
            "Social need",
            "Esteem need",
            "Safety need"
        ]
    },

    // 8
    {
        question: "Friendship and belonging are examples of:",
        options: [
            "Safety needs",
            "Physiological needs",
            "Social needs",
            "Esteem needs"
        ]
    },

    // 9
    {
        question: "Recognition and respect are examples of:",
        options: [
            "Safety needs",
            "Physiological needs",
            "Esteem needs",
            "Social needs"
        ]
    },

    // 10
    {
        question: "Self-actualization refers to:",
        options: [
            "Realizing one's potential",
            "Receiving food only",
            "Making friends only",
            "Having job security only"
        ]
    },

    // 11
    {
        question: "Herzberg's Two-Factor Theory identifies:",
        options: [
            "Formal and informal reports",
            "Hygiene factors and motivators",
            "Leaders and followers",
            "Costs and revenues"
        ]
    },

    // 12
    {
        question: "Which is a hygiene factor in Herzberg's theory?",
        options: [
            "Recognition",
            "Working conditions",
            "Achievement",
            "Responsibility"
        ]
    },

    // 13
    {
        question: "Which is a motivator in Herzberg's theory?",
        options: [
            "Achievement",
            "Job security",
            "Working conditions",
            "Company policy"
        ]
    },

    // 14
    {
        question: "McGregor's Theory X assumes that employees generally:",
        options: [
            "May dislike work and need close supervision",
            "Always need no supervision",
            "Never respond to rewards",
            "Prefer no organizational goals"
        ]
    },

    // 15
    {
        question: "McGregor's Theory Y suggests that employees can:",
        options: [
            "Work only under punishment",
            "Avoid every responsibility",
            "Never enjoy their work",
            "Exercise self-direction and accept responsibility"
        ]
    },

    // 16
    {
        question: "Which is a financial motivational technique?",
        options: [
            "Recognition",
            "Employee participation",
            "Job rotation",
            "Performance bonus"
        ]
    },

    // 17
    {
        question: "Which is a non-financial motivational technique?",
        options: [
            "Commission",
            "Recognition and praise",
            "Cash bonus",
            "Piece-rate wages"
        ]
    },

    // 18
    {
        question: "Job satisfaction means:",
        options: [
            "The manager's formal title",
            "The number of machines in a factory",
            "The firm's tax rate",
            "An employee's feelings about their job"
        ]
    },

    // 19
    {
        question: "Job enrichment involves:",
        options: [
            "Reducing employee involvement",
            "Removing all responsibility",
            "Adding meaningful tasks and greater responsibility",
            "Repeating the same simple task only"
        ]
    },

    // 20
    {
        question: "Job rotation means:",
        options: [
            "Removing all training",
            "Moving employees between different jobs",
            "Promoting every employee",
            "Automatically increasing wages"
        ]
    },

    // 21
    {
        question: "Leadership is the process of:",
        options: [
            "Preparing budgets only",
            "Checking stock only",
            "Recording invoices only",
            "Influencing people toward common goals"
        ]
    },

    // 22
    {
        question: "An autocratic leader typically:",
        options: [
            "Avoids all decisions",
            "Always lets the group decide",
            "Gives complete freedom in every situation",
            "Makes decisions with little subordinate participation"
        ]
    },

    // 23
    {
        question: "Democratic leadership encourages:",
        options: [
            "One-way orders only",
            "No feedback",
            "Complete leader isolation",
            "Employee participation in decisions"
        ]
    },

    // 24
    {
        question: "Laissez-faire leadership gives subordinates:",
        options: [
            "Only strict instructions",
            "No responsibility at all",
            "Considerable freedom in decision-making",
            "No information"
        ]
    },

    // 25
    {
        question: "Trait theories of leadership focus on:",
        options: [
            "Communication channels only",
            "Budget preparation",
            "Product packaging",
            "Personal qualities of leaders"
        ]
    },

    // 26
    {
        question: "Behavioural theories of leadership study:",
        options: [
            "Only office equipment",
            "Leaders' actions and behaviour",
            "Only leaders' family backgrounds",
            "Only salary structures"
        ]
    },

    // 27
    {
        question: "Contingency theories state that leadership effectiveness depends on:",
        options: [
            "One style being best in all cases",
            "The office location",
            "The situation and its requirements",
            "The leader's age only"
        ]
    },

    // 28
    {
        question: "Communication is best defined as:",
        options: [
            "Writing reports only",
            "The exchange of information and understanding",
            "Speaking without listening",
            "Sending a message without a receiver"
        ]
    },

    // 29
    {
        question: "Which sequence best describes the communication process?",
        options: [
            "Planning, staffing, production, sales",
            "Sender, encoding, message, channel, receiver, decoding, feedback",
            "Budget, profit, audit, report",
            "Leader, salary, output, promotion"
        ]
    },

    // 30
    {
        question: "Which is a common barrier to effective communication?",
        options: [
            "Clear feedback",
            "Simple wording",
            "Noise and unclear language",
            "Active listening"
        ]
    },

    // UNIT V - CONTROLLING

    // 31
    {
        question: "Controlling is the process of:",
        options: [
            "Designing products only",
            "Recruiting employees only",
            "Comparing actual performance with planned standards",
            "Setting company ownership"
        ]
    },

    // 32
    {
        question: "What is usually the first step in the control process?",
        options: [
            "Taking corrective action",
            "Preparing the final report",
            "Ignoring deviations",
            "Establishing performance standards"
        ]
    },

    // 33
    {
        question: "After measuring actual performance, a manager should:",
        options: [
            "Compare it with established standards",
            "Ignore the results",
            "Stop collecting information",
            "Remove all targets"
        ]
    },

    // 34
    {
        question: "A significant deviation from a standard may require:",
        options: [
            "Removing all controls",
            "Ignoring the deviation",
            "Corrective action",
            "Stopping all reporting"
        ]
    },

    // 35
    {
        question: "Budgetary control uses:",
        options: [
            "Informal conversations only",
            "Personality tests",
            "Job rotation",
            "Budgets to plan and control activities"
        ]
    },

    // 36
    {
        question: "Which is an example of budgetary control?",
        options: [
            "Measuring employee friendships",
            "Comparing actual expenses with the expense budget",
            "Preparing a job description",
            "Interviewing a leader"
        ]
    },

    // 37
    {
        question: "Non-budgetary control techniques may include:",
        options: [
            "Statistical reports and performance audits",
            "Sales budgets only",
            "Capital budgets only",
            "Cash budgets only"
        ]
    },

    // 38
    {
        question: "Break-even analysis identifies the point where:",
        options: [
            "Total revenue equals total cost",
            "Fixed costs become zero",
            "Sales are always zero",
            "Profit is always highest"
        ]
    },

    // 39
    {
        question: "Standard costing compares:",
        options: [
            "Assets with office locations only",
            "Products with staff names",
            "Employee ages with job titles",
            "Actual costs with standard costs"
        ]
    },

    // 40
    {
        question: "Management by exception means managers focus on:",
        options: [
            "Significant deviations from standards",
            "Every minor detail equally",
            "Only successful results",
            "Tasks without standards"
        ]
    },

    // 41
    {
        question: "Preventive control is designed to:",
        options: [
            "Ignore possible risks",
            "Reduce the chance of problems before they occur",
            "Report results only at year-end",
            "Correct errors only after completion"
        ]
    },

    // 42
    {
        question: "Direct control generally involves:",
        options: [
            "Removing all supervision",
            "Only long-term forecasts",
            "Only automated reports",
            "Direct supervision and correction of work"
        ]
    },

    // 43
    {
        question: "Which is an example of preventive control?",
        options: [
            "Ignoring safety procedures",
            "Writing a year-end report only",
            "Investigating a defect after delivery only",
            "Training staff and checking procedures before work begins"
        ]
    },

    // 44
    {
        question: "Computers support management control by:",
        options: [
            "Removing the need for managers",
            "Processing data and producing timely reports",
            "Eliminating all standards",
            "Guaranteeing that errors never occur"
        ]
    },

    // 45
    {
        question: "A Management Information System (MIS) provides:",
        options: [
            "Only personal messages",
            "No business data",
            "Relevant information for management decisions and control",
            "Only entertainment content"
        ]
    },

    // 46
    {
        question: "Productivity is commonly measured as:",
        options: [
            "Output divided by input",
            "Sales minus employee count",
            "Input divided by profit",
            "Costs plus working hours"
        ]
    },

    // 47
    {
        question: "Which may cause a productivity problem?",
        options: [
            "Preventive maintenance",
            "Poor training and equipment downtime",
            "Effective communication",
            "Clear goals and good tools"
        ]
    },

    // 48
    {
        question: "Performance control compares actual results with:",
        options: [
            "Competitors' names only",
            "Employee preferences only",
            "Informal opinions alone",
            "Predetermined objectives or standards"
        ]
    },

    // 49
    {
        question: "An effective control system should be:",
        options: [
            "Timely, accurate and economical",
            "Complex regardless of cost",
            "Unrelated to organizational goals",
            "Based on outdated data"
        ]
    },

    // 50
    {
        question: "A management report should contain:",
        options: [
            "Unverified data only",
            "Unrelated personal opinions",
            "Relevant, accurate and understandable information",
            "Every detail regardless of relevance"
        ]
    },

    // 51
    {
        question: "Exception reporting highlights:",
        options: [
            "Employee birthdays only",
            "Every routine activity equally",
            "Important deviations needing management attention",
            "Advertisements only"
        ]
    },

    // 52
    {
        question: "A timely operational report helps managers to:",
        options: [
            "Track current operational performance",
            "Avoid measuring results",
            "Replace all planning",
            "Remove organizational standards"
        ]
    },

    // 53
    {
        question: "Control and planning are related because:",
        options: [
            "Plans cannot be measured",
            "Control is unrelated to goals",
            "Control checks whether plans and standards are achieved",
            "Planning eliminates the need for control"
        ]
    },

    // 54
    {
        question: "Which action demonstrates corrective control?",
        options: [
            "Setting a target before work begins",
            "Training staff before a task",
            "Writing a mission statement",
            "Adjusting a process after identifying a performance gap"
        ]
    },

    // 55
    {
        question: "A limitation of computer-based control is that:",
        options: [
            "Data cannot be stored",
            "Managers cannot access information",
            "Reports are always perfectly accurate",
            "Poor-quality input data can produce misleading reports"
        ]
    },

    // 56
    {
        question: "A good reporting system should deliver information to:",
        options: [
            "No decision-maker",
            "The right person at the right time",
            "Only external customers",
            "Everyone after it becomes outdated"
        ]
    },

    // 57
    {
        question: "Which control technique compares actual results with a budget?",
        options: [
            "Democratic leadership",
            "Downward communication",
            "Job enrichment",
            "Budgetary control"
        ]
    },

    // 58
    {
        question: "Which is an example of non-budgetary control?",
        options: [
            "Performance audit",
            "Production budget",
            "Cash budget",
            "Sales budget"
        ]
    },

    // 59
    {
        question: "Why is feedback important in control?",
        options: [
            "It prevents all planning",
            "It removes the need for standards",
            "It helps identify gaps and improve performance",
            "It replaces communication"
        ]
    },

    // 60
    {
        question: "The main purpose of management reporting is to:",
        options: [
            "Increase paperwork without purpose",
            "Avoid accountability",
            "Hide deviations",
            "Provide information for monitoring and decisions"
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