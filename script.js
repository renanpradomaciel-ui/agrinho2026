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
        alternativas:
