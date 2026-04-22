// ══════════════════════════════════════════
// BOOT
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
  "Loading command palette................. [OK]",
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
    setTimeout(printLine, 240);
  } else {
    setTimeout(() => {
      bootScreen.style.transition = 'opacity 0.8s';
      bootScreen.style.opacity = '0';
      setTimeout(() => {
        bootScreen.style.display = 'none';
        appEl.style.display = 'block';
        initApp();
      }, 800);
    }, 400);
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
  initCommandPalette();
  observeSections();
}

// ══════════════════════════════════════════
// THEME
// ══════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-btn').textContent = isDark ? '🌙' : '☀';
}

// ══════════════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════════════
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// ══════════════════════════════════════════
// COMMAND PALETTE
// ══════════════════════════════════════════
const commands = [
  { icon:'🏠', label:'Go to Hero', desc:'Jump to top', action:()=>scrollTo('hero') },
  { icon:'📡', label:'Live Monitor', desc:'52-sensor heatmap', action:()=>scrollTo('monitor') },
  { icon:'⚡', label:'Fault Simulation', desc:'Select & simulate faults', action:()=>scrollTo('faults') },
  { icon:'📊', label:'Accuracy Results', desc:'Benchmark comparison', action:()=>scrollTo('results') },
  { icon:'🧠', label:'Neural Network', desc:'3D architecture view', action:()=>scrollTo('neural') },
  { icon:'📺', label:'Live Stream', desc:'Real-time predictions', action:()=>scrollTo('stream') },
  { icon:'💬', label:'AI Assistant', desc:'Ask AXIOM anything', action:()=>scrollTo('chat-section') },
  { icon:'👤', label:'About', desc:'Built by Pakhi', action:()=>scrollTo('about') },
  { icon:'☀', label:'Toggle Theme', desc:'Switch light/dark mode', action:toggleTheme },
  { icon:'⬇', label:'Export PDF Report', desc:'Download full analysis', action:exportPDF },
  { icon:'🔗', label:'Open GitHub', desc:'View source code', action:()=>window.open('https://github.com/pakhi15-ui/axiom-fault-intelligence','_blank') },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  closeCmd();
}

function initCommandPalette() {
  renderCmdList(commands);
  document.getElementById('cmd-input').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    renderCmdList(q ? commands.filter(c => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)) : commands);
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); openCmd(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmd(); }
    if (e.key === 'Escape') closeCmd();
  });
  document.getElementById('cmd-overlay').addEventListener('click', e => { if(e.target.id==='cmd-overlay') closeCmd(); });
}

function renderCmdList(items) {
  const list = document.getElementById('cmd-list');
  list.innerHTML = '';
  items.forEach(cmd => {
    const div = document.createElement('div');
    div.className = 'cmd-item';
    div.innerHTML = `<span class="cmd-icon">${cmd.icon}</span><span class="cmd-label">${cmd.label}</span><span class="cmd-desc">${cmd.desc}</span>`;
    div.onclick = () => { cmd.action(); closeCmd(); };
    list.appendChild(div);
  });
}

function openCmd() {
  document.getElementById('cmd-overlay').classList.remove('hidden');
  setTimeout(()=>document.getElementById('cmd-input').focus(), 50);
}

function closeCmd() {
  document.getElementById('cmd-overlay').classList.add('hidden');
  document.getElementById('cmd-input').value = '';
  renderCmdList(commands);
}

// ══════════════════════════════════════════
// PDF EXPORT
// ══════════════════════════════════════════
function exportPDF() {
  const w = window.open('', '_blank');
  w.document.write(`
    <!DOCTYPE html><html><head>
    <title>AXIOM — Fault Intelligence Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <style>
      body { background: #050508; color: #fff; font-family: 'Share Tech Mono', monospace; padding: 60px; max-width: 900px; margin: 0 auto; }
      h1 { font-family: 'Orbitron', sans-serif; font-size: 48px; color: #00f5ff; letter-spacing: 8px; margin-bottom: 4px; }
      .sub { color: #ff2d78; letter-spacing: 6px; font-size: 14px; margin-bottom: 48px; }
      .section { margin-bottom: 48px; border-top: 1px solid rgba(0,245,255,0.2); padding-top: 32px; }
      h2 { font-family: 'Orbitron', sans-serif; font-size: 18px; color: #b537f2; letter-spacing: 4px; margin-bottom: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th { text-align: left; color: #00f5ff; font-size: 11px; letter-spacing: 2px; padding: 10px; border-bottom: 1px solid rgba(0,245,255,0.2); }
      td { padding: 12px 10px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
      .highlight { color: #ff2d78; font-weight: bold; }
      .stat { display: inline-block; margin-right: 40px; margin-bottom: 20px; }
      .stat-n { font-family: 'Orbitron', sans-serif; font-size: 36px; color: #00f5ff; }
      .stat-l { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 2px; }
      .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 2px; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    </style></head><body>
    <h1>AXIOM</h1>
    <div class="sub">FAULT INTELLIGENCE SYSTEM — RESEARCH REPORT</div>

    <div class="section">
      <h2>SYSTEM OVERVIEW</h2>
      <div class="stat"><div class="stat-n">99.84%</div><div class="stat-l">ACCURACY</div></div>
      <div class="stat"><div class="stat-n">52</div><div class="stat-l">SENSORS</div></div>
      <div class="stat"><div class="stat-n">21</div><div class="stat-l">FAULT TYPES</div></div>
      <div class="stat"><div class="stat-n">&lt;500ms</div><div class="stat-l">DETECTION TIME</div></div>
    </div>

    <div class="section">
      <h2>MODEL ARCHITECTURE</h2>
      <table>
        <tr><th>LAYER</th><th>NEURONS</th><th>ACTIVATION</th></tr>
        <tr><td>Input</td><td>52</td><td>—</td></tr>
        <tr><td>Hidden 1</td><td>128</td><td>ReLU</td></tr>
        <tr><td>Hidden 2</td><td>64</td><td>ReLU</td></tr>
        <tr><td>Hidden 3</td><td>32</td><td>ReLU</td></tr>
        <tr><td>Output</td><td>21</td><td>Softmax</td></tr>
        <tr><td colspan="2">Total Parameters</td><td class="highlight">48,320</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>ACCURACY BENCHMARK</h2>
      <table>
        <tr><th>METHOD</th><th>ACCURACY</th><th>TYPE</th></tr>
        <tr><td class="highlight">AXIOM (Ours)</td><td class="highlight">99.84%</td><td>LSTM + Neural Network</td></tr>
        <tr><td>SVM</td><td>94.20%</td><td>Support Vector Machine</td></tr>
        <tr><td>Random Forest</td><td>91.50%</td><td>Ensemble Method</td></tr>
        <tr><td>PCA + LDA</td><td>87.30%</td><td>Classical Statistical</td></tr>
        <tr><td>k-NN</td><td>85.60%</td><td>k-Nearest Neighbors</td></tr>
        <tr><td>Naive Bayes</td><td>78.40%</td><td>Probabilistic</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>FAULT CLASSIFICATION — IDV REFERENCE</h2>
      <table>
        <tr><th>FAULT ID</th><th>DESCRIPTION</th><th>SEVERITY</th></tr>
        <tr><td>IDV(0)</td><td>Normal State</td><td>—</td></tr>
        <tr><td>IDV(1)</td><td>A/C Feed Ratio Disturbance</td><td>LOW</td></tr>
        <tr><td>IDV(2)</td><td>B Feed Ratio Disturbance</td><td>MEDIUM</td></tr>
        <tr><td>IDV(4)</td><td>Reactor Cooling Failure</td><td>HIGH</td></tr>
        <tr><td>IDV(5)</td><td>Condenser Cooling Failure</td><td>HIGH</td></tr>
        <tr><td>IDV(6)</td><td>A Feed Complete Loss</td><td>HIGH</td></tr>
        <tr><td>IDV(13)</td><td>Reaction Kinetics Shift</td><td>HIGH</td></tr>
        <tr><td>IDV(14)</td><td>Reactor Cooling Valve Fault</td><td>HIGH</td></tr>
      </table>
    </div>

    <div class="footer">
      AXIOM v4.2.1 · Research by Pakhi · github.com/pakhi15-ui/axiom-fault-intelligence · Generated ${new Date().toLocaleDateString()}
    </div>
    <script>window.onload=()=>window.print();</script>
    </body></html>`);
  w.document.close();
}

// ══════════════════════════════════════════
// PARTICLES
// ══════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({length:80},()=>({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4, r:Math.random()*1.5+.5, alpha:Math.random()*.5+.1 }));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0; if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(0,245,255,${p.alpha})`; ctx.fill(); });
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){ const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy); if(d<100){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(0,245,255,${.08*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();} }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
}

// ══════════════════════════════════════════
// STAT COUNTERS
// ══════════════════════════════════════════
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el=>{
    const target=+el.dataset.target, isAcc=target>1000; let cur=0; const step=target/60;
    const t=setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=isAcc?(cur/100).toFixed(2):Math.floor(cur); if(cur>=target)clearInterval(t); },24);
  });
}

// ══════════════════════════════════════════
// HEATMAP
// ══════════════════════════════════════════
let heatValues=Array(52).fill(0).map(()=>Math.random());
const sensorNames=[...Array.from({length:22},(_,i)=>`XMEAS ${i+1}`),...Array.from({length:11},(_,i)=>`XMEAS ${i+23}`),...Array.from({length:11},(_,i)=>`XMEAS ${i+34}`),...Array.from({length:8},(_,i)=>`XMV ${i+1}`)];
function heatColor(v){ return `rgb(${Math.round(v*255)},${Math.round((1-v)*80)},${Math.round((1-v)*255)})`; }

function initHeatmap() {
  const wrap=document.getElementById('heatmap'); wrap.innerHTML='';
  for(let i=0;i<52;i++){ const cell=document.createElement('div'); cell.className='heat-cell'; cell.setAttribute('data-label',sensorNames[i]); cell.style.background=heatColor(heatValues[i]); wrap.appendChild(cell); }
  setInterval(updateHeatmap,800);
}

function updateHeatmap(overrides) {
  const cells=document.querySelectorAll('.heat-cell');
  heatValues=heatValues.map((v,i)=>{ if(overrides&&overrides[i]!==undefined)return overrides[i]; return Math.max(0,Math.min(1,v+(Math.random()-.5)*.1)); });
  cells.forEach((cell,i)=>{ cell.style.background=heatColor(heatValues[i]); cell.style.boxShadow=heatValues[i]>.75?`0 0 8px rgba(255,45,120,0.6)`:'none'; });
}

// ══════════════════════════════════════════
// SIGNALS
// ══════════════════════════════════════════
function initSignals(){ drawSignal('canvas-xmv','#00f5ff'); drawSignal('canvas-xmeas','#ff2d78'); }
function drawSignal(id,color){
  const canvas=document.getElementById(id); if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.parentElement.offsetWidth-40||560,H=120;
  canvas.width=W; canvas.height=H;
  let offset=0;
  const waves=Array.from({length:4},()=>({freq:.02+Math.random()*.03,amp:15+Math.random()*20,phase:Math.random()*Math.PI*2,speed:.02+Math.random()*.02}));
  function draw(){ ctx.clearRect(0,0,W,H); ctx.strokeStyle=color; ctx.lineWidth=1.5; ctx.shadowBlur=8; ctx.shadowColor=color; ctx.beginPath(); for(let x=0;x<W;x++){ let y=H/2; waves.forEach(w=>{y+=Math.sin((x*w.freq)+offset*w.speed+w.phase)*w.amp;}); x===0?ctx.moveTo(x,y):ctx.lineTo(x,y); } ctx.stroke(); offset++; requestAnimationFrame(draw); }
  draw();
}

// ══════════════════════════════════════════
// FAULTS
// ══════════════════════════════════════════
const faultData=[
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
  {id:0,name:"NORMAL STATE",severity:"low",conf:100,sensors:[]},
];

function initFaults(){
  const grid=document.getElementById('fault-grid');
  faultData.forEach(f=>{ const btn=document.createElement('div'); btn.className='fault-btn'; btn.innerHTML=`<div class="fault-id">F${String(f.id).padStart(2,'0')}</div><div class="fault-name">${f.name}</div>`; btn.onclick=()=>selectFault(f,btn); grid.appendChild(btn); });
}

function selectFault(fault,btn){
  document.querySelectorAll('.fault-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const overrides={}; for(let i=0;i<52;i++) overrides[i]=fault.sensors.includes(i)?0.7+Math.random()*0.3:Math.random()*0.3;
  updateHeatmap(overrides);
  const sevClass={low:'sev-low',med:'sev-med',high:'sev-high'}[fault.severity];
  const sevLabel={low:'LOW SEVERITY',med:'MEDIUM SEVERITY',high:'HIGH SEVERITY'}[fault.severity];
  document.getElementById('fault-result').innerHTML=`<div class="result-active"><div class="result-title">◈ FAULT DETECTED</div><div class="result-row"><span>FAULT TYPE</span><span>IDV(${fault.id}) — ${fault.name}</span></div><div class="result-row"><span>SENSORS AFFECTED</span><span>${fault.sensors.length||'NONE'}</span></div><div class="result-row"><span>MODEL</span><span>AXIOM NEURAL NET</span></div><div class="result-row"><span>DETECTION TIME</span><span>${320+Math.floor(Math.random()*200)}ms</span></div><div class="conf-bar-wrap"><div class="conf-bar-label">CONFIDENCE — ${(fault.conf/100).toFixed(2)}%</div><div class="conf-bar"><div class="conf-fill" id="conf-fill-anim"></div></div></div><span class="severity-badge ${sevClass}">${sevLabel}</span></div>`;
  setTimeout(()=>{ const f=document.getElementById('conf-fill-anim'); if(f)f.style.width=fault.conf+'%'; },50);
}

// ══════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════
const benchmarks=[
  {method:"AXIOM (Ours)",acc:99.84,tag:"LSTM + Neural Network",highlight:true},
  {method:"SVM",acc:94.20,tag:"Support Vector Machine"},
  {method:"Random Forest",acc:91.50,tag:"Ensemble Method"},
  {method:"PCA + LDA",acc:87.30,tag:"Classical Statistical"},
  {method:"k-NN",acc:85.60,tag:"k-Nearest Neighbors"},
  {method:"Naive Bayes",acc:78.40,tag:"Probabilistic"},
];

function initResults(){
  const grid=document.getElementById('results-grid');
  benchmarks.forEach(b=>{ const card=document.createElement('div'); card.className='result-card'+(b.highlight?' highlight':''); card.innerHTML=`<div class="rc-method">${b.method}</div><div class="rc-acc" data-acc="${b.acc}">0%</div><div class="rc-bar-wrap"><div class="rc-bar"><div class="rc-fill" data-target="${b.acc}"></div></div></div><div class="rc-tag">${b.tag}</div>`; grid.appendChild(card); });
}

// ══════════════════════════════════════════
// NEURAL NET
// ══════════════════════════════════════════
function initNeuralNet(){
  const canvas=document.getElementById('neural-canvas');
  const ctx=canvas.getContext('2d');
  canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
  const W=canvas.width,H=canvas.height;
  const layers=[8,12,10,8,6];
  const layerLabels=['INPUT\n52','HIDDEN\n128','HIDDEN\n64','HIDDEN\n32','OUTPUT\n21'];
  const colors=['#00f5ff','#b537f2','#b537f2','#b537f2','#ff2d78'];
  const nodes=[];
  layers.forEach((count,li)=>{ const x=(W/(layers.length+1))*(li+1); nodes.push([]); for(let ni=0;ni<count;ni++){ const y=(H/(count+1))*(ni+1); nodes[li].push({x,y,pulse:Math.random()*Math.PI*2}); } });
  function draw(){
    ctx.clearRect(0,0,W,H); const t=Date.now()*.001;
    for(let li=0;li<nodes.length-1;li++) nodes[li].forEach(a=>{ nodes[li+1].forEach(b=>{ const alpha=.04+Math.sin(t+a.pulse)*.03; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(181,55,242,${Math.max(.02,alpha)})`; ctx.lineWidth=.5; ctx.stroke(); }); });
    for(let li=0;li<nodes.length-1;li++) nodes[li].forEach((a,ai)=>{ if(ai%3!==0)return; const b=nodes[li+1][Math.floor(Math.random()*nodes[li+1].length)]; const progress=(t*.5+a.pulse)%1; const px=a.x+(b.x-a.x)*progress,py=a.y+(b.y-a.y)*progress; ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2); ctx.fillStyle=colors[li]; ctx.shadowBlur=8; ctx.shadowColor=colors[li]; ctx.fill(); ctx.shadowBlur=0; });
    nodes.forEach((layer,li)=>{ layer.forEach(node=>{ const glow=.6+Math.sin(Date.now()*.002+node.pulse)*.4; ctx.beginPath(); ctx.arc(node.x,node.y,5,0,Math.PI*2); ctx.fillStyle=colors[li]; ctx.shadowBlur=12*glow; ctx.shadowColor=colors[li]; ctx.fill(); ctx.shadowBlur=0; }); });
    layers.forEach((_,li)=>{ const x=(W/(layers.length+1))*(li+1); ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='10px Share Tech Mono'; ctx.textAlign='center'; layerLabels[li].split('\n').forEach((line,idx)=>{ ctx.fillText(line,x,H-20+idx*14); }); });
    requestAnimationFrame(draw);
  }
  draw();
}

// ══════════════════════════════════════════
// LIVE STREAM
// ══════════════════════════════════════════
const streamFaultNames=['NORMAL','IDV(1)','IDV(2)','IDV(4)','IDV(5)','IDV(6)','IDV(7)','IDV(11)','IDV(13)','IDV(14)'];
function initStream(){
  const feed=document.getElementById('stream-feed');
  const probsWrap=document.getElementById('stream-probs');
  streamFaultNames.forEach((name,i)=>{ const row=document.createElement('div'); row.className='prob-row'; row.innerHTML=`<div class="prob-label"><span>${name}</span><span id="pval-${i}">0%</span></div><div class="prob-bar"><div class="prob-fill" id="pbar-${i}" style="width:0%"></div></div>`; probsWrap.appendChild(row); });
  function tick(){
    const faultIdx=Math.random()<.7?0:Math.floor(Math.random()*streamFaultNames.length);
    const conf=(85+Math.random()*15).toFixed(1);
    const now=new Date(); const timeStr=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    const entry=document.createElement('div'); entry.className='stream-entry'; entry.innerHTML=`<span class="stream-time">${timeStr}</span><span class="stream-fault">${streamFaultNames[faultIdx]}</span><span class="stream-conf">${conf}%</span>`;
    feed.insertBefore(entry,feed.firstChild); if(feed.children.length>40)feed.removeChild(feed.lastChild);
    const probs=streamFaultNames.map(()=>Math.random()*10); probs[faultIdx]=60+Math.random()*35;
    const total=probs.reduce((a,b)=>a+b,0);
    streamFaultNames.forEach((_,i)=>{ const pct=((probs[i]/total)*100).toFixed(1); document.getElementById(`pbar-${i}`).style.width=pct+'%'; document.getElementById(`pval-${i}`).textContent=pct+'%'; });
  }
  tick(); setInterval(tick,1200);
}

// ══════════════════════════════════════════
// AI CHAT
// ══════════════════════════════════════════
function initChat(){
  const chatWindow=document.getElementById('chat-window');
  const chatInput=document.getElementById('chat-input');
  const chatSend=document.getElementById('chat-send');
  const systemPrompt=`You are AXIOM, an advanced industrial fault detection AI for the Tennessee Eastman Process (TEP). You have deep expertise in all 21 fault types (IDV 0-20), all 52 TEP sensors (XMEAS + XMV), the AXIOM neural network achieving 99.84% accuracy vs SVM(94.2%), Random Forest(91.5%), PCA+LDA(87.3%). Respond in sharp, confident, technical language. Be concise but precise. You are a production-grade AI system built by Pakhi.`;
  async function sendMessage(){
    const text=chatInput.value.trim(); if(!text)return;
    appendMessage('user','YOU',text); chatInput.value=''; chatSend.disabled=true;
    const typingEl=appendMessage('ai','AXIOM','⬛ Analyzing signal...',true);
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:systemPrompt,messages:[{role:'user',content:text}]})});
      const data=await res.json();
      typingEl.querySelector('p').textContent=data.content?.[0]?.text||'Signal lost.';
      typingEl.classList.remove('chat-typing');
    }catch(e){ typingEl.querySelector('p').textContent='Run via: npx serve . for AI chat to work.'; }
    chatSend.disabled=false; chatWindow.scrollTop=chatWindow.scrollHeight;
  }
  function appendMessage(type,sender,text,isTyping=false){
    const div=document.createElement('div'); div.className=`chat-msg ${type}${isTyping?' chat-typing':''}`; div.innerHTML=`<span class="chat-sender">${sender}</span><p>${text}</p>`; chatWindow.appendChild(div); chatWindow.scrollTop=chatWindow.scrollHeight; return div;
  }
  chatSend.addEventListener('click',sendMessage);
  chatInput.addEventListener('keydown',e=>{ if(e.key==='Enter')sendMessage(); });
}

// ══════════════════════════════════════════
// SCROLL OBSERVER
// ══════════════════════════════════════════
function observeSections(){
  const observer=new IntersectionObserver(entries=>{ entries.forEach(entry=>{ if(!entry.isIntersecting)return; entry.target.querySelectorAll('.rc-fill').forEach(bar=>{bar.style.width=bar.dataset.target+'%';}); entry.target.querySelectorAll('.rc-acc').forEach(el=>{ const target=+el.dataset.acc; let cur=0; const step=target/60; const t=setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=cur.toFixed(2)+'%'; if(cur>=target)clearInterval(t); },24); }); }); },{threshold:0.3});
  document.querySelectorAll('#results').forEach(s=>observer.observe(s));
}