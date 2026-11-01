/* bt-menu: mobile fullscreen menu (vanilla, a11y) */
(function(){
function init(){
  var b=document.querySelector('.bt-burger'),m=document.getElementById('bt-menu');if(!b||!m)return;
  var last=null;
  function items(){return [].slice.call(m.querySelectorAll('a[href],button:not([disabled])')).concat([b]);}
  function open(){last=document.activeElement;m.hidden=false;requestAnimationFrame(function(){document.documentElement.classList.add('bt-menu-open')});
    b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','Закрыть меню');var f=m.querySelector('a');f&&f.focus({preventScroll:true});}
  function close(back){document.documentElement.classList.remove('bt-menu-open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Открыть меню');
    var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;setTimeout(function(){if(b.getAttribute('aria-expanded')==='false')m.hidden=true},rm?0:450);
    if(back!==false)(last&&last!==document.body?last:b).focus({preventScroll:true});}
  b.addEventListener('click',function(){b.getAttribute('aria-expanded')==='true'?close():open()});
  m.addEventListener('click',function(e){if(e.target.closest('a'))close(false)});
  document.addEventListener('keydown',function(e){if(b.getAttribute('aria-expanded')!=='true')return;
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='Tab'){var f=items(),i=f.indexOf(document.activeElement);
      if(e.shiftKey&&(i<=0)){e.preventDefault();f[f.length-1].focus();}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus();}}});
  matchMedia('(min-width: 801px)').addEventListener('change',function(q){if(q.matches&&b.getAttribute('aria-expanded')==='true')close(false)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
