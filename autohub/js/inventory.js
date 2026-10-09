/* Inventory: search, filter, sort, view toggle */
(function(){
const $=id=>document.getElementById(id),F=['brand','model','fuel','transmission','body','drive','color','year'];
const opt=(a,l)=>`<option value="">${l}</option>`+a.map(x=>`<option>${x}</option>`).join('');
const uniq=k=>[...new Set(V.map(v=>v[k]))].sort((a,b)=>a>b?1:-1);
$('brand').innerHTML=opt(uniq('brand'),'All brands');
['fuel','transmission','body','drive','color'].forEach(k=>$(k).innerHTML=opt(uniq(k),'Any'));
$('year').innerHTML=opt(uniq('year').reverse().map(String),'Any year');
const fillModels=()=>{const b=$('brand').value;$('model').innerHTML=opt([...new Set(V.filter(v=>!b||v.brand===b).map(v=>v.model))].sort(),'All models')};fillModels();
const P=new URLSearchParams(location.search);
if(P.get('brand')){$('brand').value=P.get('brand');fillModels()}
if(P.get('q'))$('q').value=P.get('q');
if(P.get('cat')){const c=P.get('cat');if(c==='Electric')$('fuel').value='Electric';else if(c!=='Performance')$('body').value=c}
let showFav=P.get('fav')==='1',view=AH.get('view','grid'),cat=P.get('cat')||'';
const state=()=>{const g=id=>$(id).value;return{q:g('q').toLowerCase().trim(),pmin:+g('pmin')||0,pmax:+g('pmax')||1e9,mmax:+g('mileage')||1e9,sort:g('sort')}};
function run(){
  const s=state();let r=V.filter(v=>{
    if(s.q&&!(`${v.brand} ${v.model} ${v.body} ${v.fuel} ${v.engine} ${v.color} ${v.year}`.toLowerCase().includes(s.q)))return false;
    for(const k of F){const x=$(k).value;if(x&&String(v[k])!==x)return false}
    if(cat==='Performance'&&!v.cats.includes('Performance'))return false;
    if(v.price<s.pmin||v.price>s.pmax||v.mileage>s.mmax)return false;
    if(showFav&&!AH.isFav(v.id))return false;return true});
  const so={newest:(a,b)=>b.year-a.year||b.added-a.added,pasc:(a,b)=>a.price-b.price,pdesc:(a,b)=>b.price-a.price,masc:(a,b)=>a.mileage-b.mileage}[s.sort];r.sort(so);
  $('count').textContent=r.length+' vehicle'+(r.length===1?'':'s');
  const g=$('results');g.innerHTML=r.length?r.map(AH.card).join(''):`<div class="empty" style="grid-column:1/-1"><h3>No vehicles match</h3><p>Try removing a filter or widening your price range.</p><button class="btn sm" id="reset2" style="margin-top:16px">Reset filters</button></div>`;
  g.parentNode.classList.toggle('list',view==='list');document.querySelectorAll('.tg button').forEach(b=>{b.classList.toggle('on',b.dataset.v===view);b.setAttribute('aria-pressed',b.dataset.v===view)});
  const pills=[];F.forEach(k=>$(k).value&&pills.push($(k).value));if(cat)pills.push(cat);if(showFav)pills.push('Favorites');$('pills').innerHTML=pills.map(p=>`<span class="pill">${p}</span>`).join('');
  AH.observe(g);document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));
}
let t;const deb=()=>{clearTimeout(t);t=setTimeout(run,150)};
$('filters').addEventListener('input',e=>{if(e.target.id==='brand')fillModels();deb()});
$('q').addEventListener('input',deb);$('sort').addEventListener('change',run);
const reset=()=>{$('filters').reset();$('q').value='';cat='';showFav=false;fillModels();history.replaceState(null,'','inventory.html');run()};
$('reset').addEventListener('click',reset);document.addEventListener('click',e=>{if(e.target.id==='reset2')reset()});
document.querySelectorAll('.tg button').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.v;AH.set('view',view);run()}));
const fl=$('filters'),op=o=>{fl.classList.toggle('open',o);document.body.classList.toggle('lock',o)};
$('openF').addEventListener('click',()=>op(true));document.querySelectorAll('.fclose,.fapply .btn').forEach(b=>b.addEventListener('click',()=>op(false)));
document.addEventListener('favchange',()=>{if(showFav)run()});
run();
})();
