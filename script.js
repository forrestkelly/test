let currentStep = 0;
showStep(currentStep);

function showStep(n) {
    const steps = document.getElementsByClassName("step");
    steps[n].style.display = "block";
    document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = n === (steps.length - 1) ? "Submit" : "Next";
}

function nextPrev(n) {
    const steps = document.getElementsByClassName("step");
    if (n === 1 && !validateForm()) return false;

    steps[currentStep].style.display = "none";
    currentStep += n;
    if (currentStep >= steps.length) {
        calculateResult();
        return false;
    }
    showStep(currentStep);
}

function validateForm() {
    const radios = document.querySelectorAll(`input[name="q${currentStep + 1}"]:checked`);
    if (radios.length === 0) {
        alert("Please select an answer.");
        return false;
    }
    return true;
}

function calculateResult() {
    const answers = {};
    const totalQuestions = 10;
    for (let i = 1; i <= totalQuestions; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`).value;
        if (!answers[answer]) answers[answer] = 0;
        answers[answer]++;
    }

    let highestScore = 0;
    let careerType = '';
    
    for (const [key, value] of Object.entries(answers)) {
        if (value > highestScore) {
            highestScore = value;
            careerType = key;
        }
    }

    const resultMap = {
        "A": "Analytical Careers: Data analysis, engineering, finance, research, IT.",
        "B": "Creative Careers: Design, writing, marketing, advertising, art.",
        "C": "Organizational Careers: Project management, administration, operations, business leadership.",
        "D": "People-Oriented Careers: Teaching, counseling, healthcare, human resources, social work."
    };

    document.getElementById("resultText").innerText = resultMap[careerType] || "No result";
    document.querySelector(".result").style.display = "block";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";
}
