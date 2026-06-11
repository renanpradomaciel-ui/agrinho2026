
// Lógica do Contador de Impacto (Simulação Estatística)
let water = 0;
let co2 = 0;

function updateCounters() {
    water += 120; 
    co2 += 0.5;
    
    if(document.getElementById('water-saved')) {
        document.getElementById('water-saved').innerText = Math.floor(water).toLocaleString('pt-BR');
        document.getElementById('co2-saved').innerText = co2.toFixed(1).replace('.', ',');
    }
}
setInterval(updateCounters, 2000);

// Navegação SPA
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// BANCO DE DADOS DAS MISSÕES (Perguntas do Simulador)
const misiones = {
    1: {
        titulo: "🛰️ Missão Talhão 01: Ataque de Lagartas na Lavoura",
        pergunta: "O monitoramento via drone detectou o início de uma infestação de lagartas. Qual sua estratégia?",
        opcoes: [
            { texto: "Aplicar pulverização química total preventiva", classe: "btn-terra", escolha: "errado" },
            { texto: "Liberar vespas inimigas naturais (Controle Biológico)", classe: "btn-tech", escolha: "certo" }
        ],
        feedbacks: {
            certo: {
                solo: "📈 Saudável", lucro: "💰 Alto e Sustentável", bio: "🐝 Preservada", cor: "#2b9348",
                texto: "Excelente! As vespas controlaram a praga cirurgicamente. Você economizou defensivos e manteve os polinizadores protegendo sua produtividade."
            },
            errado: {
                solo: "📉 Desgastado", lucro: "⚠️ Alto (mas com custo futuro)", bio: "🚫 Crítica", cor: "#d62828",
                texto: "O químico matou as lagartas, mas também eliminou insetos benéficos. O solo perdeu microrganismos vivos cruciais para a próxima safra."
            }
        }
    },
    2: {
        titulo: "🌱 Missão Talhão 02: Preparo do Solo para o Inverno",
        pergunta: "A colheita de verão acabou. Como você vai preparar a terra para a próxima estação protegendo o solo?",
        opcoes: [
            { texto: "Arar a terra profundamente deixando-a exposta", classe: "btn-terra", escolha: "errado" },
            { texto: "Fazer Plantio Direto sobre a palhada anterior", classe: "btn-verde", escolha: "certo" }
        ],
        feedbacks: {
            certo: {
                solo: "💎 Rico em Matéria Orgânica", lucro: "📈 Custo de insumos reduzido", bio: "🐛 Alta atividade biológica", cor: "#2b9348",
                texto: "Perfeito! A palha protegeu o solo da chuva, segurou a umidade e sequestrou carbono na terra, combatendo as mudanças climáticas."
            },
            errado: {
                solo: "🏜️ Vulnerável à Erosão", lucro: "📉 Prejuízo com fertilizantes", bio: "📉 Reduzida", cor: "#d62828",
                texto: "Deixar o solo exposto fez a chuva forte levar embora os nutrientes da camada mais rica. Você terá que gastar muito mais com adubo químico."
            }
        }
    },
    3: {
        titulo: "💧 Missão APP: Proteção da Nascente",
        pergunta: "A área de preservação permanente (APP) ao redor da nascente da fazenda está sofrendo com degradação. O que fazer?",
        opcoes: [
            { texto: "Cercar a área e plantar mudas de árvores nativas", classe: "btn-tech", escolha: "certo" },
            { texto: "Deixar o gado pastar perto para limpar o mato", classe: "btn-terra", escolha: "errado" }
        ],
        feedbacks: {
            certo: {
                solo: "🌳 Protegido", lucro: "💧 Segurança Hídrica garantida", bio: "🦅 Máxima", cor: "#2b9348",
                texto: "Incrível! As raízes das árvores nativas funcionam como filtros e seguram as margens, garantindo água limpa para toda a produção da fazenda."
            },
            errado: {
                solo: "🍂 Compactado", lucro: "🚨 Risco de falta d'água futuro", bio: "📉 Afetada", cor: "#d62828",
                texto: "O gado compactou a terra com os cascos e destruiu as margens da nascente. A água começou a secar e a assorear o córrego."
            }
        }
    }
};

let missaoAtual = null;

// Função chamada ao clicar no mapa
function startMission(id) {
    missaoAtual = misiones[id];
    
    // Mostrar container do game
    const container = document.getElementById('game-container');
    container.classList.remove('hidden');
    
    // Esconder resultados anteriores
    document.getElementById('game-result').classList.add('hidden');
    
    // Injetar Textos
    document.getElementById('game-title').innerText = missaoAtual.titulo;
    document.getElementById('game-question').innerText = missaoAtual.pergunta;
    
    // Gerar Botões de Opção
    const choicesDiv = document.getElementById('game-choices');
    choicesDiv.innerHTML = ""; // Limpa anteriores
    
    missaoAtual.opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.innerText = opacity = opcao.texto;
        btn.className = opcao.classe;
        btn.onclick = () => showMissionResult(opcao.escolha);
        choicesDiv.appendChild(btn);
    });
    
    // Rolar a tela até o simulador para facilitar no mobile
    container.scrollIntoView({ behavior: 'smooth' });
}

// Processa a resposta da missão selecionada
function showMissionResult(escolha) {
    const result = missaoAtual.feedbacks[escolha];
    const resultDiv = document.getElementById('game-result');
    
    resultDiv.classList.remove('hidden');
    
    const sSoil = document.getElementById('stat-soil');
    const sProfit = document.getElementById('stat-profit');
    const sBio = document.getElementById('stat-bio');
    
    sSoil.innerText = result.solo;
    sProfit.innerText = result.lucro;
    sBio.innerText = result.bio;
    
    sSoil.style.color = result.cor;
    sProfit.style.color = result.cor;
    sBio.style.color = result.cor;
    
    document.getElementById('game-feedback').innerHTML = `<strong>Resultado do Manejo:</strong> ${result.texto}`;
}
