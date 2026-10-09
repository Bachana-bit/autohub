/* Shared header, mobile menu, footer */
(function(){
const L=[['index.html','Home'],['inventory.html','Inventory'],['brands.html','Brands'],['compare.html','Compare'],['finance.html','Finance'],['sell.html','Sell'],['about.html','About']];
const cur=location.pathname.split('/').pop()||'index.html';
const links=cls=>L.map(l=>`<a href="${l[0]}"${(l[0]===cur||(cur==='vehicle.html'&&l[0]==='inventory.html'))?' class="act" aria-current="page"':''}>${l[1]}</a>`).join('');
const h=document.getElementById('header');
h.className='hdr';
h.innerHTML=`<div class="wrap"><a href="index.html" class="logo" aria-label="AUTOHUB home"><i></i>AUTOHUB</a><nav class="nav" aria-label="Main">${links()}</nav><div class="hdr-r"><a class="ico-btn hide-m" href="inventory.html?fav=1" aria-label="Favorites"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg><b id="favCount">0</b></a><a class="ico-btn hide-m" href="compare.html" aria-label="Compare list"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M7 4v16M17 4v16M3 8l4-4 4 4M13 16l4 4 4-4"/></svg><b id="cmpCount">0</b></a><button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mmenu"><span></span><span></span><span></span></button></div></div>`;
const m=document.createElement('div');m.className='mmenu';m.id='mmenu';m.innerHTML=`<nav aria-label="Mobile">${links()}<a href="inventory.html?fav=1">Favorites</a></nav>`;document.body.appendChild(m);
const b=document.getElementById('burger');
function tog(o){m.classList.toggle('open',o);b.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.classList.toggle('lock',o)}
b.addEventListener('click',()=>tog(!m.classList.contains('open')));
m.addEventListener('click',e=>{if(e.target.closest('a'))tog(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')tog(false)});
addEventListener('resize',()=>{if(innerWidth>1024)tog(false)});
const onS=()=>h.classList.toggle('solid',scrollY>30);onS();addEventListener('scroll',onS,{passive:true});
const f=document.getElementById('footer');
if(f){f.className='ftr';f.innerHTML=`<div class="wrap"><div class="ftr-g"><div><a href="index.html" class="logo"><i></i>AUTOHUB</a><p class="lead" style="margin-top:14px">Verified premium vehicles from trusted dealers. Transparent prices, flexible financing.</p></div><div><h4>Explore</h4><ul><li><a href="inventory.html">Inventory</a></li><li><a href="brands.html">Brands</a></li><li><a href="compare.html">Compare</a></li></ul></div><div><h4>Services</h4><ul><li><a href="finance.html">Financing</a></li><li><a href="sell.html">Sell your car</a></li><li><a href="about.html">About us</a></li></ul></div><div><h4>Contact</h4><ul><li><a href="mailto:hello@autohub.example">hello@autohub.example</a></li><li>+995 32 200 00 00</li><li>Rustaveli Ave 12, Tbilisi</li></ul></div></div><small>© 2026 AUTOHUB. All rights reserved.</small></div>`}
})();
