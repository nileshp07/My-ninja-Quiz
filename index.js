//Making reference of the correct answers
const correctAnswers = ['A', 'A', 'A', 'B', 'B', 'A', 'B'];

const container = document.querySelector('.quiz .container');

const form = document.querySelector('.quiz-form');

const questions = document.querySelectorAll('.question');

const userCorrectAnswers = [];

const userIncorrectAnswers = [];

const result = document.querySelector('.result');

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;

    //Storing the user entered answers in another array
    let userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value];

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            userCorrectAnswers.push(questions[index]);
        } else {
            userIncorrectAnswers.push(questions[index]);
        }
    })
    score += Math.round((userCorrectAnswers.length * 100) / 7);

    let resultScore = result.querySelector('span');

    //Show result on webpage
    scrollTo(0, 0);
    result.classList.remove('d-none');

    document.querySelector('.quiz').classList.replace('bg-primary', 'bg-secondary');

    //Changing the text of h2
    let heading1 = document.querySelector('.heading');
    heading1.textContent = 'Your correct Answers...';

    //Removing all the content from the form which has a class of '.quiz-form'
    form.innerHTML = '';

    //Creating a div to store the elements which are in the userCorrectAnswers array
    let cQ = document.createElement('div');
    cQ.classList.add('question', 'my-3', 'p-3');
    container.appendChild(cQ);

    //Setting the innerHTML of the form to the content of the userCorrectAnswers array
    cQ.innerHTML = userCorrectAnswers.map(e => e.innerHTML).join("");

    //Creating the element 'h2' to add another heading
    let heading2 = document.createElement('h2');
    heading2.classList.add('heading', 'text-white');
    heading2.textContent = 'Your Incorrect Answers...';
    container.appendChild(heading2);

    //If all answers are correct then
    if (userIncorrectAnswers.length === 0) {
        heading1.textContent = 'Great Job!';
        cQ.innerHTML = '';
        container.removeChild(heading2);
    }

    //Creating a div to store the elements which are in the userIncorrectAnswers array
    let iCQ = document.createElement('div');
    iCQ.classList.add('question', 'my-3', 'p-3');
    container.appendChild(iCQ);

    //Setting the innerHTML of the iCQ to the content of the userIncorrectAnswers array
    iCQ.innerHTML = userIncorrectAnswers.map(e => e.innerHTML).join("");

    //Animating the score on webpage
    let output = 0;
    const timer = setInterval(() => {
        resultScore.textContent = output + '%';
        if (output === score) {
            clearInterval(timer);
        } else {
            output++;
        }
    }, 15);

})