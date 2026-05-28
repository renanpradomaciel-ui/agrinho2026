// Lógica do Contador de Impacto (Simulação Estatística)
let water = 0;
let co2 = 0;

function updateCounters() {
    // Incrementos simbólicos baseados em médias reais por hectare/segundo
    water += 120; 
    co2 += 0.5;
    
    document.getElementById('water-saved').innerText = Math.floor(water).toLocaleString('pt-BR');
    document.getElementById('co2-saved').innerText = co2.toFixed(1).replace('.', ',');
}

setInterval(updateCounters, 2000);

// Navegação entre páginas (SPA Simples)
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// O Game da Sustentabilidade
function playGame(choice) {
    const resultDiv = document.getElementById('game-result');
    const feedback = document.getElementById('game-feedback');
    const sSoil = document.getElementById('stat-soil');
    const sProfit = document.getElementById('stat-profit');
    const sBio = document.getElementById('stat-bio');

    resultDiv.classList.remove('hidden');

    if (choice === 'quimico') {
        sSoil.innerText = "📉 Baixa";
        sSoil.style.color = "#d62828";
        sProfit.innerText = "💰 Alto (Curto Prazo)";
        sProfit.style.color = "#bc6c25";
        sBio.innerText = "🚫 Crítica";
        sBio.style.color = "#d62828";
        feedback.innerText = "O uso excessivo eliminou as pragas, mas o solo ficou pobre e as abelhas sumiram. O lucro cairá no próximo ano.";
    } else {
        sSoil.innerText = "📈 Alta";
        sSoil.style.color = "#2b9348";
        sProfit.innerText = "💎 Constante";
        sProfit.style.color = "#0077b6";
        sBio.innerText = "🐝 Rica";
        sBio.style.color = "#2b9348";
        feedback.innerText = "Incrível! A tecnologia de precisão aplicou apenas o necessário. Você preservou os inimigos naturais e valorizou sua terra.";
    }
}
