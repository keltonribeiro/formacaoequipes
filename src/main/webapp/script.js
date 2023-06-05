// Array de perguntas para cada tópico
const topics = ['Garra', 'Resiliência', 'Intensidade', 'Tenacidade'];
const questionsPerTopic = 5;

// Definição das perguntas para cada tópico
const questions = [
    // Perguntas para o tópico "Garra"
    [
        "Estou disposto(a) a sacrificar o conforto pessoal em prol do sucesso da equipe/organização.",
        "Eu mantenho a determinação e o foco mesmo quando os resultados não são imediatos.",
        "Quando encontro uma dificuldade, persisto até alcançar o resultado desejado.",
        "Preciso de um ambiente motivador para me manter motivado.",
        "Encaro a adversidade como uma chance de aprender e me tornar mais forte."
    ],
    // Perguntas para o tópico "Resiliencia"
    [
        "Sou capaz de lidar com altos níveis de pressão e estresse sem perder o controle.",
        "Após uma adversidade, consigo me recuperar e seguir em frente com determinação.",
        "Encaro as críticas como uma oportunidade de melhorar, em vez de me desmotivar.",
        "Tenho dificuldade de me adaptar rapidamente a mudanças inesperadas.",
        "Tenho dificuldade de lídar com minhas emoções e pensamentos quando sou contrariado em uma ideia."
    ],
    // Perguntas para o tópico "Intensidade"
    [
        "Tenho um senso de urgência constante e priorizo ações imediatas.",
        "Transmito energia e motivação para minha equipe, inspirando-os a alcançar grandes resultados.",
        "Sou conhecido(a) por ir além das expectativas e superar as barreiras.",
        "Quando tenho ideias e estratégias que acredito que vão gerar resultado, tenho dificuldade de coloca-las em prática de forma imediata.",
        "Obstáculos pouco me desanimam, rapidamente penso em soluções para supera-los e as coloco em prática."
    ],
    // Perguntas para o tópico "Tenacidade"
    [
        "Sou capaz de manter o foco e a persistência em longo prazo, mesmo diante de desafios significativos.",
        "Não permito que o medo do fracasso me impeça de buscar grandes conquistas.",
        "Luto constantemente contra a vontade de desistir.",
        "Quando encontro um problema, insisto até encontrar uma solução.",
        "Tenho facilidade de peceber meus erros e aprender com eles."
    ]
];

// Definição das opções de resposta e suas pontuações
const options = [
    { text: 'Sou exatamente assim', score: 5 },
    { text: 'Isso se parece comigo', score: 4 },
    { text: 'Às vezes sou assim', score: 3 },
    { text: 'Depende do momento', score: 2 },
    { text: 'Tem pouco a ver comigo', score: 1 },
    { text: 'Nada a ver comigo', score: 0 }
];

// Variáveis de controle do questionário
let currentTopicIndex = 0;
let currentQuestionIndex = 0;
let totalScore = 0;
let topicScores = {};

// Elementos do DOM
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

// Função para gerar uma pergunta com suas opções de resposta
function generateQuestion() {
    const currentTopic = topics[currentTopicIndex];
    const currentQuestionNumber = currentQuestionIndex + 1;

    questionElement.textContent = `${currentTopic} - Pergunta ${currentQuestionNumber}: ${
        questions[currentTopicIndex][currentQuestionIndex]
    }`;

    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => {
            handleAnswer(option.score);
        });

        optionsContainer.appendChild(button);
    });
}

// Função para tratar a resposta do usuário
function handleAnswer(score) {
    totalScore += score;
    const currentTopic = topics[currentTopicIndex];
    topicScores[currentTopic] = (topicScores[currentTopic] || 0) + score;
    showNextQuestion();
}

// Função para exibir a próxima pergunta ou o resultado final
function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsPerTopic) {
        generateQuestion();
    } else {
        currentTopicIndex++;
        currentQuestionIndex = 0;

        if (currentTopicIndex < topics.length) {
            generateQuestion();
        } else {
            showResult();
        }
    }
}

// Função para exibir o resultado final
function showResult() {
    questionElement.style.display = 'none';
    optionsContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let resultHTML = '';
    let totalHTML = '';

    let maxTopicScore = 0;
    let maxTopics = [];

    Object.entries(topicScores).forEach(([topic, score]) => {
        resultHTML += `<p>${topic}: ${score}</p>`;
        if (score > maxTopicScore) {
            maxTopicScore = score;
            maxTopics = [topic];
        } else if (score === maxTopicScore) {
            maxTopics.push(topic);
        }
    });

    totalHTML = `<p>Total de Pontos: ${totalScore}</p>`;

    if (maxTopics.length === 1) {
        resultHTML += `<p class="highlighted-topic">VOCÊ É FORTE EM <span>${maxTopics[0].toUpperCase()}</span></p>`;
    } else {
        const topicsString = maxTopics.map(topic => topic.toUpperCase()).join(' e ');
        resultHTML += `<p class="highlighted-topic">VOCÊ É FORTE EM: <span>${topicsString}</span></p>`;
    }

    scoreElement.innerHTML = resultHTML + totalHTML;
}



// Inicia o questionário
function startQuiz() {
    generateQuestion();
}

// Chamada para iniciar o questionário ao carregar a página
startQuiz();


