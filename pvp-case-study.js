const jumpButton=document.querySelector('.case-jump button');
const jumpLinks=document.querySelector('#case-jump-links');
if(jumpButton&&jumpLinks){const close=()=>jumpButton.setAttribute('aria-expanded','false');jumpButton.addEventListener('click',()=>jumpButton.setAttribute('aria-expanded',String(jumpButton.getAttribute('aria-expanded')!=='true')));jumpLinks.addEventListener('click',close);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&jumpButton.getAttribute('aria-expanded')==='true'){close();jumpButton.focus()}})}

const motionReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!motionReduced&&'IntersectionObserver'in window){
  const sections=document.querySelectorAll('.case-section');
  sections.forEach(section=>section.classList.add('reveal'));
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{rootMargin:'0px 0px -6%',threshold:.03});
  sections.forEach(section=>revealObserver.observe(section));

  const anchors=[...document.querySelectorAll('.case-jump a')];
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){anchors.forEach(anchor=>anchor.removeAttribute('aria-current'));document.querySelector(`.case-jump a[href="#${entry.target.id}"]`)?.setAttribute('aria-current','true')}}),{rootMargin:'-35% 0px -55%',threshold:0});
  document.querySelectorAll('.case-section[id]').forEach(section=>activeObserver.observe(section));
}

const lightbox=document.querySelector('.image-lightbox');
const lightboxImage=lightbox?.querySelector('.lightbox-stage img');
const lightboxTitle=lightbox?.querySelector('#lightbox-title');
const lightboxTriggers=[...document.querySelectorAll('.lightbox-trigger')];
let activeImage=0;

function showImage(index){
  const trigger=lightboxTriggers[index];
  if(!trigger||!lightboxImage||!lightboxTitle)return;
  activeImage=index;
  lightboxImage.src=trigger.dataset.fullSrc;
  lightboxImage.alt=trigger.querySelector('img')?.alt||'';
  lightboxTitle.textContent=trigger.dataset.caption||'Project image';
}

if(lightbox&&lightboxImage){
  lightboxTriggers.forEach((trigger,index)=>trigger.addEventListener('click',()=>{showImage(index);lightbox.showModal()}));
  lightbox.querySelector('.lightbox-close')?.addEventListener('click',()=>lightbox.close());
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
  lightbox.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();showImage((activeImage+1)%lightboxTriggers.length)}
    if(event.key==='ArrowLeft'){event.preventDefault();showImage((activeImage-1+lightboxTriggers.length)%lightboxTriggers.length)}
  });
  lightbox.addEventListener('close',()=>{lightboxImage.src=''});
}
