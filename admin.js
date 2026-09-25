const SUPABASE_URL =
    "https://mdwyjofrnvevsdqigljt.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kd3lqb2ZybnZldnNkcWlnbGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNTU5ODQsImV4cCI6MjEwNTgzMTk4NH0.n5iMfqjbdMR4v46cRTeIjzxQ2uE_5-ZFcOECLglXDiQ";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


let allResults = [];


// --------------------------------------
// LOGIN
// --------------------------------------

async function adminLogin() {

    const email =
        document
            .getElementById("adminEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("adminPassword")
            .value;


    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });


    if (error) {

        document
            .getElementById("adminError")
            .textContent =
                "Invalid email or password.";

        return;

    }


    document
        .getElementById("adminLogin")
        .classList
        .add("hidden");


    document
        .getElementById("dashboard")
        .classList
        .remove("hidden");


    loadResults();

}


// --------------------------------------
// LOAD RESULTS
// --------------------------------------

async function loadResults() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("exam_results")
            .select("*")
            .order(
                "submitted_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        alert(
            "Unable to load results."
        );

        return;

    }


    allResults = data || [];


    displayResults(allResults);

    updateStatistics(allResults);

}


// --------------------------------------
// DISPLAY RESULTS
// --------------------------------------

function displayResults(results) {

    const tbody =
        document.getElementById(
            "resultsBody"
        );


    tbody.innerHTML = "";


    results.forEach(
        (result, index) => {

            const row =
                document.createElement("tr");


            const date =
                new Date(
                    result.submitted_at
                );


            row.innerHTML = `

                <td>${index + 1}</td>

                <td>${escapeHtml(result.student_name)}</td>

                <td>${escapeHtml(result.register_number)}</td>

                <td>
                    <strong>
                        ${result.score}/${result.total_questions}
                    </strong>
                </td>

                <td>
                    ${result.percentage}%
                </td>

                <td>
                    ${date.toLocaleString()}
                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


// --------------------------------------
// STATISTICS
// --------------------------------------

function updateStatistics(results) {

    document
        .getElementById("totalStudents")
        .textContent =
            results.length;


    if (results.length === 0) {

        document
            .getElementById("averageScore")
            .textContent = "0";


        document
            .getElementById("averagePercentage")
            .textContent = "0%";


        return;

    }


    const totalScore =
        results.reduce(
            (sum, result) =>
                sum + result.score,
            0
        );


    const totalPercentage =
        results.reduce(
            (sum, result) =>
                sum + Number(result.percentage),
            0
        );


    const averageScore =
        (
            totalScore /
            results.length
        ).toFixed(2);


    const averagePercentage =
        (
            totalPercentage /
            results.length
        ).toFixed(2);


    document
        .getElementById("averageScore")
        .textContent =
            averageScore;


    document
        .getElementById("averagePercentage")
        .textContent =
            `${averagePercentage}%`;

}


// --------------------------------------
// SEARCH
// --------------------------------------

function filterResults() {

    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        allResults.filter(
            result =>
                result.student_name
                    .toLowerCase()
                    .includes(search)
                ||
                result.register_number
                    .toLowerCase()
                    .includes(search)
        );


    displayResults(filtered);

}


// --------------------------------------
// LOGOUT
// --------------------------------------

async function adminLogout() {

    await supabaseClient.auth.signOut();

    location.reload();

}


// --------------------------------------
// ESCAPE HTML
// --------------------------------------

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}