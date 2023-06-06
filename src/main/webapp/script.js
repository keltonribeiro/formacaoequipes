// Array de perguntas para cada tópico
const topics = ['Garra', 'Resiliência', 'Intensidade', 'Tenacidade'];
const questionsPerTopic = 5;

// Definição das perguntas para cada tópico
const questions = [
    // Perguntas para o tópico "Garra"
    [
        { text: "Estou disposto(a) a sacrificar o conforto pessoal em prol do sucesso da equipe/organização.", category: "positive" },
        { text: "Eu mantenho a determinação e o foco mesmo quando os resultados não são imediatos.", category: "positive" },
        { text: "Quando encontro uma dificuldade, persisto até alcançar o resultado desejado.", category: "positive" },
        { text: "Preciso de um ambiente motivador para me manter motivado.", category: "positive" },
        { text: "Encaro a adversidade como uma chance de aprender e me tornar mais forte.", category: "positive" }
    ],
    // Perguntas para o tópico "Resiliência"
    [
        { text: "Sou capaz de lidar com altos níveis de pressão e estresse sem perder o controle.", category: "positive" },
        { text: "Após uma adversidade, consigo me recuperar e seguir em frente com determinação.", category: "positive" },
        { text: "Encaro as críticas como uma oportunidade de melhorar, em vez de me desmotivar.", category: "positive" },
        { text: "Tenho dificuldade de me adaptar rapidamente a mudanças inesperadas.", category: "negative" },
        { text: "Tenho dificuldade de lidar com minhas emoções e pensamentos quando sou contrariado em uma ideia.", category: "negative" }
    ],
    // Perguntas para o tópico "Intensidade"
    [
        { text: "Tenho um senso de urgência constante e priorizo ações imediatas.", category: "positive" },
        { text: "Transmito energia e motivação para minha equipe, inspirando-os a alcançar grandes resultados.", category: "positive" },
        { text: "Sou conhecido(a) por ir além das expectativas e superar as barreiras.", category: "positive" },
        { text: "Quando tenho ideias e estratégias que acredito que vão gerar resultados, tenho dificuldade de colocá-las em prática de forma imediata.", category: "negative" },
        { text: "Obstáculos pouco me desanimam. Rapidamente penso em soluções para superá-los e as coloco em prática.", category: "positive" }
    ],
    // Perguntas para o tópico "Tenacidade"
    [
        { text: "Sou capaz de manter o foco e a persistência em longo prazo, mesmo diante de desafios significativos.", category: "positive" },
        { text: "Não permito que o medo do fracasso me impeça de buscar grandes conquistas.", category: "positive" },
        { text: "Luto constantemente contra a vontade de desistir.", category: "positive" },
        { text: "Quando encontro um problema, insisto até encontrar uma solução.", category: "positive" },
        { text: "Tenho facilidade de perceber meus erros e aprender com eles.", category: "positive" }
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
const titleMain = document.getElementById('title-main');

// Função para gerar uma pergunta com suas opções de resposta
function generateQuestion() {
    const currentTopic = topics[currentTopicIndex];
    const currentQuestionNumber = currentQuestionIndex + 1;

    questionElement.textContent = `${
        questions[currentTopicIndex][currentQuestionIndex].text
    }`;

    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => {
            handleAnswer(option.score, questions[currentTopicIndex][currentQuestionIndex].category);
        });

        optionsContainer.appendChild(button);
    });
}

// Função para tratar a resposta do usuário
function handleAnswer(score, category) {
    if (category === "positive") {
        totalScore += score;
    } else {
        totalScore -= score;
    }

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
    titleMain.style.display = 'none';

    let resultHTML = '';
    let totalHTML = '';

    let maxTopicScore = 0;
    let maxTopics = [];

    Object.entries(topicScores).forEach(([topic, score]) => {
        resultHTML += `<p>${topic}: ${score} de 25 pontos</p>`;
        if (score > maxTopicScore) {
            maxTopicScore = score;
            maxTopics = [topic];
        } else if (score === maxTopicScore) {
            maxTopics.push(topic);
        }
    });

    totalHTML = `<p>Voce tem ${totalScore} % de GRIT </p>`;

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

