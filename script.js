const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let AR={},covN=false,upT=-1,rep=false,npOpen=false,covA=null,editA=null,lastA=-2;
let songs=[],tab='home',detail=null,queue=[],qi=-1,db=null,cur=null,ctx=[],editId=null,delId=null;
const au=new Audio();
const I={play:'M8 5v14l11-7z',pause:'M6 5h4v14H6zm8 0h4v14h-4z',prev:'M6 6h2v12H6zm3.5 6 8.5 6V6z',next:'M16 6h2v12h-2zM6 18l8.5-6L6 6z',up:'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z',cloud:'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',out:'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',bt:'M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z',plc:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',chk:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',user:'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',padd:'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',chart:'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',hist:'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',mega:'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',mail:'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',h:'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z',hf:'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',more:'M6 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',home:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',search:'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',lib:'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10zm-4 4H9v-2h6zm4-8H9V5h10z',bell:'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1z',vol:'M3 9v6h4l5 5V4L7 9zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z',gear:'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',cfg:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',shuf:'M10.6 9.2L4 2.6 2.6 4l6.6 6.6zM14.5 4l2.5 2.5L2.6 20.9 4 22.3 18.4 7.9 21 10.5V4zM14.8 13.4l-1.4 1.4 3.6 3.6L14.5 21H21v-6.5l-2.5 2.5z',rep:'M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z',dn:'M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z',cam:'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5z',edit:'M3 17.25V21h3.75L17.8 9.94l-3.75-3.75zM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z',del:'M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z'};
const ico=(p)=>`<svg viewBox="0 0 24 24"><path d="${p}"/></svg>`;
function openDB(){return new Promise(r=>{try{const q=indexedDB.open('musicas',2);q.onupgradeneeded=()=>{const d=q.result;if(!d.objectStoreNames.contains('songs'))d.createObjectStore('songs',{keyPath:'id'});if(!d.objectStoreNames.contains('artists'))d.createObjectStore('artists',{keyPath:'name'})};q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)}catch(e){r(null)}})}
function dbAll(){return new Promise(r=>{if(!db)return r([]);try{const q=db.transaction('songs').objectStore('songs').getAll();q.onsuccess=()=>r(q.result||[]);q.onerror=()=>r([])}catch(e){r([])}})}
function dbPut(s){if(driveOn()){if(driveAdmin)catMark();return}try{db&&db.transaction('songs','readwrite').objectStore('songs').put(s)}catch(e){}}
function dbDel(id){if(driveOn()){if(driveAdmin)catMark();return}try{db&&db.transaction('songs','readwrite').objectStore('songs').delete(id)}catch(e){}}
const tx=(st,m)=>db.transaction(st,m).objectStore(st);
function adbAll(){return new Promise(r=>{try{const q=tx('artists').getAll();q.onsuccess=()=>r(q.result||[]);q.onerror=()=>r([])}catch(e){r([])}})}
function adbPut(a){if(driveOn()){if(driveAdmin)catMark();return}try{db&&tx('artists','readwrite').put(a)}catch(e){}}
function adbDel(n){if(driveOn()){if(driveAdmin)catMark();return}try{db&&tx('artists','readwrite').delete(n)}catch(e){}}
function readTags(f){return new Promise(r=>{try{window.jsmediatags.read(f,{onSuccess:t=>r(t.tags||{}),onError:()=>r({})})}catch(e){r({})}})}
function picUrl(p){if(!p)return'';try{let s='';for(const x of p.data)s+=String.fromCharCode(x);return'data:'+p.format+';base64,'+btoa(s)}catch(e){return''}}
function getDur(f){return new Promise(r=>{const a=new Audio(),u=URL.createObjectURL(f);a.preload='metadata';a.onloadedmetadata=()=>{r(a.duration);URL.revokeObjectURL(u)};a.onerror=()=>{r(0);URL.revokeObjectURL(u)};a.src=u})}
const sorted=a=>[...a].sort((x,y)=>S.sort==='artist'?x.artist.localeCompare(y.artist)||x.title.localeCompare(y.title):S.sort==='recent'?(y.added||0)-(x.added||0):x.title.localeCompare(y.title));
function group(k){const m=new Map();songs.forEach(s=>{if(!m.has(s[k]))m.set(s[k],[]);m.get(s[k]).push(s)});return[...m.entries()].sort((a,b)=>a[0].localeCompare(b[0]))}
const sc=s=>s.scover||s.acover||s.cover;
function cov(list,key,one){
 const src=one?sc(list[0]):((list.find(x=>x.acover)||{}).acover||(list.find(x=>x.cover)||{}).cover);if(src)return`<img class="cv" src="${src}" alt="">`;
 let h=0;for(const c of key)h=(h*31+c.charCodeAt(0))%360;
 return`<div class="cv" style="background:linear-gradient(135deg,hsl(${h} 55% 40%),hsl(${(h+50)%360} 55% 22%))">${esc((key[0]||'♪').toUpperCase())}</div>`}
const aType=n=>n<=3?'Single':n===4?'EP':n<=12?'Álbum':'Mixtape';
const VB='<svg class="vf" viewBox="0 0 24 24"><path d="M12 1l3 2.2 3.7-.2 1.2 3.5 3 2.1-1.1 3.5 1.1 3.5-3 2.1-1.2 3.5-3.7-.2L12 23l-3-2.2-3.7.2-1.2-3.5-3-2.1L2.2 12 1.1 8.5l3-2.1 1.2-3.5L9 3.2z"/><path d="M8 12l3 3 5-6" stroke="#000" stroke-width="2" fill="none"/></svg>';
const art=n=>AR[n]||{name:n,photo:'',bio:'',verified:true};
const vb=n=>art(n).verified!==false?VB:'';
const aph=n=>art(n).photo?`<img class="cv" src="${art(n).photo}" alt="">`:cov([],n);
const artLine=s=>s.artist+((s.feats||[]).length?' feat. '+s.feats.join(', '):'');
const cs=()=>songs.find(x=>x.id===queue[qi]);
function artistGroups(){const m=new Map();songs.forEach(s=>[s.artist,...(s.feats||[])].forEach(n=>{if(!m.has(n))m.set(n,[]);m.get(n).push(s)}));return[...m.entries()].sort((a,b)=>a[0].localeCompare(b[0]))}
function lyr(s){return(s.lyrics||'').split('\n').filter(l=>l.trim()!=='').map(l=>{const m=l.match(/^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/);return m?{t:+m[1]*60+ +m[2],x:m[3]}:{t:null,x:l}})}
const fmt=t=>{t=Math.floor(t||0);return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
function songRow(s,i,num,hl){
 const now=hl?(qi>=0&&i===qi&&tapeSrc===TLK):(qi>=0&&queue[qi]===s.id),lk=SOC.liked.includes(s.id);
 return`<div class="row${now?' on-now':''}">${num?`<div class="s" style="width:20px;text-align:center">${i+1}</div>`:''}${cov([s],s.album,1)}<button class="in" data-a="play" data-i="${i}"><div class="t">${now?EQB:''}${esc(s.title)}</div><div class="s">${esc(artLine(s))} · ${esc(s.album)}</div></button><button class="ic" data-a="like" data-id="${s.id}" aria-label="Curtir" style="${lk?'color:var(--ac)':''}">${ico(lk?I.hf:I.h)}</button><button class="ic" data-a="more" data-id="${s.id}" aria-label="Mais opções">${ico(I.more)}</button></div>`}
const albumCard=(k,l)=>`<button class="card" data-a="open" data-t="album" data-k="${esc(k)}">${cov(l,k)}<div class="t">${esc(k)}</div><div class="s sm">${aph(l[0].artist).replace('class="cv"','class="mini"')}${esc(l[0].artist)}${vb(l[0].artist)} · ${aType(l.length)}</div></button>`;
function play(i){
 const s=songs.find(x=>x.id===queue[i]);if(!s)return;
 qi=i;barMode='mini';SOC.plays=SOC.plays||{};SOC.plays[s.id]=(SOC.plays[s.id]||0)+1;SOC.recent=[s.id,...(SOC.recent||[]).filter(x=>x!==s.id)].slice(0,30);socSave();if(cur)URL.revokeObjectURL(cur);au.dataset.retry='';au.dataset.rl='';playTok++;sessBeat();clearTimeout(audioWarm.t);if(s.file){au.crossOrigin=null;cur=URL.createObjectURL(s.file);au.src=cur}else if(s.fid&&window.caches){const tk=playTok;cur=null;au.crossOrigin=null;au.removeAttribute('src');audioPlay(s,tk)}else{cur=null;au.crossOrigin='anonymous';au.dataset.u=s.url||'';au.src=s.url}au.playbackRate=S.speed||1;graph();au.play().catch(()=>{});
 try{navigator.mediaSession.metadata=new MediaMetadata({title:s.title,artist:s.artist,album:s.album,artwork:sc(s)?[{src:sc(s)}]:[]})}catch(e){}
 player();render();if(npOpen)renderNP()}
function startQ(ids,i){queue=ids;tapeSrc=(detail&&detail.t==='tape')?detail.k:null;play(i)}
const next=()=>{if(tapeSrc&&qi>=queue.length-2)extendQ();if(queue.length)play((qi+1)%queue.length)};
const prev=()=>{if(au.currentTime>3)au.currentTime=0;else if(queue.length)play((qi-1+queue.length)%queue.length)};
function player(){renderBar()}
au.onended=()=>{if(rep){au.currentTime=0;au.play()}else if(S.auto!==false)next()};
au.ontimeupdate=()=>{npTick();hlAl();const k=$('#sk'),d=au.duration||0;if(k&&document.activeElement!==k){k.max=d||k.max;k.value=au.currentTime}if(k)k.style.setProperty('--p',(d?au.currentTime/d*100:0)+'%');const g=$('#pg');if(g)g.style.width=(d?au.currentTime/d*100:0)+'%';const a1=$('#bt1');if(a1){a1.textContent=fmt(au.currentTime);$('#bt2').textContent=fmt(d)}};
const pbIcon=()=>{document.querySelectorAll('.ppi').forEach(b=>{b.innerHTML=ico(au.paused?I.play:I.pause)});const c=document.querySelector('#np .npc');if(c)c.classList.toggle('paused',au.paused);document.querySelectorAll('.ppi').forEach(b=>fx(b,'pulse'));document.documentElement.classList.toggle('playing',!au.paused)};
au.onplay=pbIcon;au.onpause=pbIcon;
try{navigator.mediaSession.setActionHandler('nexttrack',next);navigator.mediaSession.setActionHandler('previoustrack',prev)}catch(e){}
document.addEventListener('click',e=>{
 if(e.target.id==='sh'){closeSheet();return}const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,d=b.dataset;
 if(a!=='del'&&a!=='sdel'&&a!=='dlist'&&delId){delId=null;render()}
 if(a==='tab'){tab=d.k;render()}
 else if(a==='open'){closeNP();closeSheet();detail={t:d.t,k:d.k};artTab='m';artAll=false;artMoreS=false;render();scrollTo(0,0);$('#ctr').scrollTop=0}
 else if(a==='back'){detail=null;render()}
 else if(a==='cover')openCover(d.k)
 else if(a==='scov')openSongCover(d.id)
 else if(a==='np')openNP();else if(a==='npclose')closeNPAnim();else if(a==='cfg')openCfg()
 else if(a==='prof')openAcc('menu')
 else if(a==='conn')connectDev()
 else if(a==='addcur'){const c=cs();if(c)addToListSheet(c.id)}
 else if(a==='gsign'){(async()=>{try{await gToken();if(driveOn()){await driveCheckAdmin();toast(driveAdmin?'Administrador conectado':'Esta conta Google não é a administradora desta biblioteca.')}else toast('Google conectado')}catch(e){toast(e.message)}renderAcc();render()})()}
 else if(a==='gsetup'){(async()=>{try{toast('Criando a pasta no Drive...');await driveSetup();toast('Drive configurado!')}catch(e){toast('Erro: '+e.message)}renderAcc();render()})()}
 else if(a==='gcopy'){try{navigator.clipboard.writeText($('#gcfg').textContent);toast('Copiado')}catch(e){toast('Selecione e copie o texto')}}
 else if(a==='gout'){try{if(GTOK&&gisReady())google.accounts.oauth2.revoke(GTOK,()=>{})}catch(e){}GTOK=null;GEXP=0;driveAdmin=false;try{sessionStorage.removeItem('sonar-gtok')}catch(e){}toast('Desconectado do Google');renderAcc();render()}
 else if(a==='gimport'){driveImportLocal().catch(e=>toast('Erro: '+e.message))}
 else if(a==='accout')logout()
 else if(a==='accgo'){accPage=d.v;renderAcc()}
 else if(a==='accset'){closeAcc();openCfg()}
 else if(a==='accsw')switchAcc(d.v)
 else if(a==='accadd')addAcc()
 else if(a==='accdel')delAcc(d.v)
 else if(a==='playR'){startQ(accList.map(s=>s.id),+d.i)}
 else if(a==='pphoto'){covP=true;covN=false;covK=null;covS=null;covA=null;$('#fc').click()}
 else if(a==='psave'){PROF.name=($('#pname').value||'').trim();profSave();$('#pmsg').textContent=isAdm()?'Conta de administrador: você pode editar e fazer uploads.':'Conta de ouvinte.';toast('Perfil salvo');render()}
 else if(a==='atab'){artTab=d.v;render()}
 else if(a==='aall'){artAll=!artAll;render()}
 else if(a==='amoresongs'){artMoreS=!artMoreS;render()}
 else if(a==='amenu')artMenu(d.k)
 else if(a==='tape'){closeSheet();openTape(d.k)}
 else if(a==='redraw'){tapeFresh=true;TLK=null;render()}
 else if(a==='allsongs'){homeAll=!homeAll;render()}
 else if(a==='ledit2'){lyId=d.id;const s=songs.find(x=>x.id===d.id);$('#l1').value=(s&&s.lyrics)||'';$('#lm').style.display='flex'}
 else if(a==='pfx')accBack()
 else if(a==='reord'){if(isAdm()){reord=!reord;render()}}
 else if(a==='mv'){const key=detail&&detail.k,l=albumList(key),i=l.findIndex(s=>s.id===d.id),j=i+(+d.d);if(i>=0&&j>=0&&j<l.length){[l[i],l[j]]=[l[j],l[i]];ORD[key]=l.map(s=>s.id);ordSave();popFn(()=>document.querySelectorAll('.dl .row').forEach(r=>{const b=r.querySelector('[data-a="mv"]');if(b&&b.dataset.id===d.id)fx(r,'flash')}));render()}}
 else if(a==='nav')goNav(d.k)
 else if(a==='chip'){tab=tab===d.k?'home':d.k;detail=null;nav='home';render();$('#ctr').scrollTop=0;scrollTo(0,0)}
 else if(a==='fol')toggleFollow(d.k)
 else if(a==='like')toggleLike(d.id)
 else if(a==='more')songSheet(d.id)
 else if(a==='bell')notifSheet()
 else if(a==='ncl'){SOC.notes=[];socSave();closeSheet();render();if($('#pf').style.display==='flex')renderAcc()}
 else if(a==='heart')heartAct()
 else if(a==='shx')closeSheet()
 else if(a==='mute'){if((S.vol??1)>0){S.pv=S.vol??1;setVol(0)}else setVol(S.pv||1);renderBar()}
 else if(a==='playart'){const l=sorted(songs.filter(s=>s.artist===d.k));if(l.length)startQ(l.map(s=>s.id),0)}
 else if(a==='playalb'){const l=albumList(d.k);if(l.length)startQ(l.map(s=>s.id),0)}
 else if(a==='playlist'){const ids=listIds(d.k);if(ids.length)startQ(ids,0)}
 else if(a==='addpl')addToListSheet(d.id)
 else if(a==='pladd')addToList(d.id,d.l)
 else if(a==='pmk')mkList(d.id)
 else if(a==='newpl')newListSheet()
 else if(a==='editS'){closeSheet();const s=songs.find(x=>x.id===d.id);if(s){editId=s.id;$('#e1').value=s.title;$('#e2').value=s.artist;$('#e3').value=s.album;$('#e4').value=(s.feats||[]).join(', ');$('#md').style.display='flex'}}
 else if(a==='scovS'){closeSheet();openSongCover(d.id)}
 else if(a==='sdel'){if(delId===d.id){const gone=songs.find(x=>x.id===d.id);songs=songs.filter(x=>x.id!==d.id);dbDel(d.id);if(driveOn()&&gone)driveTrash(gone);SOC.liked=SOC.liked.filter(x=>x!==d.id);SOC.lists.forEach(l=>{l.ids=l.ids.filter(x=>x!==d.id)});socSave();if(queue[qi]===d.id){au.pause();queue=[];qi=-1}delId=null;closeSheet();render()}else{delId=d.id;songSheet(d.id)}}
 else if(a==='dlist'){if(delId==='l:'+d.k){SOC.lists=SOC.lists.filter(l=>l.id!==d.k);socSave();delId=null;detail=null}else delId='l:'+d.k;render()}
 else if(a==='ledit'){lyId=(cs()||{}).id;$('#l1').value=(cs()||{}).lyrics||'';$('#lm').style.display='flex'}
 else if(a==='seek'){if(d.t!=='')au.currentTime=+d.t}
 else if(a==='rep'){rep=!rep;renderNP()}
 else if(a==='shufq'){const c=queue[qi];queue=[c,...queue.filter((_,i)=>i!==qi).sort(()=>Math.random()-.5)];qi=0;$('#st').textContent='Fila embaralhada';setTimeout(()=>{$('#st').textContent=''},2000)}
 else if(a==='aedit'){closeSheet();const x=art(d.k);editA=d.k;$('#a1').value=x.name;$('#a2').value=x.bio||'';$('#a3').checked=x.verified!==false;$('#am').style.display='flex'}
 else if(a==='play')startQ(ctx.map(s=>s.id),+d.i);
 else if(a==='all')startQ(ctx.map(s=>s.id),0);
 else if(a==='shuf'){const ids=ctx.map(s=>s.id).sort(()=>Math.random()-.5);startQ(ids,0)}
 else if(a==='pp'){au.paused?au.play():au.pause()}
 else if(a==='next')next();else if(a==='prev')prev();
 else if(a==='edit'){const s=songs.find(x=>x.id===d.id);editId=s.id;$('#e1').value=s.title;$('#e2').value=s.artist;$('#e3').value=s.album;$('#e4').value=(s.feats||[]).join(', ');$('#md').style.display='flex'}
 else if(a==='del'){
  if(delId===d.id){songs=songs.filter(x=>x.id!==d.id);dbDel(d.id);if(queue[qi]===d.id){au.pause();queue=[];qi=-1;player()}delId=null}else delId=d.id;
  render()}
});
$('#ec').onclick=()=>{$('#md').style.display='none'};
$('#es').onclick=()=>{
 const s=songs.find(x=>x.id===editId);
 if(s){s.title=$('#e1').value.trim()||s.title;s.artist=$('#e2').value.trim()||s.artist;s.album=$('#e3').value.trim()||s.album;s.feats=$('#e4').value.split(',').map(x=>x.trim()).filter(Boolean);dbPut(s)}
 $('#md').style.display='none';render();player();if(npOpen)renderNP()};
let covK=null,covS=null;
function openCover(k){warm();covK=k;covS=null;covA=null;covN=false;covP=false;$('#fc').click()}
function openSongCover(id){warm();covS=id;covK=null;covA=null;covN=false;covP=false;$('#fc').click()}
function resize(f){return new Promise(r=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{const m=Math.min(1,400/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*m;c.height=im.height*m;c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);r(c.toDataURL('image/jpeg',.8))};im.onerror=()=>r('');im.src=u})}
$('#fc').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f||(covK==null&&covS==null&&covA==null&&!covN&&!covP))return;const url=await resize(f);if(!url)return;if(covP){PROF.photo=url;profSave();renderAcc();render();return}if(covN){U.cover=url;renderUp();return}if(covA!=null){await setArtistPhoto(covA,url).catch(e=>toast('Drive: '+e.message))}else if(covS){await setSongCover(covS,url).catch(e=>toast('Drive: '+e.message))}else await setAlbumCover(covK,url).catch(e=>toast('Drive: '+e.message));render();player();if(npOpen)renderNP()};
$('#ecs').onclick=()=>{if(editId)openSongCover(editId)};
$('#ecv').onclick=()=>{const s=songs.find(x=>x.id===editId);if(s)openCover(s.album)};
function openNP(){
 const s0=cs();if(!s0)return;
 if(isD){nav='home';tab='home';reord=false;detail={t:'album',k:s0.album};closeSheet();render();$('#ctr').scrollTop=0;const c=$('#mn');c.classList.remove('pin');void c.offsetWidth;c.classList.add('pin');const r=document.querySelector('.dl .row.on-now');if(r)r.scrollIntoView({block:'nearest'});return}
 npOpen=true;lastNpId=null;const n=$('#np');n.style.display='block';n.classList.remove('in');void n.offsetWidth;if(!isD)n.classList.add('in');renderNP()}
function closeNP(){npOpen=false;$('#np').style.display='none'}
function renderNP(){
 const s=cs(),n=$('#np');if(!s){closeNP();return}
 const a=art(s.artist),cnt=songs.filter(x=>x.artist===s.artist).length,L=lyr(s),lk=SOC.liked.includes(s.id),src=sc(s),inp=inPl(s.id);
 let h=0;for(const c of s.artist)h=(h*31+c.charCodeAt(0))%360;
 let h2=0;for(const c of s.album)h2=(h2*31+c.charCodeAt(0))%360;
 const bg=a.photo?`linear-gradient(transparent 35%,rgba(0,0,0,.85)),url(${a.photo})`:`linear-gradient(transparent 35%,rgba(0,0,0,.7)),linear-gradient(135deg,hsl(${h} 55% 40%),hsl(${(h+50)%360} 55% 22%))`;
 const nbg=src?`url(${src})`:`linear-gradient(135deg,hsl(${h2} 60% 40%),hsl(${(h2+50)%360} 60% 16%))`;
 const d=au.duration||s.dur||0,pc=d?au.currentTime/d*100:0;
 n.innerHTML=`<div class="npbg" style="background-image:${nbg}"></div><div class="npin"><div class="grab"></div><div class="nph"><button class="ic" data-a="npclose" aria-label="Fechar">${ico(I.dn)}</button><div class="s">Tocando do álbum<div class="t" style="color:var(--tx);font-weight:700">${esc(s.album)}</div></div><button class="ic" data-a="more" data-id="${s.id}" aria-label="Mais opções">${ico(I.more)}</button></div><div class="npc${au.paused?' paused':''}">${cov([s],s.album,1)}</div><div class="npt"><div style="min-width:0;flex:1"><h2>${esc(s.title)}</h2><div class="s">${esc(artLine(s))}${vb(s.artist)}</div></div><button class="ic big2" data-a="like" data-id="${s.id}" aria-label="Curtir" style="${lk?'color:var(--ac)':''}">${ico(lk?I.hf:I.h)}</button></div><input type="range" id="nsk" min="0" max="${d}" step="0.1" value="${au.currentTime||0}" style="--p:${pc}%" aria-label="Posição"><div class="tm"><span id="nt1">${fmt(au.currentTime)}</span><span id="nt2">${fmt(au.duration||s.dur)}</span></div><div class="npb"><button class="pb" data-a="shufq" aria-label="Embaralhar">${ico(I.shuf)}</button><button class="pb" data-a="prev" aria-label="Anterior">${ico(I.prev)}</button><button class="pb big ppi" data-a="pp" aria-label="Tocar ou pausar">${ico(au.paused?I.play:I.pause)}</button><button class="pb" data-a="next" aria-label="Próxima">${ico(I.next)}</button><button class="pb" data-a="rep" aria-label="Repetir" style="color:${rep?'var(--ac)':'inherit'}">${ico(I.rep)}</button></div><div class="npx"><button class="chp${DEV?' on':''}" data-a="conn">${ico(I.bt)}<span>${DEV?esc(DEV.name):'Conectar'}</span></button><button class="chp${inp?' on':''}" data-a="addcur">${ico(inp?I.chk:I.plc)}<span>${inp?'Na playlist':'Playlist'}</span></button></div><div class="c2"><div class="top"><b>Letra</b>${isAdm()?'<button data-a="ledit">Editar letra</button>':''}</div><div id="ly">${L.length?L.map(l=>`<div class="ll" data-a="seek" data-t="${l.t==null?'':l.t}">${esc(l.x)}</div>`).join(''):'<div class="s" style="font-weight:400;font-size:14px">Sem letra ainda.</div>'}</div></div><div class="about" style="background-image:${bg}"><div><b>Sobre o artista</b></div><div><div style="font-size:13px;opacity:.85">${cnt} música(s) na biblioteca</div><h2>${esc(s.artist)}${vb(s.artist)}</h2>${a.bio?`<p>${esc(a.bio)}</p>`:''}<button class="bt" data-a="open" data-t="artist" data-k="${esc(s.artist)}">Ver perfil</button></div></div></div>`;
 $('#nsk').oninput=e=>{au.currentTime=+e.target.value};lastA=-2;if(lastNpId!==s.id){lastNpId=s.id;const c=n.querySelector('.npc'),tt=n.querySelector('.npt');if(c)c.classList.add('cvin');if(tt)tt.classList.add('ttin')}npTick()}
function npTick(){
 if(!npOpen)return;const k=$('#nsk');if(!k)return;
 if(document.activeElement!==k){k.max=au.duration||k.max;k.value=au.currentTime}k.style.setProperty('--p',(au.duration?au.currentTime/au.duration*100:0)+'%');
 $('#nt1').textContent=fmt(au.currentTime);$('#nt2').textContent=fmt(au.duration);
 const ly=$('#ly');if(!ly)return;let a=-1;const cs2=[...ly.children];
 cs2.forEach((c,i)=>{const v=c.dataset.t;if(v!==undefined&&v!==''&&+v<=au.currentTime)a=i});
 if(a!==lastA){lastA=a;cs2.forEach((c,i)=>c.classList.toggle('act',i===a));const c=cs2[a];if(c)ly.scrollTo({top:c.offsetTop-ly.clientHeight/2+c.clientHeight/2,behavior:'smooth'})}}
$('#aph').onclick=()=>{warm();covA=editA;covK=null;covS=null;covN=false;covP=false;$('#fc').click()};
$('#ac').onclick=()=>{$('#am').style.display='none'};
$('#as').onclick=()=>{
 const old=editA,nn=$('#a1').value.trim()||old,a={...art(old),name:nn,bio:$('#a2').value.trim(),verified:$('#a3').checked};
 if(nn!==old){songs.forEach(s=>{let ch=false;if(s.artist===old){s.artist=nn;ch=true}if((s.feats||[]).includes(old)){s.feats=s.feats.map(x=>x===old?nn:x);ch=true}if(ch)dbPut(s)});delete AR[old];adbDel(old);const fi=SOC.follows.indexOf(old);if(fi>=0){SOC.follows[fi]=nn;socSave()}if(detail&&detail.t==='artist')detail.k=nn}
 AR[nn]=a;adbPut(a);$('#am').style.display='none';render();player();if(npOpen)renderNP()};
$('#lc').onclick=()=>{$('#lm').style.display='none'};
$('#ls').onclick=()=>{const s=songs.find(x=>x.id===lyId);if(s){s.lyrics=$('#l1').value;dbPut(s)}$('#lm').style.display='none';render();if(npOpen)renderNP()};
$('#lt').onclick=()=>{const ta=$('#l1'),v=ta.value,p=ta.selectionStart,st=v.lastIndexOf('\n',p-1)+1;let en=v.indexOf('\n',st);if(en<0)en=v.length;const line=v.slice(st,en).replace(/^\[[\d:.]+\]\s*/,''),tm=au.currentTime,tag='['+Math.floor(tm/60)+':'+(tm%60).toFixed(2).padStart(5,'0')+'] ';ta.value=v.slice(0,st)+tag+line+v.slice(en);const q=st+tag.length+line.length+1;ta.setSelectionRange(q,q)};
let U={type:null,n:0,name:'',artist:'',feats:'',cover:'',files:[],titles:[],msg:''};
const TY={single:{l:'Single',min:1,max:3},ep:{l:'EP',min:4,max:4},album:{l:'Álbum',min:5,max:12},mixtape:{l:'Mixtape',min:13,max:Infinity}};
function renderUp(){
 const T=U.type?TY[U.type]:null,rg=v=>v.max===Infinity?v.min+'+':v.min===v.max?v.min:v.min+'-'+v.max;
 let h=`<div id="up"><h3 style="margin-top:8px">Novo lançamento</h3><div class="s">Escolha o tipo de projeto</div><div class="kind">${Object.entries(TY).map(([k,v])=>`<button data-u="type" data-k="${k}" class="${U.type===k?'on':''}">${v.l}<div class="s sm">${rg(v)} música(s)</div></button>`).join('')}</div>`;
 if(!T)h+='<div class="s">Escolha um tipo acima para continuar.</div>';
 else{
  h+=`<div class="upr"><div class="upf"><label>Nome do projeto</label><input id="u1" value="${esc(U.name)}"><label>Artista principal</label><input id="u2" list="dl-art" value="${esc(U.artist)}"><label>Participações (separe por vírgula)</label><input id="u3" value="${esc(U.feats)}"></div><button class="upc" data-u="cover" aria-label="Escolher capa">${U.cover?`<img src="${U.cover}" alt="">`:'<span>+<br>Capa</span>'}</button></div>`;
  h+=`<label>Quantidade de músicas</label>${T.min===T.max?`<div class="s" style="margin:6px 0 12px">${T.min} músicas (obrigatório)</div>`:`<div class="stp"><button data-u="minus" aria-label="Menos">−</button><b>${U.n}</b><button data-u="plus" aria-label="Mais">+</button><span class="s">${T.max===Infinity?'mínimo '+T.min:T.min+' a '+T.max}</span></div>`}<button class="pill" data-u="bulk">Selecionar todos os arquivos de uma vez</button>`;
  for(let i=0;i<U.n;i++)h+=`<div class="row"><div class="s" style="width:22px">${i+1}</div><div class="in"><input class="ut" data-i="${i}" placeholder="Título da faixa" value="${esc(U.titles[i]||'')}"><button class="s" data-u="file" data-i="${i}" style="text-decoration:underline">${U.files[i]?esc(U.files[i].name):'Escolher arquivo de áudio'}</button></div></div>`;
  h+=`<div id="umsg">${esc(U.msg||'')}</div><button class="add" data-u="create" style="width:100%;padding:13px;margin:8px 0 16px">Criar ${T.l}</button>`}
 $('#mn').innerHTML=h+'</div>';
 $('#dl-art').innerHTML=[...new Set(songs.map(s=>s.artist))].map(a=>`<option value="${esc(a)}">`).join('')}
function setType(k){const T=TY[k];if(U.type!==k){U.type=k;U.n=T.min}U.msg='';renderUp()}
async function createUp(){
 const T=TY[U.type],err=m=>{U.msg=m;renderUp();scrollTo(0,document.body.scrollHeight)};
 const name=U.name.trim(),artist=U.artist.trim();
 if(!name)return err('Digite o nome do projeto.');
 if(!artist)return err('Digite o artista principal.');
 if(songs.some(s=>s.album===name))return err('Já existe um projeto com esse nome.');
 if(U.n<T.min||U.n>T.max)return err('Quantidade de faixas inválida para '+T.l+'.');
 for(let i=0;i<U.n;i++)if(!U.files[i])return err('Falta o arquivo da faixa '+(i+1)+'.');
 if(driveOn()){if(!driveAdmin)return err('Entre com o Google (administrador) para enviar músicas ao Drive.');return createUpDrive(name,artist,T)}
 U.msg='Criando...';renderUp();
 const feats=U.feats.split(',').map(x=>x.trim()).filter(Boolean),base=Date.now();
 for(let i=0;i<U.n;i++){
  const f=U.files[i],tg=await readTags(f);
  const s={id:base+'-'+i+Math.random().toString(36).slice(2,6),name:f.name,size:f.size,title:(U.titles[i]||'').trim()||tg.title||f.name.replace(/\.[^.]+$/,''),artist,feats,album:name,cover:picUrl(tg.picture),acover:U.cover||undefined,dur:await getDur(f),added:base-i,file:f,kind:U.type};
  songs.push(s);dbPut(s)}
 const n=U.n,l=T.l;if(S.notif!==false&&[artist,...feats].some(a=>SOC.follows.includes(a)))note('Novo lançamento de '+artist+': '+name+' ('+l+')');
 U={type:null,n:0,name:'',artist:'',feats:'',cover:'',files:[],titles:[],msg:''};
 tab='home';nav='home';detail={t:'album',k:name};scrollTo(0,0);render();
 $('#st').textContent=l+' criado com '+n+' faixa(s)';setTimeout(()=>{$('#st').textContent=''},3000)}
$('#mn').addEventListener('input',e=>{const x=e.target;if(x.id==='u1')U.name=x.value;else if(x.id==='u2')U.artist=x.value;else if(x.id==='u3')U.feats=x.value;else if(x.classList.contains('ut'))U.titles[+x.dataset.i]=x.value});
$('#mn').addEventListener('click',e=>{
 const b=e.target.closest('[data-u]');if(!b||!U.type&&b.dataset.u!=='type')return;
 const a=b.dataset.u,T=U.type?TY[U.type]:null;
 if(a==='type')setType(b.dataset.k);
 else if(a==='plus'){U.n=Math.min(T.max,U.n+1);U.msg='';renderUp()}
 else if(a==='minus'){U.n=Math.max(T.min,U.n-1);U.msg='';renderUp()}
 else if(a==='cover'){covN=true;covP=false;covK=null;covS=null;covA=null;$('#fc').click()}
 else if(a==='file'){upT=+b.dataset.i;$('#uf').multiple=false;$('#uf').click()}
 else if(a==='bulk'){upT=-1;$('#uf').multiple=true;$('#uf').click()}
 else if(a==='create')createUp()});
$('#uf').onchange=async e=>{
 const list=[...e.target.files].filter(f=>f.type.startsWith('audio')||/\.(mp3|m4a|wav|ogg|flac|aac|opus)$/i.test(f.name));e.target.value='';
 if(!list.length||!U.type)return;const T=TY[U.type],nm=f=>f.name.replace(/\.[^.]+$/,'');U.msg='';
 if(upT>=0){U.files[upT]=list[0];if(!U.titles[upT])U.titles[upT]=(await readTags(list[0])).title||nm(list[0])}
 else{const m=Math.min(list.length,T.max);for(let i=0;i<m;i++){U.files[i]=list[i];U.titles[i]=(await readTags(list[i])).title||nm(list[i])}U.n=Math.max(T.min,m);if(list.length>T.max)U.msg='Cabem só '+T.max+' faixas em '+T.l+'; as demais foram ignoradas.'}
 renderUp()};
let S={theme:'dark',accent:'#c6f432',eq:false,eqb:[0,0,0,0,0],eqp:'Normal',norm:false,speed:1,auto:true,sort:'title',badge:true,lyr:22,layout:'auto'},wipeArm=false;
try{Object.assign(S,JSON.parse(localStorage.getItem('sonar-cfg')||'{}'))}catch(e){}
const PAL=[['Neon','#c6f432'],['Verde','#1db954'],['Roxo','#8b5cf6'],['Azul','#3b82f6'],['Ciano','#06b6d4'],['Turquesa','#14b8a6'],['Limão','#84cc16'],['Amarelo','#facc15'],['Laranja','#f97316'],['Vermelho','#ef4444'],['Rosa','#ec4899'],['Magenta','#d946ef'],['Índigo','#6366f1'],['Dourado','#d4a017'],['Marrom','#a0522d'],['Cinza','#9ca3af']];
const PRE={'Normal':[0,0,0,0,0],'Graves':[7,5,1,0,0],'Agudos':[0,0,1,4,7],'Vocal':[-2,1,4,3,-1],'Rock':[5,3,-1,3,5],'Pop':[-1,3,4,3,-1],'Eletrônica':[6,3,0,2,5],'Acústico':[3,3,2,2,3]};
const BANDS=['60 Hz','230 Hz','910 Hz','3,6 kHz','14 kHz'];
const isDark=()=>S.theme==='dark'||(S.theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);
const lum=h=>{const n=parseInt(h.slice(1),16);return .299*(n>>16)+.587*(n>>8&255)+.114*(n&255)};
let AC=null,SRC=null,F=[],CMP=null,MK=null,VG=null;
const dc=n=>{try{n.disconnect()}catch(e){}};
function graph(){
 if(!AC){
  if(!S.eq&&!S.norm)return;
  try{AC=new(window.AudioContext||window.webkitAudioContext)();SRC=AC.createMediaElementSource(au);
   F=[60,230,910,3600,14000].map((f,i)=>{const b=AC.createBiquadFilter();b.type=i===0?'lowshelf':i===4?'highshelf':'peaking';b.frequency.value=f;return b});
   CMP=AC.createDynamicsCompressor();CMP.threshold.value=-24;CMP.knee.value=30;CMP.ratio.value=4;CMP.attack.value=.003;CMP.release.value=.25;
   MK=AC.createGain();MK.gain.value=1.5;VG=AC.createGain()}catch(e){AC=null;return}}
 dc(SRC);F.forEach(dc);dc(CMP);dc(MK);dc(VG);
 let last=SRC;
 if(S.eq)F.forEach((n,i)=>{n.gain.value=S.eqb[i];last.connect(n);last=n});
 if(S.norm){last.connect(CMP);CMP.connect(MK);last=MK}
 last.connect(VG);VG.connect(AC.destination);setVol(S.vol??1);
 if(AC.state==='suspended')AC.resume()}
function applyCfg(){
 const r=document.documentElement,d=isDark();
 if(S.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.theme);r.classList.toggle('lt',!d);
 if((S.accent==='#ffffff'&&!d)||(S.accent==='#000000'&&d))S.accent='#c6f432';
 r.style.setProperty('--ac',S.accent);r.style.setProperty('--act',lum(S.accent)>150?'#000':'#fff');
 r.style.setProperty('--lyr',S.lyr+'px');r.classList.toggle('nov',!S.badge);
 au.defaultPlaybackRate=au.playbackRate=S.speed||1;
 try{localStorage.setItem('sonar-cfg',JSON.stringify(S))}catch(e){}
 graph()}
function renderCfg(){
 const sw=(k,on)=>`<button class="sw${on?' on':''}" role="switch" aria-checked="${on}" data-c="${k}"></button>`;
 const sel=(k,v,o)=>`<select data-c="${k}">${o.map(([a,b])=>`<option value="${a}"${String(a)===String(v)?' selected':''}>${b}</option>`).join('')}</select>`;
 const mb=(songs.reduce((a,s)=>a+(s.size||0),0)/1048576).toFixed(1),dk=isDark(),pal=PAL.concat(dk?[['Branco','#ffffff']]:[['Preto','#000000']]);
 const P={
 conta:`<div class="cr"><div>Nome de usuário<small>${esc(PROF.name||'Sem nome')}</small></div></div><div class="cr"><div>Tipo de conta<small>${isAdm()?'Administrador':'Ouvinte'}</small></div></div><button class="pill" data-c="toacc">Abrir central de contas</button>`,
 rep:`<div class="cr"><div>Equalizador<small>Ajuste graves e agudos</small></div>${sw('eq',S.eq)}</div>${S.eq?`<div class="chips">${Object.keys(PRE).map(k=>`<button data-c="preset" data-v="${k}" class="${S.eqp===k?'on':''}">${k}</button>`).join('')}</div>${BANDS.map((b,i)=>`<div class="eqb"><span>${b}</span><input type="range" min="-12" max="12" step="1" value="${S.eqb[i]}" data-c="band" data-i="${i}" aria-label="${b}"><output>${S.eqb[i]} dB</output></div>`).join('')}`:''}<div class="cr"><div>Normalizar volume<small>Nivela o volume entre as músicas</small></div>${sw('norm',S.norm)}</div><div class="cr"><div>Velocidade</div>${sel('speed',S.speed,[[0.75,'0,75x'],[1,'Normal'],[1.25,'1,25x'],[1.5,'1,5x'],[2,'2x']])}</div><div class="cr"><div>Tocar a próxima automaticamente</div>${sw('auto',S.auto!==false)}</div>`,
 apar:`<div class="cr"><div>Modo</div><div class="seg">${[['dark','Escuro'],['light','Claro'],['auto','Automático']].map(([k,l])=>`<button data-c="theme" data-v="${k}" class="${S.theme===k?'on':''}">${l}</button>`).join('')}</div></div><div>Cor de destaque</div><div class="sws">${pal.map(([n,h])=>`<button data-c="acc" data-v="${h}" class="${S.accent===h?'on':''}" style="background:${h}" aria-label="${n}"></button>`).join('')}<input type="color" data-c="cust" value="${S.accent}" aria-label="Cor personalizada"></div><div id="cmsg"></div><div class="s">Branco aparece só no tema escuro e preto só no claro, para sempre ficarem em destaque.</div><div class="cr"><div>Modo desktop<small>Auto segue o tamanho da tela</small></div><div class="seg">${[['auto','Auto'],['desktop','Sim'],['mobile','Não']].map(([k,l])=>`<button data-c="lay" data-v="${k}" class="${S.layout===k?'on':''}">${l}</button>`).join('')}</div></div>`,
 bib:`<div class="cr"><div>Ordenar músicas por</div>${sel('sort',S.sort,[['title','Título'],['artist','Artista'],['recent','Mais recentes']])}</div><div class="cr"><div>Mostrar selo de verificado</div>${sw('badge',S.badge)}</div><div class="cr"><div>Tamanho da letra</div>${sel('lyr',S.lyr,[[18,'Pequena'],[22,'Média'],[28,'Grande']])}</div>`,
 notif:`<div class="cr"><div>Lançamentos de quem você segue<small>Avisar no sino quando sair música nova</small></div>${sw('notif',S.notif!==false)}</div>`,
 arm:driveOn()||driveSetupMode()?`<div class="cr"><div>Google Drive<small>${driveOn()?(driveAdmin?'Administrador conectado':'Modo ouvinte (somente leitura)'):'Configuração pendente'}</small></div></div><div class="cr"><div>${songs.length} música(s)<small>Biblioteca carregada do Drive</small></div><button class="pill" data-c="drefresh">Atualizar</button></div><div class="cr"><div>Testar conexão<small>Mostra o motivo de qualquer erro</small></div><button class="pill" data-c="ddiag">Testar</button></div><div id="dmsg" class="s" style="white-space:normal"></div>`:`<div class="cr"><div>${songs.length} música(s)<small>${mb} MB neste aparelho</small></div>${isAdm()?`<button class="danger" data-c="wipe">${wipeArm?'Toque de novo para apagar tudo':'Apagar biblioteca'}</button>`:''}</div>`,
 info:`<div class="cr"><div>Sonar<small>Versão ${APP_VERSION}</small></div></div><div class="cr"><div>Novidades<small>Login sem animações contínuas (acaba o tremor e a piscada do fundo)</small></div></div><div class="cr"><div>Criador<small>eo_vinnyz</small></div></div><div class="cr"><div>Feito com<small>Claude, da Anthropic. Este app foi construído em conversa com ele.</small></div></div><div class="cr"><div>Dados<small>Tudo fica salvo neste aparelho</small></div></div>`};
 const title=cfgPage?CFGP.find(x=>x[0]===cfgPage)[1]:'Configurações e privacidade';
 $('#cf').innerHTML=`<div class="cfh"><button class="ic" data-c="back" aria-label="Voltar" style="transform:rotate(90deg)">${ico(I.dn)}</button><h2>${title}</h2></div>`+(cfgPage?P[cfgPage]:CFGP.map(([k,tt,s])=>`<button class="arow2" data-c="page" data-v="${k}"><div class="in"><div class="t">${tt}</div><div class="s">${s}</div></div></button>`).join(''));cfgFx()}
function openCfg(){cfgPage=null;renderCfg();showEl('#cf','block')}
function closeCfg(){hideAnim('#cf');wipeArm=false;cfgPage=null}
function wipeAll(){songs.forEach(s=>dbDel(s.id));songs=[];Object.keys(AR).forEach(adbDel);AR={};au.pause();queue=[];qi=-1;detail=null;player();closeNP();render()}
$('#cf').addEventListener('click',e=>{
 const b=e.target.closest('button[data-c]');if(!b)return;const c=b.dataset.c,v=b.dataset.v;
 if(c==='drefresh'){driveLoad().then(r=>{toast(r?'Biblioteca atualizada':'Não consegui atualizar: '+driveErr);render();renderCfg()});return}
 if(c==='ddiag'){driveDiag();return}
 if(c==='back'){if(cfgPage){cfgPage=null;renderCfg()}else{closeCfg();openAcc('menu')}return}
 if(c==='page'){cfgPage=v;renderCfg();return}
 if(c==='toacc'){closeCfg();openAcc('profile');return}
 if(c==='close'){closeCfg();return}
 if(c==='wipe'){if(wipeArm){wipeArm=false;wipeAll()}else wipeArm=true;renderCfg();return}
 if(c==='eq')S.eq=!S.eq;else if(c==='norm')S.norm=!S.norm;else if(c==='auto')S.auto=!(S.auto!==false);else if(c==='badge')S.badge=!S.badge;else if(c==='notif')S.notif=!(S.notif!==false);
 else if(c==='theme')S.theme=v;else if(c==='acc')S.accent=v;
 else if(c==='preset'){S.eqp=v;S.eqb=[...PRE[v]]}else if(c==='lay'){S.layout=v;isD=calcD();applyLayout();render()}else return;
 applyCfg();renderCfg()});
$('#cf').addEventListener('input',e=>{const x=e.target;if(x.dataset.c!=='band')return;const i=+x.dataset.i;S.eqb[i]=+x.value;S.eqp='';if(F[i]&&S.eq)F[i].gain.value=S.eqb[i];x.parentNode.querySelector('output').textContent=x.value+' dB'});
$('#cf').addEventListener('change',e=>{
 const x=e.target,c=x.dataset.c;
 if(c==='speed')S.speed=+x.value;else if(c==='sort')S.sort=x.value;else if(c==='lyr')S.lyr=+x.value;
 else if(c==='cust'){const h=x.value.toLowerCase(),L=lum(h);if(isDark()?L<45:L>210){$('#cmsg').textContent='Essa cor some no fundo do tema atual. Escolha outra.';x.value=S.accent;return}S.accent=h}
 else if(c!=='band')return;
 applyCfg();renderCfg();render()});
applyCfg();
const t0=Date.now();
const LOGO=$('#sp img').src;
const APP_VERSION='1.18.4';
const LOGO_W='assets/logo-word.webp';
const LOGO_BG='data:image/webp;base64,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';
const LOGO_S='assets/logo-symbol.webp';
const EQB='<i class="eqb"><b></b><b></b><b></b></i>';
const clockHtml=()=>{const d=new Date();return'<b>'+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+'</b><small>'+d.toLocaleDateString('pt-BR',{weekday:'long'})+'</small><small>'+d.toLocaleDateString('pt-BR',{day:'numeric',month:'long'})+'</small>'};
let cfgPage=null,accPage='menu',accList=[];
const CFGP=[['conta','Conta','Nome de usuário • Tipo de conta'],['rep','Reprodução','Equalizador • Normalizar volume • Autoplay'],['apar','Aparência','Tema • Cor de destaque • Modo desktop'],['bib','Biblioteca e exibição','Ordenação • Selo de verificado • Tamanho da letra'],['notif','Notificações','Lançamentos de quem você segue'],['arm','Armazenamento','Músicas neste aparelho • Apagar biblioteca'],['info','Informações e suporte','Versão • Novidades']];
const SOCD=()=>({follows:[],notes:[],liked:[],lists:[],plays:{},recent:[]});
const SOC=SOCD();
let ACC={list:[],cur:null},ORD={};
try{Object.assign(ACC,JSON.parse(localStorage.getItem('sonar-accs')||'{}'))}catch(e){}
if(!ACC.list.length){let o={};try{o=JSON.parse(localStorage.getItem('sonar-prof')||'{}')}catch(e){}ACC.list=[{id:'a1',name:o.name||'',photo:o.photo||''}];ACC.cur='a1'}
if(!ACC.list.find(a=>a.id===ACC.cur))ACC.cur=ACC.list[0].id;
let PROF=ACC.list.find(a=>a.id===ACC.cur);
const socKey=id=>id==='a1'?'sonar-soc':'sonar-soc-'+id;
try{ORD=JSON.parse(localStorage.getItem('sonar-ord')||'null')||JSON.parse(localStorage.getItem('sonar-soc')||'{}').ord||{}}catch(e){ORD={}}
const ordSave=()=>{if(driveOn()){if(driveAdmin)catMark();return}try{localStorage.setItem('sonar-ord',JSON.stringify(ORD))}catch(e){}};
function loadSoc(){let s={};try{s=JSON.parse(localStorage.getItem(socKey(ACC.cur))||'{}')}catch(e){}Object.keys(SOC).forEach(k=>{delete SOC[k]});Object.assign(SOC,SOCD(),s);delete SOC.ord}
loadSoc();
const socSave=()=>{try{localStorage.setItem(socKey(ACC.cur),JSON.stringify(SOC))}catch(e){}};
const profSave=()=>{try{localStorage.setItem('sonar-accs',JSON.stringify(ACC))}catch(e){}};
const ADMINS=['eo_vinnyz'];
const isAdm=()=>driveOn()?driveAdmin:ADMINS.includes((PROF.name||'').trim().toLowerCase());
const avBtn=()=>`<button class="av" data-a="prof" aria-label="Perfil">${PROF.photo?`<img class="avi" src="${PROF.photo}" alt="">`:esc(((PROF.name||'S')[0]).toUpperCase())}</button>`;
const upBtn=()=>isAdm()?`<button class="ic" data-a="chip" data-k="upload" aria-label="Upload">${ico(I.up)}</button>`:'';
function renderProf(){
 $('#pf').innerHTML=`<div class="cfh" style="padding:calc(10px + env(safe-area-inset-top,0px)) 16px 0"><button class="ic" data-a="pfx" aria-label="Voltar" style="font-size:28px">‹</button><h2>Perfil</h2></div><div class="pfm"><button class="pav" data-a="pphoto" aria-label="Escolher foto">${PROF.photo?`<img src="${PROF.photo}" alt="">`:'<span>+<br>Foto</span>'}</button><label class="s">Nome de usuário</label><input id="pname" value="${esc(PROF.name)}" placeholder="Seu nome" autocomplete="off" autocapitalize="off"><button class="add" data-a="psave" style="margin-top:8px">Salvar</button><div class="s" id="pmsg">${isAdm()?'Conta de administrador: você pode editar e fazer uploads.':'Conta de ouvinte.'}</div><div class="s sm">A central de contas completa (login) vem em breve.</div></div>`}
let nav='home',side='rec',barMode='nav',srchQ='',hdMode='',reord=false,homeAll=false,covP=false,lyId=null;
const mq=matchMedia('(min-width:900px)');
const calcD=()=>S.layout==='desktop'?true:S.layout==='mobile'?false:mq.matches;
let isD=calcD();
function applyLayout(){const m=document.querySelector('meta[name=viewport]');if(m)m.setAttribute('content',S.layout==='desktop'?'width=1280, viewport-fit=cover':'width=device-width, initial-scale=1, viewport-fit=cover')}
applyLayout();
mq.addEventListener('change',()=>{isD=calcD();render()});
const CH=[['new','Novos lançamentos']];
const clock=()=>new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
setInterval(()=>{const c=$('#clk');if(c)c.innerHTML=clockHtml()},15000);
const ex=i=>songs.some(s=>s.id===i);
function albumList(key){const l=songs.filter(s=>s.album===key).sort((a,b)=>(b.added||0)-(a.added||0)),o=ORD[key];if(o)l.sort((a,b)=>{const x=o.indexOf(a.id),y=o.indexOf(b.id);return(x<0?1e9:x)-(y<0?1e9:y)});return l}
const reRow=(s,i,n)=>`<div class="row"><div class="s" style="width:22px;text-align:center">${i+1}</div>${cov([s],s.album,1)}<div class="in"><div class="t">${esc(s.title)}</div></div><button class="ic" data-a="mv" data-id="${s.id}" data-d="-1" aria-label="Subir" ${i===0?'disabled':''}>▲</button><button class="ic" data-a="mv" data-id="${s.id}" data-d="1" aria-label="Descer" ${i===n-1?'disabled':''}>▼</button></div>`;
const listIds=id=>(id==='fav'?SOC.liked:((SOC.lists.find(l=>l.id===id)||{ids:[]}).ids)).filter(ex);
const listSongs=id=>listIds(id).map(i=>songs.find(s=>s.id===i));
const favCov=()=>`<div class="cv" style="background:linear-gradient(135deg,#8b5cf6,#3b82f6)">${ico(I.hf)}</div>`;
const mx=l=>Math.max(...l.map(x=>x.added||0));
const sec=(t,k)=>`<div class="shd"><h3>${t}</h3>${k?`<button data-a="chip" data-k="${k}">Ver tudo</button>`:''}</div>`;
function toast(m){const t=$('#st');t.textContent='';void t.offsetWidth;t.textContent=m;clearTimeout(toast.h);toast.h=setTimeout(()=>{t.textContent=''},2500)}
function note(text){SOC.notes.unshift({id:Date.now(),t:Date.now(),text,read:false});SOC.notes=SOC.notes.slice(0,50);socSave();popFn(()=>document.querySelectorAll('[data-a="bell"]').forEach(e=>fx(e,'ringb')))}
function toggleFollow(k){const i=SOC.follows.indexOf(k);if(i>=0)SOC.follows.splice(i,1);else{SOC.follows.push(k);note('Você começou a seguir '+k);toast('Seguindo '+k)}socSave();popFn(()=>document.querySelectorAll('[data-a="fol"],[data-a="heart"]').forEach(e=>{if(e.dataset.a==='heart'||e.dataset.k===k)fx(e,'pop')}));render()}
function toggleLike(id){const i=SOC.liked.indexOf(id);if(i>=0)SOC.liked.splice(i,1);else SOC.liked.push(id);socSave();popFn(()=>document.querySelectorAll('[data-a="like"]').forEach(e=>{if(e.dataset.id===id)fx(e,'pop')}));render()}
function openSheet(t,h){$('#sht').textContent=t;$('#shb').innerHTML=h;showEl('#sh','flex')}
function closeSheet(){hideAnim('#sh')}
function notifSheet(){
 openSheet('Notificações',SOC.notes.length?SOC.notes.map(n=>`<div class="nt${n.read?'':' un'}"><div>${esc(n.text)}</div><div class="s">${new Date(n.t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</div></div>`).join('')+'<button class="pill" data-a="ncl">Limpar tudo</button>':'<div class="s" style="padding:12px 0">Sem notificações. Siga artistas para saber quando lançarem músicas.</div>');
 SOC.notes.forEach(n=>{n.read=true});socSave();render()}
function songSheet(id){const s=songs.find(x=>x.id===id);if(!s)return;
 openSheet(s.title,`<button class="shi" data-a="addpl" data-id="${id}">Adicionar à playlist</button><button class="shi" data-a="open" data-t="artist" data-k="${esc(s.artist)}">Ir para o artista</button>${isAdm()?`<button class="shi" data-a="editS" data-id="${id}">Editar informações</button><button class="shi" data-a="scovS" data-id="${id}">Capa da música</button><button class="shi danger" data-a="sdel" data-id="${id}">${delId===id?'Toque de novo para remover':'Remover da biblioteca'}</button>`:''}`)}
function addToListSheet(id){openSheet('Adicionar à playlist',`<button class="shi" data-a="pladd" data-id="${id}" data-l="fav">Favoritos</button>${SOC.lists.map(l=>`<button class="shi" data-a="pladd" data-id="${id}" data-l="${l.id}">${esc(l.name)}</button>`).join('')}<input id="pn" placeholder="Nova playlist"><button class="pill" data-a="pmk" data-id="${id}">Criar e adicionar</button>`)}
function newListSheet(){openSheet('Nova playlist','<input id="pn" placeholder="Nome da playlist"><button class="pill" data-a="pmk" data-id="">Criar</button>')}
function addToList(id,l){if(l==='fav'){if(!SOC.liked.includes(id))SOC.liked.push(id)}else{const x=SOC.lists.find(z=>z.id===l);if(x&&!x.ids.includes(id))x.ids.push(id)}socSave();closeSheet();toast('Adicionada à playlist');popFn(()=>document.querySelectorAll('[data-a="addcur"]').forEach(e=>fx(e,'pop')));render()}
function mkList(id){const n=($('#pn').value||'').trim();if(!n)return;SOC.lists.push({id:'l'+Date.now(),name:n,ids:id?[id]:[]});socSave();closeSheet();toast('Playlist criada');render()}
function followSheet(){const f=SOC.follows;openSheet('Seguindo',f.length?f.map(artRow).join(''):'<div class="s" style="padding:12px 0">Você ainda não segue ninguém. Abra o perfil de um artista e toque em Seguir.</div>')}
function heartAct(){if(isD){if(nav==='search')nav='home';side='follow';detail=null;popFn(()=>document.querySelectorAll('[data-a="heart"]').forEach(e=>fx(e,'pop')));render()}else followSheet()}
function goNav(k){
 detail=null;
 if(k==='home'){nav='home';side='rec';tab='home'}else if(k==='search'){nav='search';if(side==='follow')side='rec'}else if(k==='lib'){nav='lib';side='lib'}else if(k==='acc'){openAcc('menu');return}
 render();$('#ctr').scrollTop=0;scrollTo(0,0);
 if(k==='search')setTimeout(()=>{const q=$('#q');if(q)q.focus()},350)}
const artRow=k=>{const fl=SOC.follows.includes(k);return`<div class="row round">${aph(k)}<button class="in" data-a="open" data-t="artist" data-k="${esc(k)}"><div class="t">${esc(k)}${vb(k)}</div><div class="s">Artista</div></button><button class="pp" data-a="fol" data-k="${esc(k)}" aria-label="${fl?'Deixar de seguir':'Seguir'}" style="${fl?'color:var(--ac)':''}">${ico(fl?I.hf:I.h)}</button><button class="pp" data-a="playart" data-k="${esc(k)}" aria-label="Tocar">${ico(I.play)}</button></div>`};
const bellBtn=()=>{const u=SOC.notes.filter(n=>!n.read).length;return`<button class="ic rel" data-a="bell" aria-label="Notificações">${ico(I.bell)}${u?`<i class="bdg">${u}</i>`:''}</button>`};
const plCards=()=>[['fav','Favoritos']].concat(SOC.lists.map(l=>[l.id,l.name])).map(([id,n])=>{const ss=listSongs(id);return`<button class="card" data-a="open" data-t="list" data-k="${id}">${id==='fav'?favCov():cov(ss,n)}<div class="t">${esc(n)}</div><div class="s">${ss.length} música(s)</div></button>`}).join('');
function render(){
 document.documentElement.classList.toggle('dsk',isD);document.documentElement.classList.toggle('fm',!isD&&S.layout==='mobile'&&innerWidth>=900);document.documentElement.classList.toggle('art',!!(detail&&detail.t==='artist'));
 renderHd();renderSide();renderBar();renderMain();pageAnim();runPops();setTitle()}
function renderHd(){
 const h=$('#hd');
 if(nav==='search'){
  if(hdMode!=='s'||!$('#q')){h.innerHTML=`<div class="sbar">${ico(I.search)}<input id="q" placeholder="O que você quer ouvir?" value="${esc(srchQ)}" autocomplete="off"><button class="ic" data-a="nav" data-k="home" aria-label="Fechar">✕</button></div>`;hdMode='s';$('#q').oninput=e=>{srchQ=e.target.value;renderMain()}}
  return}
 hdMode='h';
 h.innerHTML=(isD?`<div class="clkr"><div class="brand-pc"><img class="sym" src="${LOGO_S}" alt="Sonar"><img class="word brand-w" src="${LOGO_W}" alt=""></div>${isAdm()?`<button class="upb" data-a="chip" data-k="upload">${ico(I.up)}Upload</button>`:''}</div>`:`<div class="mh">${avBtn()}<span class="grow brand"><img class="brand-w" src="${LOGO_W}" alt="Sonar"></span>${upBtn()}${bellBtn()}</div>`)+`<div class="sub">Que tal uma música pra hoje?</div>${isD?'':`<div class="chips2">${CH.map(([k,l])=>`<button class="ch${tab===k?' on':''}" data-a="chip" data-k="${k}">${l}</button>`).join('')}</div>`}`}
function renderSide(){
 const sd=$('#side');if(!isD){sd.innerHTML='';return}
 let h;
 if(side==='follow'){h=`<h3>Seguindo</h3>${SOC.follows.length?SOC.follows.map(artRow).join(''):'<div class="s">Você ainda não segue ninguém. Abra o perfil de um artista e toque em Seguir.</div>'}`}
 else if(side==='lib'){h=`<h3>Playlists<button class="pp" data-a="newpl" aria-label="Nova playlist">${ico('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z')}</button></h3>`+[['fav','Favoritos','Sua trilha sonora']].concat(SOC.lists.map(l=>[l.id,l.name,'Por você'])).map(([id,n,sub])=>`<div class="row">${id==='fav'?favCov():cov(listSongs(id),n)}<button class="in" data-a="open" data-t="list" data-k="${id}"><div class="t">${esc(n)}</div><div class="s">${sub}</div></button><button class="pp" data-a="playlist" data-k="${id}" aria-label="Tocar">${ico(I.play)}</button></div>`).join('')}
 else{
  const rc=artistGroups().filter(([k])=>!SOC.follows.includes(k)),al=group('album').sort((a,b)=>mx(b[1])-mx(a[1])).slice(0,6);
  h=`<h3>Recomendado para você</h3>${rc.length?rc.map(([k])=>artRow(k)).join(''):'<div class="s">Você já segue todos os artistas.</div>'}<h3>Novos lançamentos</h3>${al.map(([k,l])=>`<button class="row" style="width:100%;text-align:left" data-a="open" data-t="album" data-k="${esc(k)}">${cov(l,k)}<div class="in"><div class="t">${esc(k)}</div><div class="s">${esc(l[0].artist)}</div><div class="s">${aType(l.length)} · ${new Date(mx(l)).getFullYear()}</div></div></button>`).join('')}`}
 sd.innerHTML=`<div class="sdt"><div class="sclk" id="clk">${clockHtml()}</div><span class="grow"></span>${bellBtn()}${avBtn()}</div>`+h;if(lastSide!==side){lastSide=side;sd.classList.remove('sd-in');void sd.offsetWidth;sd.classList.add('sd-in')}}
function renderBar(){
 const b=$('#bar'),s=cs(),cur=(isD&&side==='follow')?'heart':nav;
 const nb=(k,ic,l,on)=>`<button class="nb${on?' on':''}" data-a="nav" data-k="${k}" aria-label="${l}">${ico(I[ic])}<span>${l}</span></button>`;
 const ctl=s?`<button class="pb" data-a="prev" aria-label="Anterior">${ico(I.prev)}</button><button class="pb big ppi" data-a="pp" aria-label="Tocar ou pausar">${ico(au.paused?I.play:I.pause)}</button><button class="pb" data-a="next" aria-label="Próxima">${ico(I.next)}</button>`:'';
 const lk=n=>`<span class="alink" data-a="open" data-t="artist" data-k="${esc(n)}">${esc(n)}</span>`;
 const artL=x=>lk(x.artist)+((x.feats||[]).length?' feat. '+x.feats.map(lk).join(', '):'');
 const mk=sub=>s?`<div class="mpi" data-a="np">${cov([s],s.album,1)}<div class="in"><div class="t">${esc(s.title)}</div><div class="s"${DEV?' style="color:var(--ac)"':''}>${sub}</div></div></div>`:'';
 const inp=s&&inPl(s.id);
 const extra=s?`<button class="pb" data-a="conn" aria-label="Conectar dispositivo" style="${DEV?'color:var(--ac)':''}">${ico(I.bt)}</button><button class="pb" data-a="addcur" aria-label="Adicionar à playlist" style="${inp?'color:var(--ac)':''}">${ico(inp?I.chk:I.plc)}</button>`:'';
 if(isD){
  const d=au.duration||(s&&s.dur)||0,pc=d?au.currentTime/d*100:0,vv=S.vol??1;
  b.innerHTML=`<div class="lz">${nb('home','home','Início',cur==='home')+nb('search','search','Buscar',cur==='search')+nb('lib','lib',s?'Biblioteca':'Sua Biblioteca',cur==='lib')}<div class="mp">${mk(s?(DEV?esc(DEV.name):artL(s)):'')}</div></div><div class="cc">${s?`<div class="cr1">${ctl}</div><div class="cr2"><span class="tmx" id="bt1">${fmt(au.currentTime)}</span><input type="range" id="sk" min="0" max="${d}" step="0.1" value="${au.currentTime||0}" style="--p:${pc}%" aria-label="Posição"><span class="tmx" id="bt2">${fmt(au.duration||s.dur)}</span></div>`:''}</div><div class="rr">${extra}<div class="vol"><button class="ic" data-a="mute" aria-label="Volume">${ico(I.vol)}</button><input type="range" id="vol" min="0" max="1" step="0.01" value="${vv}" style="--p:${vv*100}%" aria-label="Volume"></div><button class="nb${cur==='heart'?' on':''}" data-a="heart" aria-label="Seguindo">${ico(I.h)}</button></div>`;
  $('#vol').oninput=e=>{setVol(+e.target.value);e.target.style.setProperty('--p',(+e.target.value*100)+'%')};
  const k=$('#sk');if(k)k.oninput=e=>{au.currentTime=+e.target.value;e.target.style.setProperty('--p',(au.duration?+e.target.value/au.duration*100:0)+'%')}}
 else if(s&&barMode==='mini'){
  const d=au.duration||s.dur||0;
  b.innerHTML=`<div class="mp">${mk(DEV?esc(DEV.name):esc(artLine(s)))}${extra}<button class="pb big ppi" data-a="pp" aria-label="Tocar ou pausar">${ico(au.paused?I.play:I.pause)}</button></div><div class="mpb"><i id="pg" style="width:${d?au.currentTime/d*100:0}%"></i></div>`}
 else b.innerHTML=nb('home','home','Início',cur==='home')+nb('search','search','Buscar',cur==='search')+nb('lib','lib','Biblioteca',cur==='lib')+`<button class="nb${cur==='heart'?' on':''}" data-a="heart" aria-label="Seguindo">${ico(I.h)}</button>`;
 barFx(cur,!!s)}
function setVol(v){S.vol=v;if(AC&&VG){au.volume=1;VG.gain.value=v}else au.volume=v;try{localStorage.setItem('sonar-cfg',JSON.stringify(S))}catch(e){}}
function searchView(mn){
 const q=srchQ.trim().toLowerCase();ctx=[];
 if(!q){mn.innerHTML='<div class="empty">Digite o nome de uma música, álbum ou artista.</div>';return}
 const m=sorted(songs.filter(s=>[s.title,s.artist,s.album,...(s.feats||[])].join(' ').toLowerCase().includes(q))),al=group('album').filter(([k])=>k.toLowerCase().includes(q)),ar=artistGroups().filter(([k])=>k.toLowerCase().includes(q));
 ctx=m;
 mn.innerHTML=(m.length||al.length||ar.length)?(ar.length?sec('Artistas')+ar.map(([k])=>artRow(k)).join(''):'')+(al.length?sec('Álbuns')+`<div class="hs">${al.map(([k,l])=>albumCard(k,l)).join('')}</div>`:'')+(m.length?sec('Músicas')+m.map(songRow).join(''):''):'<div class="empty">Nada encontrado nas músicas que você enviou.</div>'}
const avImg=(p,sz)=>`<span class="av" style="width:${sz}px;height:${sz}px;display:flex;align-items:center;justify-content:center;font-size:${Math.round(sz*.42)}px;flex:none">${p.photo?`<img class="avi" src="${p.photo}" alt="">`:esc(((p.name||'S')[0]).toUpperCase())}</span>`;
function openAcc(p){accPage=p||'menu';renderAcc();showEl('#pf','flex')}
function closeAcc(){hideAnim('#pf')}
function accBack(){if(accPage!=='menu'){accPage='menu';renderAcc()}else closeAcc()}
function switchAcc(id){sessRelease();GTOK=null;driveAdmin=false;try{sessionStorage.removeItem('sonar-gtok')}catch(e){}ACC.cur=id;try{localStorage.setItem('sonar-session',id)}catch(e){}PROF=ACC.list.find(a=>a.id===id);loadSoc();profSave();tab='home';nav='home';detail=null;side='rec';render();renderAcc();toast('Conta: '+(PROF.name||'sem nome'));sessEnter()}
function addAcc(){const n=($('#anew').value||'').trim();if(!n)return;const a={id:'a'+Date.now(),name:n,photo:''};ACC.list.push(a);switchAcc(a.id)}
function delAcc(id){if(id===ACC.cur||ACC.list.length<2)return;ACC.list=ACC.list.filter(a=>a.id!==id);try{localStorage.removeItem(socKey(id))}catch(e){}profSave();renderAcc()}
function capsule(){
 const pl=SOC.plays||{},rows=songs.map(s=>({s,n:pl[s.id]||0})).filter(x=>x.n>0);
 const tot=rows.reduce((a,x)=>a+x.n,0),sec=rows.reduce((a,x)=>a+x.n*(x.s.dur||0),0),ar={},al={};
 rows.forEach(x=>{ar[x.s.artist]=(ar[x.s.artist]||0)+x.n;al[x.s.album]=(al[x.s.album]||0)+x.n});
 return{tot,min:Math.round(sec/60),topS:[...rows].sort((a,b)=>b.n-a.n).slice(0,5),topA:Object.entries(ar).sort((a,b)=>b[1]-a[1]).slice(0,5),topAl:Object.entries(al).sort((a,b)=>b[1]-a[1])[0]}}
function renderAcc(){
 const unread=SOC.notes.filter(n=>!n.read).length;let b='',title='Conta',markRead=false;
 const row=(ic,tt,s,a,v,bd)=>`<button class="arow2" data-a="${a}" data-v="${v||''}">${ico(I[ic])}<div class="in"><div class="t">${tt}</div>${s?`<div class="s">${s}</div>`:''}</div>${bd?`<i class="bdg2">${bd}</i>`:''}</button>`;
 if(accPage==='menu'){
  b=`<button class="prow" data-a="accgo" data-v="profile">${avImg(PROF,72)}<div><div class="nm">${esc(PROF.name||'Sem nome')}</div><div class="s">Ver perfil</div></div></button>`+row('padd','Adicionar conta','Adicionar outra pessoa neste aparelho','accgo','accounts')+row('chart','Sua Cápsula sonora','Seu resumo de músicas e artistas','accgo','capsule')+row('hist','Recentes','O que você tocou por último','accgo','recent')+row('mega','Suas atualizações','Avisos dos artistas que você segue','accgo','updates',unread||'')+row('mail','Mensagens','Converse com seus amigos','accgo','messages')+(gShow()?row('cloud','Google Drive',gStatus(),'accgo','drive'):'')+row('gear','Configurações e privacidade','Reprodução, tema, armazenamento','accset')+row('out','Sair','Voltar para a tela de login','accout')+`<div class="s sm" style="margin-top:24px">Sonar · versão ${APP_VERSION}</div>`}
 else if(accPage==='profile'){title='Perfil';b=`<div class="cen"><button class="pav" data-a="pphoto" aria-label="Escolher foto">${PROF.photo?`<img src="${PROF.photo}" alt="">`:'<span>+<br>Foto</span>'}</button></div><label class="s">Nome de usuário</label><input id="pname" value="${esc(PROF.name)}" placeholder="Seu nome" autocomplete="off" autocapitalize="off"><button class="add" data-a="psave" style="margin-top:12px">Salvar</button><div class="s" id="pmsg" style="margin-top:12px">${isAdm()?'Conta de administrador: você pode editar e fazer uploads.':'Conta de ouvinte.'}</div>`}
 else if(accPage==='accounts'){title='Contas';b=ACC.list.map(a=>`<div class="row">${avImg(a,48)}<button class="in" data-a="accsw" data-v="${a.id}"><div class="t">${esc(a.name||'Sem nome')}</div><div class="s">${a.id===ACC.cur?'Conta atual':'Trocar para esta conta'} · ${ADMINS.includes((a.name||'').trim().toLowerCase())?'Administrador':'Ouvinte'}</div></button>${a.id!==ACC.cur&&ACC.list.length>1?`<button class="ic" data-a="accdel" data-v="${a.id}" aria-label="Remover conta">✕</button>`:''}</div>`).join('')+`<h3>Adicionar conta</h3><input id="anew" placeholder="Nome de usuário da nova conta" autocomplete="off" autocapitalize="off"><button class="add" data-a="accadd" style="margin-top:12px">Adicionar</button><div class="s sm" style="margin-top:12px">As contas ficam salvas neste aparelho. Cada uma tem seus próprios seguidos, curtidas e playlists.</div>`}
 else if(accPage==='capsule'){
  title='Sua Cápsula sonora';const c=capsule();
  if(!c.tot)b='<div class="s" style="padding:20px 0">Sua cápsula ainda está vazia. Toque algumas músicas e ela se monta sozinha.</div>';
  else{const ta=c.topA[0];b=`<div class="capc">${aph(ta[0])}<div><div class="s" style="color:#fff;opacity:.85">Seu artista nº 1</div><div style="font-size:26px;font-weight:800">${esc(ta[0])}${vb(ta[0])}</div><div class="s" style="color:#fff;opacity:.85">${ta[1]}x tocado</div></div></div><div class="stg"><div><b>${c.tot}</b><span class="s">reproduções</span></div><div><b>${c.min}</b><span class="s">minutos ouvidos</span></div><div><b>${SOC.liked.length}</b><span class="s">curtidas</span></div><div><b>${SOC.follows.length}</b><span class="s">seguindo</span></div></div><h3>Músicas mais ouvidas</h3>${c.topS.map((x,i)=>`<div class="row"><div class="s" style="width:22px;text-align:center">${i+1}</div>${cov([x.s],x.s.album,1)}<div class="in"><div class="t">${esc(x.s.title)}</div><div class="s">${esc(x.s.artist)} · ${x.n}x</div></div></div>`).join('')}<h3>Artistas mais ouvidos</h3>${c.topA.map(([n,k])=>`<div class="row round">${aph(n)}<div class="in"><div class="t">${esc(n)}${vb(n)}</div><div class="s">${k}x</div></div></div>`).join('')}${c.topAl?`<h3>Álbum mais ouvido</h3><div class="s">${esc(c.topAl[0])} · ${c.topAl[1]}x</div>`:''}`}}
 else if(accPage==='recent'){
  title='Recentes';accList=(SOC.recent||[]).map(i=>songs.find(s=>s.id===i)).filter(Boolean);
  b=accList.length?accList.map((s,i)=>`<div class="row">${cov([s],s.album,1)}<button class="in" data-a="playR" data-i="${i}"><div class="t">${esc(s.title)}</div><div class="s">${esc(artLine(s))}</div></button></div>`).join(''):'<div class="s" style="padding:20px 0">Nada tocado ainda.</div>'}
 else if(accPage==='updates'){
  title='Suas atualizações';markRead=true;
  b=SOC.notes.length?SOC.notes.map(n=>`<div class="nt${n.read?'':' un'}"><div>${esc(n.text)}</div><div class="s">${new Date(n.t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</div></div>`).join('')+'<button class="pill" data-a="ncl">Limpar tudo</button>':'<div class="s" style="padding:20px 0">Sem novidades. Siga artistas para saber quando lançarem músicas.</div>'}
 else if(accPage==='drive'){title='Google Drive';b=driveHtml()}
 else{title='Mensagens';b='<p>Em breve você vai poder conversar com os amigos que seguem você.</p><div class="s">As mensagens precisam da conta na nuvem (Supabase). Quando ela estiver ligada, esta tela passa a funcionar.</div><button class="pill" disabled>Nova mensagem</button>'}
 $('#pf').innerHTML=`<div class="cfh" style="padding:calc(10px + env(safe-area-inset-top,0px)) 16px 0"><button class="ic" data-a="pfx" aria-label="Voltar" style="font-size:28px">‹</button><h2>${title}</h2></div><div class="accb">${b}</div>`;
 if(lastAcc!==accPage){const ab=$('#pf .accb');if(ab)ab.classList.add(accPage==='menu'?'swb':'swf');lastAcc=accPage}
 if(markRead){SOC.notes.forEach(n=>{n.read=true});socSave();render()}}
function pageName(){
 const vis=id=>{const e=$(id);return !!e&&e.style.display!==''&&e.style.display!=='none'};
 if(document.documentElement.classList.contains('gout'))return'Entrar';if(vis('#cf'))return cfgPage?(CFGP.find(x=>x[0]===cfgPage)||[])[1]||'Configurações':'Configurações';
 if(vis('#pf'))return({menu:'Conta',profile:'Perfil',accounts:'Contas',capsule:'Cápsula sonora',recent:'Recentes',updates:'Atualizações',messages:'Mensagens',drive:'Google Drive'})[accPage]||'Conta';
 if(npOpen)return'Tocando agora';
 if(nav==='search')return'Buscar';
 if(detail&&detail.t==='tape')return((tapeById(detail.k)||{}).name||'SonarTape');if(detail)return detail.t==='list'?(detail.k==='fav'?'Favoritos':((SOC.lists.find(l=>l.id===detail.k)||{}).name||'Playlist')):detail.k;
 if(!isD&&nav==='lib')return'Biblioteca';
 return({new:'Novos lançamentos',songs:'Músicas',albums:'Álbuns',artists:'Artistas',lists:'Playlists',upload:'Upload'})[tab]||'Início'}
let lastT='';
function setTitle(){const x=pageName()+' · Sonar';if(x!==lastT){lastT=x;document.title=x}}
setInterval(setTitle,300);
let TL=[],TLK=null,tapeSrc=null,tobs=null,tapeFresh=false;
const shuffleArr=a=>{const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r};
function drawTape(pool,n){
 const ids=pool.filter(Boolean);if(!ids.length)return[];let out=[];
 while(out.length<Math.max(n,ids.length)){const b=shuffleArr(ids);if(b.length>1&&out.length&&b[0]===out[out.length-1])b.push(b.shift());out=out.concat(b)}
 return out.map(id=>songs.find(s=>s.id===id)).filter(Boolean)}
function extendQ(){const x=tapeById(tapeSrc);if(x)queue.push(...drawTape(x.ids,20).map(s=>s.id))}
function openTape(id){if(!tapeById(id))return;TLK=null;tapeFresh=true;nav='home';tab='home';detail={t:'tape',k:id};render();$('#ctr').scrollTop=0;scrollTo(0,0)}
function tapePage(mn,id){
 const x=tapeById(id);if(!x||!x.ids.length){detail=null;return render()}
 if(TLK!==id){TL=drawTape(x.ids,24);TLK=id}
 ctx=TL;let h=0;for(const c of x.name)h=(h*31+c.charCodeAt(0))%360;
 const cover=`<div class="cv tape" style="background:linear-gradient(135deg,hsl(${h} 60% 38%),hsl(${(h+50)%360} 60% 18%))"><i></i><b>TAPE</b></div>`,fr=tapeFresh;tapeFresh=false;
 mn.innerHTML=`<button class="bkb" data-a="back" aria-label="Voltar"><svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>Voltar</button><div class="dtl"><div class="dr"><div class="hero">${cover}<h2>${esc(x.name)}</h2><div class="s">${esc(x.sub||'SonarTape')} · lista infinita</div><div class="acts"><button class="pri" data-a="all">Tocar</button><button data-a="redraw">Sortear de novo</button></div></div></div><div class="dl">${TL.map((s,i)=>fr?songRow(s,i,false,true).replace('class="row','class="row new'):songRow(s,i,false,true)).join('')}<div id="tsent" style="height:60px"></div></div></div>`;
 const se=$('#tsent');if(tobs)tobs.disconnect();
 if(se&&window.IntersectionObserver){tobs=new IntersectionObserver(e=>{if(e[0].isIntersecting)tapeMore()},{rootMargin:'500px'});tobs.observe(se)}}
function tapeMore(){
 if(!detail||detail.t!=='tape'||TL.length>3000)return;const x=tapeById(TLK);if(!x)return;
 const add=drawTape(x.ids,20),start=TL.length,se=$('#tsent');if(!se)return;TL.push(...add);
 se.insertAdjacentHTML('beforebegin',add.map((s,i)=>songRow(s,start+i,false,true).replace('class="row','class="row new')).join(''));
 if(tobs){tobs.unobserve(se);tobs.observe(se)}}
const DCFG=Object.assign({site:'',clientId:'',apiKey:'',catalogId:'',folderId:'',supaUrl:'',supaKey:''},window.SONAR_CONFIG||{});
try{const o=JSON.parse(localStorage.getItem('sonar-drivecfg')||'{}');if(o.catalogId&&!DCFG.catalogId){DCFG.catalogId=o.catalogId;DCFG.folderId=o.folderId||''}}catch(e){}
const drvHere=()=>!!(DCFG.clientId&&DCFG.apiKey&&(location.origin===DCFG.site||localStorage.getItem('sonar-forcedrive')==='1'));
const driveOn=()=>drvHere()&&!!DCFG.catalogId;
const driveSetupMode=()=>drvHere()&&!DCFG.catalogId;
let driveAdmin=false,GTOK=null,GEXP=0,gClient=null,gCb={},catDirty=false,catSaving=false,driveErr='',catT=0,setupResult=null;
const GAPI='https://www.googleapis.com/drive/v3',GUP='https://www.googleapis.com/upload/drive/v3';
const mediaUrl=id=>id?GAPI+'/files/'+id+'?alt=media&key='+DCFG.apiKey:'';

/* ===== Cache local (capas + músicas) para não estourar o limite do Google ===== */
const IMN='sonar-img-v1',AUN='sonar-audio-v1',AUMAX=80,IMC=new Map(),IMQ=[],IMB=new Set(),AUC=new Set();let imAct=0,playTok=0,lastDL=0;
const IK=id=>'https://sonar.local/i?f='+id,AK=id=>'https://sonar.local/a?f='+id;
function imgSrc(id){if(!id)return'';if(IMC.has(id))return IMC.get(id);if(!IMB.has(id)){IMB.add(id);IMQ.push({id,n:0});imgPump()}return''}
function imgPump(){while(imAct<4&&IMQ.length){const j=IMQ.shift();imAct++;imgLoad(j).finally(()=>{imAct--;imgPump()})}}
async function imgLoad(j){
 try{
  let c=null,r=null;try{c=await caches.open(IMN);r=await c.match(IK(j.id))}catch(e){}
  if(!r){r=await fetch(mediaUrl(j.id));if(!r.ok)throw new Error('HTTP '+r.status);if(c)try{await c.put(IK(j.id),r.clone())}catch(e){}}
  IMC.set(j.id,URL.createObjectURL(await r.blob()));imgDone()
 }catch(e){if(j.n<5){const w=[3000,8000,20000,45000,90000][j.n++];setTimeout(()=>{IMQ.push(j);imgPump()},w)}else IMB.delete(j.id)}}
function imgRefresh(){songs.forEach(s=>{if(s.cv&&IMC.has(s.cv))s.cover=IMC.get(s.cv);if(s.acv&&IMC.has(s.acv))s.acover=IMC.get(s.acv);if(s.scv&&IMC.has(s.scv))s.scover=IMC.get(s.scv)});Object.values(AR).forEach(a=>{if(a.pid&&IMC.has(a.pid))a.photo=IMC.get(a.pid)})}
function imgDone(){if(imgDone.t)return;imgDone.t=setTimeout(function f(){const a=document.activeElement;if(a&&/INPUT|TEXTAREA/.test(a.tagName)){imgDone.t=setTimeout(f,1500);return}imgDone.t=0;imgRefresh();render();if(npOpen)renderNP()},600)}
async function audioInit(){try{const c=await caches.open(AUN);(await c.keys()).forEach(r=>AUC.add(new URL(r.url).searchParams.get('f')))}catch(e){}}
async function audioGet(f){try{const c=await caches.open(AUN),r=await c.match(AK(f));return r?URL.createObjectURL(await r.blob()):null}catch(e){return null}}
function audioWarm(s){
 clearTimeout(audioWarm.t);if(!s.fid||AUC.has(s.fid))return;
 audioWarm.t=setTimeout(async()=>{
  if(queue[qi]!==s.id||AUC.has(s.fid)||au.paused)return;
  try{const c=await caches.open(AUN),r=await fetch(s.url);if(!r.ok)return;await c.put(AK(s.fid),r);AUC.add(s.fid);
   const ks=await c.keys();if(ks.length>AUMAX){const o=ks[0];AUC.delete(new URL(o.url).searchParams.get('f'));await c.delete(o)}}catch(e){}},10000)}
audioInit();

const AUP=new Map();
function audioDl(s){
 if(AUP.has(s.fid))return AUP.get(s.fid);
 const p=(async()=>{
  const r=await fetch(s.url);if(!r.ok)throw new Error('HTTP '+r.status);
  const b=await r.blob();
  try{const c=await caches.open(AUN);await c.put(AK(s.fid),new Response(b,{headers:{'Content-Type':b.type||'audio/mpeg'}}));AUC.add(s.fid);
   const ks=await c.keys();if(ks.length>AUMAX){const o=ks[0];AUC.delete(new URL(o.url).searchParams.get('f'));await c.delete(o)}}catch(e){}
  return b})();
 AUP.set(s.fid,p);p.then(()=>AUP.delete(s.fid),()=>AUP.delete(s.fid));return p}
async function audioPlay(s,tk){
 let u=null;
 if(AUC.has(s.fid))u=await audioGet(s.fid);
 if(!u){
  const t=setTimeout(()=>{if(tk===playTok)toast('Baixando a música…')},700);
  let b=null;try{b=await audioDl(s)}catch(e){}
  clearTimeout(t);
  if(tk!==playTok)return;
  if(!b){toast('O Google recusou o download desta música. Tente de novo mais tarde.');return}
  u=URL.createObjectURL(b)}
 if(tk!==playTok){URL.revokeObjectURL(u);return}
 cur=u;au.src=u;au.playbackRate=S.speed||1;au.play().catch(()=>{})}

/* ===== Sessão única por conta (precisa do Supabase em config.js) ===== */
const SUPA=DCFG.supaUrl&&DCFG.supaKey?{u:String(DCFG.supaUrl).replace(/\/$/,''),k:DCFG.supaKey}:null,SESS={ok:false,id:'',t:0,last:0},SESS_TTL=120000,EU=encodeURIComponent;
const DEVID=(()=>{try{let d=localStorage.getItem('sonar-dev');if(!d){d='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);localStorage.setItem('sonar-dev',d)}return d}catch(e){return 'd'+Math.random().toString(36).slice(2)}})();
async function sbq(path,opt){
 opt=opt||{};const h={apikey:SUPA.k,'Content-Type':'application/json',...(opt.headers||{})};if(String(SUPA.k).startsWith('eyJ'))h.Authorization='Bearer '+SUPA.k;
 const r=await fetch(SUPA.u+'/rest/v1/'+path,{...opt,headers:h});if(!r.ok)throw new Error('HTTP '+r.status);
 const x=await r.text();return x?JSON.parse(x):null}
const sessUp=()=>sbq('sessions?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({id:SESS.id,device:DEVID,seen:Date.now()})});
async function sessClaim(force){
 let o=null;
 try{o=((await sbq('sessions?id=eq.'+EU(SESS.id)+'&select=device,seen'))||[])[0]}catch(e){return 'ok'}
 if(o&&o.device!==DEVID&&Date.now()-o.seen<SESS_TTL&&!force)return 'busy';
 try{await sessUp();return 'ok'}catch(e){SESS.err=String(e.message||e);return force?'err':'ok'}}
async function sessBeat(){
 if(!SUPA||!SESS.ok||Date.now()-SESS.last<4000)return;SESS.last=Date.now();
 try{
  const q='sessions?id=eq.'+EU(SESS.id);
  const rows=await sbq(q+'&device=eq.'+EU(DEVID),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({seen:Date.now()})});
  if(Array.isArray(rows)&&!rows.length){const o=((await sbq(q+'&select=device'))||[])[0];if(o&&o.device!==DEVID)sessKicked();else await sessUp()}
 }catch(e){}}
function sessKicked(){
 SESS.ok=false;clearInterval(SESS.t);logout();
 setTimeout(()=>{const e=$('#lge');if(e)e.textContent='Você foi desconectado: esta conta foi aberta em outro dispositivo.'},900)}
function sessRelease(){
 clearInterval(SESS.t);
 if(SUPA&&SESS.ok&&SESS.id)sbq('sessions?id=eq.'+EU(SESS.id)+'&device=eq.'+EU(DEVID),{method:'DELETE'}).catch(()=>{});
 SESS.ok=false}
function sessUI(){
 let e=$('#ss');if(e)return e;
 const st=document.createElement('style');st.textContent='#ss{position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(6,3,13,.93);backdrop-filter:blur(10px);color:#fff;font-family:inherit}#ss[hidden]{display:none}#ss .bx{max-width:380px;width:100%;text-align:center;background:#14102a;border:1px solid #ffffff1a;border-radius:22px;padding:28px 22px}#ss h2{margin:0 0 8px;font-size:20px}#ss p{margin:0 0 18px;opacity:.75;line-height:1.45;font-size:14px}#ss button{display:block;width:100%;border:0;border-radius:999px;padding:13px;font:inherit;font-weight:700;cursor:pointer;margin-top:10px}#ss .y{background:var(--ac);color:var(--act)}#ss .n{background:#ffffff14;color:#fff}';document.head.appendChild(st);
 e=document.createElement('div');e.id='ss';e.hidden=true;
 e.innerHTML='<div class="bx"><h2>O Sonar já está aberto em outro dispositivo</h2><p>Só dá para usar uma sessão por vez nesta conta. Quer desconectar a outra e entrar aqui?</p><button class="y" id="ssy">Desconectar a outra e entrar</button><button class="n" id="ssn">Cancelar</button></div>';
 document.body.appendChild(e);
 $('#ssy').onclick=async()=>{sessHide();freshSplash();try{await sessEnter(true)}finally{hideBarSplash()}};
 $('#ssn').onclick=()=>{sessHide();logout()};
 return e}
const sessShow=()=>{sessUI().hidden=false};
const sessHide=()=>{const e=$('#ss');if(e)e.hidden=true};
async function sessEnter(force){
 try{
  if(!SUPA||!driveOn())return true;
  SESS.id=((PROF&&PROF.name)||'').trim().toLowerCase();if(!SESS.id)return true;
  const cr=await sessClaim(force);
  if(cr==='busy'){SESS.ok=false;sessShow();return false}
  if(cr==='err'){SESS.ok=false;sessShow();toast('Não consegui desconectar a outra sessão ('+SESS.err+'). Veja em Configurações → Armazenamento → Testar conexão.');return false}
  SESS.ok=true;sessHide();clearInterval(SESS.t);SESS.t=setInterval(sessBeat,15000);
  if(!lastDL){await driveBoot();render()}
  return true
 }catch(e){return true}}
const extOf=f=>(String(f.name||'').match(/\.[^.]+$/)||['.mp3'])[0];
const dataBlob=u=>{const m=u.match(/^data:(.*?);base64,(.*)$/);const bin=atob(m[2]),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:m[1]})};
const gisReady=()=>typeof google!=='undefined'&&google.accounts&&google.accounts.oauth2;
function gToken(){
 return new Promise((res,rej)=>{
  if(GTOK&&Date.now()<GEXP-60000)return res(GTOK);
  if(!gisReady())return rej(new Error('O login do Google não carregou. Verifique a internet.'));
  if(!gClient)gClient=google.accounts.oauth2.initTokenClient({client_id:DCFG.clientId,scope:'https://www.googleapis.com/auth/drive.file',callback:r=>{if(r.error)return gCb.rej(new Error(r.error_description||r.error));GTOK=r.access_token;GEXP=Date.now()+(r.expires_in||3600)*1000;try{sessionStorage.setItem('sonar-gtok',JSON.stringify({t:GTOK,e:GEXP}))}catch(e){}gCb.res(GTOK)},error_callback:e=>gCb.rej(new Error(e&&e.type==='popup_closed'?'Login cancelado.':'Não foi possível abrir o login do Google ('+((e&&e.type)||'erro')+').'))});
  gCb={res,rej};gClient.requestAccessToken()})}
function warm(){if(driveOn()&&driveAdmin)gToken().catch(()=>{})}
async function gfetch(url,opt={}){
 const t=await gToken(),r=await fetch(url,{...opt,headers:{...(opt.headers||{}),Authorization:'Bearer '+t}});
 if(!r.ok){let m='';try{m=(await r.json()).error.message}catch(e){}throw new Error('Drive '+r.status+(m?': '+m:''))}
 return r}
const jpost=(url,body,method)=>gfetch(url,{method:method||'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
async function driveCheckAdmin(){
 try{const j=await(await gfetch(GAPI+'/files/'+DCFG.catalogId+'?fields=capabilities(canEdit)')).json();driveAdmin=!!(j.capabilities&&j.capabilities.canEdit)}catch(e){driveAdmin=false;driveErr=e.message}
 render()}
function applyCatalog(j){
 songs=(j.songs||[]).map(s=>{const o={...s,feats:s.feats||[],url:mediaUrl(s.fid),size:0},d=(k,f)=>({get(){return this[k]||f(this)},set(v){this[k]=v},enumerable:true,configurable:true});Object.defineProperties(o,{cover:d('_c',x=>imgSrc(x.cv)),acover:d('_a',x=>x.acv?imgSrc(x.acv):undefined),scover:d('_s',x=>x.scv?imgSrc(x.scv):undefined)});return o});
 AR={};(j.artists||[]).forEach(a=>{AR[a.name]={name:a.name,bio:a.bio||'',verified:a.verified!==false,pid:a.pid||null,get photo(){return this._p||imgSrc(this.pid)},set photo(v){this._p=v}}});
 ORD=j.ord||{}}
async function driveLoad(){
 let j=null;
 try{const r=await fetch(GAPI+'/files/'+DCFG.catalogId+'?alt=media&key='+DCFG.apiKey+'&t='+Date.now());if(!r.ok)throw new Error('HTTP '+r.status);j=await r.json();try{localStorage.setItem('sonar-catcache',JSON.stringify(j))}catch(e){}}
 catch(e){driveErr=e.message;try{j=JSON.parse(localStorage.getItem('sonar-catcache')||'null')}catch(x){}if(!j)return false}
 if(j.t&&j.t===catT&&songs.length)return 'same';
 lastDL=Date.now();catT=j.t||0;applyCatalog(j);return 'new'}
async function driveBoot(){
 try{const o=JSON.parse(sessionStorage.getItem('sonar-gtok')||'null');if(o&&o.e>Date.now()+60000){GTOK=o.t;GEXP=o.e}}catch(e){}
 const ok=await Promise.race([driveLoad(),new Promise(r=>setTimeout(()=>r(false),8000))]);
 if(!ok)setTimeout(()=>toast('Sem conexão com o Drive.'),500);
 if(GTOK&&ADMINS.includes((PROF.name||'').trim().toLowerCase()))driveCheckAdmin()}
function driveSync(){if(!driveOn()||driveAdmin||catSaving||document.visibilityState!=='visible'||Date.now()-lastDL<300000||(SUPA&&!SESS.ok))return;driveLoad().then(r=>{if(r==='new')render()})}
function catJson(){return{v:1,t:Date.now(),songs:songs.map(s=>({id:s.id,title:s.title,artist:s.artist,feats:s.feats||[],album:s.album,dur:s.dur||0,added:s.added||0,fid:s.fid,cv:s.cv||null,acv:s.acv||null,scv:s.scv||null,lyrics:s.lyrics||'',kind:s.kind||''})),artists:Object.values(AR).map(a=>({name:a.name,bio:a.bio||'',verified:a.verified!==false,pid:a.pid||null})),ord:ORD}}
async function catSaveNow(){const j=catJson();await gfetch(GUP+'/files/'+DCFG.catalogId+'?uploadType=media',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(j)});catT=j.t;try{localStorage.setItem('sonar-catcache',JSON.stringify(j))}catch(e){}}
function catMark(){if(!driveOn())return;catDirty=true;clearTimeout(catMark.t);catMark.t=setTimeout(catFlush,900)}
async function catFlush(){
 if(catSaving){catMark.t=setTimeout(catFlush,600);return}
 if(!catDirty)return;catSaving=true;catDirty=false;
 try{await catSaveNow()}catch(e){catDirty=true;toast('Não consegui salvar no Drive: '+e.message+' (abra Conta → Google Drive e entre de novo)')}
 catSaving=false}
function driveUpload(blob,name,mime,onp){
 return new Promise(async(res,rej)=>{
  try{
   const t=await gToken(),b='sonarb'+Math.random().toString(36).slice(2),meta={name,parents:[DCFG.folderId]};
   const body=new Blob(['--'+b+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(meta)+'\r\n--'+b+'\r\nContent-Type: '+(mime||'application/octet-stream')+'\r\n\r\n',blob,'\r\n--'+b+'--']);
   const x=new XMLHttpRequest();x.open('POST',GUP+'/files?uploadType=multipart&fields=id');
   x.setRequestHeader('Authorization','Bearer '+t);x.setRequestHeader('Content-Type','multipart/related; boundary='+b);
   if(onp&&x.upload)x.upload.onprogress=e=>{if(e.lengthComputable)onp(e.loaded/e.total)};
   x.onload=async()=>{
    if(x.status>=200&&x.status<300){const id=JSON.parse(x.responseText).id;try{await jpost(GAPI+'/files/'+id+'/permissions',{role:'reader',type:'anyone'})}catch(e){}res(id)}
    else{let m='';try{m=JSON.parse(x.responseText).error.message}catch(e){}rej(new Error('Drive '+x.status+(m?': '+m:'')))}};
   x.onerror=()=>rej(new Error('Falha de rede ao enviar para o Drive.'));x.send(body)
  }catch(e){rej(e)}})}
async function driveTrash(s){for(const id of[s.fid,s.cv,s.scv]){if(id)try{await jpost(GAPI+'/files/'+id,{trashed:true},'PATCH')}catch(e){}}}
async function setAlbumCover(k,url){
 if(!driveOn()){songs.filter(s=>s.album===k).forEach(s=>{s.acover=url;dbPut(s)});return}
 const id=await driveUpload(dataBlob(url),'capa-'+Date.now()+'.jpg','image/jpeg');
 songs.filter(s=>s.album===k).forEach(s=>{s.acv=id;IMC.set(id,url);s.acover=url});catMark()}
async function setSongCover(sid,url){
 const s=songs.find(x=>x.id===sid);if(!s)return;
 if(!driveOn()){s.scover=url;dbPut(s);return}
 const id=await driveUpload(dataBlob(url),'capa-'+Date.now()+'.jpg','image/jpeg');s.scv=id;IMC.set(id,url);s.scover=url;catMark()}
async function setArtistPhoto(n,url){
 if(!driveOn()){const a={...art(n)};a.photo=url;AR[n]=a;adbPut(a);return}
 const id=await driveUpload(dataBlob(url),'artista-'+Date.now()+'.jpg','image/jpeg'),a={...art(n)};IMC.set(id,url);a.photo=url;a.pid=id;AR[n]=a;catMark()}
async function driveSetup(){
 await gToken();
 const folder=await(await jpost(GAPI+'/files',{name:'Sonar',mimeType:'application/vnd.google-apps.folder'})).json();
 await jpost(GAPI+'/files/'+folder.id+'/permissions',{role:'reader',type:'anyone'});
 const cat=await(await jpost(GAPI+'/files',{name:'biblioteca.json',parents:[folder.id],mimeType:'application/json'})).json();
 await gfetch(GUP+'/files/'+cat.id+'?uploadType=media',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({v:1,t:Date.now(),songs:[],artists:[],ord:{}})});
 await jpost(GAPI+'/files/'+cat.id+'/permissions',{role:'reader',type:'anyone'});
 DCFG.catalogId=cat.id;DCFG.folderId=folder.id;setupResult={catalogId:cat.id,folderId:folder.id};
 try{localStorage.setItem('sonar-drivecfg',JSON.stringify(setupResult))}catch(e){}
 driveAdmin=true;songs=[];AR={};ORD={};catT=0}
async function createUpDrive(name,artist,T){
 const upd=()=>{const m=$('#umsg');if(m)m.textContent=U.msg};
 try{
  await gToken();
  const feats=U.feats.split(',').map(x=>x.trim()).filter(Boolean),n=U.n,base=Date.now(),added=[];
  U.msg='Preparando envio...';renderUp();
  let acv=null;if(U.cover)acv=await driveUpload(dataBlob(U.cover),'capa-'+base+'.jpg','image/jpeg');
  for(let i=0;i<n;i++){
   const f=U.files[i],tg=await readTags(f),dur=await getDur(f),emb=picUrl(tg.picture),lab='Enviando faixa '+(i+1)+' de '+n;
   U.msg=lab+' (0%)...';upd();
   const fid=await driveUpload(f,'faixa-'+base+'-'+(i+1)+extOf(f),f.type||'audio/mpeg',p=>{U.msg=lab+' ('+Math.round(p*100)+'%)...';upd()});
   let cv=null;if(emb)cv=await driveUpload(dataBlob(emb),'embutida-'+base+'-'+(i+1)+'.jpg','image/jpeg').catch(()=>null);
   const s={id:base+'-'+i+Math.random().toString(36).slice(2,6),title:(U.titles[i]||'').trim()||tg.title||f.name.replace(/\.[^.]+$/,''),artist,feats,album:name,dur,added:base-i,fid,cv,acv,scv:null,lyrics:'',kind:U.type,size:0};
   s.url=mediaUrl(fid);if(cv&&emb)IMC.set(cv,emb);if(acv&&U.cover)IMC.set(acv,U.cover);s.cover=imgSrc(cv);s.acover=acv?imgSrc(acv):undefined;songs.push(s);added.push(s)}
  U.msg='Salvando o catálogo...';upd();
  try{await catSaveNow()}catch(e){added.forEach(s=>{songs.splice(songs.indexOf(s),1)});throw e}
  const l=T.l;if(S.notif!==false&&[artist,...feats].some(a=>SOC.follows.includes(a)))note('Novo lançamento de '+artist+': '+name+' ('+l+')');
  U={type:null,n:0,name:'',artist:'',feats:'',cover:'',files:[],titles:[],msg:''};
  tab='home';nav='home';detail={t:'album',k:name};scrollTo(0,0);render();
  toast(l+' enviado ao Drive com '+n+' faixa(s)')
 }catch(e){U.msg='Erro: '+e.message;renderUp()}}
async function driveImportLocal(){
 if(!driveOn()||!driveAdmin)return toast('Entre como administrador.');
 const loc=await dbAll();let done=[];try{done=JSON.parse(localStorage.getItem('sonar-imported')||'[]')}catch(e){}
 const todo=loc.filter(s=>s.file&&!done.includes(s.id));if(!todo.length)return toast('Nenhuma música local para enviar.');
 await gToken();
 for(let i=0;i<todo.length;i++){
  const s=todo[i];toast('Enviando '+(i+1)+' de '+todo.length+'...');
  try{
   const fid=await driveUpload(s.file,'faixa-'+s.id+extOf(s.file),s.file.type||'audio/mpeg');
   const up=async(u,nm)=>u&&String(u).startsWith('data:')?driveUpload(dataBlob(u),nm+'-'+s.id+'.jpg','image/jpeg').catch(()=>null):null;
   const cv=await up(s.cover,'embutida'),acv=await up(s.acover,'album'),scv=await up(s.scover,'musica');
   const n={id:s.id,title:s.title,artist:s.artist,feats:s.feats||[],album:s.album,dur:s.dur||0,added:s.added||0,fid,cv,acv,scv,lyrics:s.lyrics||'',kind:s.kind||'',size:0};
   if(cv)IMC.set(cv,s.cover);if(acv)IMC.set(acv,s.acover);if(scv)IMC.set(scv,s.scover);n.url=mediaUrl(fid);n.cover=imgSrc(cv);n.acover=acv?imgSrc(acv):undefined;n.scover=scv?imgSrc(scv):undefined;
   songs.push(n);done.push(s.id);localStorage.setItem('sonar-imported',JSON.stringify(done))
  }catch(e){toast('Falhou em "'+s.title+'": '+e.message);break}}
 try{for(const a of await adbAll()){const pid=a.photo&&String(a.photo).startsWith('data:')?await driveUpload(dataBlob(a.photo),'artista-'+Date.now()+'.jpg','image/jpeg').catch(()=>null):null;AR[a.name]={...a,photo:pid?mediaUrl(pid):'',pid}}}catch(e){}
 await catSaveNow().catch(e=>toast('Catálogo não salvo: '+e.message));toast('Importação concluída');render()}
async function driveDiag(){
 const out=[],add=(k,v)=>{out.push(k+': '+v);const m=$('#dmsg');if(m)m.innerHTML=out.map(esc).join('<br>')};
 add('Origem',location.origin+(location.origin===DCFG.site?' (ok)':' (diferente de '+DCFG.site+')'));
 add('Catálogo configurado',DCFG.catalogId?'sim':'não');
 try{const r=await fetch(GAPI+'/files/'+DCFG.catalogId+'?alt=media&key='+DCFG.apiKey+'&t='+Date.now());add('Leitura com a chave de API',r.ok?'ok ('+r.status+')':'erro '+r.status);if(!r.ok){try{add('Detalhe',(await r.json()).error.message)}catch(e){}}}catch(e){add('Leitura com a chave de API','falhou: '+e.message)}
 if(SUPA){
  const st=async(m,path,body,hd)=>{try{const r=await fetch(SUPA.u+'/rest/v1/'+path,{method:m,headers:{apikey:SUPA.k,'Content-Type':'application/json',...(String(SUPA.k).startsWith('eyJ')?{Authorization:'Bearer '+SUPA.k}:{}),...(hd||{})},body});let x='';try{x=(await r.text()).slice(0,140)}catch(e){}return [r.ok,r.status,x]}catch(e){return [false,0,e.message]}};
  const show=(k,[ok,s,x])=>add(k,ok?'ok ('+s+')':'erro '+(s||'')+' '+x);
  const rd=await st('GET','sessions?select=id,device&limit=1');show('Supabase: ler sessões',rd);
  show('Supabase: gravar',await st('POST','sessions?on_conflict=id',JSON.stringify({id:'__teste__',device:DEVID,seen:Date.now()}),{Prefer:'resolution=merge-duplicates,return=minimal'}));
  const up=await st('PATCH','sessions?id=eq.__teste__',JSON.stringify({seen:Date.now()}),{Prefer:'return=representation'});
  if(up[0]&&up[2].trim()==='[]')add('Supabase: atualizar','bloqueado (nenhuma linha atualizada: falta a regra de update)');else show('Supabase: atualizar',up);
  show('Supabase: apagar',await st('DELETE','sessions?id=eq.__teste__'));
  add('Sessão deste aparelho',(SESS.ok?'ativa':'inativa')+' · código '+DEVID.slice(-5))}
 add('Script do login Google',gisReady()?'carregado':'não carregou');
 add('Administrador',driveAdmin?'sim':'não')}
function gShow(){return(driveOn()||driveSetupMode())&&ADMINS.includes((PROF.name||'').trim().toLowerCase())}
const gStatus=()=>driveOn()?(driveAdmin?'Conectado como administrador':'Toque para entrar com o Google'):'Configuração pendente';
function driveHtml(){
 const signed=!!(GTOK&&Date.now()<GEXP);
 let h='<p class="s" style="white-space:normal">As músicas, capas e fotos ficam no Google Drive. Só a conta Google dona da pasta consegue enviar ou editar; os ouvintes só escutam.</p>';
 if(driveSetupMode())h+=signed?'<button class="add" data-a="gsetup" style="margin:10px 0">Configurar Drive (primeira vez)</button><div class="s" style="white-space:normal">Cria a pasta "Sonar" no seu Drive, deixa a leitura pública e prepara o catálogo.</div>':'<button class="add" data-a="gsign" style="margin:10px 0">Entrar com o Google</button>';
 else if(driveOn()){
  if(!driveAdmin)h+='<button class="add" data-a="gsign" style="margin:10px 0">Entrar com o Google</button><div class="s" style="white-space:normal">'+esc(driveErr)+'</div>';
  else h+='<div class="cr"><div>Administrador conectado<small>'+songs.length+' música(s) no Drive</small></div></div><button class="pill" data-a="gimport">Enviar músicas locais para o Drive</button> <button class="pill" data-a="gout">Sair do Google</button>'}
 if(DCFG.catalogId&&!(window.SONAR_CONFIG&&window.SONAR_CONFIG.catalogId))h+='<h3>Falta um passo</h3><p class="s" style="white-space:normal">Para os ouvintes verem a biblioteca, cole estas linhas no arquivo <b>config.js</b> no GitHub (no lugar de catalogId e folderId) e salve:</p><pre id="gcfg" class="gcfg">catalogId:\''+DCFG.catalogId+'\',\nfolderId:\''+DCFG.folderId+'\'</pre><button class="pill" data-a="gcopy">Copiar</button>';
 return h}
document.querySelector('head').insertAdjacentHTML('beforeend','<style>.gcfg{background:var(--bg2);padding:10px;border-radius:10px;overflow:auto;font-size:12px;white-space:pre-wrap;word-break:break-all}</style>');
au.addEventListener('error',()=>{if(au.dataset.retry==='1'&&!au.dataset.rl&&au.dataset.u){au.dataset.rl='1';toast('O Google limitou os acessos. Tentando de novo em instantes…');setTimeout(()=>{if(au.dataset.u&&au.src===au.dataset.u){au.crossOrigin='anonymous';au.load();au.play().catch(()=>{})}},8000)}if(au.crossOrigin&&au.dataset.u&&!au.dataset.retry&&au.src===au.dataset.u){au.dataset.retry='1';au.crossOrigin=null;au.src=au.dataset.u;au.play().catch(()=>{})}});

let DEV=null,lastSide=''
,lastPK='',lastDet=false,lastCur='',lastHad=false,lastAcc='',lastCfg='',lastNpId=null,pops=[];
function showEl(id,disp){const e=$(id);e._t=(e._t||0)+1;e.classList.remove('out');e.style.display=disp}
function hideAnim(id,fn){const e=$(id);if(!e||e.style.display===''||e.style.display==='none')return;const k=e._t=(e._t||0)+1;e.classList.add('out');setTimeout(()=>{if(e._t===k){e.style.display='none';e.classList.remove('out');if(fn)fn()}},230)}
function popFn(f){pops.push(f)}
function runPops(){const l=pops;pops=[];l.forEach(f=>{try{f()}catch(e){}})}
function fx(e,c){e.classList.remove(c);void e.offsetWidth;e.classList.add(c);setTimeout(()=>e.classList.remove(c),900)}
function pageAnim(){
 const k=nav+'|'+tab+'|'+(detail?detail.t+':'+detail.k:'');
 if(k===lastPK)return;
 const dir=detail?'fwd':(lastDet?'back':'up');
 lastPK=k;lastDet=!!detail;
 const m=$('#mn');m.classList.remove('pg-fwd','pg-back','pg-up');void m.offsetWidth;m.classList.add('pg-'+dir);
 clearTimeout(pageAnim.t);pageAnim.t=setTimeout(()=>m.classList.remove('pg-'+dir),900)}
function barFx(cur,had){const b=$('#bar');
 if(cur!==lastCur){lastCur=cur;b.classList.add('chg');setTimeout(()=>b.classList.remove('chg'),450)}
 if(had&&!lastHad){b.classList.add('mpin');setTimeout(()=>b.classList.remove('mpin'),520)}
 lastHad=had}
function cfgFx(){const k=cfgPage||'';if(k!==lastCfg){const c=$('#cf');[...c.children].forEach((e,i)=>{if(i>0)e.classList.add(k?'swf2':'swb2')});lastCfg=k}}
function closeNPAnim(){const n=$('#np');if(isD){closeNP();return}n.style.transition='transform .28s ease,opacity .28s';n.style.transform='translateY(100%)';n.style.opacity='0';setTimeout(()=>{closeNP();n.style.transition='none';n.style.transform='';n.style.opacity=''},280)}
function barTo(m){const b=$('#bar');if(b.classList.contains('bout'))return;b.classList.add('bout');setTimeout(()=>{barMode=m;renderBar();b.classList.remove('bout');b.classList.add('bin');setTimeout(()=>b.classList.remove('bin'),420)},150)}
const inPl=id=>SOC.liked.includes(id)||SOC.lists.some(l=>l.ids.includes(id));
async function connectDev(){
 if(DEV){DEV=null;try{if(au.setSinkId)await au.setSinkId('')}catch(e){}toast('Dispositivo desconectado');render();return}
 try{
  if(navigator.mediaDevices&&navigator.mediaDevices.selectAudioOutput){
   const d=await navigator.mediaDevices.selectAudioOutput();
   if(au.setSinkId)await au.setSinkId(d.deviceId);
   DEV={name:d.label||'Dispositivo de áudio',id:d.deviceId}}
  else if(navigator.bluetooth){
   const d=await navigator.bluetooth.requestDevice({acceptAllDevices:true});
   DEV={name:d.name||'Dispositivo Bluetooth'};
   if(d.addEventListener)d.addEventListener('gattserverdisconnected',()=>{DEV=null;render()});
   if(d.gatt)d.gatt.connect().catch(()=>{})}
  else{toast('Este navegador não deixa o site conectar dispositivos. No APK dá pra liberar.');return}
  toast('Conectado: '+DEV.name)
 }catch(e){if(e&&e.name!=='NotFoundError'&&e.name!=='AbortError')toast('Não consegui conectar')}
 render()}
if(navigator.mediaDevices&&navigator.mediaDevices.addEventListener)navigator.mediaDevices.addEventListener('devicechange',async()=>{if(DEV&&DEV.id){try{const l=await navigator.mediaDevices.enumerateDevices();if(!l.some(x=>x.deviceId===DEV.id)){DEV=null;render()}}catch(e){}}});
let artTab='m',artAll=false,artMoreS=false;
function coArtists(a){const m=new Set();songs.forEach(s=>{const all=[s.artist,...(s.feats||[])];if(all.includes(a))all.forEach(n=>{if(n!==a)m.add(n)})});return[...m]}
function tapeById(id){
 const mine=a=>songs.filter(s=>s.artist===a||(s.feats||[]).includes(a));
 if(id.startsWith('a:'))return{name:id.slice(2),sub:'SonarTape de um artista',ids:mine(id.slice(2)).map(s=>s.id)};
 if(id.startsWith('r:')){const a=id.slice(2);return{name:'Rádio '+a,sub:'Rádio com quem colaborou',ids:[...new Set([a,...coArtists(a)].flatMap(mine).map(s=>s.id))]}}
 return tapes().find(x=>x.id===id)}
function artMenu(k){openSheet(k,`<button class="shi" data-a="tape" data-k="a:${esc(k)}">SonarTape de ${esc(k)}</button><button class="shi" data-a="tape" data-k="r:${esc(k)}">Rádio de ${esc(k)}</button>${isAdm()?`<button class="shi" data-a="aedit" data-k="${esc(k)}">Editar artista</button>`:''}`)}
const topRow=(s,i,pl)=>{const lk=SOC.liked.includes(s.id),now=qi>=0&&queue[qi]===s.id;return`<div class="row${now?' on-now':''}"><div class="s" style="width:22px;text-align:center">${i+1}</div>${cov([s],s.album,1)}<button class="in" data-a="play" data-i="${i}"><div class="t">${now?EQB:''}${esc(s.title)}</div><div class="s">${pl[s.id]||0} reproduções</div></button><button class="ic" data-a="like" data-id="${s.id}" style="${lk?'color:var(--ac)':''}" aria-label="Curtir">${ico(lk?I.hf:I.h)}</button><button class="ic" data-a="more" data-id="${s.id}" aria-label="Mais opções">${ico(I.more)}</button></div>`};
function artistPage(mn,key){
 const a=art(key),pl=SOC.plays||{};
 const own=songs.filter(s=>s.artist===key),fs=songs.filter(s=>(s.feats||[]).includes(key)&&s.artist!==key);
 if(!own.length&&!fs.length){detail=null;return render()}
 const pool=own.length?own:fs,top=[...pool].sort((x,y)=>(pl[y.id]||0)-(pl[x.id]||0)||(y.added||0)-(x.added||0));
 ctx=top;
 const plays=pool.reduce((n,s)=>n+(pl[s.id]||0),0),albs=group('album').filter(([k,l])=>l.some(x=>x.artist===key)).sort((x,y)=>mx(y[1])-mx(x[1])),fl=SOC.follows.includes(key);
 let h=0;for(const c of key)h=(h*31+c.charCodeAt(0))%360;
 const bg=a.photo?`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.78)),url(${a.photo})`:`linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.6)),linear-gradient(135deg,hsl(${h} 55% 40%),hsl(${(h+50)%360} 55% 20%))`;
 const co=coArtists(key),fans=co.concat(artistGroups().map(x=>x[0]).filter(n=>n!==key&&!co.includes(n))).slice(0,8);
 const feAlb=group('album').filter(([k,l])=>l.some(s=>(s.feats||[]).includes(key)&&s.artist!==key));
 let body;
 if(artTab==='s')body=`<h3>Sobre</h3><p class="bio">${a.bio?esc(a.bio):'Este artista ainda não tem descrição.'}</p><div class="cr"><div>Reproduções</div><b>${plays}</b></div><div class="cr"><div>Músicas</div><b>${pool.length}</b></div><div class="cr"><div>Álbuns</div><b>${albs.length}</b></div>${a.verified!==false?`<div class="cr"><div>Selo</div><span>${VB}Verificado pelo Sonar</span></div>`:''}${isAdm()?`<button class="pill" data-a="aedit" data-k="${esc(key)}">Editar artista</button>`:''}`;
 else body=`<h3>Mais ouvidas</h3>${top.slice(0,artMoreS?top.length:5).map((s,i)=>topRow(s,i,pl)).join('')}${top.length>5?`<div class="cen"><button class="pill" data-a="amoresongs">${artMoreS?'Mostrar menos':'Mostrar mais'}</button></div>`:''}`
 +(albs.length?`<h3>Lançamentos populares</h3>${albs.slice(0,artAll?albs.length:4).map(([k,l])=>`<button class="row alr" data-a="open" data-t="album" data-k="${esc(k)}">${cov(l,k)}<div class="in"><div class="t">${esc(k)}</div><div class="s">${aType(l.length)} • ${new Date(mx(l)).getFullYear()}</div></div></button>`).join('')}${albs.length>4?`<div class="cen"><button class="pill" data-a="aall">${artAll?'Ocultar discografia':'Ver discografia'}</button></div>`:''}`:'')
 +`<h3>Inclui ${esc(key)}</h3><div class="hs">${tapeCard({id:'a:'+key,name:'SonarTape · '+key,sub:'As músicas de '+key})}${tapeCard({id:'r:'+key,name:'Rádio · '+key,sub:[key,...co].slice(0,4).join(', ')})}</div>`
 +(fans.length?`<h3>Os fãs também curtem</h3><div class="hs">${fans.map(n=>`<button class="card round" data-a="open" data-t="artist" data-k="${esc(n)}">${aph(n)}<div class="t">${esc(n)}${vb(n)}</div></button>`).join('')}</div>`:'')
 +(feAlb.length?`<h3>Aparece em</h3><div class="hs">${feAlb.map(([k,l])=>albumCard(k,l)).join('')}</div>`:'');
 mn.innerHTML=`<div class="arthero" style="background-image:${bg}"><button class="hbk" data-a="back" aria-label="Voltar">‹</button><h1 class="anm">${esc(key)}${vb(key)}</h1>${a.verified!==false?`<div class="vrow">${VB}Verificado pelo Sonar</div>`:''}</div><div class="s ast">${plays} reproduções · ${pool.length} música(s) · ${albs.length||feAlb.length} álbum(ns)</div><div class="arow"><button class="pill2${fl?' on':''}" data-a="fol" data-k="${esc(key)}">${fl?'Seguindo':'Seguir'}</button><button class="ic" data-a="amenu" data-k="${esc(key)}" aria-label="Mais">${ico(I.more)}</button><span class="grow"></span><button class="ic" data-a="shuf" aria-label="Aleatório">${ico(I.shuf)}</button><button class="bpl" data-a="all" aria-label="Tocar">${ico(I.play)}</button></div><div class="atabs"><button class="${artTab==='m'?'on':''}" data-a="atab" data-v="m">Músicas</button><button class="${artTab==='s'?'on':''}" data-a="atab" data-v="s">Sobre</button></div>`+body}
function tapes(){
 const F=SOC.follows;if(!F.length||!songs.length)return[];
 const mine=a=>songs.filter(s=>s.artist===a||(s.feats||[]).includes(a)),act=F.filter(a=>mine(a).length);if(!act.length)return[];
 const pl=SOC.plays||{},all=[...new Map(act.flatMap(mine).map(s=>[s.id,s])).values()],out=[];
 out.push({id:'mix',name:'Mix dos seus artistas',sub:act.length>1?act.slice(0,3).join(', ')+(act.length>3?'…':''):act[0],ids:all.map(s=>s.id)});
 const top=all.filter(s=>pl[s.id]).sort((a,b)=>pl[b.id]-pl[a.id]).slice(0,20);
 if(top.length)out.push({id:'top',name:'Mais tocadas',sub:'Dos artistas que você segue',ids:top.map(s=>s.id)});
 act.forEach(a=>out.push({id:'a:'+a,name:a,sub:'SonarTape de um artista',ids:mine(a).map(s=>s.id)}));
 if(act.length>1){const d=new Date().getDate();for(let i=0;i<Math.min(3,act.length-1);i++){const A=act[(d+i)%act.length],B=act[(d+i+1)%act.length];if(A!==B)out.push({id:'p:'+A+'|'+B,name:A+' + '+B,sub:'Mistura de artistas',ids:[...new Set(mine(A).concat(mine(B)).map(s=>s.id))]})}}
 return out.filter((x,i)=>out.findIndex(y=>y.id===x.id)===i)}
const tapeCard=x=>{let h=0;for(const c of x.name)h=(h*31+c.charCodeAt(0))%360;return`<button class="card" data-a="tape" data-k="${esc(x.id)}"><div class="cv tape" style="background:linear-gradient(135deg,hsl(${h} 60% 38%),hsl(${(h+50)%360} 60% 18%))"><i></i><b>TAPE</b></div><div class="t">${esc(x.name)}</div><div class="s">${esc(x.sub)}</div></button>`};
function hlAl(){const ly=$('#aly'),p=cs();if(!ly||!p||ly.dataset.sid!==p.id)return;let a=-1;const c=[...ly.children];c.forEach((x,i)=>{const v=x.dataset.t;if(v!==undefined&&v!==''&&+v<=au.currentTime)a=i});if(a!==ly._a){ly._a=a;c.forEach((x,i)=>x.classList.toggle('act',i===a));const e=c[a];if(e)ly.scrollTo({top:e.offsetTop-ly.clientHeight/2+e.clientHeight/2,behavior:'smooth'})}}
function albInfo(own){
 const pl=cs(),s=pl&&own.some(x=>x.id===pl.id)?pl:own[0];if(!s)return'';
 const L=lyr(s),a=art(s.artist),cnt=songs.filter(x=>x.artist===s.artist).length,live=pl&&pl.id===s.id;
 let h=0;for(const c of s.artist)h=(h*31+c.charCodeAt(0))%360;
 const bg=a.photo?`linear-gradient(transparent 35%,rgba(0,0,0,.85)),url(${a.photo})`:`linear-gradient(transparent 35%,rgba(0,0,0,.7)),linear-gradient(135deg,hsl(${h} 55% 40%),hsl(${(h+50)%360} 55% 22%))`;
 return`<div class="c2"><div class="top"><b>Letra · ${esc(s.title)}</b>${isAdm()?`<button data-a="ledit2" data-id="${s.id}">Editar letra</button>`:''}</div><div id="aly" data-sid="${s.id}">${L.length?L.map(l=>`<div class="ll" ${live?'data-a="seek" ':''}data-t="${l.t==null?'':l.t}">${esc(l.x)}</div>`).join(''):'<div class="s" style="font-weight:400;font-size:14px">Sem letra ainda.</div>'}</div></div><div class="about" style="background-image:${bg}"><div><b>Sobre o artista</b></div><div><div style="font-size:13px;opacity:.85">${cnt} música(s) na biblioteca</div><h2>${esc(s.artist)}${vb(s.artist)}</h2>${a.bio?`<p>${esc(a.bio)}</p>`:''}<button class="bt" data-a="fol" data-k="${esc(s.artist)}">${SOC.follows.includes(s.artist)?'Seguindo':'Seguir'}</button><button class="bt" data-a="open" data-t="artist" data-k="${esc(s.artist)}">Ver perfil</button></div></div>`}
function homeFeed(mn){
 const rec=[...songs].sort((a,b)=>(b.added||0)-(a.added||0)),al=group('album').sort((a,b)=>mx(b[1])-mx(a[1])),f=al[0];
 ctx=rec;
 const ag=artistGroups(),fol=ag.filter(([k])=>SOC.follows.includes(k)),rc=ag.filter(([k])=>!SOC.follows.includes(k)).slice(0,8),tp=tapes();
 const crd=([k])=>`<button class="card round" data-a="open" data-t="artist" data-k="${esc(k)}">${aph(k)}<div class="t">${esc(k)}${vb(k)}</div><div class="s">Artista</div></button>`;
 mn.innerHTML=`<div class="ban"><div><div class="s">ACABOU DE POSTAR</div><h2>${esc(f[0])}</h2><p>${aType(f[1].length)} · ${esc(f[1][0].artist)}</p><div class="bt"><button class="bp" data-a="playalb" data-k="${esc(f[0])}" aria-label="Tocar">${ico(I.play)}</button><button class="bo" data-a="open" data-t="album" data-k="${esc(f[0])}">Ver álbum</button></div></div>${cov(f[1],f[0])}</div>`
 +sec('Acabou de postar','new')+`<div class="hs">${rec.slice(0,12).map((s,i)=>`<button class="card" data-a="play" data-i="${i}">${cov([s],s.album,1)}<div class="t">${esc(s.title)}</div><div class="s">${esc(s.artist)}</div></button>`).join('')}</div>`
 +sec('Novas descobertas','albums')+`<div class="hs">${al.map(([k,l])=>albumCard(k,l)).join('')}</div>`
 +(tp.length?sec('SonarTapes')+`<div class="hs">${tp.map(tapeCard).join('')}</div>`:'')
 +`<div class="shd"><h3>Músicas</h3><button data-a="allsongs">${homeAll?'Menos':'Ver tudo'}</button></div>`+rec.slice(0,homeAll?rec.length:6).map((s,i)=>songRow(s,i)).join('')
 +sec('Suas playlists','lists')+`<div class="hs">${plCards()}</div><button class="pill" data-a="newpl">+ Nova playlist</button>`
 +(isD?'':sec('Artistas recomendados')+(rc.length?`<div class="hs">${rc.map(crd).join('')}</div>`:'<div class="s">Você já segue todos os artistas.</div>'))
 +(fol.length?sec('Artistas para você')+`<div class="hs">${fol.map(crd).join('')}</div>`:'')}
function renderMain(){
 const mn=$('#mn');
 if(!detail||detail.t!=='album')reord=false;
 if(nav==='search'&&!detail){searchView(mn);return}
 if(!isD&&nav==='lib'&&!detail){
  ctx=[];mn.innerHTML=sec('Playlists')+`<div class="hs">${plCards()}</div><button class="pill" data-a="newpl">+ Nova playlist</button>`+sec('Sua biblioteca')+[['songs','Músicas',songs.length],['albums','Álbuns',group('album').length],['artists','Artistas',artistGroups().length]].concat(isAdm()?[['upload','Upload','']]:[]).map(([k,l,n])=>`<button class="row" style="width:100%;text-align:left" data-a="chip" data-k="${k}"><div class="in"><div class="t">${l}</div><div class="s">${n}</div></div></button>`).join('');return}
 if(tab==='upload'&&!isAdm())tab='home';
 if(tab==='upload'&&!detail){ctx=[];if(!$('#up'))renderUp();return}
 if(!songs.length&&!detail){ctx=[];mn.innerHTML=`<div class="empty"><p>Sua biblioteca está vazia.<br>Vá em Upload para lançar seu primeiro projeto.</p><button class="add" data-a="chip" data-k="upload">Ir para Upload</button></div>`;return}
 if(detail){
  if(detail.t==='tape'){tapePage(mn,detail.k);return}if(detail.t==='artist'){artistPage(mn,detail.k);return}const key=detail.k,tp=detail.t,isA=tp==='artist',isL=tp==='list';let own,fs=[];
  if(isL)own=listSongs(key).filter(Boolean);
  else{own=tp==='album'?albumList(key):sorted(songs.filter(s=>s.artist===key));if(isA)fs=sorted(songs.filter(s=>(s.feats||[]).includes(key)&&s.artist!==key))}
  ctx=own.concat(fs);
  if(!ctx.length&&!isL){detail=null;return render()}
  const title=isL?(key==='fav'?'Favoritos':(SOC.lists.find(l=>l.id===key)||{name:'Playlist'}).name):key,fl=SOC.follows.includes(key);
  const albs=isA?group('album').filter(([k,l])=>l.some(x=>x.artist===key)):[];
  mn.innerHTML=`<button class="bkb" data-a="back" aria-label="Voltar"><svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>Voltar</button><div class="dtl"><div class="dr"><div class="hero">${isA?aph(key):isL?(key==='fav'?favCov():cov(ctx,title)):cov(ctx,key)}<h2>${esc(title)}${isA?vb(key):''}</h2>${isA&&art(key).bio?`<div class="s" style="white-space:normal;margin-top:6px">${esc(art(key).bio)}</div>`:''}<div class="s">${tp==='album'?aType(own.length)+' · ':''}${ctx.length} música(s)</div>${tp==='album'&&cs()&&own.some(x=>x.id===cs().id)?`<div class="npb2">▶ Tocando agora: ${esc(cs().title)}</div>`:''}<div class="acts"><button class="pri" data-a="all">Tocar</button><button data-a="shuf">Aleatório</button></div><div class="acts" style="margin-top:8px">${isA?`<button data-a="fol" data-k="${esc(key)}" style="${fl?'color:var(--ac)':''}">${fl?'Seguindo':'Seguir'}</button>${isAdm()?`<button data-a="aedit" data-k="${esc(key)}">Editar artista</button>`:''}`:isL?(key==='fav'?'':`<button class="danger" data-a="dlist" data-k="${key}">${delId==='l:'+key?'Toque de novo para excluir':'Excluir playlist'}</button>`):`${isAdm()?`<button data-a="cover" data-k="${esc(key)}">Capa do álbum</button><button data-a="reord">${reord?'Concluir':'Ordenar'}</button>`:''}`}</div></div>${isD&&tp==='album'?albInfo(own):''}</div><div class="dl">`+(isA?`<h3>Álbuns</h3><div class="hs">${albs.map(([k,l])=>albumCard(k,l)).join('')}</div><h3>Músicas</h3>`:'')+(isL&&!own.length?'<div class="s">Nenhuma música ainda. Use os três pontinhos de uma música e escolha Adicionar à playlist.</div>':'')+own.map((s,i)=>reord&&tp==='album'?reRow(s,i,own.length):songRow(s,i,tp==='album')).join('')+(fs.length?'<h3>Participações</h3>'+fs.map((s,i)=>songRow(s,own.length+i)).join(''):'')+'</div></div>';return}
 if(tab==='home'){homeFeed(mn);return}
 if(tab==='new'){ctx=[...songs].sort((a,b)=>(b.added||0)-(a.added||0)).slice(0,40);mn.innerHTML=sec('Novos lançamentos')+ctx.map(songRow).join('');return}
 if(tab==='songs'){ctx=sorted(songs);mn.innerHTML=`<div class="acts" style="justify-content:flex-start;margin:14px 0"><button class="pri" data-a="all">Tocar tudo</button><button data-a="shuf">Aleatório</button></div>`+ctx.map(songRow).join('');return}
 ctx=[];
 if(tab==='albums'){mn.innerHTML=`<div class="grid" style="margin-top:14px">${group('album').map(([k,l])=>albumCard(k,l)).join('')}</div>`;return}
 if(tab==='artists'){mn.innerHTML=`<div style="margin-top:14px">${artistGroups().map(([k])=>artRow(k)).join('')}</div>`;return}
 mn.innerHTML=`<div class="grid" style="margin-top:14px">${plCards()}</div><button class="pill" data-a="newpl">+ Nova playlist</button>`}
let ty=0;
let sw=false,sx=0,hz=false;const bs=$('#bar');
bs.addEventListener('touchstart',e=>{ty=e.touches[0].clientY;sx=e.touches[0].clientX;sw=false;hz=false},{passive:true});
bs.addEventListener('touchmove',e=>{
 if(isD||sw)return;const dy=e.touches[0].clientY-ty,dx=e.touches[0].clientX-sx;
 if(barMode==='mini'&&cs()&&(hz||(Math.abs(dx)>14&&Math.abs(dx)>Math.abs(dy)*1.3))){
  hz=true;const m=bs.querySelector('.mpi');
  if(m){m.style.transition='none';m.style.transform='translateX('+(dx*.6)+'px)';m.style.opacity=String(Math.max(.3,1-Math.abs(dx)/260))}
  if(Math.abs(dx)>70){sw=true;if(dx<0)prev();else next()}return}
 if(dy<-12){sw=true;if(barMode==='nav'&&cs()){barTo('mini')}else if(barMode==='mini'&&cs())openNP()}
 else if(dy>12&&barMode==='mini'){sw=true;barTo('nav')}},{passive:true});
bs.addEventListener('touchend',()=>{const m=bs.querySelector('.mpi');if(m){m.style.transition='transform .2s,opacity .2s';m.style.transform='';m.style.opacity=''}},{passive:true});
let ny=0,dg=false,ddy=0;const np=$('#np');
np.addEventListener('touchstart',e=>{if(isD)return;ny=e.touches[0].clientY;dg=np.scrollTop<=0&&!e.target.closest('#ly');ddy=0},{passive:true});
np.addEventListener('touchmove',e=>{
 if(isD||!dg)return;const dy=e.touches[0].clientY-ny;
 if(dy>0&&np.scrollTop<=0){ddy=dy;np.style.transition='none';np.style.transform='translateY('+dy+'px)';if(e.cancelable)e.preventDefault()}else{ddy=0;np.style.transform=''}},{passive:false});
const npEnd=()=>{if(isD||!dg)return;dg=false;np.style.transition='transform .25s ease';
 if(ddy>110){np.style.transform='translateY(100%)';setTimeout(()=>{closeNP();np.style.transition='none';np.style.transform=''},250)}else np.style.transform='';ddy=0};
np.addEventListener('touchend',npEnd);np.addEventListener('touchcancel',npEnd);
setVol(S.vol??1);
const H=document.documentElement;let booted=false;
const sessionOk=()=>{let id=null;try{id=localStorage.getItem('sonar-session')}catch(e){}return !!id&&ACC.list.some(a=>a.id===id)};
function wireGate(){['#lg .sym','#sp2 .sym'].forEach(s=>{$(s).src=LOGO_S});['#lg .word','#sp2 .word'].forEach(s=>{$(s).src=LOGO_W});$('#lg .lbs').src=LOGO_BG;$('#lgv').textContent=APP_VERSION}
function freshSplash(){const sp=$('#sp'),n=sp.cloneNode(true);n.classList.remove('out');n.classList.add('sp-in');n.style.display='flex';sp.replaceWith(n)}
function hideBarSplash(cb){const sp=$('#sp');sp.classList.add('out');setTimeout(()=>{sp.style.display='none';if(cb)cb()},750)}
function hideSp2(){const s=$('#sp2');s.classList.add('fo');setTimeout(()=>{s.style.display='none'},650)}
function showLogin(){
 const g=$('#lg'),u=$('#lgu');g.classList.remove('lg-out','lg-shake');g.classList.toggle('lg-pc',isD);g.hidden=false;
 g.classList.remove('lg-in');void g.offsetWidth;g.classList.add('lg-in');
 let last='';try{last=localStorage.getItem('sonar-lastuser')||''}catch(e){}
 u.value=last;$('#lge').textContent='';
 if(isD)setTimeout(()=>u.focus(),900)}
function doLogin(){
 const g=$('#lg'),u=$('#lgu'),e=$('#lge'),v=(u.value||'').trim();
 if(g.classList.contains('lg-out'))return;
 const bad=m=>{e.textContent=m;g.classList.remove('lg-shake');void g.offsetWidth;g.classList.add('lg-shake');u.focus()};
 if(!v)return bad('Digite seu nome de usuário.');
 if(v.length>24)return bad('Use no máximo 24 caracteres.');
 let a=ACC.list.find(x=>(x.name||'').trim().toLowerCase()===v.toLowerCase());
 if(!a){const empty=ACC.list.find(x=>!(x.name||'').trim());if(empty){empty.name=v;a=empty}else{a={id:'a'+Date.now(),name:v,photo:''};ACC.list.push(a)}}
 ACC.cur=a.id;PROF=a;loadSoc();profSave();
 try{localStorage.setItem('sonar-session',a.id);localStorage.setItem('sonar-lastuser',a.name)}catch(x){}
 g.classList.add('lg-out');const sp=(SUPA&&driveOn())?sessEnter():Promise.resolve(true);
 setTimeout(()=>{freshSplash();setTimeout(()=>{sp.then(()=>{H.classList.remove('gout');tab='home';nav='home';detail=null;side='rec';barMode='nav';render();g.hidden=true;g.classList.remove('lg-out');hideBarSplash(()=>toast('Bem-vindo, '+a.name))})},2000)},450)}
function logout(){sessRelease();GTOK=null;driveAdmin=false;try{sessionStorage.removeItem('sonar-gtok')}catch(e){}
 try{localStorage.removeItem('sonar-session')}catch(e){}
 au.pause();queue=[];qi=-1;tapeSrc=null;DEV=null;barMode='nav';closeNP();closeAcc();closeCfg();closeSheet();
 setTimeout(()=>{H.classList.add('gout');detail=null;tab='home';nav='home';render();showLogin()},300)}
function bootFlow(){
 if(booted)return;booted=true;
 if(!sessionOk()){try{localStorage.removeItem('sonar-session')}catch(e){}H.classList.add('gout')}
 const out=H.classList.contains('gout'),mob=H.classList.contains('mbx'),el=Date.now()-t0;
 if(out&&mob)setTimeout(()=>{showLogin();hideSp2()},Math.max(0,2500-el));
 else if(out)setTimeout(()=>{showLogin();hideBarSplash()},Math.max(0,2300-el));
 else setTimeout(()=>hideBarSplash(),Math.max(0,2300-el))}
$('#lgb').onclick=doLogin;
$('#lgu').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doLogin()}});
$('#lgu').addEventListener('input',()=>{$('#lge').textContent=''});
wireGate();
(async()=>{db=await openDB();
 if(driveOn()){songs=[];AR={};ORD={};if(!SUPA)await driveBoot()}else{songs=await dbAll();(await adbAll()).forEach(a=>{AR[a.name]=a})}
 render();if(SUPA&&driveOn()&&sessionOk())await Promise.race([sessEnter(),new Promise(r=>setTimeout(r,9000))]);bootFlow()})();
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')sessBeat()});
['focus','pageshow','online'].forEach(ev=>window.addEventListener(ev,()=>sessBeat()));
setTimeout(bootFlow,5000);
