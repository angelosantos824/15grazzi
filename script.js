// --- 1. CONTAGEM REGRESSIVA (20 DE MAIO DE 2026) ---
const dataFesta = new Date(2026, 4, 20, 20, 0, 0).getTime();

const contagem = setInterval(() => {
    const agora = new Date().getTime();
    const distancia = dataFesta - agora;

    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');

    if (d && h && m && s) {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        d.innerText = dias < 10 ? '0' + dias : dias;
        h.innerText = horas < 10 ? '0' + horas : horas;
        m.innerText = minutos < 10 ? '0' + minutos : minutos;
        s.innerText = segundos < 10 ? '0' + segundos : segundos;
    }

    if (distancia < 0) {
        clearInterval(contagem);
        const container = document.querySelector('.countdown-container');
        if (container) container.innerHTML = "<h3>É HOJE! ✨</h3>";
    }
}, 1000);

// --- 2. EFEITO GLITTER (CANVAS) ---
const canvas = document.getElementById('canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x; this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(255, 255, 255, ${Math.random()})`;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.size > 0.1) this.size -= 0.03;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }

    window.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) particles.push(new Particle(e.x, e.y));
    });

    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            for (let i = 0; i < 5; i++) particles.push(new Particle(e.touches[0].clientX, e.touches[0].clientY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(); particles[i].draw();
            if (particles[i].size <= 0.1) { particles.splice(i, 1); i--; }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// --- 3. LÓGICA DA GALERIA (VERSÃO RADICAL) ---
document.addEventListener('DOMContentLoaded', () => {
    const fotos = document.querySelectorAll('.foto-aleatoria');
    const mural = document.getElementById('mural-fotos');
    
    // Criar o Overlay e a imagem de destaque
    let overlay = document.getElementById('foto-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'foto-overlay';
        overlay.innerHTML = '<img id="foto-destaque" src="">';
        document.body.appendChild(overlay);
    }

    const fotoDestaque = document.getElementById('foto-destaque');

    fotos.forEach(foto => {
        // Posicionamento aleatório inicial
        const larguraMax = window.innerWidth - 150;
        const alturaMax = mural ? mural.offsetHeight - 400 : 800;
        const randomX = Math.floor(Math.random() * larguraMax);
        const randomY = Math.floor(Math.random() * alturaMax) + 150;
        const randomRotate = Math.floor(Math.random() * 40) - 20;

        foto.style.left = randomX + 'px';
        foto.style.top = randomY + 'px';
        foto.style.transform = `rotate(${randomRotate}deg)`;

        // CLIQUE: Em vez de ampliar a foto pequena, mostramos a grande no overlay
        foto.addEventListener('click', () => {
            fotoDestaque.src = foto.src; // Pega o caminho da imagem
            overlay.style.display = 'flex'; // Mostra o fundo preto
        });
    });

    // Fechar ao clicar no fundo preto
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        fotoDestaque.src = "";
    });
});
function abrirMenuMapas() {
    document.getElementById('menu-mapas-overlay').style.display = 'flex';
}

function fecharMenuMapas() {
    document.getElementById('menu-mapas-overlay').style.display = 'none';
}
