// ===== ENVIO DOS RESULTADOS — 6º ANO =====

const URL_RESULTADOS = "https://script.google.com/macros/s/AKfycbyqgOPIXzoP7nhlD8TcAMjW_o3hdx0EL-nz6-Blq24PKFqRusLU8-YfTOBUpm7p65PA/exec";

async function enviarResultadoFinal(dados) {

  // Chave exclusiva do 6º ano para não conflitar com o jogo do 7º
  if (localStorage.getItem("resultadoRecMat6Enviado") === "sim") return;

  try {

    await fetch(URL_RESULTADOS, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(dados)
    });

    localStorage.setItem("resultadoRecMat6Enviado", "sim");

  } catch (erro) {
    console.error("Erro ao enviar resultado:", erro);
  }
}


function final() {

  let max = maxRecovery(state.average),

      rec = Math.round(
        (state.xp / 300) * max * 100
      ) / 100,

      fa = Math.min(
        10,
        Math.round(
          (state.average + rec) * 100
        ) / 100
      ),

      per = state.history.filter(
        h => h.skill.startsWith("PERÍMETRO")
      ),

      vol = state.history.filter(
        h => h.skill.startsWith("VOLUME")
      ),

      pct = a =>
        a.length
          ? Math.round(
              a.filter(x => x.correct).length /
              a.length *
              100
            )
          : 0,

      pp = pct(per),
      pv = pct(vol);


  // ENVIA PARA A MESMA PLANILHA DO 7º ANO
  enviarResultadoFinal({

    nome: state.name,
    mediaAnterior: state.average,
    xp: state.xp,
    vidas: state.lives,
    pontosRecuperados: rec,
    mediaFinal: fa,
    perimetro: pp + "%",
    volume: pv + "%"

  });


  // TELA FINAL
  app.innerHTML = `
  
  <section class="card center final-card">

    <div class="trophy">🏆</div>

    <h1>MISSÃO CONCLUÍDA!</h1>

    ${guideBox(
      `PARABÉNS, ${state.name}! VOCÊ TERMINOU AS 10 MISSÕES. VEJA O QUE VOCÊ CONQUISTOU!`
    )}

    <button class="sound" id="again">
      🔊 OUVIR VITÓRIA NOVAMENTE
    </button>

    <div class="stats">

      <div class="stat">
        <b>⭐ ${state.xp}/300</b>
        XP
      </div>

      <div class="stat">
        <b>❤️ ${state.lives}/10</b>
        VIDAS
      </div>

      <div class="stat">
        <b>+${fmt(rec)}</b>
        PONTOS
      </div>

    </div>

    <p>
      MÉDIA ANTERIOR:
      <b>${fmt(state.average)}</b>
    </p>

    <div class="final">
      ${fmt(fa)}
    </div>

    <p>
      <b>NOVA MÉDIA</b>
    </p>

    <div class="stats">

      <div class="stat">
        <b>${pp}%</b>
        PERÍMETRO
      </div>

      <div class="stat">
        <b>${pv}%</b>
        VOLUME
      </div>

      <div class="stat">
        <b>${fmt(max)}</b>
        MÁXIMO DA RECUPERAÇÃO
      </div>

    </div>

    <p class="note">
      📤 RESULTADO ENVIADO PARA A PROFESSORA.
    </p>

    <button class="btn secondary" id="restart">
      RECOMEÇAR DO ZERO
    </button>

  </section>
  `;


  setTimeout(() => {

    victorySound();

    speak(
      `Missão concluída! Parabéns, ${state.name}! Você completou as dez missões!`
    );

  }, 250);


  document.querySelector("#again").onclick = () => {

    victorySound();

    speak(
      `Missão concluída! Parabéns, ${state.name}! Você completou as dez missões!`
    );

  };


  document.querySelector("#restart").onclick = () => {

    if (
      confirm(
        "APAGAR O PROGRESSO E RECOMEÇAR?"
      )
    ) {

      localStorage.removeItem(
        "operacaoReconstrucao6AnoV6"
      );

      // Permite que um novo resultado do 6º ano seja enviado
      localStorage.removeItem(
        "resultadoRecMat6Enviado"
      );

      location.reload();

    }

  };

}

render();
