// Contador em Tempo Real do Topo
let litrosAgua = 0;
let kgCO2 = 0;

function rodaTelemetriaEstatistica() {
    litrosAgua += 85; 
    kgCO2 += 0.3;
    
    const elAgua = document.getElementById('water-saved');
    const elCO2 = document.getElementById('co2-saved');
    
    if(elAgua && elCO2) {
        elAgua.innerText = Math.floor(litrosAgua).toLocaleString('pt-BR');
        elCO2.innerText = kgCO2.toFixed(1).replace('.', ',');
    }
}
setInterval(rodaTelemetriaEstatistica, 1500);

// Navegação entre as telas (SPA)
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(pag => pag.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// BANCO DE DADOS: Perguntas e Imagens específicas por Talhão
const bancoQuestoes = {
    1: {
        titulo: "🛰️ Página do Talhão 01: Monitoramento de Pragas",
        imagem: "https://images.unsplash.com/photo-1563514227147-6d2ff66526a0?auto=format&fit=crop&w=800&q=80", // Foto de drone analisando plantação
        descricao: "Nossos sensores térmicos captaram focos iniciais de Lagarta-do-Cartucho no meio da lavoura de milho. Qual comando você envia?",
        alternativas: [
            { texto: "Aplicar pulverização com inseticida químico de largo espectro em toda a área.", tipo: "errado" },
            { texto: "Acionar drones de precisão para liberar biológicos (Trichogramma) apenas nos focos mapeados.", tipo: "certo" }
        ],
        relatorio: {
            solo: "📉 Desgastado", lucro: "⚠️ Reduzido (Custo químico elevado)", bio: "🚫 Crítica (Abelhas afetadas)", cor: "#d62828",
            texto: "O produto resolveu a praga de imediato, mas destruiu polinizadores essenciais e deixou resíduos químicos na terra, reduzindo a força natural do ecossistema."
        },
        relatorioSucesso: {
            solo: "📈 Preservado", lucro: "💎 Alto e Estável", bio: "🐝 Protegida", cor: "#2b9348",
            texto: "Excelente! O controle biológico agiu apenas no foco mapeado pelo satélite. A produção manteve o padrão máximo sem intoxicar o solo e a água."
        }
    },
    2: {
        titulo: "🌱 Página do Talhão 02: Gestão Orgânica do Solo",
        imagem: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=800&q=80", // Solo agrícola bem manejado
        descricao: "O mapeamento de umidade acusa que a terra está secando muito rápido no intervalo de safras. Qual manejo será adotado nesta página?",
        alternativas: [
            { texto: "Passar o arado mecânico pesado para revirar a terra e expor nutrientes profundos.", tipo: "errado" },
            { texto: "Utilizar o Sistema de Plantio Direto, mantendo a palhada da cultura anterior cobrindo o solo.", tipo: "certo" }
        ],
        relatorio: {
            solo: "🏜️ Compactado/Exposto", lucro: "📉 Prejuízo (Gasto extra com fertilizantes)", bio: "📉 Severamente reduzida", cor: "#d62828",
            texto: "Revirar a terra eliminou a umidade e causou forte erosão com as primeiras chuvas. A matéria orgânica foi levada embora, exigindo correções caras."
        },
        relatorioSucesso: {
            solo: "💎 Rico e Úmido", lucro: "📈 Economia de Insumos", bio: "🐛 Microfauna Ativa", cor: "#2b9348",
            texto: "Perfeito! A palha agiu como um escudo térmico natural. Reteve a água no solo, diminuiu o calor e armazenou toneladas de carbono na biomassa."
        }
    },
    3: {
        titulo: "💧 Página da APP: Preservação de Recursos Hídricos",
        imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", // Nascente/Floresta preservada
        descricao: "A telemetria fluvial indica um leve assoreamento no córrego que abastece a propriedade. Qual ação corretiva aplicar imediatamente?",
        alternativas: [
            { texto: "Cercar a Área de Preservação Permanente (APP) e fazer o plantio adensado de matas ciliares nativas.", tipo: "certo" },
            { texto: "Canalizar as margens com cascalho para impedir mecanicamente que a terra caia na água.", tipo: "errado" }
        ],
        relatorio: {
            solo: "🍂 Instável", lucro: "🚨 Alto Risco Hídrico", bio: "📉 Afetada", cor: "#d62828",
            texto: "A barreira mecânica não segura o fluxo e desvia a força da água, causando erosões piores adiante e destruindo o ecossistema dos peixes."
        },
        relatorioSucesso: {
            solo: "🌳 Raízes Firmes", lucro: "💧 Segurança Hídrica Total", bio: "🦅 Biodiversidade Plena", cor: "#2b9348",
            texto: "Sensacional! As árvores nativas criaram uma rede de raízes que filtra os sedimentos e regenera as margens. Água limpa garantida para o futuro do agro!"
        }
    }
};

let questaoAtiva = null;

function goToQuestion(id) {
    questaoAtiva = bancoQuestoes[id];
    
    document.getElementById('q-image').src = questaoAtiva.imagem;
    document.getElementById('q-title').innerText = questaoAtiva.titulo;
    document.getElementById('q-desc').innerText = questaoAtiva.descricao;
    document.getElementById('q-result').classList.add('hidden');
    
    const containerAlternativas = document.getElementById('q-choices');
    containerAlternativas.innerHTML = "";
    
    questaoAtiva.alternativas.forEach(alt => {
        const btn = document.createElement('button');
        btn.innerText = alt.texto;
        btn.onclick = () => calculaResultadoQuestao(alt.tipo);
        containerAlternativas.appendChild(btn);
    });
    
    navigateTo('question-page');
}

function calculaResultadoQuestao(tipoResposta) {
    const boxResultado = document.getElementById('q-result');
    boxResultado.classList.remove('hidden');
    
    const dadosRelatorio = (tipoResposta === 'certo') ? questaoAtiva.relatorioSucesso : questaoAtiva.relatorio;
    
    const sSoil = document.getElementById('stat-soil');
    const sProfit = document.getElementById('stat-profit');
    const sBio = document.getElementById('stat-bio');
    
    sSoil.innerText = dadosRelatorio.solo;
    sProfit.innerText = dadosRelatorio.lucro;
    sBio.innerText = dadosRelatorio.bio;
    
    sSoil.style.color = dadosRelatorio.cor;
    sProfit.style.color = dadosRelatorio.cor;
    sBio.style.color = dadosRelatorio.cor;
    
    document.getElementById('q-feedback').innerHTML = `<strong>Análise do Satélite:</strong> ${dadosRelatorio.texto}`;
    boxResultado.scrollIntoView({ behavior: 'smooth' });
}

// LÓGICA DO CHATBOT (SISTEMA DE INTELIGÊNCIA ARTIFICIAL SIMULADA)
const respostasIA = {
    "o que é agricultura de precisão?": "A Agricultura de Precisão usa tecnologia de ponta (como GPS, drones e sensores) para analisar o campo detalhadamente. Em vez de tratar a fazenda inteira igual, o produtor aplica água ou insumos apenas no metro quadrado exato que a planta necessita. Isso gera uma economia brutal de recursos!",
    "como o plantio direto ajuda o planeta?": "O Plantio Direto não revolve a terra com arado. A semente é plantada direto sob os restos orgânicos da colheita anterior. Essa camada de palha evita que a água evapore, bloqueia a erosão e o mais espetacular: mantém o Carbono estocado no solo, impedindo que vire gás poluente na atmosfera!",
    "qual o tema do agrinho 2026?": "O tema oficial de 2026 é 'Agro Forte, Futuro Sustentável: Equilíbrio entre produção e meio ambiente'. O objetivo é desafiar estudantes a criarem soluções que provem que a tecnologia e a preservação andam de mãos dadas para alimentar o mundo.",
    "padrão": "Excelente pergunta! O uso de inteligência analítica e biotecnologia nos permite produzir mais alimentos por hectare sem a necessidade de expandir áreas verdes. Esse é o coração do projeto Ciclo Vivo!"
};

function askIA(perguntaTexto) {
    const chatBox = document.getElementById('chat-box');
    
    // 1. Mensagem do Usuário
    const userDiv = document.createElement('div');
    userDiv.className = "message user-message";
    userDiv.innerText = perguntaTexto;
    chatBox.appendChild(userDiv);
    
    // 2. Processamento da Resposta da IA
    const perguntaLimpa = perguntaTexto.toLowerCase().trim();
    let respostaTexto = respostasIA[perguntaLimpa] || respostasIA["padrão"];
    
    // Delay simulado para parecer processamento em tempo real
    setTimeout(() => {
        const iaDiv = document.createElement('div');
        iaDiv.className = "message ia-message";
        iaDiv.innerText = respostaTexto;
        chatBox.appendChild(iaDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
}

function sendUserMessage() {
    const inputEl = document.getElementById('user-input');
    const texto = inputEl.value;
    if(texto.trim() !== "") {
        askIA(texto);
        inputEl.value = "";
    }
}

