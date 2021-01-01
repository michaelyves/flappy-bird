//console.log('[DevSoutinho] Flappy Bird');

let frames = 0
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//plano de fundo
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width,canvas.height);
   
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite x / sprite y
      planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite x / sprite y
      planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  }
}

//chão
function criaChao () {
  const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 50,
  atualiza() {
    const movimentoDoChao = 2;
    const repeteEm = chao.largura / 13;
    const movimentacao = chao.x - movimentoDoChao;

    //console.log('[chao.x]', chao.x)
    //console.log('[repeteEm]', repeteEm);
    //console.log('[movimentacao]', movimentacao % repeteEm);


    chao.x = movimentacao % repeteEm;

  },
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, //sprite x / sprite y
      chao.largura, chao.altura, // tamanho do recorte na sprite
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, //sprite x / sprite y
      chao.largura, chao.altura, // tamanho do recorte na sprite
      (chao.x + chao.altura), chao.y,
      chao.largura, chao.altura,
    );
  },
};
return chao;  
}


function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird() {
  const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  pulo: 4.6,
  pula() {
    //console.log('devo pular');
    flappyBird.velocidade = - flappyBird.pulo;
  },
  gravidade: 0.25,
  velocidade: 0,

  atualiza() {
    if(fazColisao(flappyBird, globais.chao)) {
      //console.log("Fez colisão");
      som_HIT.play();

      setTimeout(() => {
        mudaParaTela(Telas.INICIO);
      }, 500);
      
      return;

    }
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
    movimentos: [
      { spriteX: 0, spriteY:0,  }, //asa pra cima
      { spriteX: 0, spriteY:26, }, //asa no meio
      { spriteX: 0, spriteY:52, }, //asa pra baixo
      { spriteX: 0, spriteY:26, }, //asa no meio
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      
      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
      }

    },

  desenha() {
    flappyBird.atualizaOFrameAtual();

    const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

    contexto.drawImage(
      sprites,
      spriteX, spriteY, //sprite x / sprite y
      flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  }
}
return flappyBird;
}



// mensagemGetReady
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 /2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY, 
      mensagemGetReady.w, mensagemGetReady.h, 
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h,
    );
  }
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY:169,
    },
    espaco: 80,
    desenha() {
      
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 150;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
        //cano do céu
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
  
        //cano do chão
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        ) 

        par.canoCeu = {
          x: canoCeuX,
          y:canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }

      })
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if(globais.flappyBird.x >= par.x){
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true
        }
      }

      return false

    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function(par) {
        par.x = par.x - 2;

        if(canos.temColisaoComOFlappyBird(par)) {
          mudaParaTela(Telas.INICIO);

        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    }
  }
  
  return canos;
}

//telas
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha ();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza(){
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha ();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.chao.atualiza();
    globais.canos.atualiza();
    globais.flappyBird.atualiza();
    
  }
};

function loop(){

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();