document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', validateAndStartQuiz);
    document.getElementById('nextButton').addEventListener('click', handleNextClick);
    document.getElementById('submitButton').addEventListener('click', submitForm);
    document.getElementById('resetButton').addEventListener('click', resetQuiz);
});

let currentQuestionIndex = 0;
let selectedAnswers = [];
const questions = [
    {
        question: '1. What is the definition of "SUSTAINABLE DEVELOPMENT"?',
        answers: ['A) Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.', 'B) Development that only focuses on economic growth.', 'C) Development that increases the use of natural resources.', 'D) Development that is focused solely on technology.'],
        correct: 'A) Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.'
    },
    {
        question: '2. Which of the following is NOT a pillar of "SUSTAINABLE DEVELOPMENT"?',
        answers: ['A) Economic growth', 'B) Social inclusion', 'C) Environmental protection', 'D) Military power'],
        correct: 'D) Military power'
    },
    {
        question: '3. What does the term “RENEWABLE RESOURCE” refer to?',
        answers: ['A) Resources that are infinite and do not require management.', 'B) Resources that can regenerate or be replenished over time.', 'C) Resources that cannot be reused.', 'D) Resources that are only found in certain regions of the world.'],
        correct: 'B) Resources that can regenerate or be replenished over time.'
    },
    {
        question: '4. What is the primary goal of the United Nations "SUSTAINABLE DEVELOPMENT GOALS (SDGs)"?',
        answers: ['A) To achieve universal healthcare.', 'B) To eliminate poverty, protect the planet, and ensure prosperity for all by 2030.', 'C) To reduce the population growth.', 'D) To focus only on economic development.'],
        correct: 'B) To eliminate poverty, protect the planet, and ensure prosperity for all by 2030.'
    },
    {
        question: '5. How many Sustainable Development Goals (SDGs) are there in the UNs 2030 Agenda?',
        answers: ['A) 10', 'B) 15', 'C) 17', 'D) 20'],
        correct: 'C) 17'
    },
    {
        question: '6. Which of the following is a key component of "SUSTAINABLE AGRICULTURE" ?',
        answers: ['A) Using chemical fertilizers excessively.', 'B) Promoting biodiversity and soil health.', 'C) Monoculture farming.', 'D) Deforestation for farmland expansion.'],
        correct: 'B) Promoting biodiversity and soil health.'
    },
    {
        question: '7. What does "CARBON FOOTPRINT" refer to?',
        answers: ['A) The number of steps taken by individuals daily.', 'B) The total amount of greenhouse gases produced by human activities.', 'C) The amount of energy saved through recycling.', 'D) A new way to calculate pollution in oceans.'],
        correct: 'B) The total amount of greenhouse gases produced by human activities.'
    },
    {
        question: '8. Which renewable energy source uses the sun to generate electricity?',
        answers: ['A) Wind energy', 'B) Geothermal energy', 'C) Solar energy', 'D) Nuclear energy'],
        correct: 'C) Solar energy'
    },
    {
        question: '9. What is "BIODIVERSITY"?',
        answers: ['A) The variety of living species on Earth.', 'B) The diversity of non-living things.', 'C) A specific type of ecosystem.', 'D) The difference in climates across the world.'],
        correct: 'A) The variety of living species on Earth.'
    },
    {
        question: '10. Which of the following is a key challenge to achieving sustainable development globally?',
        answers: ['A) Increasing energy efficiency', 'B) Addressing inequalities and poverty', 'C) Decreasing air pollution', 'D) Banning renewable energy sources'],
        correct: 'B) Addressing inequalities and poverty'
    },
    {
        question: '11. What does the term "CIRCULAR ECONOMY" mean?',
        answers: ['A) An economy that is based on disposable goods.', 'B) An economy that prioritizes resource use efficiency, reducing waste, and reusing products.', 'C) An economy that solely focuses on industrialization.', 'D) An economy with infinite resources.'],
        correct: 'B) An economy that prioritizes resource use efficiency, reducing waste, and reusing products.'
    },
    {
        question: '12. What is the main purpose of "GREEN BUILDING"?',
        answers: ['A) To create modern and luxurious buildings.', 'B) To reduce the environmental impact of buildings by using sustainable materials and energy-efficient technologies.', 'C) To ensure that buildings are only built in rural areas.', 'D) To make buildings that are not accessible to the general public.'],
        correct: 'B) To reduce the environmental impact of buildings by using sustainable materials and energy-efficient technologies.'
    },
    {
        question: '13. What is the role of EDUCATION in sustainable development?',
        answers: ['A) Education has no role in sustainable development.', 'B) To teach people only about economic growth.', 'C) To raise awareness and build capacity for addressing environmental, social, and economic challenges.', 'D) To limit discussions on climate change.'],
        correct: 'C) To raise awareness and build capacity for addressing environmental, social, and economic challenges.'
    },
    {
        question: '14. What does "Agenda 21" focus on?',
        answers: ['A) Promoting global sports events.', 'B) A comprehensive plan of action to build a sustainable world for the 21st century.', 'C) Ensuring every country builds nuclear power plants.', 'D) Regulating space exploration.'],
        correct: 'B) A comprehensive plan of action to build a sustainable world for the 21st century.'
    },
    {
        question: '15. Which of the following actions can help reduce "DEFORESTATION"?',
        answers: ['A) Expanding agricultural land by clearing forests.', 'B) Promoting agroforestry and sustainable forestry management.', 'C) Building more urban areas in forests.', 'D) Increasing the consumption of paper products.'],
        correct: 'B) Promoting agroforestry and sustainable forestry management.'
    },
    
];
let score = 0;
let timer; // To store the timer
let timeLeft = 30;

function validateAndStartQuiz(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validate if name and contact fields are filled
    if (!name || !contact) {
        alert('Both name and contact fields are required.');
        return; // Stop execution if fields are empty
    }

    // If validation passes, start the quiz
    startQuiz();
}

function startQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    selectedAnswers = [];
    score = 0;
    timeLeft = 30; 

    // Hide the intro section and show the quiz section
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Display the first question
    showQuestion(currentQuestionIndex);
    startTimer();
}

function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 30; // Reset time

    timer = setInterval(() => {
        document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            // Automatically proceed to the next question when the timer reaches 0
            handleNextClick();
        }

        timeLeft--;
    }, 1000); // Timer updates every second
}


function handleOptionClick(event) {
    const selectedOption = event.target;
    const questionIndex = selectedOption.dataset.questionIndex;
    const selectedAnswer = selectedOption.innerText;
    const correctAnswer = questions[questionIndex].correct;

    // Save selected answer
    selectedAnswers[questionIndex] = selectedAnswer;

    // Remove previous styles and apply new styles
    const options = document.querySelectorAll(`.option[data-question-index="${questionIndex}"]`);
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });

    // Apply styles based on correctness
    if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add('correct');
        score++; // Increment score if the answer is correct
    } else {
        selectedOption.classList.add('incorrect');
        
        // Highlight the correct answer in green
        options.forEach(option => {
            if (option.innerText === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }
    selectedOption.classList.add('selected');
}

function handleNextClick() {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
        alert('Please select an option before proceeding.');
        return; // Stop and prevent going to the next question
    }

    // Move to the next question or show the result
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
        startTimer();
    } else {
        showResult();
    }
}

function showQuestion(index) {
    const question = questions[index];
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = `
        <p>${question.question}</p>
        ${question.answers.map(answer => `<div class="option" data-question-index="${index}" onclick="handleOptionClick(event)">${answer}</div>`).join('')}
    `;
}

function showResult() {
    clearInterval(timer); 
    // Hide the quiz section and display the result
    document.getElementById('quiz').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    // Display the result message
    const resultMessage = document.getElementById('result-message');
    if (score === questions.length) {
        resultMessage.innerText = "Congratulations! You got all answers correct.";
    } else {
        resultMessage.innerText = `Thank you for participating! You got ${score} out of ${questions.length} questions right.`;
    }
}



function submitForm(event) {
    event.preventDefault(); // Prevent form submission if validation fails

    const feedback = document.getElementById('feedback').value.trim();
    const rating = document.getElementById('rating').value.trim();

    // Validate feedback and rating fields
    if (!feedback || !rating) {
        alert('Both feedback and rating should be filled.');
        return; // Stop further execution if validation fails
    }

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value.trim());
    formData.append('contact', document.getElementById('contact').value.trim());
    formData.append('marks', score || 0); // Use the score from the quiz
    formData.append('feedback', feedback);
    formData.append('rating', rating);

    // Send form data to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbxEbgc9ibOy4Vs3AVxufe1Y5i_UR--dTbYhItxOs8F7yV9NVstxM7z8241Mwx1JUqwb3g/exec', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(result => {
            alert("Data submitted successfully!");
            resetForm();
        })
        .catch(error => console.error('Error!', error.message));
}

function resetQuiz(event) {
    event.preventDefault(); // Prevent default behavior
    window.location.reload(); // Reload the page to reset everything
}


function resetForm() {
    // Reset the form fields after submission
    document.getElementById('name').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('feedback').value = '';
    document.getElementById('rating').value = '';
    window.location.reload(); // Reload the page to restart the quiz
    
}
