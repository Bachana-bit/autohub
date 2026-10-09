/* Loader, reveal, tilt, magnetic, counters, cursor, spotlight, hero parallax */
(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const ld=document.createElement('div');ld.className='loader';ld.innerHTML='<div class="logo"><i></i>AUTOHUB</div><div class="ln"><i></i></div>';ld.setAttribute('aria-hidden','true');document.body.appendChild(ld);
const hide=()=>{ld.classList.add('done');document.body.classList.add('ready');setTimeout(()=>ld.remove(),1000)};
addEventListener('load',()=>setTimeout(hide,reduce?0:900));setTimeout(hide,3000);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
AH.observe=(root=document)=>root.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));AH.observe();
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,end=+el.dataset.count,t0=performance.now();
 (function f(t){const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
if(!fine||reduce)return;
// tilt (event delegation)
document.addEventListener('mousemove',e=>{const c=e.target.closest('.tilt');if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`});
document.addEventListener('mouseout',e=>{const c=e.target.closest('.tilt');if(c&&!c.contains(e.relatedTarget))c.style.transform=''});
// magnetic
document.addEventListener('mousemove',e=>{const b=e.target.closest('.mag');if(!b)return;const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});
document.addEventListener('mouseout',e=>{const b=e.target.closest('.mag');if(b)b.style.transform=''});
// cursor + spotlight
const cur=document.createElement('div');cur.className='cursor';const sp=document.createElement('div');sp.className='spot';document.body.append(cur,sp);
let mx=0,my=0,cx=0,cy=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;sp.style.setProperty('--mx',mx+'px');sp.style.setProperty('--my',my+'px')},{passive:true});
(function loop(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;cur.style.left=cx+'px';cur.style.top=cy+'px';requestAnimationFrame(loop)})();
document.addEventListener('mouseover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,.mag,.chip')));
// hero parallax
const car=document.querySelector('.hero-car');if(car)document.querySelector('.hero').addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;car.style.transform=`translate(${x*-30}px,${y*-16}px) scale(1.02)`});
})();
