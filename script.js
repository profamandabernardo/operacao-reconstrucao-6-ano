const guides=[
{id:"faisca",name:"FAÍSCA",emoji:"⚡",desc:"ANIMADO"},{id:"nexo",name:"NEXO",emoji:"🧠",desc:"TRANQUILO"},
{id:"brasa",name:"BRASA",emoji:"🔥",desc:"DETERMINADO"},{id:"lumi",name:"LUMI",emoji:"🌈",desc:"ALEGRE"},
{id:"atlas",name:"ATLAS",emoji:"🛡️",desc:"CORAJOSO"}];

const missions=[{"title":"A PRAÇA CENTRAL","skill":"PERÍMETRO DO QUADRADO","text":"UMA PRAÇA QUADRADA TEM 18 M DE LADO. QUANTOS METROS DE CERCA SÃO NECESSÁRIOS PARA CONTORNAR TODA A PRAÇA?","answer":72,"opts":[324,54,72,36],"unit":"M","formula":"P = 4 × LADO","img":"m1.png","hint1":"O PERÍMETRO DO QUADRADO É A SOMA DOS 4 LADOS.","hint2":"CALCULE 4 × 18."},{"title":"O CAMPO ESPORTIVO","skill":"PERÍMETRO DO RETÂNGULO","text":"UM CAMPO RETANGULAR TEM 40 M DE COMPRIMENTO E 25 M DE LARGURA. QUAL É O PERÍMETRO DO CAMPO?","answer":130,"opts":[65,1000,100,130],"unit":"M","formula":"P = 2 × (COMPRIMENTO + LARGURA)","img":"m2.svg","hint1":"SOME COMPRIMENTO E LARGURA E DEPOIS MULTIPLIQUE POR 2.","hint2":"CALCULE 2 × (40 + 25)."},{"title":"O JARDIM DA ESCOLA","skill":"PERÍMETRO DO RETÂNGULO","text":"UM JARDIM RETANGULAR TEM 12 M DE COMPRIMENTO E 8 M DE LARGURA. QUANTOS METROS DE MURO SÃO NECESSÁRIOS PARA CERCÁ-LO COMPLETAMENTE?","answer":40,"opts":[32,96,40,20],"unit":"M","formula":"P = 2 × (COMPRIMENTO + LARGURA)","img":"m3.svg","hint1":"PARA CERCAR O JARDIM, CALCULE O CONTORNO.","hint2":"CALCULE 2 × (12 + 8)."},{"title":"A PISCINA","skill":"PERÍMETRO DO RETÂNGULO","text":"UMA PISCINA RETANGULAR MEDE 15 M DE COMPRIMENTO E 10 M DE LARGURA. QUAL É O PERÍMETRO DA PISCINA?","answer":50,"opts":[40,150,50,25],"unit":"M","formula":"P = 2 × (COMPRIMENTO + LARGURA)","img":"m4.svg","hint1":"O PERÍMETRO É O CONTORNO DA PISCINA.","hint2":"CALCULE 2 × (15 + 10)."},{"title":"A QUADRA DE AREIA","skill":"PERÍMETRO DO RETÂNGULO","text":"UMA QUADRA DE AREIA RETANGULAR TEM 14 M DE COMPRIMENTO E 6 M DE LARGURA. QUAL É O PERÍMETRO DESSA QUADRA?","answer":40,"opts":[20,28,40,84],"unit":"M","formula":"P = 2 × (COMPRIMENTO + LARGURA)","img":"m5.svg","hint1":"SOME AS DUAS MEDIDAS E MULTIPLIQUE POR 2.","hint2":"CALCULE 2 × (14 + 6)."},{"title":"A CAIXA DE DOAÇÕES","skill":"VOLUME DO PARALELEPÍPEDO","text":"UMA CAIXA RETANGULAR MEDE 7 CM DE COMPRIMENTO, 4 CM DE LARGURA E 3 CM DE ALTURA. QUAL É O VOLUME DESSA CAIXA?","answer":84,"opts":[84,42,28,12],"unit":"CM³","formula":"V = COMPRIMENTO × LARGURA × ALTURA","img":"m6.svg","hint1":"VOLUME USA COMPRIMENTO, LARGURA E ALTURA.","hint2":"CALCULE 7 × 4 × 3."},{"title":"O AQUÁRIO","skill":"VOLUME DO PARALELEPÍPEDO","text":"UM AQUÁRIO MEDE 50 CM DE COMPRIMENTO, 30 CM DE LARGURA E 20 CM DE ALTURA. QUAL É O VOLUME DESSE AQUÁRIO?","answer":30000,"opts":[2000,10000,30000,1000],"unit":"CM³","formula":"V = COMPRIMENTO × LARGURA × ALTURA","img":"m7.svg","hint1":"MULTIPLIQUE AS TRÊS DIMENSÕES DO AQUÁRIO.","hint2":"CALCULE 50 × 30 × 20."},{"title":"O BLOCO DE CONSTRUÇÃO","skill":"VOLUME DO CUBO","text":"UM BLOCO EM FORMATO DE CUBO TEM ARESTA MEDINDO 6 CM. QUAL É O VOLUME DESSE BLOCO?","answer":216,"opts":[24,36,12,216],"unit":"CM³","formula":"V = ARESTA × ARESTA × ARESTA","img":"m8.svg","hint1":"NO CUBO, AS TRÊS ARESTAS TÊM A MESMA MEDIDA.","hint2":"CALCULE 6 × 6 × 6."},{"title":"O DEPÓSITO","skill":"VOLUME DO PARALELEPÍPEDO","text":"UM DEPÓSITO TEM 8 M DE COMPRIMENTO, 5 M DE LARGURA E 4 M DE ALTURA. QUAL É O VOLUME DESSE DEPÓSITO?","answer":160,"opts":[160,320,60,100],"unit":"M³","formula":"V = COMPRIMENTO × LARGURA × ALTURA","img":"m9.svg","hint1":"MULTIPLIQUE COMPRIMENTO, LARGURA E ALTURA.","hint2":"CALCULE 8 × 5 × 4."},{"title":"O RESERVATÓRIO","skill":"VOLUME DO CUBO","text":"UM RESERVATÓRIO EM FORMATO DE CUBO TEM ARESTA MEDINDO 9 M. QUAL É O VOLUME TOTAL DESSE RESERVATÓRIO?","answer":729,"opts":[54,27,729,81],"unit":"M³","formula":"V = ARESTA × ARESTA × ARESTA","img":"m10.svg","hint1":"NO CUBO, MULTIPLIQUE A ARESTA TRÊS VEZES.","hint2":"CALCULE 9 × 9 × 9."}];

let state=JSON.parse(localStorage.getItem("operacaoReconstrucao6AnoV6")||"null")||{screen:"start",name:"",average:null,guide:null,index:0,lives:10,xp:0,attempts:0,history:[],selected:null,order:null,finaleSeen:false};
const app=document.querySelector("#app"),save=()=>localStorage.setItem("operacaoReconstrucao6AnoV6",JSON.stringify(state));
const G=()=>guides.find(g=>g.id===state.guide)||guides[0],fmt=n=>Number(n).toLocaleString("pt-BR",{maximumFractionDigits:2});
const maxRecovery=a=>a<=5?3:a<=6?2:1;
function guideBox(t){let g=G();return `<div class="guidebox"><div class="avatar">${g.emoji}</div><div><strong>${g.name}</strong><p>${t}</p></div></div>`}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function speak(t){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="pt-BR";u.rate=.96;speechSynthesis.speak(u)}
function victorySound(){try{let A=window.AudioContext||window.webkitAudioContext,c=new A(),now=c.currentTime;[523,659,784,1047].forEach((f,i)=>{let o=c.createOscillator(),g=c.createGain();o.frequency.value=f;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(.0001,now+i*.14);g.gain.exponentialRampToValueAtTime(.16,now+i*.14+.02);g.gain.exponentialRampToValueAtTime(.0001,now+i*.14+.35);o.start(now+i*.14);o.stop(now+i*.14+.4)})}catch(e){}}
function render(){if(state.screen==="start")start();else if(state.screen==="guide")chooseGuide();else if(state.screen==="intro")intro();else if(state.screen==="finale")finale();else if(state.screen==="game")game();else final();save()}
function start(){app.innerHTML=`<section class="card start-card center"><img src="imagens/logo-sesi.png" class="logo-sesi"><div class="game-icons">🎮 📐</div><h1>OPERAÇÃO RECONSTRUÇÃO</h1><div class="title-badges"><span>RECUPERAÇÃO DE MATEMÁTICA</span><b>6º ANO</b></div>${guideBox("OLÁ! EU VOU ACOMPANHAR VOCÊ NESTA MISSÃO. PRIMEIRO, DIGITE SEU NOME E SUA MÉDIA ATUAL DE MATEMÁTICA.")}<div class="field"><label>NOME</label><input id="name" value="${state.name||""}" placeholder="DIGITE SEU NOME"></div><div class="field"><label>MÉDIA ATUAL (0 A 10)</label><input id="avg" value="${state.average??""}" placeholder="EX.: 5,4"></div><button class="btn" id="next">CONTINUAR ›</button><p class="note">💾 O PROGRESSO É SALVO NESTE NAVEGADOR.</p></section>`;document.querySelector("#next").onclick=()=>{let n=document.querySelector("#name").value.trim(),a=parseFloat(document.querySelector("#avg").value.replace(",", "."));if(!n||isNaN(a)||a<0||a>10)return alert("PREENCHA O NOME E UMA MÉDIA ENTRE 0 E 10.");state.name=n.toUpperCase();state.average=a;state.screen="guide";render()}}
function chooseGuide(){app.innerHTML=`<section class="card center"><h2>ESCOLHA SEU GUIA</h2><p>ELE VAI ACOMPANHAR VOCÊ DURANTE AS 10 MISSÕES.</p><div class="guides">${guides.map(g=>`<button class="guide ${state.guide===g.id?"selected":""}" data-id="${g.id}"><div class="avatar">${g.emoji}</div><b>${g.name}</b><small>${g.desc}</small></button>`).join("")}</div><button class="btn" id="go" ${state.guide?"":"disabled"}>ESCOLHER ESTE GUIA</button></section>`;document.querySelectorAll(".guide").forEach(b=>b.onclick=()=>{state.guide=b.dataset.id;render()});document.querySelector("#go").onclick=()=>{state.screen="intro";render()}}
function intro(){app.innerHTML=`<section class="card center">${guideBox(`TUDO PRONTO, ${state.name}! VOCÊ COMEÇA COM 10 VIDAS. SE ERRAR, EU DOU UMA PISTA. QUANTO MENOS AJUDA USAR, MAIS XP VOCÊ GANHA!`)}<div class="stats"><div class="stat"><b>❤️ 10</b>VIDAS</div><div class="stat"><b>⭐ 300</b>XP POSSÍVEIS</div><div class="stat"><b>🎯 10</b>MISSÕES</div></div><button class="btn" id="begin">COMEÇAR MISSÃO 🚀</button></section>`;document.querySelector("#begin").onclick=()=>{state.screen="game";render()}}
function visual(m){if(m.special==="tank")return `<div class="tankscene"><div class="hose">〰️💧</div><div class="tank"><div class="water" id="water"></div><span>RESERVATÓRIO</span></div></div>`;return m.img?`<img class="mission-img" src="imagens/${m.img}" alt="ILUSTRAÇÃO DA MISSÃO">`:""}
function game(feedback="",kind=""){let m=missions[state.index];if(!state.order)state.order=shuffle(m.opts);app.innerHTML=`<div class="hud"><span class="pill">❤️ ${state.lives}/10</span><span class="pill">⭐ ${state.xp}/300 XP</span><span class="pill">MISSÃO ${state.index+1}/10</span></div><div class="progress"><span style="width:${state.index*10}%"></span></div><section class="card"><div class="mission">MISSÃO ${String(state.index+1).padStart(2,"0")} — ${m.title}</div>${guideBox(state.attempts===0?"LEIA COM ATENÇÃO. VOCÊ CONSEGUE!":state.attempts===1?m.hint1:m.hint2)}<div class="mission-grid"><div>${visual(m)}<div class="formula">${m.formula}</div></div><div><p class="problem">${m.text}</p><div class="choices">${state.order.map(v=>`<button class="choice ${state.selected===v?"chosen":""}" data-v="${v}">${fmt(v)} ${m.unit}</button>`).join("")}</div><button class="btn" id="answer" ${state.selected===null?"disabled":""}>CONFIRMAR RESPOSTA ›</button><button class="sound" id="hear">🔊 OUVIR</button></div></div>${feedback?`<div class="feedback ${kind}">${feedback}</div>`:""}</section>`;document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{state.selected=Number(b.dataset.v);render()});document.querySelector("#answer").onclick=check;document.querySelector("#hear").onclick=()=>speak(m.text)}
function nextMission(msg,kind){save();game(msg,kind);setTimeout(()=>{state.screen=(state.index===8&&!state.finaleSeen)?"finale":"game";state.selected=null;state.order=null;render()},1500)}
function check(){let m=missions[state.index],val=state.selected;if(val===m.answer){let earned=state.attempts===0?30:state.attempts===1?24:18;state.xp+=earned;state.history.push({mission:state.index+1,skill:m.skill,correct:true,attempts:state.attempts+1,xp:earned});if(m.special==="tank"){let w=document.querySelector("#water");if(w)w.classList.add("fill")}speak(`Isso aí! Você conseguiu! Agora você tem ${state.xp} XP. Arrasou!`);state.index++;state.attempts=0;if(state.index>=10){setTimeout(()=>{state.screen="final";render()},900);return}nextMission(`ISSO! VOCÊ CONSEGUIU! ⭐ +${earned} XP. ARRASOU!`,"good")}else{state.attempts++;if(state.lives>0)state.lives--;document.querySelector(".chosen")?.classList.add("wrong");state.selected=null;if(state.attempts>=3){state.history.push({mission:state.index+1,skill:m.skill,correct:false,attempts:3,xp:0});state.index++;state.attempts=0;if(state.index>=10){state.screen="final";render();return}nextMission(`A RESPOSTA ERA ${fmt(m.answer)} ${m.unit}. VAMOS CONTINUAR!`,"bad")}else{save();setTimeout(()=>game("AINDA NÃO! VOCÊ PERDEU UMA VIDA, MAS TEM OUTRA CHANCE. VEJA A PISTA!","bad"),450)}}}
function finale(){state.finaleSeen=true;app.innerHTML=`<section class="card finale center"><img src="imagens/finale.png" alt="GRANDE FINAL"><h1>🎆 GRANDE FINAL! 🎆</h1>${guideBox("VOCÊ CHEGOU NAS DUAS ÚLTIMAS MISSÕES! AGORA O DESAFIO FICA MAIS DIFÍCIL. MANTENHA O FOCO E USE TUDO O QUE APRENDEU!")}<button class="btn" id="cont">VAMOS LÁ! 🏆</button><button class="sound" id="fsound">🔊 SOM DE GRANDE FINAL</button></section>`;victorySound();document.querySelector("#fsound").onclick=victorySound;document.querySelector("#cont").onclick=()=>{state.screen="game";state.order=null;render()}}

// ===== ENVIO DOS RESULTADOS — 6º ANO =====
const URL_RESULTADOS = "https://script.google.com/macros/s/AKfycbyqgOPIXzoP7nhlD8TcAMjW_o3hdx0EL-nz6-Blq24PKFqRusLU8-YfTOBUpm7p65PA/exec";

async function enviarResultadoFinal(dados){
  if(localStorage.getItem("resultadoRecMat6Enviado")==="sim") return;
  try{
    await fetch(URL_RESULTADOS,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(dados)
    });
    localStorage.setItem("resultadoRecMat6Enviado","sim");
  }catch(erro){
    console.error("Erro ao enviar resultado:",erro);
  }
}

function final(){
  let max=maxRecovery(state.average),
      rec=Math.round((state.xp/300)*max*100)/100,
      fa=Math.min(10,Math.round((state.average+rec)*100)/100),
      per=state.history.filter(h=>h.skill.startsWith("PERÍMETRO")),
      vol=state.history.filter(h=>h.skill.startsWith("VOLUME")),
      pct=a=>a.length?Math.round(a.filter(x=>x.correct).length/a.length*100):0,
      pp=pct(per), pv=pct(vol);

  enviarResultadoFinal({
    nome:state.name, mediaAnterior:state.average, xp:state.xp, vidas:state.lives,
    pontosRecuperados:rec, mediaFinal:fa, perimetro:pp+"%", volume:pv+"%"
  });

  app.innerHTML=`<section class="card center final-card"><div class="trophy">🏆</div><h1>MISSÃO CONCLUÍDA!</h1>${guideBox(`PARABÉNS, ${state.name}! VOCÊ TERMINOU AS 10 MISSÕES. VEJA O QUE VOCÊ CONQUISTOU!`)}<button class="sound" id="again">🔊 OUVIR VITÓRIA NOVAMENTE</button><div class="stats"><div class="stat"><b>⭐ ${state.xp}/300</b>XP</div><div class="stat"><b>❤️ ${state.lives}/10</b>VIDAS</div><div class="stat"><b>+${fmt(rec)}</b>PONTOS</div></div><p>MÉDIA ANTERIOR: <b>${fmt(state.average)}</b></p><div class="final">${fmt(fa)}</div><p><b>NOVA MÉDIA</b></p><div class="stats"><div class="stat"><b>${pp}%</b>PERÍMETRO</div><div class="stat"><b>${pv}%</b>VOLUME</div><div class="stat"><b>${fmt(max)}</b>MÁXIMO DA RECUPERAÇÃO</div></div><p class="note">📤 RESULTADO ENVIADO PARA A PROFESSORA.</p><button class="btn secondary" id="restart">RECOMEÇAR DO ZERO</button></section>`;

  setTimeout(()=>{victorySound();speak(`Missão concluída! Parabéns, ${state.name}! Você completou as dez missões!`)},250);
  document.querySelector("#again").onclick=()=>{victorySound();speak(`Missão concluída! Parabéns, ${state.name}! Você completou as dez missões!`)};
  document.querySelector("#restart").onclick=()=>{
    if(confirm("APAGAR O PROGRESSO E RECOMEÇAR?")){
      localStorage.removeItem("operacaoReconstrucao6AnoV6");
      localStorage.removeItem("resultadoRecMat6Enviado");
      location.reload();
    }
  };
}

render();
