/* bt-menu: mobile fullscreen menu (vanilla, a11y) */
(function(){
function init(){
  var b=document.querySelector('.bt-burger'),m=document.getElementById('bt-menu'),h=document.querySelector('.bt-hdr');if(!b||!m)return;
  var x=m.querySelector('.bt-mclose'),last=null,sy=0,de=document.documentElement,bd=document.body;
  var rm=function(){return matchMedia('(prefers-reduced-motion: reduce)').matches};
  function onScroll(){h&&h.classList.toggle('is-scrolled',(window.scrollY||0)>4)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  function items(){return [].slice.call(m.querySelectorAll('a[href],button:not([disabled])'));}
  function isOpen(){return b.getAttribute('aria-expanded')==='true'}
  function open(){
    last=document.activeElement;var r=b.getBoundingClientRect();
    m.style.setProperty('--mx',(r.left+r.width/2)+'px');m.style.setProperty('--my',(r.top+r.height/2)+'px');
    sy=window.scrollY||0;bd.style.top=(-sy)+'px';m.hidden=false;de.classList.add('bt-menu-lock');
    requestAnimationFrame(function(){requestAnimationFrame(function(){de.classList.add('bt-menu-open')})});
    b.setAttribute('aria-expanded','true');(x||items()[0]).focus({preventScroll:true});
  }
  function close(back){
    if(!isOpen())return;de.classList.remove('bt-menu-open');b.setAttribute('aria-expanded','false');
    bd.style.top='';window.scrollTo(0,sy);
    setTimeout(function(){if(!isOpen()){m.hidden=true;}},rm()?0:450);
    if(back!==false)(last&&last!==bd&&!m.contains(last)?last:b).focus({preventScroll:true});
  }
  b.addEventListener('click',function(){isOpen()?close():open()});
  x&&x.addEventListener('click',function(){close()});
  m.addEventListener('click',function(e){var a=e.target.closest('a');if(a&&a!==x)close(false)});
  document.addEventListener('keydown',function(e){if(!isOpen())return;
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='Tab'){var f=items(),i=f.indexOf(document.activeElement);
      if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus();}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus();}}});
  matchMedia('(min-width: 801px)').addEventListener('change',function(q){if(q.matches)close(false)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
