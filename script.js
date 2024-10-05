const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        answer: 2 // Índice da resposta correta
    },
    {
        question: "Qual é a moeda do Japão?",
        options: ["Yuan", "Dólar", "Iene", "Won"],
        answer: 2
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Marte", "Júpiter", "Saturno"],
        answer: 2
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Jorge Amado"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let username = '';

document.getElementById('start-quiz').addEventListener('click', function() {
    username = document.getElementById('username').value;
    if (username === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerText = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('next-button').style.display = 'none';
}

function selectOption(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.answer) {
        score++;
    }
    document.getElementById('next-button').style.display = 'block';
}

document.getElementById('next-button').addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').innerText = `Você acertou ${score} de ${questions.length} questões.`;
    saveScore();
}

function saveScore() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))  [];
    ranking.push({ username, score });
    ranking.sort((a, b) => b.score - a.score); // Ordena do maior para o menor
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

document.getElementById('restart-button').addEventListener('click', function() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('username').value = '';
});

document.getElementById('view-ranking').addEventListener('click', function() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('ranking-container').style.display = 'block';
    displayRanking();
});






function displayRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    const ranking = JSON.parse(localStorage.getItem('ranking'))  [];
    ranking.forEach(entry => {
        const li = document.createElement('li');
        li.innerText = `${entry.username}: ${entry.score}`;
        rankingList.appendChild(li);
    });
}

document.getElementById('back-to-quiz').addEventListener('click', function() {
    document.getElementById('ranking-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
});