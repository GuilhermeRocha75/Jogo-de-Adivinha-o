// Variável global para armazenar o número correto
let numeroCorreto;
let tentativas;

// Tela de Boas-vindas
document.getElementById('jogar').addEventListener('click', function() {
    const nomeUsuario = document.getElementById('nome').value.trim();
    if (nomeUsuario !== '') {
        if (nomeUsuario === 'xicara22') {
            document.getElementById('resultadoNome').textContent = nomeUsuario;
            document.getElementById('pontos').textContent = 'Você usou um cheat!';
            document.getElementById('numeroCorreto').textContent = 'Confidencial';
            document.getElementById('mensagemPosicao').textContent = 'Cheat ativado, seu nome não será adicionado ao ranking.';
            document.getElementById('telaBemvindo').style.display = 'none';
            document.getElementById('telaResultado').style.display = 'block';
        } else {
            localStorage.setItem('nomeUsuario', nomeUsuario);
            document.getElementById('nomeUsuario').textContent = nomeUsuario;
            document.getElementById('telaBemvindo').style.display = 'none';
            document.getElementById('telaJogo').style.display = 'block';
            document.getElementById('palpite').focus();
            iniciarJogo();
        }
    } else {
        alert('Por favor, insira seu nome para jogar!');
    }
});

function iniciarJogo() {
    numeroCorreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    document.getElementById('feedback').textContent = ''; // Limpar feedback
    document.getElementById('palpite').value = ''; // Limpar campo de palpite
}

// Função para processar o palpite
function processarPalpite(event) {
    event.preventDefault();
    const palpite = parseInt(document.getElementById('palpite').value);
    const feedback = document.getElementById('feedback');

    // Verifica se o número inserido é válido
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        feedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
    } else {
        tentativas++;

        // Verifica o palpite
        if (palpite === numeroCorreto) {
            localStorage.setItem('pontos', tentativas);
            localStorage.setItem('numeroCorreto', numeroCorreto);
            salvarPontuacao(localStorage.getItem('nomeUsuario'), tentativas);
            mostrarRanking();
            mostrarPosicao(localStorage.getItem('nomeUsuario'), tentativas);
            document.getElementById('telaJogo').style.display = 'none';
            document.getElementById('telaResultado').style.display = 'block';
            document.getElementById('resultadoNome').textContent = localStorage.getItem('nomeUsuario');
            document.getElementById('pontos').textContent = tentativas;
            document.getElementById('numeroCorreto').textContent = numeroCorreto;
        } else if (palpite < numeroCorreto) {
            feedback.textContent = 'Tente um número maior.';
        } else {
            feedback.textContent = 'Tente um número menor.';
        }

         // Limpar o input após o palpite
         document.getElementById('palpite').value = '';
    }
}

// Adiciona o ouvinte de evento de envio ao formulário de palpite
document.getElementById('palpiteForm').addEventListener('submit', processarPalpite);

// Função para salvar pontuação
function salvarPontuacao(nome, pontos) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push({ nome: nome, pontos: pontos });
    ranking.sort((a, b) => a.pontos - b.pontos);  // Ordena por pontos em ordem crescente
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

// Função para mostrar o ranking
function mostrarRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const tabelaRanking = document.getElementById('tabelaRanking');
    tabelaRanking.innerHTML = '';

    ranking.forEach((jogador, index) => {
        const row = document.createElement('tr');
        const nomeCell = document.createElement('td');
        const pontosCell = document.createElement('td');
        nomeCell.textContent = jogador.nome;
        pontosCell.textContent = jogador.pontos;
        row.appendChild(nomeCell);
        row.appendChild(pontosCell);
        tabelaRanking.appendChild(row);
    });
}

// Função para mostrar a posição do jogador no ranking
function mostrarPosicao(nome, pontos) {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    let posicao = ranking.findIndex(jogador => jogador.nome === nome && jogador.pontos === pontos) + 1;

    const mensagemPosicao = document.getElementById('mensagemPosicao');
    mensagemPosicao.innerHTML = `<span class="nomeJogador">${nome}</span>, você está na posição <span class="posicaoRanking">${posicao}°</span> do ranking de jogadores.`;
}

// Tela de Resultado
document.getElementById('jogarNovamente').addEventListener('click', function() {
    localStorage.removeItem('pontos'); // Remover a pontuação do armazenamento local
    localStorage.removeItem('numeroCorreto');
    document.getElementById('nome').value = ''; // Limpar o campo de entrada de nome
    document.getElementById('feedback').textContent = ''; // Limpar o feedback
    document.getElementById('palpite').value = ''; // Limpar o campo de palpite
    document.getElementById('telaResultado').style.display = 'none';
    document.getElementById('telaBemvindo').style.display = 'block';
    // Limpa o input de palpite ao jogar novamente
    document.getElementById('palpite').value = '';

    iniciarJogo();
});

// Controle da música
const audioFundo = document.getElementById('audioFundo');
const toggleMusicaButton = document.getElementById('toggleMusica');

toggleMusicaButton.addEventListener('click', function() {
    if (audioFundo.paused) {
        audioFundo.play();
        toggleMusicaButton.textContent = '🔊 Desativar Música';
    } else {
        audioFundo.pause();
        toggleMusicaButton.textContent = '🔈 Ativar Música';
    }
});

// Método para mostrar o formulário de feedback
function mostrarFormularioFeedback() {
    document.getElementById('telaResultado').style.display = 'none';
    document.getElementById('feedbackForm').style.display = 'block';
}

// Função para enviar o feedback
document.getElementById('feedbackFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Exibe a tela de feedback enviado e oculta o formulário
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('feedbackEnviado').style.display = 'block';
});

// Tela de Agradecimento pelo Feedback
document.getElementById('jogarNovamenteFeedback').addEventListener('click', function() {
    localStorage.removeItem('pontos'); // Remover a pontuação do armazenamento local
    localStorage.removeItem('numeroCorreto');
    document.getElementById('feedbackEnviado').style.display = 'none';
    document.getElementById('telaBemvindo').style.display = 'block';
    document.getElementById('nome').value = ''; // Limpar o campo de entrada de nome
    document.getElementById('feedback').textContent = ''; // Limpar o feedback
    document.getElementById('palpite').value = ''; // Limpar o campo de palpite
    document.getElementById('telaResultado').style.display = 'none';
    document.getElementById('telaBemvindo').style.display = 'block';
    iniciarJogo();
});
