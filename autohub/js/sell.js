(function(){
const $=i=>document.getElementById(i),steps=[...document.querySelectorAll('.step')],bars=[...document.querySelectorAll('.prog i')];let s=0,files=[];
$('brandS').innerHTML='<option value="">Select brand</option>'+BRANDS.map(b=>`<option>${b[0]}</option>`).join('');
const yr=new Date().getFullYear();$('yearS').max=yr;
function go(n){s=n;steps.forEach((e,i)=>e.classList.toggle('act',i===n));bars.forEach((b,i)=>b.classList.toggle('on',i<=n));$('prevB').style.visibility=n?'visible':'hidden';$('nextB').textContent=n===3?'Get my estimate':'Continue';$('stepL').textContent=`Step ${n+1} of 4`;steps[n].querySelector('input,select')?.focus({preventScroll:true})}
function check(n){const st=steps[n];let ok=AH.validate(st);if(n===0){const y=+$('yearS').value;if(y&&(y<1990||y>yr)){ok=false;$('yearS').classList.add('err');st.querySelector('#yearS').parentNode.querySelector('.msg-err').textContent=`Year must be 1990–${yr}`}}
 if(n===1){const g=st.querySelectorAll('[type=radio]:checked').length;if(g<1){$('accErr').textContent='Select accident history';ok=false}else $('accErr').textContent=''}
 if(n===2){$('phErr').textContent=files.length?'':'Add at least one photo';ok=ok&&files.length>0}return ok}
$('nextB').addEventListener('click',()=>{if(!check(s))return;if(s<3)go(s+1);else submit()});$('prevB').addEventListener('click',()=>go(s-1));
$('photos').addEventListener('change',e=>{[...e.target.files].forEach(f=>{if(!f.type.startsWith('image/')||files.length>=8)return;files.push(f)});render()});
function render(){$('prev').innerHTML=files.map((f,i)=>`<div style="position:relative"><img src="${URL.createObjectURL(f)}" alt="Uploaded photo ${i+1}"><button type="button" data-rm="${i}" aria-label="Remove photo ${i+1}" style="position:absolute;top:4px;right:4px;width:28px;height:28px;background:#000a">×</button></div>`).join('');$('phErr').textContent=''}
$('prev').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(b){files.splice(+b.dataset.rm,1);render()}});
function submit(){
  const b=$('brandS').value,y=+$('yearS').value,km=+$('kmS').value;const base=({Porsche:70,'Land Rover':48,BMW:38,'Mercedes-Benz':40,Audi:34,Lexus:34,Tesla:38,Ferrari:180,Bentley:120}[b]||26)*1000;
  const cond=['ext','int','mech'].reduce((a,k)=>a+(+$(k).value),0)/3,acc=document.querySelector('[name=acc]:checked').value==='yes'?.88:1;
  const est=base*Math.pow(.88,Math.max(0,yr-y))*(1-Math.min(.35,km/600000))*(.85+cond*.05)*acc;
  $('estV').textContent=AH.fmt(est*.94)+' – '+AH.fmt(est*1.06);$('wiz').hidden=true;$('doneS').hidden=false;$('doneS').scrollIntoView({behavior:'smooth',block:'center'});
}
go(0);
})();
