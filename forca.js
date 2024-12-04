const palavrasEDicas = [
    { palavra: "ABACAXI", dica: "Fruta" },
    { palavra: "MELANCIA", dica: "Fruta" },
    { palavra: "PERA", dica: "Fruta" },
    { palavra: "TANGERINA", dica: "Fruta" },
    { palavra: "ABACATE", dica: "Fruta" },
    { palavra: "CAQUI", dica: "Fruta" },
    { palavra: "GOIABA", dica: "Fruta" },
    { palavra: "MARMELO", dica: "Fruta" },
    { palavra: "ACEROLA", dica: "Fruta" },
    { palavra: "CACAU", dica: "Fruta" },
    { palavra: "CAJU", dica: "Fruta" },
    { palavra: "CARAMBOLA", dica: "Fruta" },
    { palavra: "JABUTICABA", dica: "Fruta" },
    { palavra: "LARANJA", dica: "Fruta" },
    { palavra: "MANGA", dica: "Fruta" },
    { palavra: "PITAYA", dica: "Fruta" },
    { palavra: "ARGENTINA", dica: "País" },
    { palavra: "BRASIL", dica: "País" },
    { palavra: "CHILE", dica: "País" },
    { palavra: "CHINA", dica: "País" },
    { palavra: "DINAMARCA", dica: "País" },
    { palavra: "EGITO", dica: "País" },
    { palavra: "ESPANHA", dica: "País" },
    { palavra: "FILIPINAS", dica: "País" },
    { palavra: "GUATEMALA", dica: "País" },
    { palavra: "INGLATERRA", dica: "País" },
    { palavra: "IRLANDA", dica: "País" },
    { palavra: "ISRAEL", dica: "País" },
    { palavra: "NORUEGA", dica: "País" },
    { palavra: "ALEMANHA", dica: "País" },
    { palavra: "MARROCOS", dica: "País" },
    { palavra: "PARAGUAI", dica: "País" },
    { palavra: "PORTUGAL", dica: "País" },
    { palavra: "VENEZUELA", dica: "País" },
    { palavra: "DEMAQUILANTE", dica: "Maquiagem" },
    { palavra: "DELINEADOR", dica: "Maquiagem" },
    { palavra: "ILUMINADOR", dica: "Maquiagem" },
    { palavra: "CONTORNO", dica: "Maquiagem" },
    { palavra: "CORRETIVO", dica: "Maquiagem" },
    { palavra: "SOMBRA", dica: "Maquiagem" },
    { palavra: "GLOSS", dica: "Maquiagem" },
    { palavra: "PRIMER", dica: "Maquiagem" },
    { palavra: "BRONZER", dica: "Maquiagem" },
    { palavra: "ANNABELLE", dica: "Filme" },
    { palavra: "VINGADORES", dica: "Filme" },
    { palavra: "CORINGA", dica: "Filme" },
    { palavra: "AFTER", dica: "Filme" },
    { palavra: "GLADIADOR", dica: "Filme" },
    { palavra: "AVATAR", dica: "Filme" },
    { palavra: "TITANIC", dica: "Filme" },
    { palavra: "INTERESTELAR", dica: "Filme" },
    { palavra: "MADAGASCAR", dica: "Filme" },
    { palavra: "RATATOUILLE", dica: "Filme" },
    { palavra: "MOANA", dica: "Filme" },
    { palavra: "ENCANTO", dica: "Filme" },
    { palavra: "FROZEN", dica: "Filme" },
    { palavra: "MINIONS", dica: "Filme" },
    { palavra: "CINDERELA", dica: "Filme" },
    { palavra: "DUMBO", dica: "Filme" },
    { palavra: "ALADDIN", dica: "Filme" },
    { palavra: "POCAHONTAS", dica: "Filme" },
    { palavra: "GODZILLA", dica: "Filme" },
    { palavra: "CASABLANCA", dica: "Filme" },
    { palavra: "CORALINE", dica: "Filme" },
    { palavra: "FRANKENSTEIN", dica: "Filme" },
    { palavra: "SHREK", dica: "Filme" },
    { palavra: "JUMANJI", dica: "Filme" },
    { palavra: "ZOOTOPIA", dica: "Filme" },
    { palavra: "MULAN", dica: "Filme" },
  ];
  
  let palavraSecreta, dica;
  let letrasDescobertas, letrasTentadas, tentativas, tempoRestante, jogoRodando;
  let ultimoSegundo = 0;
  let palavrasUsadas = [];
  let rodadaAtual = 1;
  const maxRodadas = 5;
  let pontuacao = 0;
  
  function setup() {
    createCanvas(400, 400);
    textFont("Arial");
    iniciarJogo();
  }
  
  function draw() {
    if (jogoRodando) {
        background("#FFF0F5");
  
        // Exibição de informações gerais
        strokeWeight(0.5);
        fill(0);
        textSize(16);
        textAlign(LEFT);
        text(`Rodada: ${rodadaAtual} de ${maxRodadas}`, 10, 20);
        text(`Tentativas: ${tentativas}`, 10, 40);
        text(`Letras tentadas: ${letrasTentadas.join(", ") || "Nenhuma"}`, 10, 60);
        text(`Tempo: ${nf(floor(tempoRestante / 60), 2)}:${nf(tempoRestante % 60, 2)}`, 10, 80);
        text(`Dica: ${dica}`, 10, 100);
  
        // Atualiza o tempo restante
        if (millis() - ultimoSegundo >= 1000) {
            tempoRestante--;
            ultimoSegundo = millis();
        }
  
        // Verifica condições de derrota por tempo ou acerto
        if (tempoRestante <= 0 || tentativas <= 0) {
            rodadaAtual++;
            if (rodadaAtual > maxRodadas) finalizarJogo();
            else iniciarJogo();
        } else if (letrasDescobertas.join("") === palavraSecreta) {
            pontuacao++;
            rodadaAtual++;
            if (rodadaAtual > maxRodadas) finalizarJogo();
            else iniciarJogo();
        }
  
        textSize(24);
        textAlign(CENTER);
        text(letrasDescobertas.join(" "), width / 2, height - 30);
  
        desenharForca();
    } else {
        background("#FFF0F5"); // Limpa a tela antes de mostrar a mensagem de resultado
        if (pontuacao > maxRodadas / 2) {
            fill(0);
            textSize(32);
            textAlign(CENTER);
            text("Você Ganhou!", width / 2, height / 2 - 20);
        } else {
            fill(0);
            textSize(32);
            textAlign(CENTER);
            text("Você Perdeu!", width / 2, height / 2 - 20);
        }
        textSize(24);
        text(`Pontuação final: ${pontuacao} de ${maxRodadas}`, width / 2, height / 2 + 20);
    }
  }
  
  function keyPressed() {
    if (jogoRodando) {
        let letra = key.toUpperCase();
  
        if (letra >= "A" && letra <= "Z" && !letrasTentadas.includes(letra)) {
            letrasTentadas.push(letra);
  
            if (palavraSecreta.includes(letra)) {
                for (let i = 0; i < palavraSecreta.length; i++) {
                    if (palavraSecreta[i] === letra) {
                        letrasDescobertas[i] = letra;
                    }
                }
            } else {
                tentativas--;
            }
        }
    }
  }
  
  function iniciarJogo() {
    letrasDescobertas = [];
    letrasTentadas = [];
    tentativas = 6;
    tempoRestante = 60;
    jogoRodando = true;
  
    // Reiniciar lista de palavras usadas se necessário
    if (palavrasUsadas.length >= palavrasEDicas.length) {
        palavrasUsadas = [];
    }
  
    let palavraEscolhida = palavraAleatoria();
    while (palavrasUsadas.includes(palavraEscolhida.palavra)) {
        palavraEscolhida = palavraAleatoria();
    }
    palavrasUsadas.push(palavraEscolhida.palavra);
    palavraSecreta = palavraEscolhida.palavra;
    dica = palavraEscolhida.dica;
  
    for (let i = 0; i < palavraSecreta.length; i++) {
        letrasDescobertas.push("_");
    }
  }
  
  function palavraAleatoria() {
    let indice = floor(random(palavrasEDicas.length));
    return palavrasEDicas[indice];
  }
  
  function desenharForca() {
    stroke(0);
    strokeWeight(2);
  
    // Base da forca
    line(50, 350, 150, 350);
    line(100, 350, 100, 200);
    line(100, 200, 150, 200);
    line(150, 200, 150, 220);
  
    // Boneco da forca
    if (tentativas <= 5) circle(150, 230, 20); // Cabeça
    if (tentativas <= 4) line(150, 240, 150, 270); // Corpo
    if (tentativas <= 3) line(150, 250, 140, 260); // Braço esquerdo
    if (tentativas <= 2) line(150, 250, 160, 260); // Braço direito
    if (tentativas <= 1) line(150, 270, 140, 290); // Perna esquerda
    if (tentativas <= 0) line(150, 270, 160, 290); // Perna direita
  }
  
  function finalizarJogo() {
    jogoRodando = false;
  
    if (pontuacao > maxRodadas / 2) {
        // Tela verde de vitória
        background("#bcf8a8");
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text("Você Ganhou!", width / 2, height / 2 - 20);
    } else {
        // Tela vermelha de derrota
        background("#f8a8a8");
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text("Você Perdeu!", width / 2, height / 2 - 20);
    }
  
    textSize(24);
    text(`Pontuação final: ${pontuacao} de ${maxRodadas}`, width / 2, height / 2 + 20);
  
    setTimeout(() => {
        rodadaAtual = 1;
        pontuacao = 0;
        palavrasUsadas = [];
        iniciarJogo();
        loop();
    }, 5000); // Reinicia o jogo após 5 segundos
  }