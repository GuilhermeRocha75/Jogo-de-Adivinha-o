// Tela bem vindo
document.getElementById('jogar').addEventListener('click', function() {
    const nomeUsuario = document.getElementById('nome').value.trim();
    const numeroMaximo = parseInt(document.getElementById('numeroMaximo').value.trim());

    if (nomeUsuario !== '' && !isNaN(numeroMaximo) && numeroMaximo > 0) {
        localStorage.setItem('nomeUsuario', nomeUsuario);
        localStorage.setItem('numeroMaximo', numeroMaximo);
        document.getElementById('nomeUsuario').textContent = nomeUsuario;
        document.getElementById('numeroMaximoDisplay').textContent = numeroMaximo;
        document.getElementById('palpite').max = numeroMaximo;
        document.getElementById('telaBemvindo').style.display = 'none';
        document.getElementById('telaJogo').style.display = 'block';
    } else {
        alert('Por favor, insira seu nome e um número máximo válido para jogar!');
    }
});

// Tela do Jogo
if (localStorage.getItem('nomeUsuario')) {
    const numeroMaximo = parseInt(localStorage.getItem('numeroMaximo'));
    const numeroCorreto = Math.floor(Math.random() * numeroMaximo) + 1;
    let tentativas = 0;

    document.getElementById('palpiteForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const palpite = parseInt(document.getElementById('palpite').value);
        const feedback = document.getElementById('feedback');
        
        // Verifica se o numero inserido é valido
        if (isNaN(palpite) || palpite < 1 || palpite > numeroMaximo) {
            feedback.textContent = `Por favor, insira um número válido entre 1 e ${numeroMaximo}.`;
        } else {
            tentativas++;

            // Verifica o palpite
            if (palpite === numeroCorreto) {
                localStorage.setItem('pontos', tentativas);
                localStorage.setItem('numeroCorreto', numeroCorreto);
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

// Tela resultado
document.getElementById('jogarNovamente').addEventListener('click', function() {
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('numeroMaximo');
    localStorage.removeItem('pontos');
    localStorage.removeItem('numeroCorreto');
    document.getElementById('telaResultado').style.display = 'none';
    document.getElementById('telaBemvindo').style.display = 'block';
});

// Controle da musica
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
