// Tela de Boas-vindas
document.getElementById('jogar').addEventListener('click', function() {
    const nomeUsuario = document.getElementById('nome').value.trim();
    if (nomeUsuario !== '') {
        localStorage.setItem('nomeUsuario', nomeUsuario);
        document.getElementById('nomeUsuario').textContent = nomeUsuario;
        document.getElementById('telaBemvindo').style.display = 'none';
        document.getElementById('telaJogo').style.display = 'block';
    } else {
        alert('Por favor, insira seu nome para jogar!');
    }
});

// Tela de Jogo
if (localStorage.getItem('nomeUsuario')) {
    const numeroCorreto = Math.floor(Math.random() * 100) + 1;
    let tentativas = 0;

    document.getElementById('palpiteForm').addEventListener('submit', function(event) {
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
        }
    });
}

// Função para salvar pontuação
function salvarPontuacao(nome, pontos) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push({ nome, pontos });
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

// Função para mostrar ranking
function mostrarRanking() {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => a.pontos - b.pontos);

    const tabelaRanking = document.getElementById('tabelaRanking');
    tabelaRanking.innerHTML = '';

    ranking.forEach(jogador => {
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

// Tela de Resultado
document.getElementById('jogarNovamente').addEventListener('click', function() {
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('pontos');
    localStorage.removeItem('numeroCorreto');
    document.getElementById('telaResultado').style.display = 'none';
    document.getElementById('telaBemvindo').style.display = 'block';
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
