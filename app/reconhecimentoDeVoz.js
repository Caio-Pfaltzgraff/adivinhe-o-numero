const elementoChute = document.getElementById('chute')

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'pt-br'
recognition.start();

recognition.addEventListener('result', onSpeak)

function onSpeak(e) {
    chute = e.results[0][0].transcript
    tentativa = corrigeNumero(chute)
    exibeChuteNaTela(tentativa);
    verificaSeOChutePossuiUmValorValido(tentativa);
}

function exibeChuteNaTela(chute) {
    elementoChute.innerHTML = `
        <div>Você disse:</div>
        <span class="box">${chute}</span>
    `
}

function corrigeNumero(chute) {
    const numeros = {
        'zero': 0,
        '00': 0,
        '01': 1,
        'um': 1,
        'dois': 2,
        'três': 3,
        'quatro': 4,
        'cinco': 5,
        'seis': 6,
        'sete': 7,
        'oito': 8,
        'nove': 9,
        'dez': 10
    }
    
    for(numero in numeros) {
        if(chute === numero) {
            chute = numeros[numero];
            console.log(chute);
            return chute
        }
    }
    return chute
    
}

//quando acabar o reconhecimento ele iniciará denovo
recognition.addEventListener('end', () => recognition.start())
