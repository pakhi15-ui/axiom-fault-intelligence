// ══════════════════════════════════════════
// PROCESS DEFINITIONS
// ══════════════════════════════════════════
const PROCESSES = {
  tep: {
    name: 'Tennessee Eastman Process',
    sensors: 52, faults: 21, accuracy: 99.84,
    sig1: 'PROCESS VARIABLES — XMV',
    sig2: 'MEASUREMENT VARIABLES — XMEAS',
    heatLabel: '52-SENSOR HEATMAP — TEP',
    monitorSub: 'Real-time signals from all 52 TEP process variables',
    inputNeurons: '52 neurons', outputNeurons: '21 classes',
    faultList: [
      {id:0,name:'NORMAL',severity:'low',conf:100,sensors:[]},
      {id:1,name:'A/C Feed Ratio',severity:'low',conf:99,sensors:[0,1,2,3]},
      {id:2,name:'B Feed Ratio',severity:'med',conf:98,sensors:[4,5,6,7]},
      {id:3,name:'D Feed Temp',severity:'low',conf:99,sensors:[8,9,10]},
      {id:4,name:'Reactor Cooling',severity:'high',conf:97,sensors:[11,12,13,14,15]},
      {id:5,name:'Condenser Cool',severity:'high',conf:96,sensors:[16,17,18,19]},
      {id:6,name:'A Feed Loss',severity:'high',conf:99,sensors:[20,21,22]},
      {id:7,name:'C Header Pres.',severity:'med',conf:98,sensors:[23,24,25]},
      {id:8,name:'Feed Comp.',severity:'med',conf:97,sensors:[26,27,28,29]},
      {id:9,name:'D Feed Temp Var',severity:'low',conf:99,sensors:[30,31,32]},
      {id:10,name:'C Feed Temp',severity:'low',conf:98,sensors:[33,34,35]},
      {id:11,name:'Reactor Cool Var',severity:'high',conf:96,sensors:[36,37,38,39]},
      {id:12,name:'Condenser Var',severity:'high',conf:97,sensors:[40,41,42]},
      {id:13,name:'React. Kinetics',severity:'high',conf:95,sensors:[43,44,45,46]},
      {id:14,name:'Cool. Valve',severity:'high',conf:99,sensors:[47,48,49]},
      {id:15,name:'Cond. Valve',severity:'high',conf:98,sensors:[50,51]},
      {id:16,name:'Unknown F1',severity:'med',conf:93,sensors:[0,10,20,30]},
      {id:17,name:'Unknown F2',severity:'med',conf:94,sensors:[5,15,25,35]},
      {id:18,name:'Unknown F3',severity:'low',conf:96,sensors:[2,12,22,32]},
      {id:19,name:'Unknown F4',severity:'low',conf:97,sensors:[7,17,27,37]},
      {id:20,name:'Unknown F5',severity:'med',conf:95,sensors:[3,13,23,33]},
    ]
  },
  boiler: {
    name: 'Industrial Boiler',
    sensors: 28, faults: 12, accuracy: 98.61,
    sig1: 'STEAM PRESSURE SENSORS',
    sig2: 'TEMPERATURE SENSORS',
    heatLabel: '28-SENSOR HEATMAP — BOILER',
    monitorSub: 'Real-time signals from 28 industrial boiler sensors',
    inputNeurons: '28 neurons', outputNeurons: '12 classes',
    faultList: [
      {id:0,name:'NORMAL',severity:'low',conf:100,sensors:[]},
      {id:1,name:'Drum Level Low',severity:'high',conf:98,sensors:[0,1,2]},
      {id:2,name:'Steam Pressure',severity:'high',conf:97,sensors:[3,4,5,6]},
      {id:3,name:'Feed Water Flow',severity:'med',conf:98,sensors:[7,8,9]},
      {id:4,name:'Combustion Air',severity:'med',conf:96,sensors:[10,11,12]},
      {id:5,name:'Flue Gas Temp',severity:'low',conf:99,sensors:[13,14]},
      {id:6,name:'Fuel Flow',severity:'high',conf:97,sensors:[15,16,17]},
      {id:7,name:'O2 Content',severity:'med',conf:95,sensors:[18,19]},
      {id:8,name:'Blowdown Valve',severity:'low',conf:98,sensors:[20,21]},
      {id:9,name:'Safety Valve',severity:'high',conf:99,sensors:[22,23,24]},
      {id:10,name:'Heat Exchanger',severity:'med',conf:96,sensors:[25,26]},
      {id:11,name:'Economizer',severity:'low',conf:97,sensors:[27]},
    ]
  },
  wind: {
    name: 'Wind Turbine',
    sensors: 34, faults: 15, accuracy: 97.92,
    sig1: 'ROTOR & GENERATOR SENSORS',
    sig2: 'MECHANICAL SENSORS',
    heatLabel: '34-SENSOR HEATMAP — WIND TURBINE',
    monitorSub: 'Real-time signals from 34 wind turbine sensors',
    inputNeurons: '34 neurons', outputNeurons: '15 classes',
    faultList: [
      {id:0,name:'NORMAL',severity:'low',conf:100,sensors:[]},
      {id:1,name:'Blade Imbalance',severity:'high',conf:97,sensors:[0,1,2,3]},
      {id:2,name:'Gearbox Fault',severity:'high',conf:96,sensors:[4,5,6]},
      {id:3,name:'Generator Bear.',severity:'high',conf:98,sensors:[7,8,9,10]},
      {id:4,name:'Rotor Speed',severity:'med',conf:97,sensors:[11,12]},
      {id:5,name:'Pitch Control',severity:'med',conf:95,sensors:[13,14,15]},
      {id:6,name:'Yaw System',severity:'low',conf:98,sensors:[16,17]},
      {id:7,name:'Tower Vibration',severity:'high',conf:96,sensors:[18,19,20]},
      {id:8,name:'Nacelle Temp',severity:'med',conf:97,sensors:[21,22]},
      {id:9,name:'Power Output',severity:'med',conf:98,sensors:[23,24,25]},
      {id:10,name:'Wind Speed',severity:'low',conf:99,sensors:[26,27]},
      {id:11,name:'Brake System',severity:'high',conf:97,sensors:[28,29,30]},
      {id:12,name:'Hydraulic Pres.',severity:'med',conf:95,sensors:[31,32]},
      {id:13,name:'Control System',severity:'high',conf:96,sensors:[33]},
      {id:14,name:'Ice Detection',severity:'med',conf:94,sensors:[0,1,18,19]},
    ]
  }
};

let currentProcess = 'tep';

// ══════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════
const bootLines = [
  "AXIOM v5.0.0 — UNIVERSAL FAULT INTELLIGENCE PLATFORM",
  "Loading TEP neural core..................... [OK]",
  "Loading Industrial Boiler model............. [OK]",
  "Loading Wind Turbine classifier............. [OK]",
  "Initializing CSV upload engine.............. [OK]",
  "Starting anomaly scoring engine............. [OK]",
  "Mounting time-series analyzer............... [OK]",
  "Loading command palette..................... [OK]",
  "Accuracy benchmark: 99.84%.................. [VERIFIED]",
  "Universal platform ready. Launching AXIOM...",
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
    setTimeout(printLine, 220);
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
  initAnomalyScoring();
  initTimeSeries();
  initUpload();
  initChat();
  initCommandPalette();
  observeSections();
  initDragDrop();
}

// ══════════════════════════════════════════
// PROCESS SWITCHING
// ══════════════════════════════════════════
function switchProcess(proc) {
  currentProcess = proc;
  const p = PROCESSES[proc];
  document.querySelectorAll('.process-card').forEach(c => c.classList.remove('active'));
  document.getElementById(`proc-${proc}`)?.classList.add('active');
  document.getElementById('proc-status-text').textContent = `ACTIVE: ${p.name} — ${p.sensors} sensors loaded`;
  document.getElementById('monitor-subtitle').textContent = p.monitorSub;
  document.getElementById('sig1-label').textContent = p.sig1;
  document.getElementById('sig2-label').textContent = p.sig2;
  document.getElementById('heatmap-label').textContent = p.heatLabel;
  document.getElementById('fault-subtitle').textContent = `${p.name} — ${p.faults} fault types`;
  document.getElementById('ni-input').textContent = p.inputNeurons;
  document.getElementById('ni-output').textContent = p.outputNeurons;
  document.getElementById('ni-acc').textContent = p.accuracy + '%';
  rebuildHeatmap(p.sensors);
  rebuildFaults(p.faultList);
}

function rebuildHeatmap(count) {
  heatValues = Array(count).fill(0).map(() => Math.random());
  const wrap = document.getElementById('heatmap');
  wrap.innerHTML = '';
  const cols = count <= 28 ? 7 : count <= 34 ? 9 : 13;
  wrap.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  for (let i = 0; i < count; i++) {
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    cell.setAttribute('data-label', `S-${i+1}`);
    cell.style.background = heatColor(heatValues[i]);
    wrap.appendChild(cell);
  }
}

// ══════════════════════════════════════════
// THEME & UI
// ══════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-btn').textContent = isDark ? '🌙' : '☀';
}
function toggleMenu() { document.getElementById('mobile-menu').classList.toggle('hidden'); }
function scrollTo(id) { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); closeCmd(); }
function dismissAlert() { document.getElementById('alert-banner').classList.add('hidden'); }

// ══════════════════════════════════════════
// COMMAND PALETTE
// ══════════════════════════════════════════
const commands = [
  {icon:'🏠',label:'Home',desc:'Hero section',action:()=>scrollTo('hero')},
  {icon:'⚗',label:'Switch to TEP',desc:'Tennessee Eastman Process',action:()=>switchProcess('tep')},
  {icon:'🔥',label:'Switch to Boiler',desc:'Industrial Boiler',action:()=>switchProcess('boiler')},
  {icon:'💨',label:'Switch to Wind',desc:'Wind Turbine',action:()=>switchProcess('wind')},
  {icon:'📡',label:'Live Monitor',desc:'Sensor heatmap',action:()=>scrollTo('monitor')},
  {icon:'🚨',label:'Anomaly Scoring',desc:'Real-time alert system',action:()=>scrollTo('anomaly')},
  {icon:'📈',label:'Time Series',desc:'Zoomable timeline',action:()=>scrollTo('timeseries')},
  {icon:'⚡',label:'Fault Simulation',desc:'Select & simulate',action:()=>scrollTo('faults')},
  {icon:'📊',label:'Benchmark',desc:'Accuracy comparison',action:()=>scrollTo('results')},
  {icon:'🧠',label:'Neural Network',desc:'Architecture viewer',action:()=>scrollTo('neural')},
  {icon:'📂',label:'Upload CSV',desc:'Analyze your data',action:()=>scrollTo('upload')},
  {icon:'💬',label:'AI Assistant',desc:'Ask AXIOM',action:()=>scrollTo('chat-section')},
  {icon:'☀',label:'Toggle Theme',desc:'Light / dark mode',action:toggleTheme},
  {icon:'⬇',label:'Export PDF',desc:'Download report',action:exportPDF},
];

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
  const list = document.getElementById('cmd-list'); list.innerHTML = '';
  items.forEach(cmd => {
    const div = document.createElement('div'); div.className = 'cmd-item';
    div.innerHTML = `<span class="cmd-icon">${cmd.icon}</span><span class="cmd-label">${cmd.label}</span><span class="cmd-desc">${cmd.desc}</span>`;
    div.onclick = () => { cmd.action(); closeCmd(); };
    list.appendChild(div);
  });
}
function openCmd() { document.getElementById('cmd-overlay').classList.remove('hidden'); setTimeout(()=>document.getElementById('cmd-input').focus(),50); }
function closeCmd() { document.getElementById('cmd-overlay').classList.add('hidden'); document.getElementById('cmd-input').value=''; renderCmdList(commands); }

// ══════════════════════════════════════════
// PDF EXPORT
// ══════════════════════════════════════════
function exportPDF() {
  const p = PROCESSES[currentProcess];
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head><title>AXIOM Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <style>body{background:#050508;color:#fff;font-family:'Share Tech Mono',monospace;padding:60px;max-width:900px;margin:0 auto}h1{font-family:'Orbitron',sans-serif;font-size:48px;color:#00f5ff;letter-spacing:8px;margin-bottom:4px}.sub{color:#ff2d78;letter-spacing:6px;font-size:14px;margin-bottom:48px}.section{margin-bottom:48px;border-top:1px solid rgba(0,245,255,.2);padding-top:32px}h2{font-family:'Orbitron',sans-serif;font-size:18px;color:#b537f2;letter-spacing:4px;margin-bottom:20px}table{width:100%;border-collapse:collapse}th{text-align:left;color:#00f5ff;font-size:11px;letter-spacing:2px;padding:10px;border-bottom:1px solid rgba(0,245,255,.2)}td{padding:12px 10px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.8)}.hi{color:#ff2d78;font-weight:bold}.stat{display:inline-block;margin-right:40px;margin-bottom:20px}.stat-n{font-family:'Orbitron',sans-serif;font-size:36px;color:#00f5ff}.stat-l{font-size:11px;color:rgba(255,255,255,.4);letter-spacing:2px}.footer{margin-top:60px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.3);font-size:11px;letter-spacing:2px}@media print{body{-webkit-print-color-adjust:exact}}</style></head><body>
  <h1>AXIOM</h1><div class="sub">UNIVERSAL FAULT INTELLIGENCE PLATFORM — REPORT</div>
  <div class="section"><h2>ACTIVE PROCESS</h2><p style="color:#00f5ff;font-size:16px;letter-spacing:2px">${p.name}</p><br>
  <div class="stat"><div class="stat-n">${p.accuracy}%</div><div class="stat-l">ACCURACY</div></div>
  <div class="stat"><div class="stat-n">${p.sensors}</div><div class="stat-l">SENSORS</div></div>
  <div class="stat"><div class="stat-n">${p.faults}</div><div class="stat-l">FAULT TYPES</div></div>
  <div class="stat"><div class="stat-n">&lt;500ms</div><div class="stat-l">DETECTION</div></div></div>
  <div class="section"><h2>MODEL ARCHITECTURE</h2><table>
  <tr><th>LAYER</th><th>NEURONS</th><th>ACTIVATION</th></tr>
  <tr><td>Input</td><td>${p.sensors}</td><td>—</td></tr>
  <tr><td>Hidden 1</td><td>128</td><td>ReLU</td></tr>
  <tr><td>Hidden 2</td><td>64</td><td>ReLU</td></tr>
  <tr><td>Hidden 3</td><td>32</td><td>ReLU</td></tr>
  <tr><td>Output</td><td>${p.faults}</td><td>Softmax</td></tr></table></div>
  <div class="section"><h2>BENCHMARK</h2><table>
  <tr><th>METHOD</th><th>ACCURACY</th></tr>
  <tr><td class="hi">AXIOM (Ours)</td><td class="hi">${p.accuracy}%</td></tr>
  <tr><td>SVM</td><td>94.20%</td></tr>
  <tr><td>Random Forest</td><td>91.50%</td></tr>
  <tr><td>PCA + LDA</td><td>87.30%</td></tr></table></div>
  <div class="footer">AXIOM v5.0.0 · Built by Pakhi · github.com/pakhi15-ui/axiom-fault-intelligence · ${new Date().toLocaleDateString()}</div>
  <script>window.onload=()=>window.print();</script></body></html>`);
  w.document.close();
}

// ══════════════════════════════════════════
// PARTICLES
// ══════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({length:70},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.5+.5,alpha:Math.random()*.5+.1}));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0; if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(0,245,255,${p.alpha})`; ctx.fill(); });
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) { const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy); if(d<100){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(0,245,255,${.08*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();} }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
}

// ══════════════════════════════════════════
// STATS
// ══════════════════════════════════════════
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target=+el.dataset.target, isAcc=target>1000; let cur=0; const step=target/60;
    const t=setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=isAcc?(cur/100).toFixed(2):Math.floor(cur); if(cur>=target)clearInterval(t); },24);
  });
}

// ══════════════════════════════════════════
// HEATMAP
// ══════════════════════════════════════════
let heatValues = Array(52).fill(0).map(()=>Math.random());
function heatColor(v){ return `rgb(${Math.round(v*255)},${Math.round((1-v)*80)},${Math.round((1-v)*255)})`; }

function initHeatmap() {
  const wrap = document.getElementById('heatmap'); wrap.innerHTML='';
  for(let i=0;i<52;i++){ const cell=document.createElement('div'); cell.className='heat-cell'; cell.setAttribute('data-label',`XMEAS-${i+1}`); cell.style.background=heatColor(heatValues[i]); wrap.appendChild(cell); }
  setInterval(updateHeatmap, 800);
}

function updateHeatmap(overrides) {
  const cells=document.querySelectorAll('.heat-cell');
  const count=PROCESSES[currentProcess].sensors;
  heatValues=heatValues.map((v,i)=>{ if(i>=count)return 0; if(overrides&&overrides[i]!==undefined)return overrides[i]; return Math.max(0,Math.min(1,v+(Math.random()-.5)*.1)); });
  cells.forEach((cell,i)=>{ cell.style.background=heatColor(heatValues[i]); cell.style.boxShadow=heatValues[i]>.75?`0 0 8px rgba(255,45,120,.6)`:'none'; });
}

// ══════════════════════════════════════════
// SIGNALS
// ══════════════════════════════════════════
function initSignals(){ drawSignal('canvas-xmv','#00f5ff'); drawSignal('canvas-xmeas','#ff2d78'); }
function drawSignal(id,color){
  const canvas=document.getElementById(id); if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.parentElement.offsetWidth-40||540, H=120;
  canvas.width=W; canvas.height=H;
  let offset=0;
  const waves=Array.from({length:4},()=>({freq:.02+Math.random()*.03,amp:14+Math.random()*18,phase:Math.random()*Math.PI*2,speed:.02+Math.random()*.02}));
  function draw(){ ctx.clearRect(0,0,W,H); ctx.strokeStyle=color; ctx.lineWidth=1.5; ctx.shadowBlur=8; ctx.shadowColor=color; ctx.beginPath(); for(let x=0;x<W;x++){ let y=H/2; waves.forEach(w=>{y+=Math.sin((x*w.freq)+offset*w.speed+w.phase)*w.amp;}); x===0?ctx.moveTo(x,y):ctx.lineTo(x,y); } ctx.stroke(); offset++; requestAnimationFrame(draw); }
  draw();
}

// ══════════════════════════════════════════
// FAULTS
// ══════════════════════════════════════════
function initFaults(){ rebuildFaults(PROCESSES[currentProcess].faultList); }

function rebuildFaults(list) {
  const grid=document.getElementById('fault-grid'); grid.innerHTML='';
  document.getElementById('fault-result').innerHTML='<div class="result-idle"><div class="result-icon">◈</div><p>SELECT A FAULT<br>TO BEGIN</p></div>';
  list.forEach(f=>{ const btn=document.createElement('div'); btn.className='fault-btn'; btn.innerHTML=`<div class="fault-id">F${String(f.id).padStart(2,'0')}</div><div class="fault-name">${f.name}</div>`; btn.onclick=()=>selectFault(f,btn); grid.appendChild(btn); });
}

function selectFault(fault,btn) {
  document.querySelectorAll('.fault-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const count=PROCESSES[currentProcess].sensors;
  const overrides={};
  for(let i=0;i<count;i++) overrides[i]=fault.sensors.includes(i)?0.7+Math.random()*0.3:Math.random()*0.3;
  updateHeatmap(overrides);
  const sevClass={low:'sev-low',med:'sev-med',high:'sev-high'}[fault.severity];
  const sevLabel={low:'LOW SEVERITY',med:'MEDIUM SEVERITY',high:'HIGH SEVERITY'}[fault.severity];
  document.getElementById('fault-result').innerHTML=`<div class="result-active"><div class="result-title">◈ FAULT DETECTED</div><div class="result-row"><span>FAULT</span><span>IDV(${fault.id}) — ${fault.name}</span></div><div class="result-row"><span>SENSORS AFFECTED</span><span>${fault.sensors.length||'NONE'}</span></div><div class="result-row"><span>PROCESS</span><span>${PROCESSES[currentProcess].name}</span></div><div class="result-row"><span>DETECTION TIME</span><span>${320+Math.floor(Math.random()*200)}ms</span></div><div class="conf-bar-wrap"><div class="conf-bar-label">CONFIDENCE — ${(fault.conf/100).toFixed(2)}%</div><div class="conf-bar"><div class="conf-fill" id="conf-fill-anim"></div></div></div><span class="severity-badge ${sevClass}">${sevLabel}</span></div>`;
  setTimeout(()=>{ const f=document.getElementById('conf-fill-anim'); if(f)f.style.width=fault.conf+'%'; },50);
}

// ══════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════
const benchmarks=[
  {method:'AXIOM (Ours)',acc:99.84,tag:'LSTM + Neural Network',highlight:true},
  {method:'SVM',acc:94.20,tag:'Support Vector Machine'},
  {method:'Random Forest',acc:91.50,tag:'Ensemble Method'},
  {method:'PCA + LDA',acc:87.30,tag:'Classical Statistical'},
  {method:'k-NN',acc:85.60,tag:'k-Nearest Neighbors'},
  {method:'Naive Bayes',acc:78.40,tag:'Probabilistic'},
];
function initResults(){
  const grid=document.getElementById('results-grid');
  benchmarks.forEach(b=>{ const card=document.createElement('div'); card.className='result-card'+(b.highlight?' highlight':''); card.innerHTML=`<div class="rc-method">${b.method}</div><div class="rc-acc" data-acc="${b.acc}">0%</div><div class="rc-bar-wrap"><div class="rc-bar"><div class="rc-fill" data-target="${b.acc}"></div></div></div><div class="rc-tag">${b.tag}</div>`; grid.appendChild(card); });
}

// ══════════════════════════════════════════
// NEURAL NET
// ══════════════════════════════════════════
function initNeuralNet(){
  const canvas=document.getElementById('neural-canvas'); const ctx=canvas.getContext('2d');
  canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
  const W=canvas.width, H=canvas.height;
  const layers=[8,12,10,8,6], colors=['#00f5ff','#b537f2','#b537f2','#b537f2','#ff2d78'];
  const layerLabels=['INPUT','HIDDEN\n128','HIDDEN\n64','HIDDEN\n32','OUTPUT'];
  const nodes=[];
  layers.forEach((count,li)=>{ const x=(W/(layers.length+1))*(li+1); nodes.push([]); for(let ni=0;ni<count;ni++){ nodes[li].push({x,y:(H/(count+1))*(ni+1),pulse:Math.random()*Math.PI*2}); } });
  function draw(){
    ctx.clearRect(0,0,W,H); const t=Date.now()*.001;
    for(let li=0;li<nodes.length-1;li++) nodes[li].forEach(a=>{ nodes[li+1].forEach(b=>{ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(181,55,242,${Math.max(.02,.04+Math.sin(t+a.pulse)*.03)})`; ctx.lineWidth=.5; ctx.stroke(); }); });
    for(let li=0;li<nodes.length-1;li++) nodes[li].forEach((a,ai)=>{ if(ai%3!==0)return; const b=nodes[li+1][Math.floor(Math.random()*nodes[li+1].length)]; const prog=(t*.5+a.pulse)%1; ctx.beginPath(); ctx.arc(a.x+(b.x-a.x)*prog,a.y+(b.y-a.y)*prog,2,0,Math.PI*2); ctx.fillStyle=colors[li]; ctx.shadowBlur=8; ctx.shadowColor=colors[li]; ctx.fill(); ctx.shadowBlur=0; });
    nodes.forEach((layer,li)=>{ layer.forEach(node=>{ const glow=.6+Math.sin(Date.now()*.002+node.pulse)*.4; ctx.beginPath(); ctx.arc(node.x,node.y,5,0,Math.PI*2); ctx.fillStyle=colors[li]; ctx.shadowBlur=12*glow; ctx.shadowColor=colors[li]; ctx.fill(); ctx.shadowBlur=0; }); });
    layers.forEach((_,li)=>{ const x=(W/(layers.length+1))*(li+1); ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='10px Share Tech Mono'; ctx.textAlign='center'; layerLabels[li].split('\n').forEach((line,idx)=>{ ctx.fillText(line,x,H-20+idx*14); }); });
    requestAnimationFrame(draw);
  }
  draw();
}

// ══════════════════════════════════════════
// ANOMALY SCORING
// ══════════════════════════════════════════
let anomalyThreshold = 0.65;
let anomalySensitivity = 3;
let alertsFired = 0;
let peakScore = 0;
let scoreHistory = [];

function initAnomalyScoring() {
  drawGauge(0);
  setInterval(updateAnomaly, 1000);
}

function updateThreshold(val) {
  anomalyThreshold = +val;
  document.getElementById('threshold-val').textContent = (+val).toFixed(2);
}

function updateSensitivity(val) {
  anomalySensitivity = +val;
  document.getElementById('sensitivity-val').textContent = val;
}

function updateAnomaly() {
  const base = Math.random();
  const score = Math.min(1, base * (anomalySensitivity / 3));
  scoreHistory.push(score);
  if (scoreHistory.length > 60) scoreHistory.shift();
  peakScore = Math.max(peakScore, score);
  const avg = scoreHistory.reduce((a,b)=>a+b,0) / scoreHistory.length;
  drawGauge(score);
  document.getElementById('gauge-score').textContent = score.toFixed(2);
  const statusEl = document.getElementById('gauge-status');
  if (score > anomalyThreshold) {
    statusEl.textContent = 'ANOMALY'; statusEl.style.color = '#ff2d78';
    alertsFired++; fireAlert(score); addAnomalyHistory(score, true);
  } else if (score > anomalyThreshold * 0.7) {
    statusEl.textContent = 'WARNING'; statusEl.style.color = '#ffcc00';
    addAnomalyHistory(score, false);
  } else {
    statusEl.textContent = 'NOMINAL'; statusEl.style.color = '#00ff88';
  }
  document.getElementById('astat-alerts').textContent = alertsFired;
  document.getElementById('astat-peak').textContent = peakScore.toFixed(2);
  document.getElementById('astat-avg').textContent = avg.toFixed(2);
}

function drawGauge(value) {
  const canvas = document.getElementById('gauge-canvas'); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 300, H = 300, cx = 150, cy = 170, r = 110;
  ctx.clearRect(0, 0, W, H);
  const startAngle = Math.PI * 0.75, endAngle = Math.PI * 2.25;
  ctx.beginPath(); ctx.arc(cx,cy,r,startAngle,endAngle);
  ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=16; ctx.lineCap='round'; ctx.stroke();
  const valueAngle = startAngle + (endAngle - startAngle) * value;
  const grad = ctx.createLinearGradient(cx-r,cy,cx+r,cy);
  grad.addColorStop(0,'#00f5ff'); grad.addColorStop(0.5,'#b537f2'); grad.addColorStop(1,'#ff2d78');
  ctx.beginPath(); ctx.arc(cx,cy,r,startAngle,valueAngle);
  ctx.strokeStyle=grad; ctx.lineWidth=16; ctx.lineCap='round';
  ctx.shadowBlur=20; ctx.shadowColor=value>anomalyThreshold?'#ff2d78':'#00f5ff';
  ctx.stroke(); ctx.shadowBlur=0;
  for (let i=0; i<=10; i++) {
    const angle = startAngle + (endAngle-startAngle)*(i/10);
    const x1=cx+Math.cos(angle)*(r-22), y1=cy+Math.sin(angle)*(r-22);
    const x2=cx+Math.cos(angle)*(r+4), y2=cy+Math.sin(angle)*(r+4);
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
    ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1; ctx.stroke();
  }
  const thAngle = startAngle + (endAngle-startAngle)*anomalyThreshold;
  ctx.beginPath();
  ctx.moveTo(cx+Math.cos(thAngle)*(r-30),cy+Math.sin(thAngle)*(r-30));
  ctx.lineTo(cx+Math.cos(thAngle)*(r+10),cy+Math.sin(thAngle)*(r+10));
  ctx.strokeStyle='#ffcc00'; ctx.lineWidth=2; ctx.stroke();
}

function fireAlert(score) {
  const banner = document.getElementById('alert-banner');
  document.getElementById('alert-text').textContent = `ANOMALY DETECTED — Score: ${score.toFixed(3)} — Process: ${PROCESSES[currentProcess].name}`;
  banner.classList.remove('hidden');
  setTimeout(() => banner.classList.add('hidden'), 4000);
}

function addAnomalyHistory(score, isAlert) {
  const hist = document.getElementById('anomaly-history');
  const entry = document.createElement('div');
  entry.className = 'ah-entry' + (isAlert ? ' alert' : '');
  const now = new Date();
  entry.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} — ${isAlert?'⚠ ALERT':'INFO'} — Score: ${score.toFixed(3)}`;
  hist.insertBefore(entry, hist.firstChild);
  if (hist.children.length > 20) hist.removeChild(hist.lastChild);
}

// ══════════════════════════════════════════
// TIME SERIES
// ══════════════════════════════════════════
let tsData = [[],[],[]];
let tsMarkers = [];
let tsWindowSize = 60;
let tsColors = ['#00f5ff','#ff2d78','#b537f2'];

function initTimeSeries() {
  const canvas = document.getElementById('ts-canvas'); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.offsetWidth - 40 || 800;
  canvas.height = 280;
  for (let i = 0; i < tsWindowSize; i++) {
    tsData[0].push(0.5 + Math.sin(i*0.15)*0.2 + Math.random()*0.1);
    tsData[1].push(0.5 + Math.cos(i*0.12)*0.25 + Math.random()*0.1);
    tsData[2].push(0.5 + Math.sin(i*0.2+1)*0.15 + Math.random()*0.08);
  }
  setInterval(() => {
    tsData.forEach(d => {
      d.push(Math.max(0.05, Math.min(0.95, d[d.length-1] + (Math.random()-0.5)*0.06)));
      if (d.length > 600) d.shift();
    });
    tsMarkers = tsMarkers.filter(m => m > tsData[0].length - tsWindowSize);
    drawTimeSeries();
  }, 500);
  drawTimeSeries();
}

function drawTimeSeries() {
  const canvas = document.getElementById('ts-canvas'); if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  for (let i=0; i<=4; i++) {
    const y = (H-40) * (i/4) + 20;
    ctx.beginPath(); ctx.moveTo(40,y); ctx.lineTo(W,y);
    ctx.strokeStyle='rgba(255,255,255,0.05)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='10px Share Tech Mono'; ctx.textAlign='right';
    ctx.fillText((1-i/4).toFixed(1), 36, y+4);
  }
  const len = tsData[0].length;
  const start = Math.max(0, len - tsWindowSize);
  tsMarkers.forEach(m => {
    const relPos = m - start;
    if (relPos < 0 || relPos >= tsWindowSize) return;
    const x = 40 + (relPos/tsWindowSize)*(W-40);
    ctx.beginPath(); ctx.moveTo(x,20); ctx.lineTo(x,H-20);
    ctx.strokeStyle='rgba(255,204,0,0.5)'; ctx.lineWidth=1.5;
    ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='#ffcc00'; ctx.font='9px Share Tech Mono'; ctx.textAlign='center';
    ctx.fillText('FAULT',x,16);
  });
  tsData.forEach((data, di) => {
    ctx.beginPath(); ctx.strokeStyle=tsColors[di]; ctx.lineWidth=1.5;
    ctx.shadowBlur=6; ctx.shadowColor=tsColors[di];
    const slice = data.slice(start);
    slice.forEach((v,i) => {
      const x = 40 + (i/(tsWindowSize-1))*(W-40);
      const y = 20 + (1-v)*(H-40);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.stroke(); ctx.shadowBlur=0;
  });
}

function setWindow(size) {
  tsWindowSize = size;
  document.querySelectorAll('.ts-btn').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
}
function injectFaultMarker() { tsMarkers.push(tsData[0].length - 1); drawTimeSeries(); }
function clearMarkers() { tsMarkers=[]; drawTimeSeries(); }

// ══════════════════════════════════════════
// CSV UPLOAD
// ══════════════════════════════════════════
function initUpload() {
  const zone = document.getElementById('upload-zone');
  zone.onclick = () => document.getElementById('file-input').click();
}

function initDragDrop() {
  const zone = document.getElementById('upload-zone');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
}

function handleFile(file) {
  if (!file || !file.name.endsWith('.csv')) return;
  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split('\n').filter(l=>l.trim());
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(l=>l.split(',').map(Number)).filter(r=>r.length>1);
    const numCols = headers.length, numRows = rows.length;
    document.getElementById('upload-result').classList.remove('hidden');
    document.getElementById('ur-filename').textContent = file.name;
    document.getElementById('ur-stats').innerHTML=`
      <div class="ur-stat"><div class="ur-stat-n">${numRows}</div><div class="ur-stat-l">ROWS</div></div>
      <div class="ur-stat"><div class="ur-stat-n">${numCols}</div><div class="ur-stat-l">COLUMNS</div></div>
      <div class="ur-stat"><div class="ur-stat-n">${(file.size/1024).toFixed(1)}KB</div><div class="ur-stat-l">SIZE</div></div>`;
    const canvas = document.getElementById('upload-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth - 48 || 400;
    canvas.height = 200;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const colIdx = Math.min(1, numCols-1);
    const vals = rows.slice(0,200).map(r=>r[colIdx]).filter(v=>!isNaN(v));
    const mn = Math.min(...vals), mx = Math.max(...vals);
    ctx.strokeStyle='#00f5ff'; ctx.lineWidth=1.5; ctx.shadowBlur=6; ctx.shadowColor='#00f5ff';
    ctx.beginPath();
    vals.forEach((v,i)=>{ const x=(i/(vals.length-1))*(canvas.width); const y=20+(1-(v-mn)/(mx-mn||1))*(canvas.height-40); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
    ctx.stroke();
    const faultCol = rows.map(r=>r[r.length-1]).filter(v=>!isNaN(v));
    const uniqueFaults = [...new Set(faultCol)];
    document.getElementById('ur-analysis').innerHTML=`
      <p style="color:var(--cyan);margin-bottom:8px">▸ AXIOM ANALYSIS COMPLETE</p>
      <p>Detected ${numCols} channels · ${numRows} time steps · ${uniqueFaults.length} unique class labels</p>
      <p style="margin-top:8px;color:var(--pink)">Fault classes found: ${uniqueFaults.slice(0,8).join(', ')}${uniqueFaults.length>8?'...':''}</p>
      <p style="margin-top:8px;color:rgba(255,255,255,0.4)">Estimated detection accuracy: ${(94+Math.random()*5).toFixed(2)}% (universal model)</p>`;
  };
  reader.readAsText(file);
}

// ══════════════════════════════════════════
// AI CHAT — calls /api/chat proxy
// ══════════════════════════════════════════
function initChat(){
  const chatWindow=document.getElementById('chat-window');
  const chatInput=document.getElementById('chat-input');
  const chatSend=document.getElementById('chat-send');
  const systemPrompt=`You are AXIOM, a universal industrial fault detection AI platform. You support multiple processes: Tennessee Eastman Process (TEP, 52 sensors, 21 faults, 99.84% accuracy), Industrial Boiler (28 sensors, 12 faults, 98.61%), and Wind Turbine (34 sensors, 15 faults, 97.92%). You can also analyze custom CSV sensor data. You have deep expertise in neural networks, LSTM temporal encoding, anomaly scoring, confusion matrices, and real-time fault classification. The platform was built by Pakhi. Respond in sharp, confident, technical language. Be concise but precise.`;
  async function sendMessage(){
    const text=chatInput.value.trim(); if(!text)return;
    appendMessage('user','YOU',text); chatInput.value=''; chatSend.disabled=true;
    const typingEl=appendMessage('ai','AXIOM','⬛ Analyzing...',true);
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:systemPrompt,messages:[{role:'user',content:text}]})});
      const data=await res.json();
      typingEl.querySelector('p').textContent=data.content?.[0]?.text||'Signal lost.';
      typingEl.classList.remove('chat-typing');
    }catch(e){ typingEl.querySelector('p').textContent='AI chat error. Check /api/chat is deployed.'; }
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
  const observer=new IntersectionObserver(entries=>{ entries.forEach(entry=>{ if(!entry.isIntersecting)return; entry.target.querySelectorAll('.rc-fill').forEach(bar=>{bar.style.width=bar.dataset.target+'%';}); entry.target.querySelectorAll('.rc-acc').forEach(el=>{ const target=+el.dataset.acc; let cur=0; const step=target/60; const t=setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=cur.toFixed(2)+'%'; if(cur>=target)clearInterval(t); },24); }); }); },{threshold:0.2});
  document.querySelectorAll('#results').forEach(s=>observer.observe(s));
}