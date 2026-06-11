
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

// BANCO DE DADOS: Cada ID corresponde a uma página/pergunta diferente
const bancoQuestoes = {
    1: {
        titulo: "🛰️ Página do Talhão 01: Monitoramento de Pragas",
        descricao: "Nossos sensores térmicos captaram focos iniciais de Lagarta-do-Cartucho no meio da lavoura de milho. Qual comando você envia?",
        alternativas: [
            { texto: "Aplicar pulverização com inseticida químico de largo espectro em toda a área.", tipo: "errado" },
            { texto: "Acionar drones de precisão para liberar biológicos (Trichogramma) apenas nos focos mapeados.", tipo: "certo" }
        ],
        relatorio: {
            solo: "📉 Desgastado", lucro: "⚠️ Alto (Custo químico elevado)", bio: "🚫 Crítica (Abelhas afetadas)", cor: "#d62828",
            texto: "O produto resolveu a praga de imediato, mas destruiu polinizadores essenciais e deixou resíduos químicos na terra, reduzindo a resiliência do ecossistema local."
        },
        relatorioSucesso: {
            solo: "📈 Preservado", lucro: "💎 Alto e Estável", bio: "🐝 Protegida", cor: "#2b9348",
            texto: "Excelente! O controle biológico agiu apenas no foco mapeado pelo satélite. A produção manteve o padrão máximo sem intoxicar o solo e a água."
        }
    },
    2: {
        titulo: "🌱 Página do Talhão 02: Gestão Orgânica do Solo",
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

// Aciona a mudança de tela para carregar a pergunta selecionada no mapa
function goToQuestion(id) {
    questaoAtiva = bancoQuestoes[id];
    
    // Altera os elementos visuais da tela de perguntas
    document.getElementById('q-title').innerText = questaoAtiva.titulo;
    document.getElementById('q-desc').innerText = questaoAtiva.descricao;
    
    // Oculta relatórios anteriores
    document.getElementById('q-result').classList.add('hidden');
    
    // Limpa e reconstrói as alternativas em formato de lista estruturada
    const containerAlternativas = document.getElementById('q-choices');
    containerAlternativas.innerHTML = "";
    
    questaoAtiva.alternativas.forEach(alt => {
        const btn = document.createElement('button');
        btn.innerText = alt.texto;
        btn.onclick = () => calculaResultadoQuestao(alt.tipo);
        containerAlternativas.appendChild(btn);
    });
    
    // Navega para a página de perguntas dedicada
    navigateTo('question-page');
}

// Processa a alternativa escolhida e exibe o relatório na tela
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
    
    // Auto-scroll suave para o relatório gerado
    boxResultado.scrollIntoView({ behavior: 'smooth' });
}
