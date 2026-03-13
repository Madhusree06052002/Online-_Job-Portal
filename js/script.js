
//index start
// Simple page-btn active toggle
document.querySelectorAll('.page-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.page-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});
// Nav scroll shadow
window.addEventListener('scroll',()=>{
  document.querySelector('nav').style.boxShadow=
    window.scrollY>10?'0 4px 24px rgba(0,0,0,.12)':'0 2px 16px rgba(0,0,0,.06)';
});
//index end





//signup
/* ── Tab Switch ── */
function switchTab(el, role){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const catLbl = document.querySelector('#roleField label');
  const expLbl = document.querySelector('#expField label');
  if(role === 'employer'){
    catLbl.childNodes[0].textContent = 'Industry ';
    expLbl.childNodes[0].textContent = 'Company Size ';
    document.querySelector('#category').innerHTML = `
      <option value="">Select industry…</option>
      <option>Technology</option><option>Finance</option>
      <option>Healthcare</option><option>Retail</option>
      <option>Manufacturing</option><option>Education</option><option>Other</option>`;
    document.querySelector('#experience').innerHTML = `
      <option value="">Select size…</option>
      <option>1–10 employees</option><option>11–50 employees</option>
      <option>51–200 employees</option><option>201–500 employees</option>
      <option>500+ employees</option>`;
  } else {
    catLbl.childNodes[0].textContent = 'Job Category ';
    expLbl.childNodes[0].textContent = 'Experience Level ';
    document.querySelector('#category').innerHTML = `
      <option value="">Select category…</option>
      <option>Technology & IT</option><option>Design & Creative</option>
      <option>Business Development</option><option>Finance & Banking</option>
      <option>Healthcare & Medical</option><option>Marketing & Sales</option>
      <option>Restaurant Services</option><option>Other</option>`;
    document.querySelector('#experience').innerHTML = `
      <option value="">Select level…</option>
      <option>Fresher (0–1 yr)</option><option>Junior (1–3 yrs)</option>
      <option>Mid-level (3–6 yrs)</option><option>Senior (6–10 yrs)</option>
      <option>Lead / Manager (10+ yrs)</option>`;
  }
}

/* ── Validators ── */
function setWrap(id, state){
  const w = document.getElementById(id);
  w.classList.toggle('valid', state === 'valid');
  w.classList.toggle('invalid', state === 'invalid');
}
function vRequired(fieldId, wrapId, errId){
  const val = document.getElementById(fieldId).value.trim();
  if(!val){ setWrap(wrapId,'invalid'); document.getElementById(errId).style.display='block'; return false; }
  setWrap(wrapId,'valid'); document.getElementById(errId).style.display='none'; return true;
}
function vEmail(){
  const val = document.getElementById('email').value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!val){ setWrap('em-w',''); document.getElementById('em-e').style.display='none'; return false; }
  const ok = re.test(val);
  setWrap('em-w', ok ? 'valid':'invalid');
  document.getElementById('em-e').style.display = ok ? 'none':'block';
  return ok;
}
function vSelect(fieldId, wrapId, errId){
  const val = document.getElementById(fieldId).value;
  if(!val){ setWrap(wrapId,'invalid'); document.getElementById(errId).style.display='block'; return false; }
  setWrap(wrapId,'valid'); document.getElementById(errId).style.display='none'; return true;
}
function vPassword(){
  const val = document.getElementById('password').value;
  const ok = val.length >= 8;
  setWrap('pw-w', val.length === 0 ? '' : ok ? 'valid':'invalid');
  document.getElementById('pw-e').style.display = (!ok && val.length>0) ? 'block':'none';
  // strength
  const str = document.getElementById('pwStrength');
  if(val.length === 0){ str.style.display='none'; return ok; }
  str.style.display='block';
  const score = [val.length>=8, /[A-Z]/.test(val), /[0-9]/.test(val), /[^a-zA-Z0-9]/.test(val)].filter(Boolean).length;
  const colors = ['','#ef4444','#f59e0b','#3b82f6','#22c55e'];
  const labels = ['','Weak','Fair','Good','Strong'];
  ['bar1','bar2','bar3','bar4'].forEach((id,i)=>{
    document.getElementById(id).style.background = i < score ? colors[score] : 'var(--border)';
  });
  document.getElementById('pwLabel').textContent = 'Strength: ' + (labels[score]||'');
  document.getElementById('pwLabel').style.color = colors[score];
  return ok;
}
function vConfirm(){
  const pw = document.getElementById('password').value;
  const cp = document.getElementById('confirmPassword').value;
  if(!cp){ setWrap('cp-w',''); document.getElementById('cp-e').style.display='none'; return false; }
  const ok = pw === cp;
  setWrap('cp-w', ok ? 'valid':'invalid');
  document.getElementById('cp-e').style.display = ok ? 'none':'block';
  return ok;
}

/* ── Toggle PW ── */
function togglePw(inputId, btnId){
  const inp = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  inp.type = inp.type==='password' ? 'text':'password';
  btn.textContent = inp.type==='password' ? '👁️':'🙈';
}

/* ── Submit ── */
function handleSubmit(e){
  e.preventDefault();
  const a = vRequired('firstName','fn-w','fn-e');
  const b = vRequired('lastName','ln-w','ln-e');
  const c = vEmail();
  const d = vSelect('category','cat-w','cat-e');
  const f = vPassword();
  const g = vConfirm();
  if(!document.getElementById('terms').checked){
    alert('Please accept the Terms & Conditions to continue.'); return;
  }
  if(![a,b,c,d,f,g].every(Boolean)) return;

  const btn = document.getElementById('submitBtn');
  const spin = document.getElementById('submitSpin');
  const txt = document.getElementById('submitText');
  btn.disabled=true; btn.style.opacity='.75';
  spin.style.display='block'; txt.textContent='Creating your account…';

  setTimeout(()=>{
    document.getElementById('formArea').style.display='none';
    const ss = document.getElementById('successScreen');
    ss.style.display='block';
    // scroll card into view
    document.querySelector('.card').scrollIntoView({behavior:'smooth',block:'center'});
  }, 1900);
}

/* ── Social Signup ── */
function socialSignup(btn, name){
  btn.disabled=true;
  btn.innerHTML=`<span style="width:14px;height:14px;border:2px solid #c5d8ff;border-top-color:var(--primary);border-radius:50%;animation:spin .65s linear infinite;display:inline-block"></span> Connecting…`;
  setTimeout(()=>{
    btn.disabled=false;
    btn.innerHTML=`✅ Connected via ${name}`;
    btn.style.color='var(--green)';btn.style.borderColor='var(--green)';btn.style.background='#f0fdf4';
  },1700);
}
//signup



//login
/* ── Validation ── */
function validateEmail(input){
  const wrap = document.getElementById('emailWrap');
  const err  = document.getElementById('emailError');
  const re   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(input.value.length === 0){ wrap.classList.remove('valid','invalid'); return; }
  if(re.test(input.value)){
    wrap.classList.add('valid'); wrap.classList.remove('invalid'); err.style.display='none';
  } else {
    wrap.classList.add('invalid'); wrap.classList.remove('valid'); err.style.display='block';
  }
}

function validatePass(input){
  const wrap = document.getElementById('passWrap');
  const err  = document.getElementById('passError');
  if(input.value.length === 0){ wrap.classList.remove('valid','invalid'); return; }
  if(input.value.length >= 6){
    wrap.classList.add('valid'); wrap.classList.remove('invalid'); err.style.display='none';
  } else {
    wrap.classList.add('invalid'); wrap.classList.remove('valid'); err.style.display='block';
  }
}

/* ── Password Toggle ── */
function togglePass(){
  const inp = document.getElementById('password');
  const btn = document.getElementById('passToggle');
  if(inp.type === 'password'){ inp.type='text'; btn.textContent='🙈'; }
  else { inp.type='password'; btn.textContent='👁️'; }
}

/* ── Login Submit ── */
function handleLogin(e){
  e.preventDefault();
  const email = document.getElementById('email');
  const pass  = document.getElementById('password');
  const eWrap = document.getElementById('emailWrap');
  const pWrap = document.getElementById('passWrap');
  const re    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if(!re.test(email.value)){
    eWrap.classList.add('invalid'); eWrap.classList.remove('valid');
    document.getElementById('emailError').style.display='block'; valid=false;
  }
  if(pass.value.length < 6){
    pWrap.classList.add('invalid'); pWrap.classList.remove('valid');
    document.getElementById('passError').style.display='block'; valid=false;
  }
  if(!valid) return;

  // show loading
  const btn     = document.getElementById('loginBtn');
  const spinner = document.getElementById('loginSpinner');
  const btnText = document.getElementById('loginBtnText');
  const arrow   = document.getElementById('loginArrow');
  btn.disabled=true; btn.style.opacity='.8';
  spinner.style.display='block'; btnText.textContent='Logging in…'; arrow.style.display='none';

  setTimeout(()=>{
    document.getElementById('loginForm').style.display='none';
    document.getElementById('loginSuccess').style.display='block';
  }, 1800);
}

/* ── Social Login ── */
function handleSocial(btn, name){
  btn.disabled=true;
  btn.innerHTML = `<span style="width:16px;height:16px;border:2px solid #c7d8ff;border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite;display:inline-block"></span>&nbsp; Connecting to ${name}…`;
  setTimeout(()=>{ btn.disabled=false; btn.innerHTML=`✓ Connected via ${name}`; btn.style.color='var(--green)'; btn.style.borderColor='var(--green)'; }, 1600);
}
//login




//findjob
const JOBS = [
  {id:1,title:"Senior React Developer",company:"Razorpay",location:"Bangalore, IN",type:"Full-time",salary:95000,logo:"🏦",desc:"Build scalable fintech interfaces with React, TypeScript and GraphQL. Work on products used by millions of users daily.",posted:"1 day ago",featured:true,urgent:false},
  {id:2,title:"UI/UX Designer",company:"Swiggy",location:"Mumbai, IN",type:"Remote",salary:70000,logo:"🛵",desc:"Design intuitive experiences for mobile and web platforms. Collaborate closely with PMs and engineers to ship beautiful products.",posted:"2 days ago",featured:false,urgent:true},
  {id:3,title:"Data Analyst",company:"Flipkart",location:"Bangalore, IN",type:"Full-time",salary:80000,logo:"🛒",desc:"Analyze large datasets to surface key insights and drive data-driven decisions across our growing e-commerce platform.",posted:"3 days ago",featured:false,urgent:false},
  {id:4,title:"Product Manager",company:"CRED",location:"Remote",type:"Remote",salary:120000,logo:"💳",desc:"Own the product roadmap for our rewards platform. Define strategy, prioritize features and work with cross-functional teams.",posted:"1 day ago",featured:true,urgent:false},
  {id:5,title:"Backend Engineer",company:"Zomato",location:"Gurgaon, IN",type:"Full-time",salary:90000,logo:"🍕",desc:"Design and develop high-performance REST APIs and microservices that power our food delivery platform at massive scale.",posted:"4 days ago",featured:false,urgent:false},
  {id:6,title:"Graphic Designer",company:"DesignHub",location:"Delhi, IN",type:"Part-time",salary:45000,logo:"🎨",desc:"Create stunning visual content for digital and print campaigns. Figma and Adobe Creative Suite proficiency required.",posted:"5 days ago",featured:false,urgent:false},
  {id:7,title:"Financial Analyst",company:"HDFC Bank",location:"Mumbai, IN",type:"Full-time",salary:85000,logo:"🏧",desc:"Conduct financial modelling and valuation analysis. Prepare reports for senior management and external stakeholders.",posted:"2 days ago",featured:false,urgent:true},
  {id:8,title:"Digital Marketing Manager",company:"UrbanLadder",location:"Bangalore, IN",type:"Full-time",salary:65000,logo:"🛋️",desc:"Lead multi-channel campaigns across SEO, SEM, email, and social media to drive meaningful growth for the brand.",posted:"6 days ago",featured:false,urgent:false},
  {id:9,title:"iOS Developer",company:"Paytm",location:"Noida, IN",type:"Full-time",salary:88000,logo:"📱",desc:"Build and maintain high-quality iOS apps in Swift. Experience with UIKit, SwiftUI, and REST APIs is required.",posted:"1 day ago",featured:false,urgent:false},
  {id:10,title:"Content Writer",company:"Unacademy",location:"Remote",type:"Remote",salary:40000,logo:"📚",desc:"Research and write engaging educational content, blog posts, and marketing copy across tech and finance verticals.",posted:"3 days ago",featured:false,urgent:false},
  {id:11,title:"DevOps Engineer",company:"Freshworks",location:"Chennai, IN",type:"Full-time",salary:95000,logo:"⚙️",desc:"Own CI/CD pipelines, infrastructure as code, and cloud resources on AWS. Kubernetes experience is a strong plus.",posted:"2 days ago",featured:true,urgent:false},
  {id:12,title:"Machine Learning Engineer",company:"Ola",location:"Bangalore, IN",type:"Full-time",salary:115000,logo:"🚗",desc:"Develop and deploy ML models for route optimisation, demand forecasting, and personalisation features at massive scale.",posted:"1 day ago",featured:false,urgent:false},
  {id:13,title:"HR Business Partner",company:"Infosys",location:"Hyderabad, IN",type:"Full-time",salary:60000,logo:"🤝",desc:"Partner with business leaders to drive talent management, performance cycles, and overall organisational effectiveness.",posted:"7 days ago",featured:false,urgent:false},
  {id:14,title:"Cloud Architect",company:"TCS",location:"Pune, IN",type:"Contract",salary:130000,logo:"☁️",desc:"Design cloud-native architectures on AWS/GCP. Lead large-scale migration projects and establish enterprise best practices.",posted:"3 days ago",featured:false,urgent:false},
  {id:15,title:"Medical Officer",company:"Apollo Hospitals",location:"Chennai, IN",type:"Full-time",salary:75000,logo:"🏥",desc:"Provide quality patient care in an outpatient setting. MBBS required; experience in internal medicine preferred.",posted:"5 days ago",featured:false,urgent:true},
  {id:16,title:"Product Design Intern",company:"Meesho",location:"Bangalore, IN",type:"Internship",salary:20000,logo:"🛍️",desc:"6-month paid design internship. Work alongside senior designers on real projects shipped to millions of users.",posted:"4 days ago",featured:false,urgent:false},
];

const PER = 6;
let page = 1, activeType = 'All', searchKw = '', searchLoc = '';
const saved = new Set();

const typeClass = t => ({
  'Full-time':'t-full','Part-time':'t-part',
  'Remote':'t-remote','Internship':'t-intern','Contract':'t-contract'
}[t] || 't-full');

function getFiltered(){
  let d = [...JOBS];
  if(activeType !== 'All') d = d.filter(j => j.type === activeType);
  if(searchKw) d = d.filter(j => j.title.toLowerCase().includes(searchKw) || j.company.toLowerCase().includes(searchKw) || j.desc.toLowerCase().includes(searchKw));
  if(searchLoc) d = d.filter(j => j.location.toLowerCase().includes(searchLoc));
  const s = document.getElementById('sortSel').value;
  if(s === 'salary') d.sort((a,b) => b.salary - a.salary);
  else if(s === 'az') d.sort((a,b) => a.title.localeCompare(b.title));
  return d;
}

function render(){
  const data = getFiltered();
  const slice = data.slice((page-1)*PER, page*PER);
  const list = document.getElementById('jobsList');

  document.getElementById('resTxt').innerHTML = `<strong>${data.length} job${data.length!==1?'s':''}</strong> found`;

  if(!data.length){
    list.innerHTML = `<div class="no-res"><div class="ico">🔍</div><h3>No jobs found</h3><p>Try a different keyword, location, or job type filter.</p></div>`;
    document.getElementById('pagi').innerHTML = '';
    return;
  }

  list.innerHTML = slice.map((j,i) => `
    <div class="job-card${j.featured?' featured':''}" style="animation-delay:${i*.06}s">
      ${j.featured ? '<span class="feat-tag">⭐ Featured</span>' : j.urgent ? '<span class="urg-tag">🔥 Urgent</span>' : ''}
      <div class="j-logo">${j.logo}</div>
      <div class="j-body">
        <div class="j-title">${j.title}</div>
        <div class="j-meta">
          <span>🏢 ${j.company}</span>
          <span>📍 ${j.location}</span>
          <span class="tag ${typeClass(j.type)}">${j.type}</span>
        </div>
        <div class="j-desc">${j.desc}</div>
        <div class="j-footer">
          <div class="j-actions">
            <button class="btn-apply" onclick="openModal(${j.id})">Apply Now</button>
            <button class="btn-view" onclick="toast('ℹ️','Full job details coming soon!')">View Details</button>
            <button class="btn-save${saved.has(j.id)?' saved':''}" id="sv${j.id}" onclick="toggleSave(${j.id})">${saved.has(j.id)?'❤️':'🤍'}</button>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
            <span class="j-sal">$${j.salary.toLocaleString()}<span style="font-size:12px;font-weight:500;color:var(--muted)">/yr</span></span>
            <span class="j-time">🕐 ${j.posted}</span>
          </div>
        </div>
      </div>
    </div>`).join('');

  // pagination
  const total = Math.ceil(data.length / PER);
  if(total <= 1){ document.getElementById('pagi').innerHTML = ''; return; }
  let h = `<button class="pg" onclick="goPage(${page-1})" ${page===1?'disabled':''}>‹</button>`;
  for(let i=1;i<=total;i++) h += `<button class="pg${i===page?' active':''}" onclick="goPage(${i})">${i}</button>`;
  h += `<button class="pg" onclick="goPage(${page+1})" ${page===total?'disabled':''}>›</button>`;
  document.getElementById('pagi').innerHTML = h;
}

function goPage(p){
  const max = Math.ceil(getFiltered().length/PER);
  if(p<1||p>max) return;
  page = p; render();
  document.querySelector('.main').scrollIntoView({behavior:'smooth',block:'start'});
}

function setType(el, type){
  activeType = type; page = 1;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  render();
}

function doSearch(){
  searchKw = document.getElementById('kw').value.toLowerCase().trim();
  searchLoc = document.getElementById('loc').value.toLowerCase().trim();
  page = 1; render();
  document.querySelector('.main').scrollIntoView({behavior:'smooth',block:'start'});
}

function quickSearch(kw){
  document.getElementById('kw').value = kw;
  searchKw = kw.toLowerCase(); page = 1;
  render();
  document.querySelector('.main').scrollIntoView({behavior:'smooth',block:'start'});
}

function toggleSave(id){
  saved.has(id) ? saved.delete(id) : saved.add(id);
  const btn = document.getElementById('sv'+id);
  if(btn){ btn.textContent = saved.has(id)?'❤️':'🤍'; btn.classList.toggle('saved', saved.has(id)); }
  toast(saved.has(id)?'❤️':'🤍', saved.has(id)?'Job saved to your list!':'Removed from saved list');
}

function openModal(id){
  const j = JOBS.find(x=>x.id===id);
  document.getElementById('mTitle').textContent = 'Apply for: '+j.title;
  document.getElementById('mSub').textContent = j.company+' · '+j.location;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function submitApp(){
  const n = document.getElementById('aName').value.trim();
  const e = document.getElementById('aEmail').value.trim();
  if(!n||!e){ toast('⚠️','Please enter your name and email'); return; }
  closeModal();
  toast('🎉','Application submitted successfully!');
}

document.getElementById('modal').addEventListener('click', e => { if(e.target===document.getElementById('modal')) closeModal(); });
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
document.getElementById('kw').addEventListener('keydown', e => { if(e.key==='Enter') doSearch(); });
document.getElementById('loc').addEventListener('keydown', e => { if(e.key==='Enter') doSearch(); });

let tt;
function toast(ico, msg){
  const el = document.getElementById('toast');
  document.getElementById('tIco').textContent = ico;
  document.getElementById('tMsg').textContent = msg;
  el.classList.add('show');
  clearTimeout(tt);
  tt = setTimeout(() => el.classList.remove('show'), 2800);
}

render();
//findjob



//Employee
const EMPLOYERS = [
  {id:1,name:"Razorpay",logo:"🏦",industry:"Technology",loc:"Bangalore, IN",size:"Mid-size",sizeNum:2,employees:"1,000–5,000",founded:"2014",mode:"Hybrid",web:"razorpay.com",hiring:true,featured:true,openJobs:18,about:"India's leading payment gateway powering over 8 million businesses. We're building the future of finance with cutting-edge APIs and financial products.",tags:["Technology"],jobs:[{t:"Senior React Developer",type:"Full-time",loc:"Bangalore"},{t:"Backend Engineer",type:"Full-time",loc:"Bangalore"},{t:"Product Manager",type:"Full-time",loc:"Remote"},{t:"DevOps Lead",type:"Full-time",loc:"Bangalore"}]},
  {id:2,name:"Swiggy",logo:"🛵",industry:"Technology",loc:"Bangalore, IN",size:"Large",sizeNum:3,employees:"5,000–10,000",founded:"2014",mode:"Hybrid",web:"swiggy.com",hiring:true,featured:false,openJobs:24,about:"India's largest food delivery and quick commerce platform serving 500+ cities. We connect hungry customers with thousands of restaurant partners.",tags:["Technology","Marketing"],jobs:[{t:"UI/UX Designer",type:"Remote",loc:"Remote"},{t:"Data Scientist",type:"Full-time",loc:"Bangalore"},{t:"Android Developer",type:"Full-time",loc:"Bangalore"}]},
  {id:3,name:"Flipkart",logo:"🛒",industry:"Technology",loc:"Bangalore, IN",size:"MNC",sizeNum:4,employees:"30,000+",founded:"2007",mode:"On-site",web:"flipkart.com",hiring:true,featured:true,openJobs:42,about:"India's homegrown e-commerce giant and a Walmart subsidiary. Building the future of digital commerce for 1.4 billion Indians.",tags:["Technology","Finance"],jobs:[{t:"Data Analyst",type:"Full-time",loc:"Bangalore"},{t:"ML Engineer",type:"Full-time",loc:"Bangalore"},{t:"Product Manager",type:"Full-time",loc:"Hyderabad"}]},
  {id:4,name:"CRED",logo:"💳",industry:"Finance",loc:"Bangalore, IN",size:"Mid-size",sizeNum:2,employees:"800–1,200",founded:"2018",mode:"Hybrid",web:"cred.club",hiring:true,featured:false,openJobs:11,about:"A members-only platform rewarding creditworthy Indians for paying credit card bills on time. Fast-growing fintech unicorn.",tags:["Finance","Technology"],jobs:[{t:"Product Manager",type:"Remote",loc:"Remote"},{t:"Senior Designer",type:"Hybrid",loc:"Bangalore"},{t:"iOS Developer",type:"Full-time",loc:"Bangalore"}]},
  {id:5,name:"Zomato",logo:"🍕",industry:"Technology",loc:"Gurgaon, IN",size:"Large",sizeNum:3,employees:"5,000+",founded:"2008",mode:"Hybrid",web:"zomato.com",hiring:true,featured:false,openJobs:19,about:"India's leading food tech company connecting millions of people with the best restaurants in their city. Now expanding into quick commerce.",tags:["Technology","Marketing"],jobs:[{t:"Backend Engineer",type:"Full-time",loc:"Gurgaon"},{t:"Digital Marketer",type:"Hybrid",loc:"Gurgaon"},{t:"Data Analyst",type:"Full-time",loc:"Remote"}]},
  {id:6,name:"DesignHub",logo:"🎨",industry:"Design",loc:"Delhi, IN",size:"Startup",sizeNum:1,employees:"50–200",founded:"2019",mode:"Remote",web:"designhub.in",hiring:true,featured:false,openJobs:6,about:"A boutique creative agency specialising in brand identity, UI/UX design, and digital campaigns for startups and enterprises.",tags:["Design"],jobs:[{t:"Graphic Designer",type:"Part-time",loc:"Remote"},{t:"Motion Designer",type:"Remote",loc:"Remote"},{t:"Brand Strategist",type:"Full-time",loc:"Delhi"}]},
  {id:7,name:"HDFC Bank",logo:"🏧",industry:"Finance",loc:"Mumbai, IN",size:"MNC",sizeNum:4,employees:"100,000+",founded:"1994",mode:"On-site",web:"hdfcbank.com",hiring:true,featured:true,openJobs:35,about:"India's largest private sector bank by assets, serving over 68 million customers across 5,000+ branches and digital banking channels.",tags:["Finance"],jobs:[{t:"Financial Analyst",type:"Full-time",loc:"Mumbai"},{t:"Data Scientist",type:"Full-time",loc:"Pune"},{t:"Risk Manager",type:"Full-time",loc:"Mumbai"}]},
  {id:8,name:"UrbanLadder",logo:"🛋️",industry:"Marketing",loc:"Bangalore, IN",size:"Mid-size",sizeNum:2,employees:"500–1,000",founded:"2012",mode:"Hybrid",web:"urbanladder.com",hiring:false,featured:false,openJobs:4,about:"India's leading online furniture and home décor brand offering premium, design-forward products delivered and assembled at home.",tags:["Marketing","Design"],jobs:[{t:"Content Strategist",type:"Hybrid",loc:"Bangalore"},{t:"Digital Marketer",type:"Full-time",loc:"Bangalore"}]},
  {id:9,name:"Paytm",logo:"📱",industry:"Finance",loc:"Noida, IN",size:"Large",sizeNum:3,employees:"10,000+",founded:"2010",mode:"Hybrid",web:"paytm.com",hiring:true,featured:false,openJobs:28,about:"India's pioneer in digital payments and financial services, offering mobile wallets, UPI, insurance, and lending to 350M+ users.",tags:["Finance","Technology"],jobs:[{t:"iOS Developer",type:"Full-time",loc:"Noida"},{t:"Backend Engineer",type:"Full-time",loc:"Noida"},{t:"Product Analyst",type:"Hybrid",loc:"Noida"}]},
  {id:10,name:"Apollo Hospitals",logo:"🏥",industry:"Healthcare",loc:"Chennai, IN",size:"MNC",sizeNum:4,employees:"70,000+",founded:"1983",mode:"On-site",web:"apollohospitals.com",hiring:true,featured:false,openJobs:16,about:"Asia's largest and most trusted healthcare ecosystem with 71 hospitals, 4,500+ pharmacies, and cutting-edge diagnostic centres.",tags:["Healthcare"],jobs:[{t:"Medical Officer",type:"Full-time",loc:"Chennai"},{t:"Healthcare IT",type:"Full-time",loc:"Hyderabad"},{t:"Nurse Specialist",type:"Full-time",loc:"Delhi"}]},
  {id:11,name:"Freshworks",logo:"⚙️",industry:"Technology",loc:"Chennai, IN",size:"Large",sizeNum:3,employees:"5,000+",founded:"2010",mode:"Hybrid",web:"freshworks.com",hiring:true,featured:true,openJobs:22,about:"A global SaaS company providing business software for customer support, CRM, ITSM, and HR to 60,000+ businesses worldwide.",tags:["Technology"],jobs:[{t:"DevOps Engineer",type:"Full-time",loc:"Chennai"},{t:"Customer Success",type:"Remote",loc:"Remote"},{t:"Senior Engineer",type:"Hybrid",loc:"Chennai"}]},
  {id:12,name:"Ola",logo:"🚗",industry:"Technology",loc:"Bangalore, IN",size:"Large",sizeNum:3,employees:"8,000+",founded:"2010",mode:"Hybrid",web:"olacabs.com",hiring:true,featured:false,openJobs:14,about:"India's largest mobility platform connecting drivers and passengers, and now building India's first indigenous electric vehicles.",tags:["Technology"],jobs:[{t:"ML Engineer",type:"Full-time",loc:"Bangalore"},{t:"Mobile Developer",type:"Full-time",loc:"Bangalore"},{t:"Data Engineer",type:"Remote",loc:"Remote"}]},
  {id:13,name:"Unacademy",logo:"📚",industry:"Education",loc:"Bangalore, IN",size:"Mid-size",sizeNum:2,employees:"2,000–5,000",founded:"2015",mode:"Hybrid",web:"unacademy.com",hiring:true,featured:false,openJobs:9,about:"India's largest online learning platform with 50,000+ educators and 50M+ learners preparing for competitive exams and skill courses.",tags:["Education","Technology"],jobs:[{t:"Content Writer",type:"Remote",loc:"Remote"},{t:"Frontend Engineer",type:"Hybrid",loc:"Bangalore"},{t:"Educator Success",type:"Full-time",loc:"Bangalore"}]},
  {id:14,name:"TCS",logo:"☁️",industry:"Technology",loc:"Mumbai, IN",size:"MNC",sizeNum:4,employees:"600,000+",founded:"1968",mode:"Hybrid",web:"tcs.com",hiring:true,featured:false,openJobs:120,about:"Tata Consultancy Services is a global IT services leader operating in 50 countries with revenues of $27B and 600,000+ employees.",tags:["Technology","Finance"],jobs:[{t:"Cloud Architect",type:"Contract",loc:"Pune"},{t:"Java Developer",type:"Full-time",loc:"Hyderabad"},{t:"Business Analyst",type:"Full-time",loc:"Chennai"}]},
  {id:15,name:"Meesho",logo:"🛍️",industry:"Technology",loc:"Bangalore, IN",size:"Mid-size",sizeNum:2,employees:"1,000–3,000",founded:"2015",mode:"Hybrid",web:"meesho.com",hiring:true,featured:false,openJobs:15,about:"India's fastest-growing social commerce platform enabling 15M+ small businesses and individuals to sell online with zero investment.",tags:["Technology","Marketing"],jobs:[{t:"Sales Manager",type:"Full-time",loc:"Bangalore"},{t:"Growth Analyst",type:"Hybrid",loc:"Bangalore"},{t:"Backend Dev",type:"Full-time",loc:"Bangalore"}]},
  {id:16,name:"InfySys",logo:"🤝",industry:"Technology",loc:"Bangalore, IN",size:"MNC",sizeNum:4,employees:"350,000+",founded:"1981",mode:"On-site",web:"infosys.com",hiring:false,featured:false,openJobs:7,about:"A global leader in next-generation digital services and consulting, helping enterprises across 50+ countries navigate digital transformation.",tags:["Technology","Education"],jobs:[{t:"HR Business Partner",type:"Full-time",loc:"Hyderabad"},{t:"SAP Consultant",type:"Full-time",loc:"Pune"},{t:"Java Developer",type:"Full-time",loc:"Bangalore"}]},
];

const TAG_CLASS={Technology:'et-tech',Finance:'et-fin',Design:'et-des',Healthcare:'et-hth',Marketing:'et-mkt',Education:'et-edu'};
function tc(t){return TAG_CLASS[t]||'et-other'}
const TYPE_CLASS={'Full-time':'b-full','Part-time':'b-part','Remote':'b-rem','Hybrid':'b-int','Contract':'b-con'};
function jc(t){const m={'Full-time':'b-full','Part-time':'b-part','Remote':'b-rem','Hybrid':'b-int','Contract':'b-con'};return m[t]||'b-con'}

let filtered=[...EMPLOYERS], view='list', page=1, saved=new Set();
const PER=6;

function render(){
  const list=document.getElementById('cardsList');
  list.className='cards-wrap'+(view==='grid'?' grid':'');
  if(!filtered.length){
    list.innerHTML=`<div class="empty"><div class="ei">🏢</div><h3>No employers found</h3><p>Try adjusting your search or filters.</p></div>`;
    document.getElementById('pag').innerHTML='';
    document.getElementById('resTxt').innerHTML=`<b>0</b> employers found`;
    return;
  }
  document.getElementById('resTxt').innerHTML=`<b>${filtered.length} employer${filtered.length!==1?'s':''}</b> found`;
  const slice=filtered.slice((page-1)*PER,page*PER);
  list.innerHTML=slice.map((e,i)=>`
    <div class="emp-card${e.featured?' featured':''}" style="animation-delay:${i*.06}s" onclick="openModal(${e.id})">
      ${e.featured&&!e.hiring?'<span class="featured-tag">⭐ Featured</span>':''}
      ${e.hiring?`<div class="hiring-badge"><div class="hd"></div> Actively Hiring</div>`:''}
      <div class="emp-logo">${e.logo}</div>
      <div class="ec-body">
        <div class="ec-name">${e.name}</div>
        <div class="ec-meta">
          <span>📁 ${e.industry}</span>
          <span>📍 ${e.loc}</span>
          <span>👥 ${e.employees}</span>
          <span>🌍 ${e.mode}</span>
        </div>
        <div class="ec-about">${e.about}</div>
        <div class="ec-tags">${e.tags.map(t=>`<span class="etag ${tc(t)}">${t}</span>`).join('')}</div>
        <div class="ec-foot">
          <span class="open-jobs">💼 ${e.openJobs} open job${e.openJobs!==1?'s':''}</span>
          <span class="company-size">🏢 ${e.size}</span>
          <div class="ec-btns">
            <button class="save-btn${saved.has(e.id)?' saved':''}" id="sv-${e.id}" onclick="toggleSave(${e.id},event)">${saved.has(e.id)?'❤️':'🤍'}</button>
            <button class="view-btn" onclick="openModal(${e.id});event.stopPropagation()">View Profile</button>
            <button class="apply-btn" onclick="toast('💼','Viewing jobs at ${e.name}…');event.stopPropagation()">View Jobs</button>
          </div>
        </div>
      </div>
    </div>`).join('');
  renderPag();
}

function renderPag(){
  const tot=Math.ceil(filtered.length/PER);
  if(tot<=1){document.getElementById('pag').innerHTML='';return;}
  let h=`<button class="pg" onclick="goPage(${page-1})" ${page===1?'disabled':''}>‹</button>`;
  for(let i=1;i<=tot;i++) h+=`<button class="pg${i===page?' on':''}" onclick="goPage(${i})">${i}</button>`;
  h+=`<button class="pg" onclick="goPage(${page+1})" ${page===tot?'disabled':''}>›</button>`;
  document.getElementById('pag').innerHTML=h;
}

function goPage(p){
  const tot=Math.ceil(filtered.length/PER);
  if(p<1||p>tot)return;
  page=p;render();
  document.querySelector('.wrap').scrollIntoView({behavior:'smooth',block:'start'});
}

function applyFilters(){
  const kw=document.getElementById('fKw').value.toLowerCase();
  const lc=document.getElementById('fLoc').value.toLowerCase();
  const inds=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Technology','Finance','Design','Healthcare','Marketing','Education'].includes(c.value)).map(c=>c.value);
  const sizes=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Startup','Mid-size','Large','MNC'].includes(c.value)).map(c=>c.value);
  const statuses=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Hiring','Featured'].includes(c.value)).map(c=>c.value);
  const modes=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Remote','Hybrid','On-site'].includes(c.value)).map(c=>c.value);
  const sort=document.getElementById('sortSel').value;

  filtered=EMPLOYERS.filter(e=>{
    if(kw&&!e.name.toLowerCase().includes(kw)&&!e.industry.toLowerCase().includes(kw)&&!e.about.toLowerCase().includes(kw))return false;
    if(lc&&!e.loc.toLowerCase().includes(lc))return false;
    if(inds.length&&!inds.some(i=>e.industry.includes(i)||e.tags.includes(i)))return false;
    if(sizes.length&&!sizes.includes(e.size))return false;
    if(statuses.includes('Hiring')&&!e.hiring)return false;
    if(statuses.includes('Featured')&&!e.featured)return false;
    if(modes.length&&!modes.includes(e.mode))return false;
    return true;
  });

  if(sort==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='jobs') filtered.sort((a,b)=>b.openJobs-a.openJobs);
  else if(sort==='size') filtered.sort((a,b)=>b.sizeNum-a.sizeNum);

  page=1;render();
}

function resetAll(){
  document.getElementById('fKw').value='';
  document.getElementById('fLoc').value='';
  document.querySelectorAll('input[type=checkbox]').forEach(c=>c.checked=false);
  document.getElementById('sortSel').value='name';
  filtered=[...EMPLOYERS];page=1;render();
  toast('🔄','Filters reset');
}

function heroSearch(){
  const kw=document.getElementById('heroKw').value.trim();
  const lc=document.getElementById('heroLoc').value.trim();
  if(kw)document.getElementById('fKw').value=kw;
  if(lc)document.getElementById('fLoc').value=lc;
  applyFilters();
  document.querySelector('.wrap').scrollIntoView({behavior:'smooth'});
}

function setView(v){
  view=v;
  document.getElementById('listVt').classList.toggle('on',v==='list');
  document.getElementById('gridVt').classList.toggle('on',v==='grid');
  render();
}

function toggleSave(id,e){
  e.stopPropagation();
  const emp=EMPLOYERS.find(x=>x.id===id);
  if(saved.has(id)){saved.delete(id);toast('🤍','Removed from saved');}
  else{saved.add(id);toast('❤️',emp.name+' saved!');}
  const b=document.getElementById('sv-'+id);
  if(b){b.classList.toggle('saved',saved.has(id));b.textContent=saved.has(id)?'❤️':'🤍';}
}

function openModal(id){
  const e=EMPLOYERS.find(x=>x.id===id);
  document.getElementById('mLogo').textContent=e.logo;
  document.getElementById('mName').textContent=e.name;
  document.getElementById('mIndustry').textContent=e.industry;
  document.getElementById('mLoc').innerHTML='📍 '+e.loc;
  document.getElementById('mHiring').innerHTML=e.hiring?'● Actively Hiring':'● Not Hiring';
  document.getElementById('mHiring').style.background=e.hiring?'#dcfce7':'#f1f5f9';
  document.getElementById('mHiring').style.color=e.hiring?'#15803d':'#64748b';
  document.getElementById('mSize').textContent=e.employees;
  document.getElementById('mFounded').textContent=e.founded;
  document.getElementById('mMode').textContent=e.mode;
  document.getElementById('mWeb').textContent=e.web;
  document.getElementById('mAbout').textContent=e.about;
  document.getElementById('mJobCount').textContent=e.openJobs;
  document.getElementById('mJobs').innerHTML=e.jobs.map(j=>`
    <div class="m-job-item">
      <div><div class="mji-title">${j.t}</div><div class="mji-info">📍 ${j.loc}</div></div>
      <span class="mji-type ${jc(j.type)}">${j.type}</span>
    </div>`).join('');
  document.getElementById('modal').classList.add('show');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modal').classList.remove('show');
  document.body.style.overflow='';
}
document.getElementById('modal').addEventListener('click',function(e){if(e.target===this)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

let tTimer;
function toast(ico,msg){
  document.getElementById('tIco').textContent=ico;
  document.getElementById('tMsg').textContent=msg;
  const el=document.getElementById('toastEl');
  el.classList.add('show');
  clearTimeout(tTimer);
  tTimer=setTimeout(()=>el.classList.remove('show'),2800);
}

render();
//employee



//concact
/* subject tabs */
function setTab(el){
  document.querySelectorAll('.sub-tab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('subject').value = el.textContent + ' Enquiry';
  vReq('subject','sb-w','sb-e');
}

/* char count */
function updateChar(){
  document.getElementById('charCount').textContent = document.getElementById('message').value.length;
}

/* validation helpers */
function setW(id,state){
  const w=document.getElementById(id);
  w.classList.toggle('v',state==='v');
  w.classList.toggle('e',state==='e');
}
function vReq(fid,wid,eid){
  const v=document.getElementById(fid).value.trim();
  if(!v){setW(wid,'e');document.getElementById(eid).style.display='block';return false;}
  setW(wid,'v');document.getElementById(eid).style.display='none';return true;
}
function vEmail(){
  const v=document.getElementById('email').value.trim();
  const ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if(!v){setW('em-w','');document.getElementById('em-e').style.display='none';return false;}
  setW('em-w',ok?'v':'e');
  document.getElementById('em-e').style.display=ok?'none':'block';
  return ok;
}

/* submit */
function handleSubmit(e){
  e.preventDefault();
  const a=vReq('firstName','fn-w','fn-e');
  const b=vReq('lastName','ln-w','ln-e');
  const c=vEmail();
  const d=vReq('subject','sb-w','sb-e');
  const f=vReq('message','msg-w','msg-e');
  if(![a,b,c,d,f].every(Boolean))return;

  const btn=document.getElementById('submitBtn');
  const sp=document.getElementById('spin');
  const tx=document.getElementById('submitTxt');
  btn.disabled=true;btn.style.opacity='.75';
  sp.style.display='block';tx.textContent='Sending…';

  setTimeout(()=>{
    document.getElementById('formArea').style.display='none';
    document.getElementById('successBox').style.display='block';
  },1800);
}

function resetForm(){
  document.getElementById('contactForm').reset();
  document.getElementById('charCount').textContent='0';
  document.querySelectorAll('.iw').forEach(w=>{w.classList.remove('v','e')});
  document.querySelectorAll('.err-msg').forEach(e=>e.style.display='none');
  document.querySelectorAll('.sub-tab').forEach((t,i)=>t.classList.toggle('on',i===0));
  const btn=document.getElementById('submitBtn');
  btn.disabled=false;btn.style.opacity='1';
  document.getElementById('spin').style.display='none';
  document.getElementById('submitTxt').textContent='📨 Send Message';
  document.getElementById('successBox').style.display='none';
  document.getElementById('formArea').style.display='block';
}

/* FAQ accordion */
function toggleFaq(el){
  const item=el.closest('.faq-item');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

/* toast */
let tTimer;
function showToast(ico,msg){
  document.getElementById('tIco').textContent=ico;
  document.getElementById('tMsg').textContent=msg;
  const el=document.getElementById('toastEl');
  el.classList.add('show');
  clearTimeout(tTimer);
  tTimer=setTimeout(()=>el.classList.remove('show'),2800);
}
//contact




//comany registration
let currentStep = 1;

/* ── Step Navigation ── */
function goStep(n) {
  if (n > currentStep && !validateStep(currentStep)) return;

  // hide current
  document.getElementById('formStep' + currentStep).style.display = 'none';

  // update step indicators
  const prev = document.getElementById('step' + currentStep);
  prev.className = 'step done';
  prev.querySelector('.step-circle').textContent = '✓';

  if (n > 1) document.getElementById('line' + (n - 1)).classList.add('done');

  currentStep = n;

  const cur = document.getElementById('step' + currentStep);
  cur.className = 'step active';

  document.getElementById('formStep' + currentStep).style.display = 'block';
  document.querySelector('.form-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateStep(s) {
  if (s === 1) {
    const a = vReq('cname', 'w-cname', 'e-cname');
    const b = vSel('ctype', 'w-ctype', 'e-ctype');
    const c = vSel('industry', 'w-ind', 'e-ind');
    const d = vSel('csize', 'w-size', 'e-size');
    return a && b && c && d;
  }
  if (s === 2) {
    const a = vReq('hrname', 'w-hrname', 'e-hrname');
    const b = vEmail();
    const c = vReq('cphone', 'w-phone', 'e-phone');
    const d = vSel('country', 'w-country', 'e-country');
    return a && b && c && d;
  }
  return true;
}

/* ── Validators ── */
function setWrap(id, state) {
  const w = document.getElementById(id);
  if (!w) return;
  w.classList.toggle('valid', state === 'valid');
  w.classList.toggle('invalid', state === 'invalid');
}

function vReq(fieldId, wrapId, errId) {
  const v = document.getElementById(fieldId).value.trim();
  if (!v) {
    setWrap(wrapId, 'invalid');
    document.getElementById(errId).style.display = 'block';
    return false;
  }
  setWrap(wrapId, 'valid');
  document.getElementById(errId).style.display = 'none';
  return true;
}

function vSel(fieldId, wrapId, errId) {
  const v = document.getElementById(fieldId).value;
  if (!v) {
    setWrap(wrapId, 'invalid');
    document.getElementById(errId).style.display = 'block';
    return false;
  }
  setWrap(wrapId, 'valid');
  document.getElementById(errId).style.display = 'none';
  return true;
}

function vEmail() {
  const v = document.getElementById('cemail').value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if (!v) { setWrap('w-email', ''); document.getElementById('e-email').style.display = 'none'; return false; }
  setWrap('w-email', ok ? 'valid' : 'invalid');
  document.getElementById('e-email').style.display = ok ? 'none' : 'block';
  return ok;
}

function vLoginEmail() {
  const v = document.getElementById('lemail').value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if (!v) { setWrap('w-lemail', ''); document.getElementById('e-lemail').style.display = 'none'; return false; }
  setWrap('w-lemail', ok ? 'valid' : 'invalid');
  document.getElementById('e-lemail').style.display = ok ? 'none' : 'block';
  return ok;
}

function vPassword() {
  const v = document.getElementById('cpass').value;
  const ok = v.length >= 8;
  setWrap('w-pass', v.length === 0 ? '' : ok ? 'valid' : 'invalid');
  document.getElementById('e-pass').style.display = (!ok && v.length > 0) ? 'block' : 'none';

  const str = document.getElementById('pwStr');
  if (!v.length) { str.style.display = 'none'; return ok; }
  str.style.display = 'block';
  const score = [v.length >= 8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^a-zA-Z0-9]/.test(v)].filter(Boolean).length;
  const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  ['pb1','pb2','pb3','pb4'].forEach((id, i) => {
    document.getElementById(id).style.background = i < score ? colors[score] : 'var(--border)';
  });
  const lbl = document.getElementById('pwLbl');
  lbl.textContent = 'Strength: ' + (labels[score] || '');
  lbl.style.color = colors[score];
  return ok;
}

function vConfirm() {
  const p = document.getElementById('cpass').value;
  const c = document.getElementById('ccpass').value;
  if (!c) { setWrap('w-cpass', ''); document.getElementById('e-cpass').style.display = 'none'; return false; }
  const ok = p === c;
  setWrap('w-cpass', ok ? 'valid' : 'invalid');
  document.getElementById('e-cpass').style.display = ok ? 'none' : 'block';
  return ok;
}

/* ── PW Toggles ── */
function togglePw() {
  const i = document.getElementById('cpass');
  i.type = i.type === 'password' ? 'text' : 'password';
  document.getElementById('pwBtn').textContent = i.type === 'password' ? '👁️' : '🙈';
}
function toggleCPw() {
  const i = document.getElementById('ccpass');
  i.type = i.type === 'password' ? 'text' : 'password';
  document.getElementById('cpBtn').textContent = i.type === 'password' ? '👁️' : '🙈';
}

/* ── Submit ── */
function handleSubmit() {
  const a = vLoginEmail();
  const b = vPassword();
  const c = vConfirm();
  if (!document.getElementById('terms').checked) {
    alert('Please accept the Terms & Conditions to continue.');
    return;
  }
  if (!a || !b || !c) return;

  const btn = document.getElementById('submitBtn');
  const spin = document.getElementById('submitSpin');
  const txt = document.getElementById('submitTxt');
  btn.disabled = true;
  spin.style.display = 'block';
  txt.textContent = 'Creating account…';

  setTimeout(() => {
    document.getElementById('stepsBar').style.display = 'none';
    document.getElementById('formStep3').style.display = 'none';
    document.getElementById('successCard').style.display = 'block';
    document.querySelector('.form-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 2000);
}
//company registration




//company profile
function switchTab(el, id) {
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['overview','jobs','team','reviews','photos'].forEach(t => {
    document.getElementById('tab-' + t).style.display = t === id ? 'block' : 'none';
  });
}

let tt;
function toast(ico, msg) {
  document.getElementById('tIco').textContent = ico;
  document.getElementById('tMsg').textContent = msg;
  const el = document.getElementById('toast');
  el.classList.add('show');
  clearTimeout(tt);
  tt = setTimeout(() => el.classList.remove('show'), 2600);
}
//company profile







//company login
/* ── Tab Switch ── */
function switchTab(tab){
  const isLogin = tab === 'login';
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabRegister').classList.toggle('active', !isLogin);
  document.getElementById('loginSection').style.display = isLogin ? 'block' : 'none';
  document.getElementById('registerSection').style.display = isLogin ? 'none' : 'block';
  document.getElementById('successScreen').style.display = 'none';
}

/* ── Validators ── */
function setWrap(id, state){
  const w = document.getElementById(id);
  w.classList.toggle('valid', state === 'valid');
  w.classList.toggle('invalid', state === 'invalid');
}
function vEmail(){
  const v = document.getElementById('email').value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if(!v){ setWrap('eWrap',''); document.getElementById('eErr').style.display='none'; return false; }
  setWrap('eWrap', ok?'valid':'invalid');
  document.getElementById('eErr').style.display = ok?'none':'block';
  return ok;
}
function vPass(){
  const v = document.getElementById('password').value;
  const ok = v.length >= 6;
  if(!v){ setWrap('pWrap',''); document.getElementById('pErr').style.display='none'; return false; }
  setWrap('pWrap', ok?'valid':'invalid');
  document.getElementById('pErr').style.display = ok?'none':'block';
  return ok;
}

/* ── Toggle PW ── */
function togglePw(){
  const inp = document.getElementById('password');
  const btn = document.getElementById('pwBtn');
  inp.type = inp.type==='password'?'text':'password';
  btn.textContent = inp.type==='password'?'👁️':'🙈';
}
function toggleRPw(){
  const inp = document.getElementById('rPass');
  inp.type = inp.type==='password'?'text':'password';
}

/* ── Login ── */
function handleLogin(e){
  e.preventDefault();
  const eOk = vEmail(), pOk = vPass();
  if(!eOk||!pOk) return;

  const btn = document.getElementById('loginBtn');
  const spin = document.getElementById('loginSpin');
  const txt = document.getElementById('loginTxt');
  const arr = document.getElementById('loginArr');
  btn.disabled=true; btn.style.opacity='.75';
  spin.style.display='block'; txt.textContent='Logging in…'; arr.style.display='none';

  setTimeout(()=>{
    document.getElementById('loginSection').style.display='none';
    document.getElementById('successScreen').style.display='block';
    btn.disabled=false; btn.style.opacity='1';
    spin.style.display='none'; txt.textContent='Login to Dashboard'; arr.style.display='';
  }, 1800);
}

/* ── Register ── */
function handleRegister(e){
  e.preventDefault();
  const comp = document.getElementById('rComp').value.trim();
  const email = document.getElementById('rEmail').value.trim();
  const pass = document.getElementById('rPass').value;
  const terms = document.getElementById('rTerms').checked;
  if(!comp||!email||!pass){ alert('Please fill in all required fields.'); return; }
  if(!terms){ alert('Please accept the Terms & Conditions.'); return; }

  const btn = document.getElementById('regBtn');
  const spin = document.getElementById('regSpin');
  const txt = document.getElementById('regTxt');
  btn.disabled=true; btn.style.opacity='.75';
  spin.style.display='block'; txt.textContent='Creating account…';

  setTimeout(()=>{
    document.getElementById('registerSection').style.display='none';
    document.getElementById('successScreen').style.display='block';
    document.getElementById('successScreen').querySelector('h3').textContent='Account Created!';
    document.getElementById('successScreen').querySelector('p').textContent='Your company account is ready.\nStart posting jobs and finding great talent.';
    btn.disabled=false; btn.style.opacity='1';
    spin.style.display='none'; txt.textContent='Create Company Account';
  }, 1800);
}

/* ── Social ── */
function handleSocial(btn, name){
  btn.disabled=true;
  btn.innerHTML=`<span style="width:14px;height:14px;border:2px solid #c5d8ff;border-top-color:var(--primary);border-radius:50%;animation:spin .65s linear infinite;display:inline-block;vertical-align:middle"></span>&nbsp; Connecting to ${name}…`;
  setTimeout(()=>{
    btn.disabled=false;
    btn.innerHTML=`✅ Connected via ${name}`;
    btn.style.color='var(--green)';
    btn.style.borderColor='var(--green)';
    btn.style.background='#f0fdf4';
  }, 1600);
}

function showToast(){
  alert('Redirecting to your company dashboard…');
}
//companylogin





//candidate
const COLORS = ['#1a6fff','#7c3aed','#0891b2','#059669','#dc2626','#d97706','#db2777','#0d9488'];

const CANDIDATES = [
  {id:1,name:"Priya Sharma",role:"Senior React Developer",loc:"Bangalore, IN",cat:"Technology",exp:"Senior",years:"7 years",sal:"$90–110K",mode:"Remote",avail:"Available",skills:["React","TypeScript","Next.js","GraphQL","Node.js"],about:"Passionate frontend engineer with 7+ years building scalable UIs for fintech and e-commerce products. Love clean code and great UX.",jobs:[{title:"Lead Frontend Engineer",company:"Razorpay",period:"2021–Present"},{title:"Senior Developer",company:"Flipkart",period:"2019–2021"}],color:"#1a6fff"},
  {id:2,name:"Arjun Mehta",role:"UI/UX Designer",loc:"Mumbai, IN",cat:"Design",exp:"Mid-level",years:"4 years",sal:"$60–80K",mode:"Hybrid",avail:"Open",skills:["Figma","Adobe XD","Prototyping","User Research","Sketch"],about:"Creative designer who transforms complex problems into elegant digital experiences. Strong focus on accessibility and design systems.",jobs:[{title:"Product Designer",company:"Swiggy",period:"2022–Present"},{title:"UX Designer",company:"MakeMyTrip",period:"2020–2022"}],color:"#7c3aed"},
  {id:3,name:"Rohan Das",role:"Data Scientist",loc:"Hyderabad, IN",cat:"Technology",exp:"Junior",years:"2 years",sal:"$50–70K",mode:"Remote",avail:"Available",skills:["Python","ML","TensorFlow","SQL","Pandas"],about:"Data science graduate with hands-on experience in predictive modelling and NLP. Looking for a role to grow in a data-driven team.",jobs:[{title:"Junior Data Scientist",company:"Ola",period:"2023–Present"},{title:"ML Intern",company:"CRED",period:"2022–2023"}],color:"#0891b2"},
  {id:4,name:"Sneha Patel",role:"Product Manager",loc:"Delhi, IN",cat:"Technology",exp:"Senior",years:"8 years",sal:"$100–130K",mode:"On-site",avail:"Open",skills:["Roadmapping","Agile","JIRA","Analytics","SQL"],about:"Strategic PM with 8 years leading cross-functional teams to deliver zero-to-one products at scale in B2B and B2C spaces.",jobs:[{title:"Senior PM",company:"Paytm",period:"2020–Present"},{title:"Product Manager",company:"Zomato",period:"2016–2020"}],color:"#db2777"},
  {id:5,name:"Vikram Nair",role:"DevOps Engineer",loc:"Chennai, IN",cat:"Technology",exp:"Mid-level",years:"5 years",sal:"$80–100K",mode:"Remote",avail:"Available",skills:["Kubernetes","AWS","Docker","Terraform","CI/CD"],about:"DevOps engineer with deep expertise in cloud infrastructure automation and maintaining 99.99% uptime at scale.",jobs:[{title:"DevOps Lead",company:"Freshworks",period:"2021–Present"},{title:"Cloud Engineer",company:"TCS",period:"2019–2021"}],color:"#059669"},
  {id:6,name:"Ananya Rao",role:"Graphic Designer",loc:"Pune, IN",cat:"Design",exp:"Fresher",years:"1 year",sal:"$30–45K",mode:"Remote",avail:"Available",skills:["Photoshop","Illustrator","Canva","Figma","Branding"],about:"Creative visual designer with a strong portfolio in brand identity, social media content, and digital marketing assets.",jobs:[{title:"Junior Designer",company:"DesignHub",period:"2024–Present"}],color:"#d97706"},
  {id:7,name:"Karan Singh",role:"Financial Analyst",loc:"Mumbai, IN",cat:"Finance",exp:"Mid-level",years:"4 years",sal:"$70–90K",mode:"On-site",avail:"Busy",skills:["Excel","Financial Modelling","Python","PowerBI","Bloomberg"],about:"CFA-certified analyst specialising in equity research and M&A valuation for large-cap companies in the Indian market.",jobs:[{title:"Senior Analyst",company:"HDFC Securities",period:"2022–Present"},{title:"Analyst",company:"Kotak Mahindra",period:"2020–2022"}],color:"#0891b2"},
  {id:8,name:"Divya Kumar",role:"Digital Marketer",loc:"Bangalore, IN",cat:"Marketing",exp:"Mid-level",years:"3 years",sal:"$50–65K",mode:"Hybrid",avail:"Open",skills:["SEO","Google Ads","Meta Ads","Content","Analytics"],about:"Growth marketer who has driven 3x organic traffic and managed ₹2Cr+ in paid ad budgets across e-commerce and SaaS brands.",jobs:[{title:"Growth Manager",company:"UrbanLadder",period:"2022–Present"},{title:"Digital Analyst",company:"Myntra",period:"2021–2022"}],color:"#dc2626"},
  {id:9,name:"Rahul Verma",role:"Backend Engineer",loc:"Noida, IN",cat:"Technology",exp:"Senior",years:"6 years",sal:"$85–105K",mode:"Remote",avail:"Available",skills:["Node.js","Python","PostgreSQL","Redis","Microservices"],about:"Backend specialist with expertise in building high-throughput APIs and event-driven architectures for millions of users.",jobs:[{title:"Backend Lead",company:"Meesho",period:"2021–Present"},{title:"Backend Engineer",company:"InfySys",period:"2018–2021"}],color:"#7c3aed"},
  {id:10,name:"Pooja Iyer",role:"Medical Officer",loc:"Chennai, IN",cat:"Healthcare",exp:"Junior",years:"2 years",sal:"$60–80K",mode:"On-site",avail:"Open",skills:["Patient Care","Diagnosis","EMR","Pharmacology","Research"],about:"MBBS graduate with postgrad experience in internal medicine at a 500-bed hospital. Passionate about evidence-based care.",jobs:[{title:"Medical Officer",company:"Apollo Hospitals",period:"2023–Present"},{title:"Junior Resident",company:"AIIMS Delhi",period:"2022–2023"}],color:"#059669"},
  {id:11,name:"Siddharth Joshi",role:"Cloud Architect",loc:"Pune, IN",cat:"Technology",exp:"Senior",years:"10 years",sal:"$120–150K",mode:"Remote",avail:"Open",skills:["AWS","Azure","GCP","Serverless","Security"],about:"Solutions architect certified in AWS and GCP. Designed cloud migrations for 20+ enterprise clients, cutting infra costs by 40%.",jobs:[{title:"Principal Architect",company:"TCS",period:"2019–Present"},{title:"Solutions Architect",company:"Wipro",period:"2014–2019"}],color:"#0d9488"},
  {id:12,name:"Meera Reddy",role:"Content Strategist",loc:"Remote",cat:"Marketing",exp:"Junior",years:"2 years",sal:"$35–50K",mode:"Remote",avail:"Available",skills:["Content Writing","SEO","Copywriting","WordPress","Notion"],about:"Content creator who combines storytelling and SEO best practices to grow organic audiences for SaaS and fintech brands.",jobs:[{title:"Content Writer",company:"Unacademy",period:"2023–Present"},{title:"Intern",company:"Nykaa",period:"2022–2023"}],color:"#d97706"},
  {id:13,name:"Aditya Bose",role:"iOS Developer",loc:"Bangalore, IN",cat:"Technology",exp:"Mid-level",years:"4 years",sal:"$80–100K",mode:"Hybrid",avail:"Available",skills:["Swift","SwiftUI","UIKit","Xcode","REST APIs"],about:"Passionate iOS developer who has shipped 6 live apps on the App Store with combined 500K+ downloads.",jobs:[{title:"iOS Engineer",company:"Paytm",period:"2022–Present"},{title:"iOS Dev",company:"ClearTax",period:"2020–2022"}],color:"#1a6fff"},
  {id:14,name:"Nisha Gupta",role:"HR Business Partner",loc:"Hyderabad, IN",cat:"Healthcare",exp:"Mid-level",years:"5 years",sal:"$55–72K",mode:"On-site",avail:"Busy",skills:["HRBP","Talent Acquisition","HRMS","L&D","OKRs"],about:"HR professional skilled in talent management, culture initiatives, and driving performance frameworks across tech companies.",jobs:[{title:"Senior HRBP",company:"InfySys",period:"2021–Present"},{title:"HR Manager",company:"Wipro",period:"2019–2021"}],color:"#db2777"},
  {id:15,name:"Tanvir Ahmed",role:"ML Engineer",loc:"Remote",cat:"Technology",exp:"Senior",years:"7 years",sal:"$105–130K",mode:"Remote",avail:"Open",skills:["PyTorch","MLOps","NLP","LLMs","Kubernetes"],about:"ML engineer specialising in LLM fine-tuning and production MLOps pipelines. Contributor to several open-source AI projects.",jobs:[{title:"Staff ML Engineer",company:"Ola",period:"2021–Present"},{title:"ML Researcher",company:"IISc",period:"2018–2021"}],color:"#0891b2"},
  {id:16,name:"Lavanya Suresh",role:"Sales Manager",loc:"Bangalore, IN",cat:"Marketing",exp:"Mid-level",years:"5 years",sal:"$65–85K",mode:"Hybrid",avail:"Available",skills:["B2B Sales","CRM","Salesforce","Negotiation","Strategy"],about:"Sales leader with a track record of exceeding targets by 40%+ YoY. Expert in SaaS and enterprise software deal cycles.",jobs:[{title:"Regional Sales Manager",company:"Meesho",period:"2022–Present"},{title:"Sales Executive",company:"Zoho",period:"2019–2022"}],color:"#dc2626"},
];

let filtered=[...CANDIDATES], view='list', page=1, saved=new Set();
const PER=6;

function initials(name){return name.split(' ').map(w=>w[0]).join('').slice(0,2)}
function availClass(a){return a==='Available'?'open':a==='Open'?'open':'busy'}
function availLabel(a){return a==='Available'?'● Available Now':a==='Open'?'● Open to Offers':'● Currently Busy'}

function render(){
  const list=document.getElementById('cardsList');
  list.className='cards-wrap'+(view==='grid'?' grid':'');
  if(!filtered.length){
    list.innerHTML=`<div class="empty"><div class="ei">👤</div><h3>No candidates found</h3><p>Try adjusting your search or filters.</p></div>`;
    document.getElementById('pag').innerHTML='';
    document.getElementById('resTxt').innerHTML=`<b>0</b> candidates found`;
    return;
  }
  document.getElementById('resTxt').innerHTML=`<b>${filtered.length} candidate${filtered.length!==1?'s':''}</b> found`;
  const slice=filtered.slice((page-1)*PER,page*PER);
  list.innerHTML=slice.map((c,i)=>`
    <div class="cand-card" style="animation-delay:${i*.06}s" onclick="openModal(${c.id})">
      <div class="avail-dot ${availClass(c.avail)}">${availLabel(c.avail)}</div>
      <div class="av-wrap">
        <div class="av" style="background:${c.color}">${initials(c.name)}</div>
        <div class="av-badge">✓</div>
      </div>
      <div class="cc-body">
        <div class="cc-name">${c.name}</div>
        <div class="cc-role">${c.role}</div>
        <div class="cc-meta">
          <span>📍 ${c.loc}</span>
          <span>🕐 ${c.years}</span>
          <span>🌍 ${c.mode}</span>
        </div>
        <div class="cc-skills">
          ${c.skills.slice(0,4).map(s=>`<span class="skill-tag">${s}</span>`).join('')}
          ${c.skills.length>4?`<span class="skill-tag">+${c.skills.length-4}</span>`:''}
        </div>
        <div class="cc-about">${c.about}</div>
        <div class="cc-foot">
          <span class="exp-badge">📊 ${c.exp}</span>
          <span class="sal-range">${c.sal}</span>
          <div class="cc-btns">
            <button class="save-btn${saved.has(c.id)?' saved':''}" id="sv-${c.id}" onclick="toggleSave(${c.id},event)">${saved.has(c.id)?'❤️':'🤍'}</button>
            <button class="view-btn" onclick="openModal(${c.id});event.stopPropagation()">View Profile</button>
            <button class="contact-btn" onclick="toast('✉️','Message sent to '+event.target.closest('.cand-card').querySelector('.cc-name').textContent+'!');event.stopPropagation()">Contact</button>
          </div>
        </div>
      </div>
    </div>`).join('');
  renderPag();
}

function renderPag(){
  const tot=Math.ceil(filtered.length/PER);
  if(tot<=1){document.getElementById('pag').innerHTML='';return;}
  let h=`<button class="pg" onclick="goPage(${page-1})" ${page===1?'disabled':''}>‹</button>`;
  for(let i=1;i<=tot;i++) h+=`<button class="pg${i===page?' on':''}" onclick="goPage(${i})">${i}</button>`;
  h+=`<button class="pg" onclick="goPage(${page+1})" ${page===tot?'disabled':''}>›</button>`;
  document.getElementById('pag').innerHTML=h;
}

function goPage(p){
  const tot=Math.ceil(filtered.length/PER);
  if(p<1||p>tot)return;
  page=p;render();
  document.querySelector('.wrap').scrollIntoView({behavior:'smooth',block:'start'});
}

function applyFilters(){
  const kw=document.getElementById('fKw').value.toLowerCase();
  const lc=document.getElementById('fLoc').value.toLowerCase();
  const cats=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Technology','Design','Finance','Marketing','Healthcare'].includes(c.value)).map(c=>c.value);
  const exps=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Fresher','Junior','Mid-level','Senior'].includes(c.value)).map(c=>c.value);
  const avails=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Available','Open','Busy'].includes(c.value)).map(c=>c.value);
  const modes=[...document.querySelectorAll('input[type=checkbox]:checked')].filter(c=>['Remote','On-site','Hybrid'].includes(c.value)).map(c=>c.value);
  const sort=document.getElementById('sortSel').value;

  filtered=CANDIDATES.filter(c=>{
    if(kw&&!c.name.toLowerCase().includes(kw)&&!c.role.toLowerCase().includes(kw)&&!c.skills.some(s=>s.toLowerCase().includes(kw)))return false;
    if(lc&&!c.loc.toLowerCase().includes(lc))return false;
    if(cats.length&&!cats.includes(c.cat))return false;
    if(exps.length&&!exps.includes(c.exp))return false;
    if(avails.length&&!avails.includes(c.avail))return false;
    if(modes.length&&!modes.includes(c.mode))return false;
    return true;
  });

  if(sort==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='exp') filtered.sort((a,b)=>parseInt(b.years)-parseInt(a.years));
  else if(sort==='sal') filtered.sort((a,b)=>parseInt(a.sal.replace(/\D/g,''))-parseInt(b.sal.replace(/\D/g,'')));

  page=1;render();
}

function resetAll(){
  document.getElementById('fKw').value='';
  document.getElementById('fLoc').value='';
  document.querySelectorAll('input[type=checkbox]').forEach(c=>c.checked=false);
  document.getElementById('sortSel').value='name';
  filtered=[...CANDIDATES];page=1;render();
  toast('🔄','Filters reset');
}

function heroSearch(){
  const kw=document.getElementById('heroKw').value.trim();
  const lc=document.getElementById('heroLoc').value.trim();
  if(kw)document.getElementById('fKw').value=kw;
  if(lc)document.getElementById('fLoc').value=lc;
  applyFilters();
  document.querySelector('.wrap').scrollIntoView({behavior:'smooth'});
}

function setView(v){
  view=v;
  document.getElementById('listVt').classList.toggle('on',v==='list');
  document.getElementById('gridVt').classList.toggle('on',v==='grid');
  render();
}

function toggleSave(id,e){
  e.stopPropagation();
  const c=CANDIDATES.find(x=>x.id===id);
  if(saved.has(id)){saved.delete(id);toast('🤍','Removed from saved');}
  else{saved.add(id);toast('❤️',c.name+' saved!');}
  const b=document.getElementById('sv-'+id);
  if(b){b.classList.toggle('saved',saved.has(id));b.textContent=saved.has(id)?'❤️':'🤍';}
}

function openModal(id){
  const c=CANDIDATES.find(x=>x.id===id);
  document.getElementById('mAv').style.background=c.color;
  document.getElementById('mAv').textContent=initials(c.name);
  document.getElementById('mName').textContent=c.name;
  document.getElementById('mRole').textContent=c.role;
  document.getElementById('mStatus').textContent=availLabel(c.avail);
  document.getElementById('mLoc').textContent=c.loc;
  document.getElementById('mExp').textContent=c.years;
  document.getElementById('mSal').textContent=c.sal+'/yr';
  document.getElementById('mMode').textContent=c.mode;
  document.getElementById('mAbout').textContent=c.about;
  document.getElementById('mSkills').innerHTML=c.skills.map(s=>`<span class="m-skill">${s}</span>`).join('');
  document.getElementById('mExps').innerHTML=c.jobs.map(j=>`
    <div class="m-exp-item">
      <div class="exp-dot"></div>
      <div class="exp-info"><h5>${j.title}</h5><p>${j.company}</p><span>${j.period}</span></div>
    </div>`).join('');
  document.getElementById('modal').classList.add('show');
  document.body.style.overflow='hidden';
}

function closeModal(){
  document.getElementById('modal').classList.remove('show');
  document.body.style.overflow='';
}

document.getElementById('modal').addEventListener('click',function(e){if(e.target===this)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

let tTimer;
function toast(ico,msg){
  document.getElementById('tIco').textContent=ico;
  document.getElementById('tMsg').textContent=msg;
  const el=document.getElementById('toastEl');
  el.classList.add('show');
  clearTimeout(tTimer);
  tTimer=setTimeout(()=>el.classList.remove('show'),2800);
}

render();
//candidate
