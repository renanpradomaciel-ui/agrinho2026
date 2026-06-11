
// Telemetria Estatística Contínua
let águaPoupada = 0;
let co2Removido = 0;
setInterval(() => {
    águaPoupada += 24;
    co2Removido += 0.15;
    document.getElementById('h2o-val').innerText = Math.floor(águaPoupada).toLocaleString('pt-BR');
    document.getElementById('co2-val').innerText = co2Removido.toFixed(2);
}, 1000);

// Troca de Páginas (Navegação SPA)
function nav(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// BANCO DE DADOS: 4 QUESTÕES SEQUENCIAIS DO SIMULADOR
const perguntas = [
    {
        titulo: "Talhão Alfa: Infestação Detectada",
        imagem: "https://images.unsplash.com/photo-1563514227147-6d2ff66526a0?auto=format&fit=crop&w=800&q=80",
        texto: "Sensores acusam presença severa de pragas na cultura do milho. Qual tática de manejo integrado de pragas aplicar?",
        opcoes: [
            { txt: "Defensivo químico genérico em área total para eliminação rápida.", status: "impacto" },
            { txt: "Aplicação localizada via drone de precisão combinado com agentes biológicos.", status: "sucesso" }
        ],
        feedback: {
            sucesso: "🎯 **Decisão Correta!** Os inimigos naturais eliminaram a ameaça sem desbalancear a biodiversidade local e protegendo a integridade química do solo.",
            impacto: "⚠️ **Risco de Manejo!** O veneno erradicou as lagartas, mas exterminou abelhas nativas e enfraqueceu os polinizadores essenciais da fazenda."
        }
    },
    {
        titulo: "Talhão Beta: Proteção Física do Solo",
        imagem: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
        texto: "A colheita de soja foi finalizada e a terra está vulnerável à exposição climática direta. Como evitar perdas de carbono?",
        opcoes: [
            { txt: "Mecanizar o solo arando as fileiras para oxigenar as camadas inferiores.", status: "impacto" },
            { txt: "Implementar o Plantio Direto sobre os restos vegetais da palhada protetora.", status: "sucesso" }
        ],
        feedback: {
            sucesso: "🎯 **Decisão Correta!** A palha funcionou como um escudo protetor contra chuva e calor, mantendo os nutrientes na terra e estocando toneladas de CO₂.",
            impacto: "⚠️ **Risco de Manejo!** Arar o solo quebrou a estrutura biológica interna e expôs a matéria orgânica, liberando gases estufa e gerando erosão precoce."
        }
    },
    {
        titulo: "Setor Gama: Recarga Hídrica",
        imagem: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        texto: "A telemetria do córrego principal indica redução crítica na infiltração de água. Qual intervenção mecânico-ecológica escolher?",
        opcoes: [
            { txt: "Isolar a Área de Preservação Permanente (APP) e recompor a mata ciliar com vegetação nativa.", status: "sucesso" },
            { txt: "Aprofundar o leito do rio artificialmente para aumentar o espaço de escoamento rápido.", status: "impacto" }
        ],
        feedback: {
            sucesso: "🎯 **Decisão Correta!** As raízes da mata ciliar funcionam como esponjas naturais, limpando sedimentos e reabastecendo o lençol freático da bacia.",
            impacto: "⚠️ **Risco de Manejo!** Modificar a calha mecânica aumentou a velocidade da água, desmoronando as margens e agravando o assoreamento do ecossistema hídrico."
        }
    },
    {
        titulo: "Pós-Produção: Transparência Verde",
        imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        texto: "Os grãos estão ensacados e prontos para o mercado consumidor. Como comprovar o seu equilíbrio produtivo?",
        opcoes: [
            { txt: "Adotar selos de rastreabilidade via QR Code, detalhando o histórico tecnológico e ambiental da safra.", status: "sucesso" },
            { txt: "Focar na redução de preço final sem investir em sistemas informacionais de origem.", status: "impacto" }
        ],
        feedback: {
            sucesso: "🎯 **Simulador Concluído!** O consumidor moderno valida e paga mais por marcas rastreáveis. Você garantiu mercado externo e valorizou o produtor consciente.",
            impacto: "⚠️ **Simulador Concluído!** Competir apenas por preço sem demonstrar responsabilidade socioambiental reduz o valor da fazenda no mercado tecnológico moderno."
        }
    }
];

let indexQuestao = 0;

function loadQuestion() {
    const q = perguntas[indexQuestao];
    document.getElementById('current-q').innerText = indexQuestao + 1;
    document.getElementById('question-title').innerText = q.titulo;
    document.getElementById('question-text').innerText = q.texto;
    document.getElementById('question-img').style.backgroundImage = `url('${q.imagem}')`;
    document.getElementById('sim-result').classList.add('hidden');
    
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    
    q.opcoes.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.txt;
        btn.onclick = () => checkAnswer(opt.status);
        container.appendChild(btn);
    });
}

function checkAnswer(status) {
    const q = perguntas[indexQuestao];
    const resultBox = document.getElementById('sim-result');
    const feedbackText = document.getElementById('result-feedback');
    const nextBtn = document.getElementById('next-btn');
    
    resultBox.classList.remove('hidden');
    
    if(status === 'sucesso') {
        resultBox.style.borderLeftColor = "#00ff66";
        feedbackText.innerHTML = q.feedback.sucesso;
    } else {
        resultBox.style.borderLeftColor = "#ff9f43";
        feedbackText.innerHTML = q.feedback.impacto;
    }
    
    if(indexQuestao === perguntas.length - 1) {
        nextBtn.innerText = "Reiniciar Análise Geral";
    } else {
        nextBtn.innerText = "Próxima Análise →";
    }
}

function nextQuestion() {
    if(indexQuestao === perguntas.length - 1) {
        indexQuestao = 0;
    } else {
        indexQuestao++;
    }
    loadQuestion();
}

// Inicializa a primeira questão do simulador
loadQuestion();

// BANCO DE DADOS DA AGRO-IA (PÁGINA DEDICADA)
const respostasIA = {
    "o que é agricultura de precisão?": "A Agricultura de Precisão usa dispositivos conectados (sensores IoT, satélites, telemetria) para mensurar a variabilidade do solo. Assim, em vez de adubar o campo todo de forma igual, o produtor entrega quilos ou litros cirúrgicos apenas onde a planta acusa necessidade, gerando economia drástica.",
    "como o plantio direto ajuda o planeta?": "Ele evita a aração mecânica. Mantendo os resíduos da colheita anterior (palhada), o solo retém mais água, bloqueia a radiação térmica e preserva as colônias de fungos e bactérias benéficas que capturam o Carbono gasoso da atmosfera, mitigando o efeito estufa.",
    "qual o tema do agrinho 2026?": "O tema oficial é 'Agro Forte, Futuro Sustentável: Equilíbrio entre produção e meio ambiente'. O foco reside em provar como a tecnologia avançada viabiliza recordes de produtividade enquanto repara e protege nossos biomas.",
    "como os drones ajudam a economizar defensivos?": "Através de câmeras multiespectrais, os drones sobrevoam a plantação e criam mapas de calor indicando focos exatos de pragas. A pulverização passa a ser pontual (apenas nas plantas doentes), economizando até 80% do uso de insumos químicos comparado ao método tradicional.",
    "padrão": "Essa técnica se alinha diretamente aos pilares de inovação do projeto Ciclo Vivo. Unir dados exatos de satélite à biotecnologia é o método mais seguro para atingir a segurança alimentar sem expandir o uso de novas áreas de vegetação nativa."
};

function sendQuery() {
    const input = document.getElementById('user-query');
    const scroller = document.getElementById('chat-scroller');
    const queryText = input.value.trim();
    
    if(!queryText) return;

    // Mensagem Usuário
    const userDiv = document.createElement('div');
    userDiv.className = "message user-msg";
    userDiv.innerText = queryText;
    scroller.appendChild(userDiv);
    input.value = "";

    // Resposta Baseada em Palavras-chave
    let matchedResponse = respostasIA["padrão"];
    const queryLower = queryText.toLowerCase();

    for(let key in respostasIA) {
        if(queryLower.includes(key)) {
            matchedResponse = respostasIA[key];
            break;
        }
    }

    // Delay para simular processamento biônico
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = "message bot-msg";
        botDiv.innerText = matchedResponse;
        scroller.appendChild(botDiv);
        scroller.scrollTop = scroller.scrollHeight;
    }, 400);
}
