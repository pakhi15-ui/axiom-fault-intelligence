// ══════════════════════════════════════════
// BOOT SEQUENCE
// ══════════════════════════════════════════
const bootLines = [
  "AXIOM v4.2.1 — FAULT INTELLIGENCE SYSTEM",
  "Loading neural core weights............. [OK]",
  "Initializing 52-sensor array............ [OK]",
  "Connecting to TEP process stream........ [OK]",
  "Calibrating fault classifier............ [OK]",
  "Loading LSTM temporal encoder........... [OK]",
  "Mounting 3D neural renderer............. [OK]",
  "Starting live prediction stream......... [OK]",
  "Validating model integrity.............. [OK]",
  "Accuracy benchmark: 99.84%.............. [VERIFIED]",
  "All systems nominal. Launching AXIOM...",
];

const bootLinesEl = document.getElementById('boot-lines');
const bootFill = document.getElementById('boot-fill');
const bootScreen = document.getElementById('boot');
const appEl = document.getElementById('app');
let lineIdx = 0;

function printLine() {
  if (lineIdx < bootLines.length) {
    const p = document.createElement('p');
    p.textContent = '> ' + bootLines[lineIdx];
    bootLinesEl.appendChild(p);
    lineIdx++;
    bootFill.style.width = (lineIdx / bootLines.length * 100) + '%';
    setTimeout(printLine, 260);
  } else {
    setTimeout(() => {
      bootScreen.style.transition = 'opacity 0.8s';
      bootScreen.style.opacity = '0';
      setTimeout(() => {
        bootScreen.style.display = 'none';
        appEl.style.display = 'block';
        initApp();
      }, 800);
    }, 500);
  }
}
setTimeout(printLine, 300);

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
function initApp() {
  initParticles();
  animateStats();
  initHeatmap();
  initSignals();
  initFaults();
  initResults();
  initNeuralNet();
  initStream();
  initChat();
  observeSections();
}

// ══════════════════════════════════════════
// PARTICLES
// ══════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = Array.from({length: 80}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
    r: Math.random()*1.5+0.5, alpha: Math.random()*0.5+0.1
  }));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,245,255,${p.alpha})`; ctx.fill();
    });
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,245,255,${0.08*(1-d/100)})`; ctx.lineWidth=0.5; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
}

// ══════════════════════════════════════════
// STAT COUNTERS
// ══════════════════════════════════════════
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    const isAcc = target > 1000;
    let cur = 0; const step = target/60;
    const t = setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=isAcc?(cur/100).toFixed(2):Math.floor(cur); if(cur>=target)clearInterval(t); },24);
  });
}

// ══════════════════════════════════════════
// HEATMAP
// ══════════════════════════════════════════
let heatValues = Array(52).fill(0).map(()=>Math.random());
const sensorNames = [
  ...Array.from({length:22},(_,i)=>`XMEAS ${i+1}`),
  ...Array.from({length:11},(_,i)=>`XMEAS ${i+23}`),
  ...Array.from({length:11},(_,i)=>`XMEAS ${i+34}`),
  ...Array.from({length:8}, (_,i)=>`XMV ${i+1}`),
];
function heatColor(v){ return `rgb(${Math.round(v*255)},${Math.round((1-v)*80)},${Math.round((1-v)*255)})`; }

function initHeatmap() {
  const wrap = document.getElementById('heatmap');
  wrap.innerHTML='';
  for(let i=0;i<52;i++){
    const cell=document.createElement('div');
    cell.className='heat-cell'; cell.setAttribute('data-label',sensorNames[i]);
    cell.style.background=heatColor(heatValues[i]);
    wrap.appendChild(cell);
  }
  setInterval(updateHeatmap,800);
}

function updateHeatmap(overrides) {
  const cells=document.querySelectorAll('.heat-cell');
  heatValues=heatValues.map((v,i)=>{ if(overrides&&overrides[i]!==undefined)return overrides[i]; return Math.max(0,Math.min(1,v+(Math.random()-0.5)*0.1)); });
  cells.forEach((cell,i)=>{ cell.style.background=heatColor(heatValues[i]); cell.style.boxShadow=heatValues[i]>0.75?`0 0 8px rgba(255,45,120,0.6)`:'none'; });
}

// ══════════════════════════════════════════
// SIGNALS
// ══════════════════════════════════════════
function initSignals() { drawSignal('canvas-xmv','#00f5ff'); drawSignal('canvas-xmeas','#ff2d78'); }
function drawSignal(id,color) {
  const canvas=document.getElementById(id); if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.parentElement.offsetWidth-40||560, H=120;
  canvas.width=W; canvas.height=H;
  let offset=0;
  const waves=Array.from({length:4},()=>({ freq:0.02+Math.random()*0.03, amp:15+Math.random()*20, phase:Math.random()*Math.PI*2, speed:0.02+Math.random()*0.02 }));
  function draw(){
    ctx.clearRect(0,0,W,H); ctx.strokeStyle=color; ctx.lineWidth=1.5; ctx.shadowBlur=8; ctx.shadowColor=color;
    ctx.beginPath();
    for(let x=0;x<W;x++){ let y=H/2; waves.forEach(w=>{ y+=Math.sin((x*w.freq)+offset*w.speed+w.phase)*w.amp; }); x===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.stroke(); offset++; requestAnimationFrame(draw);
  }
  draw();
}

// ══════════════════════════════════════════
// FAULTS
// ══════════════════════════════════════════
const faultData = [
  {id:1,name:"A/C Feed Ratio",severity:"low",conf:99,sensors:[0,1,2,3]},
  {id:2,name:"B Feed Ratio",severity:"med",conf:98,sensors:[4,5,6,7]},
  {id:3,name:"D Feed Temp",severity:"low",conf:99,sensors:[8,9,10]},
  {id:4,name:"Reactor Cooling",severity:"high",conf:97,sensors:[11,12,13,14,15]},
  {id:5,name:"Condenser Cooling",severity:"high",conf:96,sensors:[16,17,18,19]},
  {id:6,name:"A Feed Loss",severity:"high",conf:99,sensors:[20,21,22]},
  {id:7,name:"C Header Pressure",severity:"med",conf:98,sensors:[23,24,25]},
  {id:8,name:"A/B/C Feed Comp",severity:"med",conf:97,sensors:[26,27,28,29]},
  {id:9,name:"D Feed Temp Var",severity:"low",conf:99,sensors:[30,31,32]},
  {id:10,name:"C Feed Temp",severity:"low",conf:98,sensors:[33,34,35]},
  {id:11,name:"Reactor Cooling Var",severity:"high",conf:96,sensors:[36,37,38,39]},
  {id:12,name:"Condenser Cooling Var",severity:"high",conf:97,sensors:[40,41,42]},
  {id:13,name:"Reaction Kinetics",severity:"high",conf:95,sensors:[43,44,45,46]},
  {id:14,name:"Reactor Cooling Valve",severity:"high",conf:99,sensors:[47,48,49]},
  {id:15,name:"Condenser Valve",severity:"high",conf:98,sensors:[50,51]},
  {id:16,name:"Unknown Fault 1",severity:"med",conf:93,sensors:[0,10,20,30]},
  {id:17,name:"Unknown Fault 2",severity:"med",conf:94,sensors:[5,15,25,35]},
  {id:18,name:"Unknown Fault 3",severity:"low",conf:96,sensors:[2,12,22,32]},
  {id:19,name:"Unknown Fault 4",severity:"low",conf:97,sensors:[7,17,27,37]},
  {id:20,name:"Unknown Fault 5",severity:"med",conf:95,sensors:[3,13,23,33]},
  {id:0, name:"NORMAL STATE",severity:"low",conf:100,sensors:[]},
];

function initFaults() {
  const grid=document.getElementById('fault-grid');
  faultData.forEach(f=>{
    const btn=document.createElement('div'); btn.className='fault-btn';
    btn.innerHTML=`<div class="fault-id">F${String(f.id).padStart(2,'0')}</div><div class="fault-name">${f.name}</div>`;
    btn.onclick=()=>selectFault(f,btn); grid.appendChild(btn);
  });
}

function selectFault(fault,btn) {
  document.querySelectorAll('.fault-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const overrides={};
  for(let i=0;i<52;i++) overrides[i]=fault.sensors.includes(i)?0.7+Math.random()*0.3:Math.random()*0.3;
  updateHeatmap(overrides);
  const sevClass={low:'sev-low',med:'sev-med',high:'sev-high'}[fault.severity];
  const sevLabel={low:'LOW SEVERITY',med:'MEDIUM SEVERITY',high:'HIGH SEVERITY'}[fault.severity];
  document.getElementById('fault-result').innerHTML=`
    <div class="result-active">
      <div class="result-title">◈ FAULT DETECTED</div>
      <div class="result-row"><span>FAULT TYPE</span><span>IDV(${fault.id}) — ${fault.name}</span></div>
      <div class="result-row"><span>SENSORS AFFECTED</span><span>${fault.sensors.length||'NONE'}</span></div>
      <div class="result-row"><span>MODEL</span><span>AXIOM NEURAL NET</span></div>
      <div class="result-row"><span>DETECTION TIME</span><span>${320+Math.floor(Math.random()*200)}ms</span></div>
      <div class="conf-bar-wrap">
        <div class="conf-bar-label">CONFIDENCE — ${(fault.conf/100).toFixed(2)}%</div>
        <div class="conf-bar"><div class="conf-fill" id="conf-fill-anim"></div></div>
      </div>
      <span class="severity-badge ${sevClass}">${sevLabel}</span>
    </div>`;
  setTimeout(()=>{ const f=document.getElementById('conf-fill-anim'); if(f)f.style.width=fault.conf+'%'; },50);
}

// ══════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════
const benchmarks = [
  {method:"AXIOM (Ours)",acc:99.84,tag:"LSTM + Neural Network",highlight:true},
  {method:"SVM",acc:94.20,tag:"Support Vector Machine"},
  {method:"Random Forest",acc:91.50,tag:"Ensemble Method"},
  {method:"PCA + LDA",acc:87.30,tag:"Classical Statistical"},
  {method:"k-NN",acc:85.60,tag:"k-Nearest Neighbors"},
  {method:"Naive Bayes",acc:78.40,tag:"Probabilistic"},
];

function initResults() {
  const grid=document.getElementById('results-grid');
  benchmarks.forEach(b=>{
    const card=document.createElement('div');
    card.className='result-card'+(b.highlight?' highlight':'');
    card.innerHTML=`<div class="rc-method">${b.method}</div><div class="rc-acc" data-acc="${b.acc}">0%</div><div class="rc-bar-wrap"><div class="rc-bar"><div class="rc-fill" data-target="${b.acc}"></div></div></div><div class="rc-tag">${b.tag}</div>`;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════
// 3D NEURAL NETWORK (Canvas 2D perspective)
// ══════════════════════════════════════════
function initNeuralNet() {
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const W = canvas.width, H = canvas.height;

  const layers = [8, 12, 10, 8, 6]; // visual representation (not actual counts)
  const layerLabels = ['INPUT\n52', 'HIDDEN\n128', 'HIDDEN\n64', 'HIDDEN\n32', 'OUTPUT\n21'];
  const colors = ['#00f5ff','#b537f2','#b537f2','#b537f2','#ff2d78'];

  let angle = 0;
  const nodes = [];

  // build node positions
  layers.forEach((count, li) => {
    const x = (W / (layers.length + 1)) * (li + 1);
    nodes.push([]);
    for (let ni = 0; ni < count; ni++) {
      const y = (H / (count + 1)) * (ni + 1);
      nodes[li].push({ x, y, pulse: Math.random() * Math.PI * 2 });
    }
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.001;

    // draw connections
    for (let li = 0; li < nodes.length - 1; li++) {
      nodes[li].forEach(a => {
        nodes[li+1].forEach(b => {
          const alpha = 0.04 + Math.sin(t + a.pulse) * 0.03;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(181,55,242,${Math.max(0.02,alpha)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });
    }

    // draw animated signal pulses
    for (let li = 0; li < nodes.length - 1; li++) {
      nodes[li].forEach((a, ai) => {
        if (ai % 3 !== 0) return;
        const b = nodes[li+1][Math.floor(Math.random() * nodes[li+1].length)];
        const progress = (t * 0.5 + a.pulse) % 1;
        const px = a.x + (b.x - a.x) * progress;
        const py = a.y + (b.y - a.y) * progress;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI*2);
        ctx.fillStyle = colors[li];
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors[li];
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    // draw nodes
    nodes.forEach((layer, li) => {
      layer.forEach(node => {
        const glow = 0.6 + Math.sin(t * 2 + node.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI*2);
        ctx.fillStyle = colors[li];
        ctx.shadowBlur = 12 * glow;
        ctx.shadowColor = colors[li];
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });

    // draw layer labels
    layers.forEach((_, li) => {
      const x = (W / (layers.length + 1)) * (li + 1);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '10px Share Tech Mono';
      ctx.textAlign = 'center';
      layerLabels[li].split('\n').forEach((line, idx) => {
        ctx.fillText(line, x, H - 20 + idx * 14);
      });
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ══════════════════════════════════════════
// LIVE PREDICTION STREAM
// ══════════════════════════════════════════
const streamFaultNames = ['NORMAL','IDV(1)','IDV(2)','IDV(4)','IDV(5)','IDV(6)','IDV(7)','IDV(11)','IDV(13)','IDV(14)'];

function initStream() {
  const feed = document.getElementById('stream-feed');
  const probsWrap = document.getElementById('stream-probs');

  // init prob bars
  streamFaultNames.forEach((name, i) => {
    const row = document.createElement('div');
    row.className = 'prob-row';
    row.innerHTML = `<div class="prob-label"><span>${name}</span><span id="pval-${i}">0%</span></div><div class="prob-bar"><div class="prob-fill" id="pbar-${i}" style="width:0%"></div></div>`;
    probsWrap.appendChild(row);
  });

  function tick() {
    // generate fake prediction
    const faultIdx = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * streamFaultNames.length);
    const conf = (85 + Math.random() * 15).toFixed(1);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    // add feed entry
    const entry = document.createElement('div');
    entry.className = 'stream-entry';
    entry.innerHTML = `<span class="stream-time">${timeStr}</span><span class="stream-fault">${streamFaultNames[faultIdx]}</span><span class="stream-conf">${conf}%</span>`;
    feed.insertBefore(entry, feed.firstChild);
    if (feed.children.length > 40) feed.removeChild(feed.lastChild);

    // update prob bars
    const probs = streamFaultNames.map(() => Math.random() * 10);
    probs[faultIdx] = 60 + Math.random() * 35;
    const total = probs.reduce((a,b)=>a+b,0);
    streamFaultNames.forEach((_, i) => {
      const pct = ((probs[i]/total)*100).toFixed(1);
      document.getElementById(`pbar-${i}`).style.width = pct + '%';
      document.getElementById(`pval-${i}`).textContent = pct + '%';
    });
  }

  tick();
  setInterval(tick, 1200);
}

// ══════════════════════════════════════════
// AI CHAT
// ══════════════════════════════════════════
function initChat() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  const systemPrompt = `You are AXIOM, an advanced industrial fault detection AI assistant built for the Tennessee Eastman Process (TEP). You have deep expertise in:
- All 21 fault types (IDV 0-20): their causes, affected sensors, severity, and detection strategies
- All 52 TEP sensors: 22 continuous process measurements, 19 composition measurements, 11 manipulated variables
- The AXIOM neural network achieving 99.84% accuracy vs SVM(94.2%), Random Forest(91.5%), PCA+LDA(87.3%)
- LSTM temporal encoding, multi-class fault classification, real-time industrial monitoring
- Research by Pakhi on neural network-based fault detection in chemical processes

Respond in sharp, confident, technical language. Be concise but precise. Reference specific fault IDs (IDV-1 through IDV-20), sensor names (XMEAS, XMV), and metrics when relevant. You are a production-grade AI system, not a generic chatbot.`;

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage('user','YOU',text);
    chatInput.value = '';
    chatSend.disabled = true;
    const typingEl = appendMessage('ai','AXIOM','⬛ Analyzing signal...', true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system: systemPrompt,
          messages:[{role:'user',content:text}]
        })
      });
      const data = await res.json();
      typingEl.querySelector('p').textContent = data.content?.[0]?.text || 'Signal lost.';
      typingEl.classList.remove('chat-typing');
    } catch(e) {
      typingEl.querySelector('p').textContent = 'Connection error. Run via: npx serve .';
    }
    chatSend.disabled = false;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function appendMessage(type, sender, text, isTyping=false) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}${isTyping?' chat-typing':''}`;
    div.innerHTML = `<span class="chat-sender">${sender}</span><p>${text}</p>`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return div;
  }

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });
}

// ══════════════════════════════════════════
// SCROLL OBSERVER
// ══════════════════════════════════════════
function observeSections() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.rc-fill').forEach(bar => { bar.style.width = bar.dataset.target + '%'; });
      entry.target.querySelectorAll('.rc-acc').forEach(el => {
        const target = +el.dataset.acc; let cur = 0; const step = target/60;
        const t = setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=cur.toFixed(2)+'%'; if(cur>=target)clearInterval(t); },24);
      });
    });
  }, {threshold:0.3});
  document.querySelectorAll('#results').forEach(s=>observer.observe(s));
}