(function(){
const $=i=>document.getElementById(i),P=new URLSearchParams(location.search);
if(P.get('price'))$('price').value=+P.get('price');
const saved=AH.get('fin',null);if(saved&&!P.get('price')){['price','down','term','rate'].forEach(k=>saved[k]&&($(k).value=saved[k]))}
function calc(){
  let price=Math.max(0,+$('price').value||0),down=Math.min(price,Math.max(0,+$('down').value||0)),n=+$('term').value,rate=Math.max(0,+$('rate').value||0);
  $('termV').textContent=n+' months ('+(n/12).toFixed(n%12?1:0)+' yrs)';$('rateV').textContent=rate.toFixed(1)+'%';
  const L=price-down,r=rate/1200,m=L<=0?0:(r?L*r/(1-Math.pow(1+r,-n)):L/n),tot=m*n,int=Math.max(0,tot-L);
  $('monthly').textContent=AH.fmt(m);$('interest').textContent=AH.fmt(int);$('total').textContent=AH.fmt(tot+down);$('loan').textContent=AH.fmt(L);
  const t=tot+down||1,a=down/t*360,b=(down+L)/t*360;
  $('donut').style.background=`conic-gradient(#8b8f95 0 ${a}deg,var(--red) ${a}deg ${b}deg,#ffffff ${b}deg 360deg)`;
  $('dm').innerHTML=AH.fmt(m)+'<small>per month</small>';AH.set('fin',{price:$('price').value,down:$('down').value,term:$('term').value,rate:$('rate').value});
}
document.getElementById('calc').addEventListener('input',calc);calc();
$('apply').addEventListener('click',()=>{AH.modal('fm',true)});
$('fform').addEventListener('submit',e=>{e.preventDefault();if(!AH.validate(e.target))return;e.target.hidden=true;$('fdone').hidden=false});
})();
