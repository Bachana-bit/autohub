(function(){
const $=i=>document.getElementById(i);
const rows=[['Price',v=>v.price,AH.fmt,-1],['Year',v=>v.year,x=>x,1],['Mileage',v=>v.mileage,AH.km,-1],['Engine',v=>v.engine,x=>x],['Horsepower',v=>v.horsepower,x=>x+' hp',1],['Torque',v=>v.torque,x=>x+' Nm',1],['Transmission',v=>v.transmission,x=>x],['Fuel',v=>v.fuel,x=>x],['Drive',v=>v.drive,x=>x],['0-100 km/h',v=>v.accel,x=>x+' s',-1],['Consumption',v=>v.cons,x=>x+' /100km',-1],['Weight',v=>v.weight,x=>x+' kg',-1],['Safety features',v=>v.safety.length,x=>x+' systems',1]];
const sel=$('add');sel.innerHTML='<option value="">Add a vehicle…</option>'+V.map(v=>`<option value="${v.id}">${v.year} ${v.brand} ${v.model}</option>`).join('');
sel.addEventListener('change',()=>{if(!sel.value)return;const id=+sel.value;if(!AH.isCmp(id))AH.toggle('cmp',id,3);sel.value='';draw()});
document.addEventListener('click',e=>{const r=e.target.closest('[data-rm]');if(r){AH.toggle('cmp',+r.dataset.rm);draw()}if(e.target.id==='clear'){AH.set('cmp',[]);AH.badges();draw()}});
function draw(){
  const list=AH.get('cmp',[]).map(AH.find).filter(Boolean);
  $('slots').innerHTML=[0,1,2].map(i=>{const v=list[i];return v?`<div class="slot"><img src="${v.image}" alt="${v.brand} ${v.model}"><h3>${v.brand} ${v.model}</h3><small>${v.year} · ${AH.fmt(v.price)}</small><button class="btn ghost sm" data-rm="${v.id}">Remove</button></div>`:`<div class="slot" style="justify-content:center;align-items:center;color:var(--mut);text-align:center">Slot ${i+1}<br>Choose a vehicle above or from the inventory</div>`}).join('');
  $('out').hidden=list.length<2;$('hint').hidden=list.length>=2;$('clear').hidden=!list.length;if(list.length<2)return;
  let h='<table><thead><tr><th scope="col"><span class="sr" style="position:absolute;left:-999px">Spec</span></th>'+list.map(v=>`<th scope="col" style="color:#fff;font-size:1rem">${v.brand} ${v.model}</th>`).join('')+'</tr></thead><tbody>';
  rows.forEach(r=>{const vals=list.map(v=>r[1](v));let best=null;if(r[3]){const t=r[3]>0?Math.max(...vals):Math.min(...vals);best=vals.filter(x=>x===t).length===vals.length?null:t}
   const mx=Math.max(...vals);h+=`<tr><th scope="row">${r[0]}</th>`+list.map((v,i)=>`<td class="${best!==null&&vals[i]===best?'best':''}">${r[2](vals[i])}${r[3]?`<div class="bar"><i data-w="${Math.round((r[3]>0?vals[i]/mx:Math.min(...vals)/vals[i])*100)}"></i></div>`:''}</td>`).join('')+'</tr>'});
  $('tbl').innerHTML=h+'</tbody></table>';requestAnimationFrame(()=>requestAnimationFrame(()=>$('tbl').querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%')));
}
draw();
})();
