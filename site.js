function initNavigation(root=document){const toggle=root.querySelector('.nav-toggle'),menu=root.querySelector('.nav-links');if(!toggle||!menu||toggle.dataset.ready)return;toggle.dataset.ready='true';const close=()=>{toggle.setAttribute('aria-expanded','false');toggle.querySelector('.sr-only').textContent='Open navigation'};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.querySelector('.sr-only').textContent=open?'Open navigation':'Close navigation'});menu.addEventListener('click',event=>{if(event.target.closest('a'))close()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus()}})}
initNavigation();const headerHost=document.querySelector('#header-placeholder');if(headerHost)new MutationObserver((_,observer)=>{if(headerHost.querySelector('.nav-toggle')){initNavigation(headerHost);observer.disconnect()}}).observe(headerHost,{childList:true,subtree:true});

document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion&&'IntersectionObserver'in window){
  const sections=document.querySelectorAll('.content-wrapper > .project-content > .project-content, .contact');
  document.documentElement.classList.add('reveal-ready');
  sections.forEach(section=>section.classList.add('reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -7%',threshold:.05});
  sections.forEach(section=>observer.observe(section));
}
