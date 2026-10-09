/* AUTOHUB vehicle database + shared helpers */
const RAW=`BMW|M4 Competition|2023|85000|18500|Petrol|Automatic|Coupe|3.0L Twin Turbo I6|503|AWD|Black|650|3.5|10.2|1725
BMW|X5 xDrive40i|2022|68900|32000|Petrol|Automatic|SUV|3.0L Turbo I6|375|AWD|Blue|520|5.5|9.4|2185
BMW|i4 eDrive40|2023|57500|12000|Electric|Automatic|Sedan|83.9 kWh Electric|335|RWD|White|430|5.7|16.1|2050
Mercedes-Benz|C 300|2022|47900|24000|Petrol|Automatic|Sedan|2.0L Turbo I4|255|RWD|Silver|400|6.0|7.8|1650
Mercedes-Benz|GLE 450|2023|72500|15500|Petrol|Automatic|SUV|3.0L Turbo I6 MHEV|375|AWD|Gray|500|5.7|9.1|2255
Mercedes-Benz|AMG GT 63|2022|139000|9800|Petrol|Automatic|Coupe|4.0L V8 Biturbo|630|AWD|Red|900|3.2|11.9|2045
Audi|A4 Quattro|2021|38900|41000|Petrol|Automatic|Sedan|2.0L TFSI I4|261|AWD|White|370|5.4|7.9|1670
Audi|RS6 Avant|2023|126000|8200|Petrol|Automatic|Wagon|4.0L V8 TFSI|591|AWD|Gray|800|3.6|11.8|2075
Audi|e-tron GT|2022|99000|14200|Electric|Automatic|Sedan|93.4 kWh Electric|522|AWD|Black|630|4.1|19.6|2276
Audi|Q5 45 TFSI|2022|46500|29000|Petrol|Automatic|SUV|2.0L TFSI I4|261|AWD|Silver|370|6.1|8.3|1860
Toyota|Camry XSE|2022|31900|27000|Hybrid|Automatic|Sedan|2.5L Hybrid I4|208|FWD|Red|221|7.1|4.5|1560
Toyota|RAV4 Hybrid|2023|36900|16500|Hybrid|Automatic|SUV|2.5L Hybrid I4|219|AWD|Green|221|7.8|4.8|1720
Toyota|Land Cruiser 300|2022|89000|21000|Diesel|Automatic|SUV|3.3L Twin Turbo V6|305|4WD|White|700|8.0|9.6|2580
Toyota|GR Supra 3.0|2021|56000|19000|Petrol|Automatic|Coupe|3.0L Turbo I6|382|RWD|Black|500|4.1|8.1|1542
Porsche|911 Carrera S|2022|135000|11000|Petrol|Automatic|Coupe|3.0L Twin Turbo F6|443|RWD|Silver|530|3.5|10.3|1565
Porsche|Taycan 4S|2023|112000|9000|Electric|Automatic|Sedan|93.4 kWh Electric|563|AWD|Blue|650|4.0|19.5|2220
Porsche|Macan GTS|2022|82000|18000|Petrol|Automatic|SUV|2.9L Twin Turbo V6|434|AWD|Gray|550|4.5|10.5|1995
Porsche|718 Boxster|2021|68000|22000|Petrol|Manual|Convertible|2.0L Turbo F4|300|RWD|Red|380|5.1|8.4|1405
Lexus|RX 350h|2023|58500|13000|Hybrid|Automatic|SUV|2.5L Hybrid I4|246|AWD|White|239|7.2|6.0|2000
Lexus|IS 350 F Sport|2021|42000|35000|Petrol|Automatic|Sedan|3.5L V6|311|RWD|Gray|380|5.5|9.6|1700
Lexus|LC 500 Convertible|2022|104000|7000|Petrol|Automatic|Convertible|5.0L V8|471|RWD|Blue|540|4.7|12.6|2025
Tesla|Model 3 Long Range|2023|42900|14000|Electric|Automatic|Sedan|Dual Motor Electric|498|AWD|White|660|4.2|14.9|1844
Tesla|Model S Plaid|2022|98000|17000|Electric|Automatic|Performance|Tri Motor Electric|1020|AWD|Red|1420|2.1|18.0|2162
Tesla|Model Y Performance|2023|53500|11000|Electric|Automatic|SUV|Dual Motor Electric|456|AWD|Black|660|3.7|16.3|2003
Volkswagen|Golf GTI|2022|31900|19000|Petrol|Manual|Hatchback|2.0L TSI I4|241|FWD|Red|370|6.2|7.4|1450
Volkswagen|Golf R|2023|43500|8000|Petrol|Automatic|Hatchback|2.0L TSI I4|315|AWD|Blue|420|4.7|8.0|1530
Volkswagen|ID.4 Pro|2022|38500|21000|Electric|Automatic|SUV|77 kWh Electric|201|RWD|Silver|310|8.5|17.0|2124
Ford|Mustang GT|2022|45900|16000|Petrol|Manual|Coupe|5.0L V8|450|RWD|Black|529|4.3|12.5|1680
Ford|F-150 Lariat|2022|58900|33000|Petrol|Automatic|Pickup|3.5L EcoBoost V6|400|4WD|Gray|678|5.4|12.8|2400
Ford|Mustang Mach-E GT|2023|59900|9500|Electric|Automatic|Performance|Dual Motor Electric|480|AWD|White|860|3.7|18.0|2250
Nissan|GT-R Premium|2021|118000|12000|Petrol|Automatic|Performance|3.8L Twin Turbo V6|565|AWD|White|633|2.9|11.8|1752
Nissan|Leaf e+|2022|24900|22000|Electric|Automatic|Hatchback|62 kWh Electric|214|FWD|Blue|340|7.3|16.5|1749
Nissan|Navara Pro-4X|2022|39900|28000|Diesel|Automatic|Pickup|2.3L Twin Turbo I4|190|4WD|Green|450|9.9|8.2|2100
Honda|Civic Type R|2023|47900|6000|Petrol|Manual|Hatchback|2.0L VTEC Turbo I4|315|FWD|Red|420|5.4|8.8|1429
Honda|CR-V Hybrid|2022|36500|20000|Hybrid|Automatic|SUV|2.0L Hybrid I4|204|AWD|Silver|335|7.9|5.6|1700
Honda|Accord Sport|2021|27900|38000|Petrol|Automatic|Sedan|1.5L Turbo I4|192|FWD|Gray|260|7.2|7.5|1500
Land Rover|Defender 110|2023|79900|12000|Diesel|Automatic|SUV|3.0L Diesel MHEV I6|296|4WD|Green|650|7.0|8.7|2361
Land Rover|Range Rover Sport|2022|109000|19000|Petrol|Automatic|SUV|3.0L Turbo I6 MHEV|395|AWD|Black|550|5.5|9.9|2310
Land Rover|Range Rover Velar|2021|56500|34000|Diesel|Automatic|SUV|2.0L Diesel I4|201|AWD|Silver|430|7.4|7.2|1930`;
const COLORS={Black:'#17181a',White:'#e6e6e4',Silver:'#a9adb3',Red:'#a4121f',Blue:'#1f3a6b',Gray:'#5a5d63',Green:'#1f4a36'};
const CAT_LIST=['Sedan','SUV','Coupe','Hatchback','Convertible','Pickup','Electric','Performance'];
const SAFETY=['ABS & ESC','6+ Airbags','Lane Keep Assist','Adaptive Cruise Control','Blind Spot Monitor','Automatic Emergency Braking','360° Camera','Rear Cross Traffic Alert'];
const FEATS=['Leather Interior','Panoramic Roof','Heated Seats','Apple CarPlay / Android Auto','Premium Sound System','Keyless Entry','LED Headlights','Wireless Charging','Navigation','Ambient Lighting'];
function carImg(color,body,i=0){
  const c=COLORS[color]||'#444',t={SUV:[150,300],Pickup:[170,230],Hatchback:[165,250],Wagon:[165,320],Coupe:[205,230],Convertible:[225,200],Sedan:[190,270],Performance:[205,220]}[body]||[190,270];
  const bg=['#2a2c30','#34302c','#26292e','#3a2a2d'][i%4],top=t[0],cw=t[1];
  const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><radialGradient id="g" cx="${40+i*8}%" cy="30%" r="80%"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="#0d0e10"/></radialGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><rect y="395" width="800" height="105" fill="#08090a"/><ellipse cx="400" cy="400" rx="300" ry="14" fill="#000" opacity=".6"/><g transform="${i%2?'translate(800 0) scale(-1 1)':''}${i==2?' translate(-120 -60) scale(1.3)':''}"><path d="M110 360 L110 320 Q120 290 190 280 L${400-cw/2+30} ${top+60} Q${400-cw/2+80} ${top} ${400-cw/2+150} ${top} L${400+cw/2-60} ${top} Q${400+cw/2} ${top+10} ${400+cw/2+50} ${top+70} L660 285 Q710 295 715 330 L715 360 Z" fill="${c}"/><path d="M110 360 L110 320 Q120 290 190 280 L${400-cw/2+30} ${top+60} Q${400-cw/2+80} ${top} ${400-cw/2+150} ${top} L${400+cw/2-60} ${top} Q${400+cw/2} ${top+10} ${400+cw/2+50} ${top+70} L660 285 Q710 295 715 330 L715 360 Z" fill="url(#b)"/><path d="M${400-cw/2+95} ${top+60} Q${400-cw/2+130} ${top+18} ${400-cw/2+170} ${top+18} L${400+cw/2-80} ${top+18} Q${400+cw/2-30} ${top+30} ${400+cw/2+10} ${top+70} Z" fill="#0b0c0e" opacity=".85"/><rect x="95" y="335" width="640" height="26" rx="8" fill="#0b0c0e" opacity=".5"/><circle cx="215" cy="365" r="52" fill="#050505"/><circle cx="215" cy="365" r="30" fill="#8b8f95"/><circle cx="215" cy="365" r="12" fill="#222"/><circle cx="595" cy="365" r="52" fill="#050505"/><circle cx="595" cy="365" r="30" fill="#8b8f95"/><circle cx="595" cy="365" r="12" fill="#222"/><rect x="690" y="318" width="26" height="12" rx="5" fill="#fff" opacity=".9"/><rect x="108" y="320" width="18" height="10" rx="4" fill="#c8102e"/></g></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
}
const V=RAW.split('\n').map((r,i)=>{const p=r.split('|');const v={id:i+1,brand:p[0],model:p[1],year:+p[2],price:+p[3],mileage:+p[4],fuel:p[5],transmission:p[6],body:p[7],engine:p[8],horsepower:+p[9],drive:p[10],color:p[11],torque:+p[12],accel:+p[13],cons:+p[14],weight:+p[15],added:i};
  v.image=carImg(v.color,v.body,0);v.gallery=[0,1,2,3].map(k=>carImg(v.color,v.body,k));
  v.cats=[v.body];if(v.fuel==='Electric')v.cats.push('Electric');if(v.horsepower>=450||v.accel<4.5)v.cats.push('Performance');
  v.interior=['Black Leather','Cognac Leather','Grey Alcantara','Beige Leather'][i%4];v.safety=SAFETY.slice(0,4+i%5);v.features=FEATS.slice(i%3,7+i%4);return v});
const BRANDS=[['BMW','German'],['Mercedes-Benz','German'],['Audi','German'],['Porsche','German'],['Volkswagen','German'],['Toyota','Japanese'],['Lexus','Japanese'],['Nissan','Japanese'],['Honda','Japanese'],['Mazda','Japanese'],['Tesla','American'],['Ford','American'],['Chevrolet','American'],['Hyundai','Korean'],['Kia','Korean'],['Land Rover','British'],['Jaguar','British'],['Bentley','British'],['Ferrari','Italian'],['Alfa Romeo','Italian'],['Peugeot','French'],['Renault','French']];
/* storage + helpers */
const AH={
  get(k,d){try{return JSON.parse(localStorage.getItem('ah_'+k))??d}catch(e){return d}},
  set(k,v){try{localStorage.setItem('ah_'+k,JSON.stringify(v))}catch(e){}},
  fmt:n=>'$'+Math.round(n).toLocaleString('en-US'),
  km:n=>n.toLocaleString('en-US')+' km',
  find:id=>V.find(v=>v.id==id),
  isFav:id=>AH.get('fav',[]).includes(id),
  isCmp:id=>AH.get('cmp',[]).includes(id),
  toggle(key,id,max){let a=AH.get(key,[]);const i=a.indexOf(id);if(i>-1)a.splice(i,1);else{if(max&&a.length>=max){AH.toast('You can compare up to '+max+' vehicles');return false}a.push(id)}AH.set(key,a);AH.badges();return i===-1},
  badges(){const f=document.getElementById('favCount'),c=document.getElementById('cmpCount');if(f){f.textContent=AH.get('fav',[]).length}if(c){c.textContent=AH.get('cmp',[]).length}},
  toast(m){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600)},
  card(v){const f=AH.isFav(v.id),c=AH.isCmp(v.id);
    return `<article class="vc tilt rv" data-id="${v.id}"><div class="vc-img"><a href="vehicle.html?id=${v.id}" aria-label="${v.year} ${v.brand} ${v.model}"><img src="${v.image}" alt="${v.year} ${v.brand} ${v.model} in ${v.color}" loading="lazy" width="800" height="500"></a>${v.year>=2023?'<span class="vc-tag">New arrival</span>':''}<button class="fav${f?' on':''}" data-fav="${v.id}" aria-label="Save ${v.brand} ${v.model}" aria-pressed="${f}"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg></button></div><div class="vc-b"><small>${v.brand} · ${v.year}</small><h3>${v.model}</h3><div class="specs"><span><em>Mileage</em>${AH.km(v.mileage)}</span><span><em>Engine</em>${v.engine.split(' ')[0]}</span><span><em>Gearbox</em>${v.transmission}</span><span><em>Fuel</em>${v.fuel}</span></div><div class="vc-f"><span class="price">${AH.fmt(v.price)}</span><div class="vc-act"><button class="cmpb${c?' on':''}" data-cmp="${v.id}" aria-pressed="${c}">${c?'Added':'Compare'}</button><a class="btn sm" href="vehicle.html?id=${v.id}">Details</a></div></div></div></article>`}
};
