let pendulo;
let gravidade = 9.81;
let massa = 50;
let comprimento = 400;

function setup() {
    createCanvas(800, 600);
    let origem = createVector(width / 2, 0);
    pendulo = new Pendulo(origem, comprimento, massa);
}

function draw() {
    background(220);
    pendulo.simular();
    pendulo.arrastar();
}

function mousePressed() {
    pendulo.clicar(mouseX, mouseY);
}

function mouseReleased() {
    pendulo.soltar();
}

function modificarComprimento(valor) {
    comprimento = parseFloat(valor);
    pendulo = new Pendulo(createVector(width / 2, 0), comprimento, massa);
}

function modificarMassa(valor) {
    massa = parseFloat(valor);
    pendulo = new Pendulo(createVector(width / 2, 0), comprimento, massa);
}

function modificarGravidade(valor) {
    gravidade = parseFloat(valor);
}
