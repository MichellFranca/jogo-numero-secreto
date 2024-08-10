// let titulo = document.querySelector('h1'); /*criação da variavel -- usando o document para acessar o documento e local do html h1 --
// o querySelector acessa dentro do html a propriedade que queremos no caso o h1*/
// titulo.innerHTML = 'Jogo do numero secreto'; /*acessando a variavel após criada -- o innerHtml é justamente o código para acesso ao HTML -- 
// dentro do javascript neste caso estamos acessando o h1 ou seja o titulo*/

// let paragrafo = document.querySelector('p'); /*criando a nova variavel*/
// paragrafo.innerHTML = 'Escolha um numero entre 1 e 10'; /* acessando a nova variavel*/

let listaDeNumerosSorteados = [];
let numeroLimite = 10; /*variavel criada para dar dinamismo ao programa, muda só o numero para o jogo no inicio*/
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); /*neste caso a tag indica qual delas será usada*/
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', /*trecho de código para fazer o programa falar para o usuário*/
        {rate:1.0});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); /*usando o JS para digitar o titulo*/
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); /*usando o JS para digitar o paragrafo*/

}

exibirMensagemInicial();

function verificarChute() { /*função é um trecho de código que executa alguma coisa no programa AÇÃO*/
    let chute = document.querySelector('input').value; /*função criada para guardar o numero digitado pelo usuário o input é o local*/

    if (chute == numeroSecreto) { /*guardou o mnumero e comparou com a variavel do numero secreto*/
    exibirTextoNaTela('h1', 'Acertou!'); /*se acertar usando a tag h1 informa na tela*/
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
    exibirTextoNaTela('p', mensagemTentativas); /*se acertar usando a tag h1 informa na tela*/
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }
        tentativas++; /*soma a tentativa + 1 até o acerto*/
        limparCampo(); /*variavel para limpar campo ao digigtar e errar*/
    }
}

function gerarNumeroAleatorio() { /*o return é uma palavra reservada no código pedido o retono e guardando o numero na variavel criada*/
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); /*parseInt para gerar numeros inteiros -- Mathrandom função para busca dentro dos arametros fornecidos*/
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []; /*código para limpar a lista ao chegsar na quantidade de numeros proppostos do programa que são 10*/
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { /* o includes ele está inserido os numeros*/
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); /*o push é para adicionar itens na lista e ao final*/
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
}