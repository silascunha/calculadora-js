var proximoNumero = true;
var opcaoCalculo = '';
const opcoes = ['+', '-', '*', '/', '='];

// variavel usada apenas quando uma tecla inválida é inserida
// é atualizado após um valor válido ser inserido
var valorAntigo = '0';

var numeroCalculo = 0;

var valorEhResultado = false;

document.addEventListener('keydown', tecladoPressionado);

const textoCalc = document.getElementById('textCalc');


function tecladoPressionado(event) {
    var key = event.key

    //console.log('Tecla pressionada: ' + key);

    executarInput(key);
}

function executarInput(key) {
    var valor = textoCalc.value;
    valorEhResultado = false;

    if (key <= '9' && key >= '0') {
        console.log('A tecla pressionada foi número: ' + key);
        
        if (valor == '0' || proximoNumero) {
            valor = key;
            proximoNumero = false;
        }
        else {
            valor += key;
        }
    } 
    else if (key == '.' || key == ',') {
        valor += '.';
        proximoNumero = false;
    }
    else if (key == 'Backspace') {
        valor = valor.slice(0, valor.length - 1);
    }
    else if (opcoes.includes(key)) {
        console.log('Tecla de opção pressionada: ' + key);

        if (!proximoNumero) {
            numeroCalculo = calcular(numeroCalculo, valor, opcaoCalculo);
        }

        valor = '' + numeroCalculo;

        opcaoCalculo = key;
        proximoNumero = true;
        valorEhResultado = true;
    }
    else if(key == 'c') {
        limpar();
        valor = textoCalc.value;
    }
    
    valor = corrigirValor(valor);
    textoCalc.value = valor;

    // move o scroll do input para direita para visualizar o ultimo número inserido
    // razão: o input está desabilitado e não move sozinho
    textoCalc.scrollLeft += textoCalc.scrollWidth;

    if (valor.length > 13 && valor.length <= 16) {
        textoCalc.className = 'resultado-pequeno';
        console.log('tamanho reduzido');
    }
    else if (valor.length > 16) {
        textoCalc.className = 'resultado-mini'
        console.log('tamanho mini');
    }
    else {
        textoCalc.className = 'resultado-normal'
        console.log('tamanho normal');
    }
}

//verifica se é um número válido e retorna o valor antigo caso não seja
function corrigirValor(value) {
    var tamanho = value.length;

    if (value == '') value = '0';

    if (isNaN(value) || (tamanho > 15 && !valorEhResultado)) {
        value = valorAntigo;

        console.log('Caractere inválido inserido ou tamanho máximo excedido. \nVALOR NOVO: ' + value);

        return value;
    }
    valorAntigo = value;
    return value;
}

function calcular(valor1, valor2, opcaoCalculo) {
    valor2 = Number.parseFloat(valor2);

    switch(opcaoCalculo) {
        case '+':
            return valor1 + valor2;
        case '-':
            return valor1 - valor2;
        case '/':
            return valor1 / valor2;
        case '*':
            return valor1 * valor2;
        default:
            return valor2;
    }
}

function limpar() {
    numeroCalculo = 0.0;
    opcaoCalculo = '';
    proximoNumero = true;
    valorAntigo = '0';
    textoCalc.value = '0';
}
