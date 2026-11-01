<script>
(function(){
  var WA='375296495974';
  var P=[
    {id:'opora',kind:'опора',art:'СВ-01',name:'Опора бруса',img:'images/conn-1.jpg',
     sizes:[80,90,100,150],steel:'3 мм',
     short:'Пятка под стойку: держит брус над бетоном и убирает контакт дерева с влагой.',
     full:'Сварная опора из листовой стали: основание крепится к бетону, в стакан входит брус. Дерево не касается фундамента, узел работает на сжатие и сдвиг. Ставится под стойки пергол, навесов и беседок.',
     where:'Узел: низ стойки — от фундамента или винтовой сваи до обвязки.'},
    {id:'ugol',kind:'угол',art:'СВ-02',name:'Угловой тройник 90°',img:'images/conn-2.jpg',
     sizes:[80,90,100,150],steel:'3 мм',
     short:'Соединяет два бруса под прямым углом в каркасе беседки, навеса или стены.',
     full:'Два перпендикулярных лотка под брус, сваренных под 90°, с косынкой в углу. Снимает нагрузку с саморезов: узел держит форму на сжатие и сдвиг. Брус не нужно подрезать под врубку.',
     where:'Узел: угол каркаса — стойка и обвязка, стойка и балка.'},
    {id:'t',kind:'Т-узел',art:'СВ-03',name:'Т-образное соединение',img:'images/conn-3.jpg',
     sizes:[100,150],steel:'3 мм',
     short:'Крепит брус к несущей балке встык: брус остаётся целым, врубка не нужна.',
     full:'Т-образный узел из листовой стали с рёбрами жёсткости. Брус примыкает к балке встык и фиксируется болтами через отверстия в лотке. Применяется в обвязке, при устройстве промежуточных стоек и ригелей.',
     where:'Узел: примыкание бруса к балке — середина пролёта, промежуточная стойка.'},
    {id:'krest',kind:'крест',art:'СВ-04',name:'Крестовина на четыре бруса',img:'images/conn-4.jpg',
     sizes:[100,150],steel:'3 мм',
     short:'Сводит четыре бруса в одном узле: пересечение стен, обвязка, углы перголы.',
     full:'Симметричный крест из четырёх лотков со сварным центральным узлом. Позволяет собрать пересечение без врубок и без ослабления бруса. На несущих конструкциях делаем из стали 4 мм.',
     where:'Узел: пересечение четырёх брусьев — обвязка, крестовина перголы.'},
    {id:'pjatka',kind:'стропила',art:'СВ-05',name:'Пятка стропила',img:'images/conn-5.jpg',
     sizes:[100,150],steel:'3 мм',
     short:'Опорный узел стропила на обвязке: фиксирует угол и не даёт стропилу съехать.',
     full:'Опорная площадка с боковыми рёбрами: стропило ложится на обвязку и держится от бокового сдвига. Узел работает на снеговую и ветровую нагрузку, ставится парой на каждое стропило.',
     where:'Узел: стропило и верхняя обвязка — опорная пята ската.'},
    {id:'konjok',kind:'конёк',art:'СВ-06',name:'Конёк стропильный',img:'images/conn-6.jpg',
     sizes:[100,150],steel:'3 мм',
     short:'Сводит две встречные стропильные ноги в вершине кровли без врубки.',
     full:'Симметричный узел с двумя лотками под стропила и усилением под вершиной. Держит угол скатов, разгружает гвоздевое соединение. Под несущую кровлю делаем из стали 4 мм.',
     where:'Узел: вершина кровли — соединение двух стропил.'}
  ];
  var SIZES_LBL=[80,90,100,150];
  var GEN='Все изделия — из листовой стали 3 мм (4 мм на несущих узлах), сварные, под стандартные сечения бруса. Покрытие — по запросу: без него металл внутри конструкции нужно защищать от влаги.';
  var KEY='saevich_cart_v1', CKEY='saevich_city_v1';
  var cart={}, city='';
  try{ cart=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; city=localStorage.getItem(CKEY)||''; }catch(e){ cart={}; }
  var $=function(s){return document.querySelector(s)};
  var state={kind:'all',size:'all'};

  function money(){return ''}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function byId(id){for(var i=0;i<P.length;i++){if(P[i].id===id)return P[i]}return null}
  function keyOf(id,size){return id+'|'+size}

  /* ---------- каталог ---------- */
  var grid=$('#pgrid'), empty=$('#pempty'), pc=$('#pcount');
  function visible(){
    return P.filter(function(p){
      if(state.kind!=='all' && p.kind!==state.kind) return false;
      if(state.size!=='all' && p.sizes.indexOf(+state.size)<0) return false;
      return true;
    });
  }
  function card(p){
    var sizes=p.sizes.map(function(s){return '<span>'+s+'×'+s+'</span>'}).join('');
    return '<article class="pcard">'+
      '<div class="pthumb"><span class="pbadge">'+esc(p.kind)+'</span>'+
        '<img src="'+p.img+'" alt="'+esc(p.name)+' — коннектор под брус, сталь '+p.steel+'" width="760" height="760" loading="lazy" decoding="async"></div>'+
      '<div class="pinfo">'+
        '<span class="part">Арт. '+p.art+' · сталь '+p.steel+'</span>'+
        '<h3>'+esc(p.name)+'</h3>'+
        '<p class="pdesc">'+esc(p.short)+'</p>'+
        '<div class="pmeta">'+sizes+'</div>'+
        '<div class="pacts">'+
          '<button class="btn btn-line" data-more="'+p.id+'">Подробнее</button>'+
          '<button class="btn btn-acc" data-add="'+p.id+'">В корзину</button>'+
        '</div>'+
      '</div></article>';
  }
  function render(){
    var list=visible();
    grid.innerHTML=list.map(card).join('');
    empty.hidden=list.length>0;
    pc.textContent=list.length+(list.length===1?' позиция':(list.length<5?' позиции':' позиций'));
  }
  document.querySelectorAll('#filters .fchip').forEach(function(b){
    b.addEventListener('click',function(){
      var k=b.dataset.kind, s=b.dataset.size;
      if(k){ state.kind=k; document.querySelectorAll('[data-kind]').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.kind===k))}); }
      if(s){ state.size=s; document.querySelectorAll('[data-size]').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.size===s))}); }
      render();
    });
  });

  /* ---------- модалка ---------- */
  var modal=$('#modal'), mP=null, mSize=100, mQty=1, lastFocus=null;
  function openModal(id){
    mP=byId(id); if(!mP) return;
    mSize=mP.sizes.indexOf(100)>=0?100:mP.sizes[0]; mQty=1;
    lastFocus=document.activeElement;
    $('#mImg').src=mP.img; $('#mImg').alt=mP.name+' — коннектор под брус';
    $('#mKind').textContent='Вид: '+mP.kind;
    $('#mTitle').textContent=mP.name;
    $('#mArt').textContent='Арт. '+mP.art;
    $('#mDesc').textContent=mP.full;
    $('#mWhere').textContent=mP.where;
    $('#mSpec').innerHTML=
      '<tr><th>Толщина стали</th><td>'+mP.steel+(mP.steel==='3 мм'?' (4 мм на несущих)':'')+'</td></tr>'+
      '<tr><th>Материал</th><td>листовая сталь, сварка</td></tr>'+
      '<tr><th>Сечения бруса</th><td>'+mP.sizes.map(function(s){return s+'×'+s}).join(' · ')+' мм</td></tr>'+
      '<tr><th>Крепёж</th><td>болты или саморезы по проекту</td></tr>'+
      '<tr><th>Покрытие</th><td>по запросу (грунт или краска)</td></tr>'+
      '<tr><th>Изготовление</th><td>под заказ, срок — по объёму партии</td></tr>';
    $('#mOpts').innerHTML=mP.sizes.map(function(s){
      return '<button type="button" data-ms="'+s+'" aria-pressed="'+(s===mSize)+'">'+s+'×'+s+'</button>';
    }).join('');
    $('#mQty').textContent=mQty;
    modal.hidden=false; document.body.style.overflow='hidden';
    document.querySelector('#mOpts button').focus();
  }
  function closeModal(){ modal.hidden=true; if($('#drawer').hidden) document.body.style.overflow=''; if(lastFocus) lastFocus.focus(); }
  document.addEventListener('click',function(e){
    var more=e.target.closest('[data-more]'), add=e.target.closest('[data-add]'), ms=e.target.closest('[data-ms]'), cl=e.target.closest('[data-close]');
    if(more) openModal(more.dataset.more);
    if(add){ var p=byId(add.dataset.add); addToCart(p.id, p.sizes.indexOf(100)>=0?100:p.sizes[0], 1); toast('Добавлено: '+p.name); }
    if(ms){ mSize=+ms.dataset.ms; document.querySelectorAll('#mOpts button').forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.ms===mSize))}); }
    if(cl){ cl.dataset.close==='modal'?closeModal():closeDrawer(); }
  });
  $('#mMinus').addEventListener('click',function(){ mQty=Math.max(1,mQty-1); $('#mQty').textContent=mQty; });
  $('#mPlus').addEventListener('click',function(){ mQty=Math.min(99,mQty+1); $('#mQty').textContent=mQty; });
  $('#mAdd').addEventListener('click',function(){ addToCart(mP.id,mSize,mQty); toast('Добавлено: '+mP.name+' '+mSize+'×'+mSize); closeModal(); });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape') return;
    if(!modal.hidden) closeModal(); else if(!$('#drawer').hidden) closeDrawer();
  });

  /* ---------- корзина ---------- */
  var drawer=$('#drawer'), dItems=$('#dItems'), dCount=$('#dCount'), dTotal=$('#dTotal'), dWa=$('#dWa'), dCopy=$('#dCopy'), dCity=$('#dCity');
  dCity.value=city;
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(cart)); localStorage.setItem(CKEY,dCity.value||''); }catch(e){} }
  function lines(){
    var out=[];
    Object.keys(cart).forEach(function(k){
      var parts=k.split('|'), p=byId(parts[0]); if(!p) return;
      out.push({p:p,size:+parts[1],qty:cart[k]});
    });
    return out;
  }
  function addToCart(id,size,qty){
    var k=keyOf(id,size); cart[k]=(cart[k]||0)+qty; save(); paint();
  }
  function paint(){
    var L=lines(), pos=L.length, tot=L.reduce(function(a,b){return a+b.qty},0);
    dCount.textContent=pos; dTotal.textContent=tot;
    var n=document.querySelectorAll('.cartn'); n.forEach(function(el){ el.textContent=tot; el.dataset.empty=String(tot===0); });
    if(!pos){ dItems.innerHTML='<p class="dempty">Корзина пуста. Добавьте коннекторы из каталога — пришлём расчёт на весь комплект.</p>'; }
    else {
      dItems.innerHTML=L.map(function(it){
        var k=keyOf(it.p.id,it.size);
        return '<div class="ditem"><img src="'+it.p.img+'" alt="" width="56" height="56" loading="lazy">'+
          '<div><b>'+esc(it.p.name)+'</b><div class="sub">'+it.p.art+' · '+it.size+'×'+it.size+' мм</div>'+
          '<div class="ctl"><button type="button" data-dec="'+k+'" aria-label="Меньше">−</button><span>'+it.qty+'</span><button type="button" data-inc="'+k+'" aria-label="Больше">+</button>'+
          '<button type="button" class="drem" data-rem="'+k+'">удалить</button></div></div>'+
          '<div class="part">'+it.qty+' шт.</div></div>';
      }).join('');
    }
    dWa.href=waLink();
  }
  function waLink(){
    var L=lines();
    if(!L.length) return 'https://wa.me/'+WA;
    var t=['Заявка с сайта — коннекторы под брус',''];
    L.forEach(function(it,i){ t.push((i+1)+'. '+it.p.name+' (арт. '+it.p.art+'), '+it.size+'×'+it.size+' мм — '+it.qty+' шт.'); });
    t.push('');
    t.push('Всего изделий: '+L.reduce(function(a,b){return a+b.qty},0)+' в '+L.length+' позициях.');
    if(dCity.value.trim()) t.push('Город доставки: '+dCity.value.trim());
    t.push('Прошу рассчитать стоимость с доставкой и срок изготовления.');
    return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t.join('\n'));
  }
  function openDrawer(){ drawer.hidden=false; document.body.style.overflow='hidden'; document.querySelector('#drawer .mclose').focus(); }
  function closeDrawer(){ drawer.hidden=true; if(modal.hidden) document.body.style.overflow=''; }
  document.addEventListener('click',function(e){
    var inc=e.target.closest('[data-inc]'), dec=e.target.closest('[data-dec]'), rem=e.target.closest('[data-rem]');
    if(inc){ cart[inc.dataset.inc]++; save(); paint(); }
    if(dec){ var k=dec.dataset.dec; cart[k]--; if(cart[k]<=0) delete cart[k]; save(); paint(); }
    if(rem){ delete cart[rem.dataset.rem]; save(); paint(); }
  });
  dCity.addEventListener('input',function(){ save(); dWa.href=waLink(); });
  document.querySelectorAll('[data-open-cart]').forEach(function(b){ b.addEventListener('click',function(e){ e.preventDefault(); openDrawer(); }); });
  dWa.addEventListener('click',function(e){ if(!lines().length){ e.preventDefault(); toast('Сначала добавьте коннекторы в корзину'); } });
  dCopy.addEventListener('click',function(){
    var L=lines(); if(!L.length){ toast('Корзина пуста'); return; }
    var txt=decodeURIComponent(waLink().split('text=')[1]||'');
    var done=function(){ toast('Список скопирован'); };
    if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done,fallback); } else fallback();
    function fallback(){ var ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');done()}catch(e){toast('Не удалось скопировать')} ta.remove(); }
  });

  var tEl=$('#toast'), tT;
  function toast(msg){ tEl.textContent=msg; tEl.dataset.on='true'; clearTimeout(tT); tT=setTimeout(function(){ tEl.dataset.on='false'; },2200); }

  render(); paint();
  window.__cart={add:addToCart, lines:lines, state:state, wa:waLink};
})();
</script>
