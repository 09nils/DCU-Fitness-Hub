
// BMI CALCULATOR
function calculateBMI() {
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const result = document.getElementById("bmi-result");

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        result.innerHTML = "Please enter a valid height and weight.";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal weight";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    result.innerHTML = `Your BMI is <strong>${bmi.toFixed(1)}</strong> (${category}).`;
}



// FAQ ACCORDION

function toggleFAQ(element) {
    const answer = element.nextElementSibling;

    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}



// MEMBERSHIP FORM VALIDATION

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const age = document.getElementById("age").value.trim();
            const message = document.getElementById("form-message");

            if (name === "" || email === "" || age === "") {
                message.innerHTML = "Please fill in all required fields.";
                message.style.color = "red";
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                message.innerHTML = "Please enter a valid email address.";
                message.style.color = "red";
                return;
            }

            if (age < 16) {
                message.innerHTML = "You must be at least 16 years old to sign up.";
                message.style.color = "red";
                return;
            }

            message.innerHTML = "Thank you! Your membership request has been submitted.";
            message.style.color = "green";

            form.reset();
        });
    }
});


// WORKOUT SUGGESTION API

async function getWorkoutSuggestion() {
    const workoutType = document.getElementById("workout-type").value;
    const resultBox = document.getElementById("workout-result");

    resultBox.innerHTML = "Loading suggestion...";

    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();

        let customWorkout = "";

        if (workoutType === "strength") {
            customWorkout = "Recommended workout: 3 sets of squats, bench press, and deadlifts.";
        } else if (workoutType === "cardio") {
            customWorkout = "Recommended workout: 20 minutes treadmill, 15 minutes cycling, and 10 minutes rowing.";
        } else if (workoutType === "flexibility") {
            customWorkout = "Recommended workout: 15 minutes stretching, yoga flow, and mobility drills.";
        }

        resultBox.innerHTML = `
            <strong>Your Goal:</strong> ${workoutType}<br>
            <strong>Workout Suggestion:</strong> ${customWorkout}<br><br>
            <strong>Motivation Tip:</strong> ${data.slip.advice}
        `;
    } catch (error) {
        resultBox.innerHTML = "Sorry, something went wrong while loading your workout suggestion.";
    }
}