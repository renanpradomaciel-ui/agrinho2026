// CONTADOR DINÂMICO DE IMPACTO
let agua = 0;
let co2 = 0;
setInterval(() => {
    agua += 15;
    co2 += 0.2;
    document.getElementById('h2o-val').innerText = Math.floor(agua).toLocaleString();
    document.getElementById('co2-val').innerText = co2.toFixed(1);
}, 2000);

// NAVEGAÇÃO ENTRE PÁGINAS
function nav(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// SISTEMA DE MISSÕES (RESPOSTAS)
function answer(type, missionId) {
    const res = document.getElementById(`res-${missionId}`);
    res.classList.remove('hidden');
    
    if(type === 'ok') {
        res.style.borderColor = "#2ecc71";
        res.innerHTML = "<strong>✅ SUCESSO:</strong> Tecnologia aplicada com precisão. O ecossistema está equilibrado e a produção cresceu 15%.";
    } else {
        res.style.borderColor = "#e67e22";
        res.innerHTML = "<strong>⚠️ ALERTA:</strong> Decisão de alto impacto ambiental. O lucro imediato mascarou a degradação do solo a longo prazo.";
    }
}

// INTELIGÊNCIA ARTIFICIAL SIMULADA (BRAIN)
function toggleAI() {
    document.getElementById('ai-window').classList.toggle('hidden');
}

function askAI() {
    const input = document.getElementById('ai-input');
    const msgArea = document.getElementById('ai-msg');
    const question = input.value.toLowerCase();
    
    if(!question) return;

    // Adiciona msg do usuário
    msgArea.innerHTML += `<div class="user-msg">${input.value}</div>`;
    input.value = "";

    // Lógica de resposta
    let response = "Interessante... Como uma IA, analisei que essa técnica impacta diretamente o ODS 12 e 13. O futuro sustentável depende de dados assim!";
    
    if(question.includes("drone")) response = "Drones de precisão economizam até 80% de defensivos químicos ao aplicar apenas onde a praga está.";
    if(question.includes("carbono")) response = "O plantio direto sequestra carbono no solo, impedindo que ele vá para a atmosfera aquecer o planeta.";
    if(question.includes("agrinho")) response = "O Concurso Agrinho 2026 é a
