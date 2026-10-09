(function(){
const id=+new URLSearchParams(location.search).get('id')||1,v=AH.find(id)||V[0],$=i=>document.getElementById(i);
document.title=`${v.year} ${v.brand} ${v.model} — AUTOHUB`;
$('crumb').textContent=`${v.brand} ${v.model}`;
let cur=0;const main=$('galMain');
function show(i){cur=(i+v.gallery.length)%v.gallery.length;main.innerHTML=`<img src="${v.gallery[cur]}" alt="${v.brand} ${v.model} photo ${cur+1}">`;document.querySelectorAll('.thumbs button').forEach((b,k)=>{b.classList.toggle('on',k===cur);b.setAttribute('aria-current',k===cur)});$('viewerImg').src=v.gallery[cur]}
$('thumbs').innerHTML=v.gallery.map((g,i)=>`<button data-i="${i}" aria-label="Show photo ${i+1}"><img src="${g}" alt="" loading="lazy"></button>`).join('');
$('thumbs').addEventListener('click',e=>{const b=e.target.closest('button');b&&show(+b.dataset.i)});
$('prev').addEventListener('click',e=>{e.stopPropagation();show(cur-1)});$('next').addEventListener('click',e=>{e.stopPropagation();show(cur+1)});
main.addEventListener('click',e=>{if(!e.target.closest('.gal-nav'))AH.modal('viewer',true)});
$('vPrev').addEventListener('click',()=>show(cur-1));$('vNext').addEventListener('click',()=>show(cur+1));
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
let sx=0;main.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
show(0);
$('vTitle').textContent=`${v.year} ${v.brand} ${v.model}`;$('vPrice').textContent=AH.fmt(v.price);
const kv=[['Year',v.year],['Mileage',AH.km(v.mileage)],['Engine',v.engine],['Power',v.horsepower+' hp'],['Transmission',v.transmission],['Fuel',v.fuel],['Drive',v.drive],['Body',v.body],['Exterior',v.color],['Interior',v.interior]];
$('kv').innerHTML=kv.map(k=>`<div><small>${k[0]}</small>${k[1]}</div>`).join('');
$('desc').textContent=`This ${v.year} ${v.brand} ${v.model} comes with the ${v.engine} delivering ${v.horsepower} hp and ${v.torque} Nm through a ${v.transmission.toLowerCase()} gearbox and ${v.drive} drive. Finished in ${v.color.toLowerCase()} with a ${v.interior.toLowerCase()} interior and only ${AH.km(v.mileage)} on the clock. Every AUTOHUB vehicle passes a 150-point inspection and comes with a full history report.`;
const sp=[['Engine',v.engine],['Horsepower',v.horsepower+' hp'],['Torque',v.torque+' Nm'],['0-100 km/h',v.accel+' s'],['Consumption',v.cons+(v.fuel==='Electric'?' kWh/100km':' L/100km')],['Weight',v.weight+' kg'],['Drive',v.drive],['Transmission',v.transmission]];
$('specs').innerHTML=sp.map(k=>`<div><small>${k[0]}</small>${k[1]}</div>`).join('');
$('feats').innerHTML=v.features.map(f=>`<li>${f}</li>`).join('');$('safety').innerHTML=v.safety.map(f=>`<li>${f}</li>`).join('');
const y=new Date().getFullYear();$('history').innerHTML=[[v.year,'First registered, delivered by authorized dealer'],[v.year+1,'Scheduled service, no issues found'],[Math.min(y,v.year+2),`Inspection passed at ${AH.km(Math.round(v.mileage*.8))}`],[y,'AUTOHUB 150-point check, clean title']].map(h=>`<li><b>${h[0]}</b> — ${h[1]}</li>`).join('');
$('similar').innerHTML=V.filter(x=>x.id!==v.id&&(x.body===v.body||x.brand===v.brand)).sort((a,b)=>Math.abs(a.price-v.price)-Math.abs(b.price-v.price)).slice(0,3).map(AH.card).join('');AH.observe();
const f=$('vFav'),sync=()=>{const on=AH.isFav(v.id);f.textContent=on?'Saved ✓':'Save vehicle';f.dataset.fav=v.id};sync();document.addEventListener('favchange',sync);
const c=$('vCmp');c.dataset.cmp=v.id;const cs=()=>c.textContent=AH.isCmp(v.id)?'In comparison ✓':'Compare';cs();c.addEventListener('click',()=>setTimeout(cs,0));
// finance estimate
const fe=()=>{const dp=+$('fdp').value,m=+$('fmo').value,r=7.5/1200,P=v.price-v.price*dp/100,pay=P*r/(1-Math.pow(1+r,-m));$('fdpv').textContent=dp+'% ('+AH.fmt(v.price*dp/100)+')';$('fmov').textContent=m+' months';$('fres').textContent=AH.fmt(pay)+' / month'};
['fdp','fmo'].forEach(i=>$(i).addEventListener('input',fe));fe();$('fLink').href=`finance.html?price=${v.price}`;
// dealer forms
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{$('mTitle').textContent=b.dataset.title||'Contact dealer';$('mSub').textContent=`${v.year} ${v.brand} ${v.model}`;$('dateRow').hidden=b.dataset.title!=='Request test drive';$('date').required=!$('dateRow').hidden;$('mDone').hidden=true;$('inq').hidden=false}));
$('inq').addEventListener('submit',e=>{e.preventDefault();if(!AH.validate(e.target))return;e.target.hidden=true;$('mDone').hidden=false;e.target.reset()});
$('date').min=new Date().toISOString().slice(0,10);
// scrollspy
const links=[...document.querySelectorAll('.subnav a')];addEventListener('scroll',()=>{let a=null;links.forEach(l=>{const s=document.querySelector(l.hash);if(s&&s.getBoundingClientRect().top<160)a=l});links.forEach(l=>l.style.color=l===a?'#fff':'')},{passive:true});
})();
