class Pendulo {
    constructor(pontoOrigem, comprimentoInicial, massaInicial) {
        this.origem = pontoOrigem.copy();
        this.posicaoAtual = createVector();
        this.comprimento = comprimentoInicial;
        this.angulo = Math.PI / 4;
        this.velocidadeAngular = 0.0;
        this.aceleracaoAngular = 0.0;
        this.massa = massaInicial;
        this.atenuacao = 0.99 - (this.massa * 0.0001);
        this.arrastando = false;
    }

    simular() {
        if (!this.arrastando) {
            const forcaGravitacional = 0.1 * gravidade;
            this.aceleracaoAngular = (-forcaGravitacional / this.comprimento) * Math.sin(this.angulo);
            this.velocidadeAngular += this.aceleracaoAngular;
            this.velocidadeAngular *= this.atenuacao;
            this.angulo += this.velocidadeAngular;
        }
        this.renderizar();
    }

    renderizar() {
        this.posicaoAtual.set(this.comprimento * Math.sin(this.angulo), this.comprimento * Math.cos(this.angulo), 0);
        this.posicaoAtual.add(this.origem);
    
        stroke(200);
        line(this.origem.x, this.origem.y, this.posicaoAtual.x, this.posicaoAtual.y);
        fill(150);
        ellipse(this.posicaoAtual.x, this.posicaoAtual.y, this.massa, this.massa);
    
        // Calcule a posição do canvas na página para posicionar corretamente o ponto
        const canvas = document.querySelector('canvas');
        const canvasRect = canvas.getBoundingClientRect();
    
        // Criação do ponto laranja
        const ponto = document.createElement('div');
        ponto.classList.add('ponto');
        ponto.style.left = `${canvasRect.left + this.posicaoAtual.x -12}px`;
        ponto.style.top = `${canvasRect.top + this.posicaoAtual.y -12}px`;
        document.body.appendChild(ponto);
    
        // Remoção do ponto após 1500ms
        setTimeout(() => {
            ponto.remove();
        }, 2000);
    }
    
    
    clicar(mx, my) {
        const distancia = dist(mx, my, this.posicaoAtual.x, this.posicaoAtual.y);
        if (distancia < this.massa / 2) {
            this.arrastando = true;
        }
    }

    soltar() {
        this.arrastando = false;
        this.velocidadeAngular = 0;
    }

    arrastar() {
        if (this.arrastando) {
            const diferenca = p5.Vector.sub(this.origem, createVector(mouseX, mouseY));
            this.angulo = atan2(-diferenca.y, diferenca.x) - radians(90);
        }
    }
}
