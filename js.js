<script>
(function(){
  var RECT=document.getElementById('beamRect');
  var DIMW=document.getElementById('dimW'), DIMH=document.getElementById('dimH');
  var VAL=document.getElementById('dimVal'), CAP=document.getElementById('draftCap');
  var btns=[].slice.call(document.querySelectorAll('#sizes button'));
  if(!RECT||!btns.length) return;
  var SCALE=0.66;                    // мм -> px на чертеже
  var base=100, baseW=98, baseH=26;
  function apply(mm){
    var w=Math.round(baseW*(mm/base)), h=Math.max(18, Math.round(baseH*(mm/base)));
    var x=Math.round(161-w/2), y=118-h;   // полка опоры остаётся на месте
    RECT.setAttribute('x',x); RECT.setAttribute('y',y);
    RECT.setAttribute('width',w); RECT.setAttribute('height',h);
    DIMW.textContent=mm; DIMW.setAttribute('x', Math.round(x+w/2-12));
    DIMH.textContent=mm; DIMH.setAttribute('y', Math.round(y+h/2+4));
    VAL.textContent=mm+' × '+mm;
    CAP.textContent='Под сечение '+mm+'×'+mm+' мм: опора с полкой под брус, сварная, из листовой стали 3 мм.';
    btns.forEach(function(b){ b.setAttribute('aria-pressed', String(+b.dataset.s===mm)); });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ apply(+b.dataset.s); }); });
  apply(100);
})();
</script>
