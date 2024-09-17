const grid = document.querySelector('.grid');
const player = document.querySelector('.player');
const timer = document.querySelector('.timer');

const personagens = [
    'alison', 'messi', 'cr7', 'carrasco', 'de-light', 'lloris', 'vini', 'sule', 'schimacol', 'de-bruyne'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiraCarta = '';
let segundaCarta = '';
let loop; // Definir a variável loop fora das funções

const fimJogo = () => {
    const cartaDesabilitada = document.querySelectorAll('.disabled-card'); // Usar querySelectorAll para selecionar todas as cartas desabilitadas

    if(cartaDesabilitada.length === 20) { // Corrigido 'length'
        clearInterval(loop); // Usar variável externa loop
        alert(`Parabéns, ${player.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-character'); // Corrigido getAttribute
    const segundoPersonagem = segundaCarta.getAttribute('data-character'); // Corrigido getAttribute

    if(primeiroPersonagem === segundoPersonagem) {
        primeiraCarta.firstChild.classList.add('disabled-card');
        segundaCarta.firstChild.classList.add('disabled-card');

        primeiraCarta = '';
        segundaCarta = '';

        fimJogo();
    } else {
        setTimeout(() => { // Corrigido setTimeout
            primeiraCarta.classList.remove('reveal-card'); // Corrigido 'reveal-card'
            segundaCarta.classList.remove('reveal-card'); // Corrigido 'reveal-card'

            primeiraCarta = '';
            segundaCarta = '';
        }, 500);
    }
}

const revelarCarta = ({ target }) => {
    if(target.parentNode.classList.contains('reveal-card')) { // Corrigido 'classList.contains'
        return;
    }

    if(primeiraCarta === '') {
        target.parentNode.classList.add('reveal-card');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta === '') {
        target.parentNode.classList.add('reveal-card');
        segundaCarta = target.parentNode;

        checkCards();
    }
}

const createCard = (personagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${personagem}.webp')`;

    card.appendChild(front); // Corrigido 'appendChild'
    card.appendChild(back); // Corrigido 'appendChild'

    card.addEventListener('click', revelarCarta);
    card.setAttribute('data-character', personagem);

    return card;
}

const carregarJogo = () => {
    const duplicado = [...personagens, ...personagens];

    const embaralhar = duplicado.sort(() => Math.random() - 0.5);

    embaralhar.forEach((personagem) => {
        const card = createCard(personagem);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    loop = setInterval(() => { // Corrigido uso de 'loop'
        const currentTime = +timer.innerHTML; // Corrigido incremento de tempo
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    player.innerHTML = localStorage.getItem('player');
    startTimer();
    carregarJogo();
}
