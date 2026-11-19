const $=id=>document.getElementById(id), FIRST=36, LAST=new Date().getFullYear();
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const state={records:[],visible:[],year:FIRST,selected:'Q161775',place:null,sidebar:false,tab:'people',follow:true,limit:30,timer:null,years:[],ready:false};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const yearText=p=>(p.approximate?'c. ':'')+(p.year===p.yearEnd?p.year:`${p.year}–${p.yearEnd}`);
const placeText=p=>p.locations.length?`${p.locations[0].name}${p.locations[0].name===p.locations[0].country?'':' · '+p.locations[0].country}`:'Local de morte não informado';
const roman=n=>{let s='';for(const [r,v]of[['X',10],['IX',9],['V',5],['IV',4],['I',1]])while(n>=v){s+=r;n-=v;}return s;};
const map=L.map('map',{zoomControl:false,minZoom:0,maxZoom:17,worldCopyJump:true,zoomAnimation:!reduced,fadeAnimation:!reduced}).setView([31.787,35.229],13);
map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
map.createPane('fallback');map.getPane('fallback').style.zIndex=190;
const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',crossOrigin:true}).addTo(map);
const markers=L.layerGroup().addTo(map);
L.control.scale({position:'bottomright',imperial:false}).addTo(map);
let errors=0,loaded=0;
tiles.on('tileload',()=>{loaded++;if(errors&&loaded>2){$('map-message').hidden=true;}});
tiles.on('tileerror',()=>{errors++;if(errors>4&&loaded===0){$('map-message').textContent='O mapa detalhado não carregou. Os pontos e as fichas continuam disponíveis.';$('map-message').hidden=false;}});
fetch('assets/land.geojson').then(r=>r.json()).then(geo=>L.geoJSON(geo,{pane:'fallback',interactive:false,style:{color:'#b7ccd4',weight:.5,fillColor:'#f0f3ef',fillOpacity:1}}).addTo(map)).catch(()=>{});
function setFollow(value){state.follow=value;$('follow').classList.toggle('active',value);$('follow').setAttribute('aria-pressed',String(value));}
map.on('dragstart',()=>{setFollow(false);});
map.on('zoomstart',e=>{if(e.originalEvent)setFollow(false);});
map.getContainer().addEventListener('wheel',()=>setFollow(false),{passive:true});
function side(open,tab=state.tab){state.sidebar=open;state.tab=tab;$('sidebar').hidden=!open;$('sidebar').inert=!open;$('scene').inert=open;$('scene').setAttribute('aria-hidden',String(open));document.body.classList.toggle('sidebar-open',open);$('menu-toggle').setAttribute('aria-expanded',String(open));$('menu-toggle').setAttribute('aria-label',open?'Fechar navegação':'Abrir navegação');$('people-view').hidden=tab!=='people';$('sources-view').hidden=tab!=='sources';for(const t of ['people','sources']){$('tab-'+t).classList.toggle('active',t===tab);$('tab-'+t).setAttribute('aria-pressed',String(t===tab));}if(open&&tab==='people')renderPanel();if(state.follow)fit(false);}
$('menu-toggle').onclick=()=>side(!state.sidebar);
$('sidebar-close').onclick=()=>{side(false);$('menu-toggle').focus();};
$('tab-people').onclick=()=>side(true,'people');$('tab-sources').onclick=()=>side(true,'sources');$('about-button').onclick=()=>{side(true,'sources');$('sidebar-close').focus();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.sidebar){side(false);$('menu-toggle').focus();}});
function base(){const q=norm($('search').value.trim()),c=$('country').value,r=$('review').value;return state.records.filter(p=>(!q||p.search.includes(q))&&(!c||p.locations.some(l=>l.country===c))&&(!r||(r==='reviewed'?p.reviewed:!p.reviewed)));}
function groupRecords(){const groups=new Map();for(const p of state.visible)for(const l of p.locations){if(!Number.isFinite(l.lat)||!Number.isFinite(l.lon))continue;const key=`${l.lat.toFixed(2)},${l.lon.toFixed(2)}`;if(!groups.has(key))groups.set(key,{key,location:l,people:[]});if(!groups.get(key).people.some(x=>x.id===p.id))groups.get(key).people.push(p);}return[...groups.values()];}
function saveURL(){const q=new URLSearchParams();if(state.year!==FIRST)q.set('year',state.year);for(const[k,id]of[['q','search'],['country','country'],['review','review']])if($(id).value)q.set(k,$(id).value);if(state.selected&&state.sidebar)q.set('person',state.selected);history.replaceState(null,'',location.pathname+(q.size?'?'+q:''));}
function update({camera=true,animate=true}={}){
  const records=base();state.visible=records.filter(p=>p.year<=state.year&&p.yearEnd>=FIRST);
  if(state.selected&&!state.visible.some(p=>p.id===state.selected))state.selected=null;
  state.limit=30;$('year-range').value=state.year;$('year-number').value=state.year;$('year-range').style.setProperty('--progress',`${(state.year-FIRST)/(LAST-FIRST)*100}%`);
  $('year-range').setAttribute('aria-valuetext',`${state.year===FIRST?'Cerca de ':''}${state.year}, ${state.visible.length} registros acumulados`);
  $('approx-label').hidden=state.year!==FIRST;$('century-label').textContent=`Século ${roman(Math.ceil(state.year/100))}`;
  $('header-period').textContent=state.year===FIRST?'Jerusalém · século I':`Mártires até ${state.year}`;
  const groups=groupRecords();$('visible-count').textContent=`${state.visible.length.toLocaleString('pt-BR')} ${state.visible.length===1?'testemunho':'testemunhos'}`;
  const noMap=state.visible.filter(p=>!p.locations.some(l=>Number.isFinite(l.lat)&&Number.isFinite(l.lon))).length;
  $('visible-places').textContent=`${groups.length} ${groups.length===1?'lugar':'lugares'}${noMap?' · '+noMap+' sem coordenadas':''}`;
  $('previous').disabled=state.year<=FIRST;$('next').disabled=state.year>=state.years.at(-1);
  drawHistogram(records);drawMarkers(groups);renderScene();renderPanel();if(camera&&state.follow)fit(animate,groups);saveURL();
}
function drawHistogram(records){const counts=Array(100).fill(0);for(const p of records){const index=Math.min(99,Math.floor((p.year-FIRST)/(LAST-FIRST)*100));if(index>=0)counts[index]++;}const max=Math.max(...counts,1);$('histogram').replaceChildren();counts.forEach((n,i)=>{const bar=document.createElement('span');bar.style.setProperty('--height',`${n?Math.max(5,Math.sqrt(n/max)*100):0}%`);const yr=FIRST+i/100*(LAST-FIRST);bar.className=yr<=state.year?'past':'';if(state.year>=yr&&state.year<yr+(LAST-FIRST)/100)bar.className='now';$('histogram').append(bar);});}
function drawMarkers(groups){markers.clearLayers();const sorted=[...groups].sort((a,b)=>a.people.length-b.people.length);for(const g of sorted){const now=g.people.some(p=>p.year===state.year),selected=g.people.some(p=>p.id===state.selected);const size=now?32:26;
 const icon=L.divIcon({className:'map-marker',iconSize:[size,size],iconAnchor:[size/2,size/2],html:`<button type="button" class="${now?'current':''} ${selected?'selected':''}" aria-label="${esc(g.location.name)}, ${g.people.length} ${g.people.length===1?'registro':'registros'}. Abrir ficha.">${g.people.length>1?g.people.length:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M6 10h12"/></svg>'}</button>`});
 const m=L.marker([g.location.lat,g.location.lon],{icon,keyboard:false,zIndexOffset:now?1000:0}).addTo(markers);m.bindTooltip(`${esc(g.location.name)} · ${g.people.length}`,{direction:'top',offset:[0,-12],className:'place-tooltip'});m.on('click',()=>{pause();state.place=g.key;state.selected=g.people.length===1?g.people[0].id:null;side(true,'people');renderPanel();drawMarkers(groupRecords());saveURL();});
}}
function fit(animate=true,groups=groupRecords()){
 if(!groups.length)return;const positions=groups.map(g=>[g.location.lat,g.location.lon]);
 const width=map.getSize().x,sidebar=state.sidebar&&width>760?parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar')):0;
 const paddingLeft=sidebar+50,paddingRight=60;
 const options={paddingTopLeft:[Math.min(paddingLeft,width*.4),80],paddingBottomRight:[paddingRight,65],maxZoom:positions.length===1?13:8,duration:reduced?0:1.1,animate:animate&&!reduced};
 const bounds=L.latLngBounds(positions);
 // A single point starts at city scale. Cumulative bounds then naturally widen.
 if(positions.length===1){const center=bounds.getCenter();map.setView(center,13,{animate:options.animate});if(sidebar)map.panBy([-sidebar/2,0],{animate:false});}
 else if(options.animate)map.flyToBounds(bounds,options);else map.fitBounds(bounds,options);
}
function renderScene(){const newPeople=state.visible.filter(p=>p.year===state.year);const first=state.year===FIRST;
 $('scene-title').textContent=first?'Onde a memória começa.':newPeople.length===1?newPeople[0].name:newPeople.length?`${newPeople.length} vidas neste ano.`:'O tempo guarda a memória.';
 $('scene-description').textContent=first?'Em Jerusalém, Santo Estêvão se torna o primeiro mártir cristão. A partir deste lugar, os séculos se abrem.':newPeople.length===1?`${yearText(newPeople[0])} · ${placeText(newPeople[0])}. Consulte a ficha para conhecer as fontes.`:newPeople.length?'Novos testemunhos se somam aos anteriores. O mapa se abre para acolher os lugares desta história.':nextYear()?'Os testemunhos dos anos anteriores permanecem no mapa. Avance para encontrar o próximo registro.':'Você chegou ao fim do recorte disponível. Volte no tempo para explorar as vidas e os lugares desta história.';
 $('scene-detail').firstChild.textContent=first?'Conhecer este testemunho ':newPeople.length===1?'Consultar este registro ':'Explorar os registros ';
 $('scene-detail').onclick=()=>{state.selected=first?'Q161775':newPeople.length===1?newPeople[0].id:null;state.place=null;side(true,'people');renderPanel();saveURL();};
}
function renderPanel(){
 const selected=state.visible.find(p=>p.id===state.selected);$('detail').replaceChildren();$('results').replaceChildren();
 let shown=state.place?(groupRecords().find(g=>g.key===state.place)?.people||state.visible):state.visible;
 // Latest first makes the current moment visible; the first scene remains Stephen.
 shown=[...shown].sort((a,b)=>b.year-a.year||a.name.localeCompare(b.name,'pt'));
 $('result-count').textContent=`${shown.length.toLocaleString('pt-BR')} ${shown.length===1?'registro':'registros'} até ${state.year}`;
 if(selected){const p=selected,d=document.createElement('article');d.className='detail';const dates=[...new Set(p.dates.map(d=>d.precision>=11?d.value.split('-').reverse().join('/'):d.precision===10?d.value.slice(0,7).split('-').reverse().join('/'):String(d.year)))];
 d.innerHTML=`<button id="back-list" class="text-button">Ver a lista deste período</button><div><span class="badge ${p.reviewed?'':'pending'}">${p.reviewed?'Conferido em fonte católica':'Wikidata · aguarda conferência'}</span></div><h2>${esc(p.name)}</h2><p>${esc(p.status)}</p><div class="date">${esc(yearText(p))}</div><p class="place">${esc(placeText(p))}</p>${p.dates.length>1?`<p>Datas alternativas na base: ${esc(dates.join(' ou '))}.</p>`:''}${p.locations.length>1?`<p>Outros locais informados: ${p.locations.slice(1).map(l=>esc(l.name)).join('; ')}.</p>`:''}<p>${esc(p.note||'Importação automática ainda sem revisão editorial. A base informa data e local de morte, que precisam de conferência. As coordenadas indicam uma localidade aproximada.')}</p><p class="source-title">Fontes deste registro</p><ul>${p.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')}</ul>`;$('detail').append(d);$('back-list').onclick=()=>{state.selected=null;renderPanel();drawMarkers(groupRecords());saveURL();};$('show-more').hidden=true;return;}
 if(state.place){const b=document.createElement('button');b.textContent='Ver todos os lugares';b.className='text-button';b.style.margin='1rem 1.25rem';b.onclick=()=>{state.place=null;renderPanel();};$('detail').append(b);}
 if(!shown.length){const p=document.createElement('p');p.className='empty';p.textContent='Nenhum registro neste recorte. Avance no tempo ou limpe os filtros para ampliar a busca.';$('results').append(p);}
 for(const p of shown.slice(0,state.limit)){const b=document.createElement('button');b.className='result';b.innerHTML=`<span class="year">${esc(yearText(p))}</span><span><strong>${esc(p.name)}</strong><small>${esc(placeText(p))}</small>${p.reviewed?'<small>Fonte católica conferida</small>':''}</span>`;b.onclick=()=>{pause();state.selected=p.id;renderPanel();drawMarkers(groupRecords());saveURL();$('sidebar').scrollTop=0;const loc=p.locations.find(l=>Number.isFinite(l.lat));if(loc){setFollow(false);map.flyTo([loc.lat,loc.lon],Math.max(map.getZoom(),6),{animate:!reduced,duration:1});}};$('results').append(b);}
 $('show-more').hidden=shown.length<=state.limit;
}
function pause(){if(state.timer)clearTimeout(state.timer);state.timer=null;$('play').setAttribute('aria-pressed','false');$('play').setAttribute('aria-label','Reproduzir linha do tempo');$('play').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg>';}
function selectYear(year,{animate=true}={}){state.year=Math.max(FIRST,Math.min(LAST,Math.round(Number(year)||FIRST)));state.place=null;state.selected=state.year===FIRST?'Q161775':null;update({animate});}
function nextYear(){return state.years.find(y=>y>state.year);}
function play(){if(state.timer){pause();return;}if(!nextYear())selectYear(FIRST);$('play').setAttribute('aria-pressed','true');$('play').setAttribute('aria-label','Pausar linha do tempo');$('play').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';const step=()=>{const y=nextYear();if(!y){pause();return;}selectYear(y);state.timer=setTimeout(step,Number($('speed').value));};state.timer=setTimeout(step,Number($('speed').value));}
$('play').onclick=play;
$('next').onclick=()=>{pause();const y=nextYear();if(y)selectYear(y);};
$('previous').onclick=()=>{pause();selectYear([...state.years].reverse().find(y=>y<state.year)??FIRST);};
$('restart').onclick=()=>{pause();setFollow(true);for(const id of ['search','country','review'])$(id).value='';selectYear(FIRST);};
$('year-range').addEventListener('input',()=>{pause();selectYear($('year-range').value,{animate:false});});
$('year-number').addEventListener('change',()=>{pause();selectYear($('year-number').value);});
$('speed').onchange=()=>{if(state.timer){pause();play();}};
for(const id of ['search','country','review'])$(id).addEventListener(id==='search'?'input':'change',()=>{pause();state.selected=null;state.place=null;update({animate:false});});
$('reset-filters').onclick=()=>{for(const id of ['search','country','review'])$(id).value='';state.place=null;state.selected=null;update();};
$('show-more').onclick=()=>{state.limit+=30;const scroll=$('sidebar').scrollTop;renderPanel();$('sidebar').scrollTop=scroll;};
$('zoom-in').onclick=()=>{setFollow(false);map.zoomIn();};$('zoom-out').onclick=()=>{setFollow(false);map.zoomOut();};$('world').onclick=()=>{setFollow(false);map.fitWorld({animate:!reduced});};$('follow').onclick=()=>{setFollow(!state.follow);if(state.follow)fit();};
map.getContainer().addEventListener('keydown',e=>{if(['+','-','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))setFollow(false);});
window.addEventListener('resize',()=>{map.invalidateSize();if(state.follow)fit(false);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
async function init(){try{const r=await fetch('data/martyrs.json');if(!r.ok)throw Error('dados');const data=await r.json();state.records=data.records.filter(p=>p.yearEnd>=FIRST);for(const p of state.records)p.search=norm([p.name,p.id,...p.locations.flatMap(l=>[l.name,l.country])].join(' '));state.years=[...new Set(state.records.map(p=>Math.max(FIRST,p.year)))].sort((a,b)=>a-b);for(const c of [...new Set(state.records.flatMap(p=>p.locations.map(l=>l.country)))].sort((a,b)=>a.localeCompare(b,'pt'))){const o=document.createElement('option');o.value=c;o.textContent=c;$('country').append(o);}for(const id of ['year-range','year-number'])$(id).max=LAST;$('last-year').textContent=LAST;$('snapshot').textContent=`Consulta: ${new Date(data.updatedAt).toLocaleDateString('pt-BR')}. ${data.records.length.toLocaleString('pt-BR')} pessoas na base, ${data.records.filter(p=>p.reviewed).length} conferidas em fontes católicas. ${state.years.length} anos com registros. A contagem de pessoas é única.`;$('data-note').textContent='Base em revisão';
 const params=new URLSearchParams(location.search);for(const[k,id]of[['q','search'],['country','country'],['review','review']])if(params.has(k))$(id).value=params.get(k);if(params.has('year'))state.year=Math.max(FIRST,Math.min(LAST,Number(params.get('year'))||FIRST));state.selected=state.year===FIRST?'Q161775':null;state.ready=true;update({animate:false});if(params.has('person')){const p=state.records.find(p=>p.id===params.get('person'));if(p){state.year=Math.max(state.year,p.year);state.selected=p.id;update({animate:false});side(true,'people');}}$('load-status').hidden=true;
 }catch(error){$('load-status').textContent='Não foi possível carregar os dados. Verifique a conexão e tente novamente.';const b=document.createElement('button');b.textContent='Recarregar';b.onclick=()=>location.reload();$('load-status').append(b);for(const id of ['play','previous','next','year-range','year-number'])$(id).disabled=true;}}
init();
