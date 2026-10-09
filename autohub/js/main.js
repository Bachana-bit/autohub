/* Shared interactions + home page */
AH.badges();
document.addEventListener('click',e=>{
  const f=e.target.closest('[data-fav]');
  if(f){e.preventDefault();const id=+f.dataset.fav,on=AH.toggle('fav',id);document.querySelectorAll(`[data-fav="${id}"]`).forEach(b=>{b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')});AH.toast(on?'Saved to favorites':'Removed from favorites');document.dispatchEvent(new CustomEvent('favchange'));return}
  const c=e.target.closest('[data-cmp]');
  if(c){const id=+c.dataset.cmp,on=AH.toggle('cmp',id,3);if(on===false&&!AH.isCmp(id))return;document.querySelectorAll(`[data-cmp="${id}"]`).forEach(b=>{b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);if(b.classList.contains('cmpb'))b.textContent=on?'Added':'Compare'});AH.toast(on?'Added to comparison':'Removed from comparison');return}
  const o=e.target.closest('[data-open]');if(o){AH.modal(o.dataset.open,true)}
  const x=e.target.closest('[data-close]');if(x){AH.modal(x.closest('.modal').id,false)}
  if(e.target.classList.contains('modal'))AH.modal(e.target.id,false);
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.open').forEach(m=>AH.modal(m.id,false))});
let lastFocus;AH.modal=(id,o)=>{const m=document.getElementById(id);if(!m)return;if(o){lastFocus=document.activeElement}m.classList.toggle('open',o);m.setAttribute('aria-hidden',!o);document.body.classList.toggle('lock',o);if(o){const f=m.querySelector('input,select,textarea,button');f&&setTimeout(()=>f.focus(),50)}else lastFocus&&lastFocus.focus&&lastFocus.focus()};
/* simple form validation helper */
AH.validate=(form)=>{let ok=true;form.querySelectorAll('[required]').forEach(i=>{let m='';const v=i.value.trim();if(!v)m='This field is required';else if(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))m='Enter a valid email address';else if(i.dataset.phone!==undefined&&v.replace(/\D/g,'').length<7)m='Enter a valid phone number';else if(i.type==='number'&&(+v<+(i.min||0)||(i.max&&+v>+i.max)))m='Value out of range';
  i.classList.toggle('err',!!m);let e=i.parentNode.querySelector('.msg-err');if(!e){e=document.createElement('div');e.className='msg-err';e.setAttribute('role','alert');i.parentNode.appendChild(e)}e.textContent=m;if(m)ok=false});return ok};
/* HOME */
if(document.getElementById('featured')){
  const feat=[...V].sort((a,b)=>b.price-a.price).slice(0,6);
  document.getElementById('featured').innerHTML=feat.map(AH.card).join('');
  document.getElementById('latest').innerHTML=[...V].sort((a,b)=>b.year-a.year||b.added-a.added).slice(0,10).map(AH.card).join('');
  const names=['Mercedes-Benz','BMW','Audi','Toyota','Porsche','Lexus','Tesla','Volkswagen','Ford','Nissan','Honda','Land Rover'];
  document.getElementById('brandChips').innerHTML=names.map(n=>`<a class="chip rv" href="inventory.html?brand=${encodeURIComponent(n)}"><span class="logo-c">${n[0]}</span>${n}<small>${V.filter(v=>v.brand===n).length} vehicles</small></a>`).join('');
  const ic={Sedan:'M3 15l2-5h10l4 3h2v3M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0',SUV:'M3 15V9h12l5 4v2M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0',Coupe:'M3 15l3-4h8l6 3v1M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0',Hatchback:'M3 15v-4l4-3h9l4 4v3M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0',Convertible:'M3 15l2-3h6l1-2 2 2h4l2 3M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0',Pickup:'M2 15V10h8l2 3h8v2M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0',Electric:'M13 3L6 13h5l-1 8 7-10h-5z',Performance:'M3 15l3-3h9l5 2M12 6v4M6 18a1.5 1.5 0 1 0 .1 0M16 18a1.5 1.5 0 1 0 .1 0'};
  document.getElementById('cats').innerHTML=CAT_LIST.map(c=>`<a class="chip cat rv" href="inventory.html?cat=${c}"><svg viewBox="0 0 24 24"><path d="${ic[c]}"/></svg>${c}<small>${V.filter(v=>v.cats.includes(c)).length} vehicles</small></a>`).join('');
  const lt=document.getElementById('latest');document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>lt.scrollBy({left:+b.dataset.scroll*380,behavior:'smooth'})));
  const hs=document.getElementById('heroSearch');hs.addEventListener('submit',e=>{e.preventDefault();location.href='inventory.html?q='+encodeURIComponent(hs.q.value.trim())});
  document.querySelector('.hero-car').src=carImg('Red','Coupe',0);
  AH.observe();
}
